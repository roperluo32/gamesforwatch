#!/usr/bin/env node
/**
 * Rebuild public/sitemap.xml including games + catalog URLs.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SITE = "https://gamesforwatch.com";

const staticPaths = [
  "/",
  "/apple-watch-games/",
  "/offline-apple-watch-games/",
  "/watchos-games/",
  "/zh/",
  "/zh/apple-watch-games/",
  "/zh/offline-apple-watch-games/",
  "/zh/watchos-games/",
  "/ja/",
  "/ja/apple-watch-games/",
  "/ja/offline-apple-watch-games/",
  "/ja/watchos-games/",
  "/ko/",
  "/fr/",
  "/de/",
  "/de/apple-watch-games/",
  "/de/offline-apple-watch-games/",
  "/de/watchos-games/",
  "/es/",
  "/pt/",
  "/ru/",
  "/articles/",
  "/articles/why-apple-watch-games-work/",
  "/zh/articles/",
  "/zh/articles/why-apple-watch-games-work/",
  "/ja/articles/",
  "/ja/articles/why-apple-watch-games-work/",
  "/de/articles/",
  "/de/articles/why-apple-watch-games-work/",
  "/games/",
  "/apps/",
  "/apps/updated/",
  "/apps/free/",
];

function loadOwnGamePaths() {
  const file = path.join(ROOT, "src/data/own-games.json");
  if (!fs.existsSync(file)) return [];
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  return (data.games || []).map((g) => `/games/${g.slug}/`);
}

function loadAppPaths() {
  const file = path.join(ROOT, "src/data/catalog-index.json");
  if (!fs.existsSync(file)) return [];
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  return (data.apps || []).map((a) => a.path);
}

const urls = [...staticPaths, ...loadOwnGamePaths(), ...loadAppPaths()];
const body = urls
  .map(
    (p) => `  <url>
    <loc>${SITE}${p}</loc>
  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

fs.writeFileSync(path.join(ROOT, "public/sitemap.xml"), xml);
console.log(`sitemap.xml written with ${urls.length} URLs`);
