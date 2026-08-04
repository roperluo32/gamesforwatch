const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15";

/** HTML scrape / also-bought (legacy front) */
const STOREFRONTS_HTML = {
  us: "143441-1,32",
  cn: "143465-19,32",
  jp: "143462-9,32",
  de: "143443-4,32",
};

/**
 * JSON product payload (storePlatformData) — includes appleWatch screenshots + versionHistory.
 * The `,29` front returns application/json for /app/id pages.
 */
const STOREFRONTS_JSON = {
  us: "143441-1,29",
  cn: "143465-19,29",
  jp: "143462-9,29",
  de: "143443-4,29",
};

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchText(url, { headers = {}, timeoutMs = 30000, retries = 3 } = {}) {
  let lastError;
  for (let attempt = 0; attempt < retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": USER_AGENT, ...headers },
        signal: controller.signal,
      });
      if (res.status === 403 || res.status === 429 || res.status >= 500) {
        throw new Error(`HTTP ${res.status} for ${url}`);
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} for ${url}`);
      }
      return await res.text();
    } catch (err) {
      lastError = err;
      await sleep(1000 * Math.pow(2, attempt));
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError;
}

export async function fetchJson(url, options = {}) {
  const text = await fetchText(url, options);
  return JSON.parse(text);
}

export function supportsWatch(app) {
  return (app.supportedDevices || []).some((d) => String(d).includes("Watch"));
}

export function isLikelyGame(app) {
  const genres = (app.genres || []).map((g) => String(g).toLowerCase());
  const primary = String(app.primaryGenreName || "").toLowerCase();
  if (primary.includes("game") || genres.some((g) => g.includes("game"))) {
    return true;
  }
  const hay = `${app.trackName || ""} ${app.description || ""}`.toLowerCase();
  return /watch\s*game|apple\s*watch.*game|watchos.*game|手表游戏/.test(hay);
}

export function slugify(name) {
  return (
    String(name || "app")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "app"
  );
}

export function appPath(trackId, trackName) {
  return `/apps/${trackId}-${slugify(trackName)}/`;
}

export async function searchSoftware(term, country = "us", limit = 50) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=software&limit=${limit}&country=${country}`;
  const data = await fetchJson(url);
  return data.results || [];
}

export async function lookupIds(ids, country = "us") {
  const unique = [...new Set(ids.map(String).filter(Boolean))];
  const out = [];
  const chunkSize = 50;
  for (let i = 0; i < unique.length; i += chunkSize) {
    const chunk = unique.slice(i, i + chunkSize);
    const url = `https://itunes.apple.com/lookup?id=${chunk.join(",")}&country=${country}`;
    const data = await fetchJson(url);
    out.push(...(data.results || []));
    if (i + chunkSize < unique.length) await sleep(1200);
  }
  return out;
}

export async function lookupArtistSoftware(artistId, country = "us") {
  const url = `https://itunes.apple.com/lookup?id=${artistId}&entity=software&limit=50&country=${country}`;
  const data = await fetchJson(url);
  return (data.results || []).filter((r) => r.kind === "software" || r.wrapperType === "software");
}

/** Resolve App Store artwork template `{w}x{h}bb.{f}` → concrete CDN URL. */
export function resolveArtworkUrl(template, width = 392, height = 696, format = "png") {
  if (!template) return null;
  if (!/\{w\}|\{h\}|\{f\}|\{c\}/.test(template)) return template;
  return template
    .replace("{w}", String(width))
    .replace("{h}", String(height))
    .replace("{c}", "bb")
    .replace("{f}", format);
}

/**
 * Fetch rich App Store product JSON (screenshotsByType incl. appleWatch_*, versionHistory).
 */
export async function fetchStorePlatformData(trackId, country = "us") {
  const storeFront = STOREFRONTS_JSON[country] || STOREFRONTS_JSON.us;
  const text = await fetchText(`https://apps.apple.com/${country}/app/id${trackId}`, {
    headers: {
      Accept: "application/json",
      "X-Apple-Store-Front": storeFront,
    },
  });
  const data = JSON.parse(text);
  const results = data?.storePlatformData?.["product-dv"]?.results || {};
  const product = results[String(trackId)] || Object.values(results)[0] || null;
  const pageData = data?.pageData || {};
  return { product, pageData, raw: data };
}

export function extractScreenshotsFromProduct(product) {
  const phoneScreenshots = [];
  const watchScreenshots = [];
  const byType = product?.screenshotsByType || {};

  for (const [type, shots] of Object.entries(byType)) {
    if (!Array.isArray(shots)) continue;
    const isWatch = /applewatch|watch/i.test(type);
    for (const shot of shots) {
      const w = shot.width || (isWatch ? 368 : 392);
      const h = shot.height || (isWatch ? 448 : 696);
      const url = resolveArtworkUrl(shot.url, w, h, "png");
      if (!url) continue;
      if (isWatch) watchScreenshots.push(url);
      else phoneScreenshots.push(url);
    }
  }

  return { phoneScreenshots, watchScreenshots };
}

export function extractVersionHistoryFromPageData(pageData) {
  const list = pageData?.versionHistory;
  if (!Array.isArray(list)) return [];
  return list.map((item) => ({
    version: item.versionString || item.version || "",
    releaseNotes: item.releaseNotes || "",
    seenAt: item.releaseDate || "",
  })).filter((v) => v.version);
}

export async function fetchCustomersAlsoBought(trackId, country = "us") {
  // Prefer JSON product payload (also has alsoBought + screenshots)
  try {
    const { pageData, product, raw } = await fetchStorePlatformData(trackId, country);
    const ids = (pageData.customersAlsoBoughtApps || []).map(String);
    return {
      ids,
      html: typeof raw === "string" ? raw : JSON.stringify(raw),
      product,
      pageData,
      fromJson: true,
    };
  } catch {
    // fall through to HTML
  }

  const storeFront = STOREFRONTS_HTML[country] || STOREFRONTS_HTML.us;
  const html = await fetchText(`https://apps.apple.com/${country}/app/id${trackId}`, {
    headers: { "X-Apple-Store-Front": storeFront, Accept: "text/html" },
  });
  const match = html.match(/customersAlsoBoughtApps":(\[[^\]]*\])/);
  if (!match) return { ids: [], html, fromJson: false };
  try {
    return { ids: JSON.parse(match[1]).map(String), html, fromJson: false };
  } catch {
    return { ids: [], html, fromJson: false };
  }
}

export function extractScreenshotUrlsFromHtml(html) {
  // If response was JSON stringify of storePlatformData, parse structured shots
  if (html.trimStart().startsWith("{")) {
    try {
      const data = JSON.parse(html);
      const results = data?.storePlatformData?.["product-dv"]?.results || {};
      const product = Object.values(results)[0];
      if (product) {
        const { phoneScreenshots, watchScreenshots } = extractScreenshotsFromProduct(product);
        return [...watchScreenshots, ...phoneScreenshots];
      }
    } catch {
      // continue with regex
    }
  }

  const urls = html.match(/https:\/\/is\d+-ssl\.mzstatic\.com\/image\/thumb\/[^"\\\s]+/g) || [];
  const cleaned = urls
    .map((u) => u.replace(/\\u003d/g, "=").replace(/\\/g, ""))
    .filter((u) => !/AppIcon|icon|logo/i.test(u) || /screenshot/i.test(u));
  const byBase = new Map();
  for (const url of cleaned) {
    const base = url.replace(/\/\d+x\d+[a-z]*\.(png|jpg|jpeg)$/i, "");
    const sizeMatch = url.match(/\/(\d+)x(\d+)[a-z]*\.(png|jpg|jpeg)$/i);
    const area = sizeMatch ? Number(sizeMatch[1]) * Number(sizeMatch[2]) : 0;
    const prev = byBase.get(base);
    if (!prev || area > prev.area) {
      byBase.set(base, { url, area });
    }
  }
  return [...byBase.values()].map((v) => v.url);
}

export function classifyScreenshots(urls) {
  const phoneScreenshots = [];
  const watchScreenshots = [];
  const seen = new Set();
  for (const url of urls) {
    if (!url || seen.has(url)) continue;
    seen.add(url);
    if (/watch|appleWatch|Watch_/i.test(url)) {
      watchScreenshots.push(url);
    } else if (/screenshot|pr_source|Simulator_Screen|0x0ss/i.test(url) || /\/\d+x\d+/.test(url)) {
      phoneScreenshots.push(url);
    }
  }
  return { phoneScreenshots, watchScreenshots };
}

function mergeUnique(primary = [], secondary = []) {
  const out = [];
  const seen = new Set();
  for (const url of [...primary, ...secondary]) {
    if (!url || seen.has(url)) continue;
    seen.add(url);
    out.push(url);
  }
  return out;
}

export function normalizeAppRecord(app, { locale = "en", existing } = {}) {
  const trackId = String(app.trackId);
  const version = app.version || existing?.version || "";
  const releaseNotes = app.releaseNotes || "";
  const seenAt = app.currentVersionReleaseDate || new Date().toISOString();
  const history = Array.isArray(existing?.versionHistory) ? [...existing.versionHistory] : [];

  if (version) {
    const last = history[history.length - 1];
    if (!last || last.version !== version) {
      history.push({ version, releaseNotes, seenAt });
    } else if (releaseNotes && !last.releaseNotes) {
      last.releaseNotes = releaseNotes;
    }
  }

  const lookupShots = [...(app.screenshotUrls || []), ...(app.ipadScreenshotUrls || [])];
  const classified = classifyScreenshots(lookupShots);

  return {
    trackId,
    bundleId: app.bundleId || existing?.bundleId || "",
    slug: slugify(app.trackName),
    path: appPath(trackId, app.trackName),
    locales: {
      ...(existing?.locales || {}),
      [locale]: {
        trackName: app.trackName,
        description: app.description || "",
        releaseNotes,
        trackViewUrl: app.trackViewUrl,
        formattedPrice: app.formattedPrice || (app.price === 0 ? "Free" : String(app.price ?? "")),
        sellerName: app.sellerName || app.artistName || "",
        genres: app.genres || [],
        languageCodesISO2A: app.languageCodesISO2A || [],
        subtitle: existing?.locales?.[locale]?.subtitle || "",
      },
    },
    artworkUrl512: app.artworkUrl512 || existing?.artworkUrl512 || "",
    averageUserRating: app.averageUserRating ?? existing?.averageUserRating ?? 0,
    userRatingCount: app.userRatingCount ?? existing?.userRatingCount ?? 0,
    price: app.price ?? existing?.price ?? 0,
    fileSizeBytes: app.fileSizeBytes || existing?.fileSizeBytes || "",
    contentAdvisoryRating: app.contentAdvisoryRating || existing?.contentAdvisoryRating || "",
    minimumOsVersion: app.minimumOsVersion || existing?.minimumOsVersion || "",
    version,
    currentVersionReleaseDate: app.currentVersionReleaseDate || existing?.currentVersionReleaseDate || "",
    releaseDate: app.releaseDate || existing?.releaseDate || "",
    artistId: app.artistId || existing?.artistId || "",
    artistName: app.artistName || existing?.artistName || "",
    artistViewUrl: app.artistViewUrl || existing?.artistViewUrl || "",
    sellerUrl: app.sellerUrl || existing?.sellerUrl || "",
    isGameCenterEnabled: Boolean(app.isGameCenterEnabled),
    supportedDevices: app.supportedDevices || existing?.supportedDevices || [],
    hasWatch: supportsWatch(app),
    phoneScreenshots: mergeUnique(classified.phoneScreenshots, existing?.phoneScreenshots),
    watchScreenshots: mergeUnique(classified.watchScreenshots, existing?.watchScreenshots),
    versionHistory: history,
    updatedAt: new Date().toISOString(),
    isOwnApp: trackId === "6752821820",
  };
}

/** Merge storePlatformData screenshots + full version history into a catalog record. */
export function applyStorePlatformEnrichment(record, { product, pageData } = {}) {
  if (!record) return record;
  const next = { ...record };

  if (product) {
    const { phoneScreenshots, watchScreenshots } = extractScreenshotsFromProduct(product);
    next.watchScreenshots = mergeUnique(watchScreenshots, next.watchScreenshots);
    next.phoneScreenshots = mergeUnique(phoneScreenshots, next.phoneScreenshots);

    const subtitle = product.subtitle || product.itunesNotes?.short || "";
    if (subtitle && next.locales?.en) {
      next.locales = {
        ...next.locales,
        en: { ...next.locales.en, subtitle },
      };
    }
    if (product.isAppleWatchSupported) next.hasWatch = true;
  }

  const platformHistory = extractVersionHistoryFromPageData(pageData);
  if (platformHistory.length) {
    // Prefer richer platform history; keep any locally seen versions not in list
    const byVersion = new Map(platformHistory.map((h) => [h.version, h]));
    for (const h of next.versionHistory || []) {
      if (!byVersion.has(h.version)) byVersion.set(h.version, h);
    }
    next.versionHistory = [...byVersion.values()].sort((a, b) =>
      String(a.seenAt).localeCompare(String(b.seenAt))
    );
  }

  return next;
}
