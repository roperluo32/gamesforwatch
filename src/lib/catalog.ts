import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ownGamesData from "~/data/own-games.json";
import catalogIndex from "~/data/catalog-index.json";
import { GAMEHUB_TRACK_ID, getAppStoreUrl } from "~/lib/app-store";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export type OwnGame = (typeof ownGamesData.games)[number];

export type CatalogIndexEntry = (typeof catalogIndex.apps)[number];

export type CatalogApp = {
  trackId: string;
  bundleId: string;
  slug: string;
  path: string;
  locales: Record<
    string,
    {
      trackName: string;
      description: string;
      releaseNotes: string;
      trackViewUrl: string;
      formattedPrice: string;
      sellerName: string;
      genres: string[];
      languageCodesISO2A: string[];
      subtitle?: string;
    }
  >;
  artworkUrl512: string;
  averageUserRating: number;
  userRatingCount: number;
  price: number;
  fileSizeBytes: string;
  contentAdvisoryRating: string;
  minimumOsVersion: string;
  version: string;
  currentVersionReleaseDate: string;
  releaseDate: string;
  artistId: string | number;
  artistName: string;
  artistViewUrl: string;
  sellerUrl: string;
  isGameCenterEnabled: boolean;
  supportedDevices: string[];
  hasWatch: boolean;
  phoneScreenshots: string[];
  watchScreenshots: string[];
  versionHistory: Array<{ version: string; releaseNotes: string; seenAt: string }>;
  updatedAt: string;
  isOwnApp: boolean;
};

export const ownGames = ownGamesData.games as OwnGame[];
export const ownGamesMeta = ownGamesData;

export function getOwnGame(slug: string): OwnGame | undefined {
  return ownGames.find((g) => g.slug === slug);
}

export function getCatalogIndex(): CatalogIndexEntry[] {
  return (catalogIndex.apps || []) as CatalogIndexEntry[];
}

export function loadCatalogApp(trackId: string): CatalogApp | null {
  const file = path.join(root, "data/catalog/apps", `${trackId}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as CatalogApp;
}

export function loadAllCatalogApps(): CatalogApp[] {
  const dir = path.join(root, "data/catalog/apps");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as CatalogApp)
    .sort((a, b) => {
      if (a.isOwnApp !== b.isOwnApp) return a.isOwnApp ? -1 : 1;
      return String(b.currentVersionReleaseDate).localeCompare(String(a.currentVersionReleaseDate));
    });
}

export function appLocale(app: CatalogApp, locale: string = "en") {
  return app.locales?.[locale] || app.locales?.en || Object.values(app.locales || {})[0];
}

export function formatBytes(bytes: string | number): string {
  const n = typeof bytes === "string" ? Number(bytes) : bytes;
  if (!n || Number.isNaN(n)) return "—";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDate(iso: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export const GAMEHUB_APP_STORE_URL = getAppStoreUrl(GAMEHUB_TRACK_ID);
