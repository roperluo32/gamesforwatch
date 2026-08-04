#!/usr/bin/env node
/**
 * Rebuild catalog-index.json previewImages from existing app JSON (no network).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const APPS_DIR = path.join(ROOT, "data/catalog/apps");
const INDEX_PATH = path.join(ROOT, "data/catalog/index.json");
const SRC_MIRROR = path.join(ROOT, "src/data/catalog-index.json");

function toIndexEntry(record) {
  const en = record.locales?.en || Object.values(record.locales || {})[0] || {};
  const watch = record.watchScreenshots || [];
  const phone = record.phoneScreenshots || [];
  const previewImages = [...watch, ...phone].filter(Boolean).slice(0, 5);
  if (!previewImages.length && record.artworkUrl512) {
    previewImages.push(record.artworkUrl512);
  }
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
    watchScreenshotCount: watch.length,
    phoneScreenshotCount: phone.length,
    previewImages,
    updatedAt: record.updatedAt,
  };
}

const existing = JSON.parse(fs.readFileSync(INDEX_PATH, "utf8"));
const byId = new Set((existing.apps || []).map((a) => String(a.trackId)));

const records = fs
  .readdirSync(APPS_DIR)
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(fs.readFileSync(path.join(APPS_DIR, f), "utf8")))
  .filter((r) => byId.has(String(r.trackId)));

// Preserve existing index order
const order = (existing.apps || []).map((a) => String(a.trackId));
records.sort((a, b) => order.indexOf(String(a.trackId)) - order.indexOf(String(b.trackId)));

const index = {
  generatedAt: new Date().toISOString(),
  count: records.length,
  apps: records.map(toIndexEntry),
};

fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2) + "\n");
fs.writeFileSync(SRC_MIRROR, JSON.stringify(index, null, 2) + "\n");
console.log(`Updated previewImages for ${records.length} apps`);
