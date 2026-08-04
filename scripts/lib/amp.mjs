import { fetchJson, fetchText, sleep } from "./itunes.mjs";

let cachedToken = null;
let cachedAt = 0;
const TOKEN_TTL_MS = 45 * 60 * 1000;

/**
 * Mint a short-lived bearer token for amp-api.apps.apple.com.
 * Prefer AMP_TOKEN env; otherwise try public endpoints / embedded JWTs.
 * Note: Music JWTs often do NOT authorize apps amp-api — storePlatformData JSON is preferred for screenshots.
 */
export async function getAmpToken() {
  if (process.env.AMP_TOKEN) {
    return process.env.AMP_TOKEN;
  }
  if (cachedToken && Date.now() - cachedAt < TOKEN_TTL_MS) {
    return cachedToken;
  }

  const attempts = [
    async () => {
      const data = await fetchJson("https://amp-api.music.apple.com/v1/token", {
        headers: {
          Origin: "https://music.apple.com",
          Accept: "application/json",
        },
      });
      return data.token || data.accessToken || null;
    },
    async () => {
      // Extract developer JWT embedded in Apple Music web bundle (may not work for apps amp-api)
      const html = await fetchText("https://music.apple.com/", {
        headers: { Accept: "text/html" },
      });
      const bundle = html.match(/\/assets\/index~[^"']+\.js/);
      if (!bundle) return null;
      const js = await fetchText(`https://music.apple.com${bundle[0]}`);
      const tokens = js.match(/eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/g) || [];
      return tokens[0] || null;
    },
    async () => {
      const html = await fetchText("https://apps.apple.com/us/app/id1042612318", {
        headers: {
          "X-Apple-Store-Front": "143441-1,32",
          Accept: "text/html",
        },
      });
      const match = html.match(/eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/);
      return match ? match[0] : null;
    },
  ];

  for (const attempt of attempts) {
    try {
      const token = await attempt();
      if (token && token.length > 20) {
        cachedToken = token;
        cachedAt = Date.now();
        return token;
      }
    } catch (err) {
      console.warn("[amp-token]", err.message || err);
    }
    await sleep(500);
  }

  return null;
}

export async function fetchAmpWatchScreenshots(trackId, country = "us") {
  const token = await getAmpToken();
  if (!token) {
    return { ok: false, reason: "no-token", urls: [] };
  }

  const params = new URLSearchParams({
    platform: "watch",
    l:
      country === "cn"
        ? "zh-Hans-CN"
        : country === "jp"
          ? "ja-JP"
          : country === "de"
            ? "de-DE"
            : "en-us",
    extend: "customScreenshotsByType,description,requirementsByDeviceFamily",
    include: "customers-also-bought-apps,developer-other-apps",
  });
  const url = `https://amp-api.apps.apple.com/v1/catalog/${country}/apps/${trackId}?${params}`;

  try {
    const text = await fetchText(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Origin: "https://apps.apple.com",
        Accept: "application/json",
      },
    });
    const data = JSON.parse(text);
    const urls = collectScreenshotUrls(data);
    return { ok: true, urls, rawKeys: Object.keys(data?.data?.[0]?.attributes || {}) };
  } catch (err) {
    return { ok: false, reason: err.message || String(err), urls: [] };
  }
}

function collectScreenshotUrls(data) {
  const found = new Set();
  const walk = (node) => {
    if (!node) return;
    if (typeof node === "string") {
      if (/mzstatic\.com\/image\/thumb\//.test(node)) {
        found.add(node);
      }
      return;
    }
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (typeof node === "object") {
      if (typeof node.url === "string" && /mzstatic\.com/.test(node.url)) {
        found.add(node.url);
      }
      for (const value of Object.values(node)) walk(value);
    }
  };

  const attrs = data?.data?.[0]?.attributes || {};
  walk(attrs.customScreenshotsByType || attrs.screenshotUrls || attrs.screenshots || attrs);
  return [...found];
}
