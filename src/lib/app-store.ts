export const APP_STORE_BASE_URL = "https://geo.itunes.apple.com/app";
export const GAMEHUB_TRACK_ID = "6752821820";

export function getAppStoreUrl(trackId: string | number = GAMEHUB_TRACK_ID): string {
  return `${APP_STORE_BASE_URL}/id${trackId}`;
}
