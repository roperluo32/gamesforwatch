#!/usr/bin/env node
/**
 * Discover + refresh Apple Watch games catalog.
 * Seeds → Watch filter → alsoBought/artist BFS → Lookup → screenshots (Lookup/HTML + amp).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fetchAmpWatchScreenshots } from "./lib/amp.mjs";
import {
  appPath,
  applyStorePlatformEnrichment,
  classifyScreenshots,
  extractScreenshotUrlsFromHtml,
  fetchCustomersAlsoBought,
  fetchStorePlatformData,
  isLikelyGame,
  lookupArtistSoftware,
  lookupIds,
  normalizeAppRecord,
  searchSoftware,
  sleep,
  slugify,
  supportsWatch,
} from "./lib/itunes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CATALOG_DIR = path.join(ROOT, "data/catalog");
const APPS_DIR = path.join(CATALOG_DIR, "apps");
const INDEX_PATH = path.join(CATALOG_DIR, "index.json");

const SEED_TERMS = [
  "apple watch games",
  "apple watch game",
  "games for apple watch",
  "watchOS games",
  "watch games offline",
  "wrist games",
  "apple watch puzzle",
  "apple watch offline games",
  "手表游戏",
  "Apple Watch 游戏",
];

const SEARCH_COUNTRIES = ["us", "cn"];
const LOOKUP_LOCALES = process.env.CATALOG_LOCALES
  ? process.env.CATALOG_LOCALES.split(",").map((pair) => {
      const [country, locale] = pair.split(":");
      return { country, locale: locale || country };
    })
  : [
      { country: "us", locale: "en" },
      { country: "cn", locale: "zh" },
      { country: "jp", locale: "ja" },
      { country: "de", locale: "de" },
    ];

const MAX_APPS = Number(process.env.CATALOG_MAX_APPS || 500);
const BFS_DEPTH = Number(process.env.CATALOG_BFS_DEPTH || 2);
const SKIP_AMP = process.env.SKIP_AMP === "1";
const SKIP_BFS = process.env.SKIP_BFS === "1";
const DRY_LIMIT = process.env.CATALOG_LIMIT ? Number(process.env.CATALOG_LIMIT) : null;

function readJson(file, fallback) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
}

async function discoverSeedIds() {
  const ids = new Set();
  for (const country of SEARCH_COUNTRIES) {
    for (const term of SEED_TERMS) {
      console.log(`search [${country}] ${term}`);
      try {
        const results = await searchSoftware(term, country, 50);
        for (const app of results) {
          if (supportsWatch(app) && isLikelyGame(app)) {
            ids.add(String(app.trackId));
          }
        }
      } catch (err) {
        console.warn(`search failed: ${term}/${country}`, err.message);
      }
      await sleep(1500);
    }
  }
  // Always include own app
  ids.add("6752821820");
  return ids;
}

async function expandRelated(seedIds) {
  if (SKIP_BFS) return seedIds;
  const known = new Set(seedIds);
  let frontier = [...seedIds];

  for (let depth = 0; depth < BFS_DEPTH && known.size < MAX_APPS; depth++) {
    console.log(`BFS depth ${depth + 1}, frontier=${frontier.length}, known=${known.size}`);
    const next = [];
    for (const id of frontier) {
      if (known.size >= MAX_APPS) break;
      try {
        const { ids } = await fetchCustomersAlsoBought(id, "us");
        await sleep(1200);
        const relatedLookup = ids.length ? await lookupIds(ids, "us") : [];
        await sleep(1000);
        for (const app of relatedLookup) {
          const tid = String(app.trackId);
          if (known.has(tid)) continue;
          if (supportsWatch(app) && isLikelyGame(app)) {
            known.add(tid);
            next.push(tid);
          }
        }

        const self = (await lookupIds([id], "us"))[0];
        await sleep(800);
        if (self?.artistId) {
          const siblings = await lookupArtistSoftware(self.artistId, "us");
          await sleep(1000);
          for (const app of siblings) {
            const tid = String(app.trackId);
            if (known.has(tid)) continue;
            if (supportsWatch(app) && isLikelyGame(app)) {
              known.add(tid);
              next.push(tid);
            }
          }
        }
      } catch (err) {
        console.warn(`expand failed for ${id}:`, err.message);
      }
      if (known.size >= MAX_APPS) break;
    }
    frontier = next;
  }
  return known;
}

async function enrichScreenshots(record) {
  // B) App Store storePlatformData JSON (true appleWatch_* screenshots + versionHistory)
  try {
    const { product, pageData } = await fetchStorePlatformData(record.trackId, "us");
    record = applyStorePlatformEnrichment(record, { product, pageData });
  } catch (err) {
    console.warn(`storePlatform ${record.trackId}:`, err.message);
    // Fallback: HTML / JSON scrape via also-bought helper
    try {
      const bought = await fetchCustomersAlsoBought(record.trackId, "us");
      if (bought.product || bought.pageData) {
        record = applyStorePlatformEnrichment(record, {
          product: bought.product,
          pageData: bought.pageData,
        });
      } else if (bought.html) {
        const urls = extractScreenshotUrlsFromHtml(bought.html);
        const classified = classifyScreenshots(urls);
        record.phoneScreenshots = [...new Set([...(record.phoneScreenshots || []), ...classified.phoneScreenshots])];
        record.watchScreenshots = [...new Set([...(record.watchScreenshots || []), ...classified.watchScreenshots])];
      }
    } catch (err2) {
      console.warn(`html shots ${record.trackId}:`, err2.message);
    }
  }
  await sleep(1000);

  // C) amp-api watch platform (supplement when store JSON lacked Watch shots)
  if (!SKIP_AMP && !(record.watchScreenshots || []).length) {
    try {
      const amp = await fetchAmpWatchScreenshots(record.trackId, "us");
      if (amp.ok && amp.urls.length) {
        const classified = classifyScreenshots(amp.urls);
        const watch = new Set(record.watchScreenshots || []);
        const phone = new Set(record.phoneScreenshots || []);
        amp.urls.forEach((u) => {
          if (/watch/i.test(u) || classified.watchScreenshots.includes(u)) watch.add(u);
          else phone.add(u);
        });
        if (watch.size === 0) amp.urls.forEach((u) => watch.add(u));
        record.phoneScreenshots = [...phone];
        record.watchScreenshots = [...watch];
      } else {
        console.warn(`amp shots ${record.trackId}: ${amp.reason}`);
      }
    } catch (err) {
      console.warn(`amp shots ${record.trackId}:`, err.message);
    }
    await sleep(1500);
  }

  return record;
}

function toIndexEntry(record) {
  const en = record.locales?.en || Object.values(record.locales || {})[0] || {};
  return {
    trackId: record.trackId,
    slug: record.slug,
    path: record.path,
    trackName: en.trackName || record.slug,
    artworkUrl512: record.artworkUrl512,
    averageUserRating: record.averageUserRating,
    userRatingCount: record.userRatingCount,
    price: record.price,
    formattedPrice: en.formattedPrice || "",
    version: record.version,
    currentVersionReleaseDate: record.currentVersionReleaseDate,
    hasWatch: record.hasWatch,
    isOwnApp: record.isOwnApp,
    watchScreenshotCount: (record.watchScreenshots || []).length,
    phoneScreenshotCount: (record.phoneScreenshots || []).length,
    updatedAt: record.updatedAt,
  };
}

async function refreshApp(trackId, existing) {
  let record = existing || {
    trackId,
    locales: {},
    phoneScreenshots: [],
    watchScreenshots: [],
    versionHistory: [],
  };

  for (const { country, locale } of LOOKUP_LOCALES) {
    try {
      const [app] = await lookupIds([trackId], country);
      if (!app) continue;
      record = normalizeAppRecord(app, { locale, existing: record });
    } catch (err) {
      console.warn(`lookup ${trackId}/${country}:`, err.message);
    }
    await sleep(800);
  }

  if (!record.locales?.en?.trackName && !record.locales?.zh?.trackName) {
    console.warn(`skip ${trackId}: no lookup data`);
    return null;
  }

  // Ensure path/slug from English name when available
  const title = record.locales.en?.trackName || record.locales.zh?.trackName || "app";
  record.slug = slugify(title);
  record.path = appPath(trackId, title);

  record = await enrichScreenshots(record);
  return record;
}

async function main() {
  fs.mkdirSync(APPS_DIR, { recursive: true });
  const existingIndex = readJson(INDEX_PATH, { apps: [], generatedAt: null });
  const existingIds = new Set((existingIndex.apps || []).map((a) => String(a.trackId)));

  console.log("=== discover seeds ===");
  let ids = await discoverSeedIds();
  console.log(`seeds: ${ids.size}`);

  console.log("=== expand related ===");
  ids = await expandRelated(ids);
  console.log(`after BFS: ${ids.size}`);

  // Merge previously known ids so we keep refreshing them
  for (const id of existingIds) ids.add(id);

  let idList = [...ids];
  if (DRY_LIMIT) idList = idList.slice(0, DRY_LIMIT);

  console.log(`=== refresh ${idList.length} apps ===`);
  const records = [];
  for (const id of idList) {
    const file = path.join(APPS_DIR, `${id}.json`);
    const existing = readJson(file, null);
    console.log(`refresh ${id}${existing ? "" : " (new)"}`);
    try {
      const record = await refreshApp(id, existing);
      if (!record) continue;
      writeJson(file, record);
      records.push(record);
    } catch (err) {
      console.warn(`failed ${id}:`, err.message);
    }
  }

  // Also load any existing apps not refreshed this run (if limit applied)
  if (DRY_LIMIT) {
    for (const file of fs.readdirSync(APPS_DIR).filter((f) => f.endsWith(".json"))) {
      const id = file.replace(/\.json$/, "");
      if (records.some((r) => r.trackId === id)) continue;
      records.push(readJson(path.join(APPS_DIR, file)));
    }
  }

  records.sort((a, b) => {
    if (a.isOwnApp !== b.isOwnApp) return a.isOwnApp ? -1 : 1;
    return String(b.currentVersionReleaseDate).localeCompare(String(a.currentVersionReleaseDate));
  });

  // Drop obvious non-games that may have entered via older syncs
  const filtered = records.filter((r) => {
    if (r.isOwnApp) return true;
    if (!r.hasWatch) return false;
    const genres = Object.values(r.locales || {}).flatMap((l) => l.genres || []);
    const hay = `${r.locales?.en?.trackName || ""} ${r.locales?.en?.description || ""}`.toLowerCase();
    if (genres.some((g) => String(g).toLowerCase().includes("game"))) return true;
    return /game|watchos|手表游戏|arcade|puzzle|casual/.test(hay);
  });

  writeJson(INDEX_PATH, {
    generatedAt: new Date().toISOString(),
    count: filtered.length,
    apps: filtered.map(toIndexEntry),
  });

  // Copy a thin mirror into src/data for Astro imports (avoid reading outside src in some setups)
  const srcMirror = path.join(ROOT, "src/data/catalog-index.json");
  writeJson(srcMirror, {
    generatedAt: new Date().toISOString(),
    count: filtered.length,
    apps: filtered.map(toIndexEntry),
  });

  console.log(`Wrote index with ${filtered.length} apps (from ${records.length} refreshed)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
