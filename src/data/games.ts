import type { LandingLocale } from "~/data/landing";
import { getArticleIndexPathForLanding } from "~/data/articles";
import { ownGames, ownGamesMeta, type OwnGame } from "~/lib/catalog";

export type GamesLocale = LandingLocale;

interface GamesLocaleConfig {
  segment: string;
  langAttr: string;
  ogLocale: string;
  label: string;
  hreflang: string;
  homePath: string;
}

export interface GamesUi {
  brandTagline: string;
  gamesNav: string;
  appsNav: string;
  updatedNav: string;
  freeNav: string;
  blogNav: string;
  downloadNav: string;
  languageLabel: string;
  contactLabel: string;
  storeLabel: string;
  footerNote: string;
  listEyebrow: string;
  listTitle: string;
  listLead: string;
  listMetaTitle: string;
  listMetaDescription: string;
  downloadCta: string;
  badgeNew: string;
  badgeVip: string;
  badgeFeatured: string;
  syncedLabel: string;
  homeLabel: string;
  noPreview: string;
  playCta: string;
  playSupport: string;
  moreGames: string;
  detailTitleSuffix: string;
  detailDescriptionFallback: (name: string) => string;
}

export interface LocalizedOwnGame {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  preview: string;
  isNew: boolean;
  isVip: boolean;
  isFeatured: boolean;
}

export interface GamesChrome {
  locale: GamesLocale;
  path: string;
  homePath: string;
  gamesPath: string;
  appsPath: string;
  updatedPath: string;
  freePath: string;
  blogPath: string;
  langAttr: string;
  ogLocale: string;
  languages: Array<{
    title: string;
    url: string;
    locale: GamesLocale;
    active: boolean;
  }>;
  alternatePaths: Array<{ hreflang: string; path: string }>;
  defaultPath: string;
  ui: GamesUi;
}

export interface GamesListPage extends GamesChrome {
  title: string;
  description: string;
  games: LocalizedOwnGame[];
  exportedAt: string;
}

export interface GamesDetailPage extends GamesChrome {
  title: string;
  description: string;
  game: LocalizedOwnGame;
  related: LocalizedOwnGame[];
  ogImage?: string;
}

export const supportedGamesLocales: GamesLocale[] = [
  "en",
  "zh-CN",
  "ja",
  "ko",
  "fr",
  "de",
  "es",
  "pt",
  "ru",
];

const localeConfig: Record<GamesLocale, GamesLocaleConfig> = {
  en: {
    segment: "",
    langAttr: "en",
    ogLocale: "en_US",
    label: "EN",
    hreflang: "en",
    homePath: "/",
  },
  "zh-CN": {
    segment: "zh",
    langAttr: "zh-CN",
    ogLocale: "zh_CN",
    label: "中文",
    hreflang: "zh-CN",
    homePath: "/zh/",
  },
  ja: {
    segment: "ja",
    langAttr: "ja",
    ogLocale: "ja_JP",
    label: "日本語",
    hreflang: "ja",
    homePath: "/ja/",
  },
  ko: {
    segment: "ko",
    langAttr: "ko",
    ogLocale: "ko_KR",
    label: "한국어",
    hreflang: "ko",
    homePath: "/ko/",
  },
  fr: {
    segment: "fr",
    langAttr: "fr",
    ogLocale: "fr_FR",
    label: "Fr",
    hreflang: "fr",
    homePath: "/fr/",
  },
  de: {
    segment: "de",
    langAttr: "de",
    ogLocale: "de_DE",
    label: "DE",
    hreflang: "de",
    homePath: "/de/",
  },
  es: {
    segment: "es",
    langAttr: "es",
    ogLocale: "es_ES",
    label: "ES",
    hreflang: "es",
    homePath: "/es/",
  },
  pt: {
    segment: "pt",
    langAttr: "pt",
    ogLocale: "pt_BR",
    label: "PT",
    hreflang: "pt",
    homePath: "/pt/",
  },
  ru: {
    segment: "ru",
    langAttr: "ru",
    ogLocale: "ru_RU",
    label: "RU",
    hreflang: "ru",
    homePath: "/ru/",
  },
};

export const gamesUiByLocale: Record<GamesLocale, GamesUi> = {
  en: {
    brandTagline: "Apple Watch games",
    gamesNav: "Our Games",
    appsNav: "Watch Apps",
    updatedNav: "Updated",
    freeNav: "Free",
    blogNav: "Blog",
    downloadNav: "Download",
    languageLabel: "Language",
    contactLabel: "Contact",
    storeLabel: "App Store",
    footerNote: "Games for Watch · Discover Apple Watch games",
    listEyebrow: "GameHub collection",
    listTitle: "Our Watch games",
    listLead:
      "{count} mini games built for Apple Watch. Play offline in GameHub — Mini Games for Watch.",
    listMetaTitle: "Our Apple Watch Games | Games for Watch",
    listMetaDescription:
      "Play 30+ classic mini games on Apple Watch with GameHub — offline, no ads, Watch-first.",
    downloadCta: "Download on the App Store",
    badgeNew: "New",
    badgeVip: "VIP",
    badgeFeatured: "Featured",
    syncedLabel: "Synced from GameHub",
    homeLabel: "Home",
    noPreview: "No preview",
    playCta: "Play in GameHub on Apple Watch",
    playSupport:
      "Included in GameHub — Mini Games for Watch. Offline play, Watch-first controls.",
    moreGames: "More GameHub games",
    detailTitleSuffix: "for Apple Watch | Games for Watch",
    detailDescriptionFallback: (name) =>
      `Play ${name} on Apple Watch with GameHub — offline mini games for your wrist.`,
  },
  "zh-CN": {
    brandTagline: "Apple Watch 游戏",
    gamesNav: "我们的游戏",
    appsNav: "Watch 游戏目录",
    updatedNav: "最近更新",
    freeNav: "免费",
    blogNav: "博客",
    downloadNav: "下载",
    languageLabel: "语言",
    contactLabel: "联系我",
    storeLabel: "App Store",
    footerNote: "Games for Watch · 发现更多 Apple Watch 游戏",
    listEyebrow: "GameHub 合集",
    listTitle: "我们的 Watch 游戏",
    listLead:
      "共 {count} 款专为 Apple Watch 打造的小游戏。在 GameHub — Mini Games for Watch 中离线畅玩。",
    listMetaTitle: "我们的 Apple Watch 游戏 | Games for Watch",
    listMetaDescription:
      "用 GameHub 在 Apple Watch 上玩 30+ 经典小游戏——离线、无广告、手表优先。",
    downloadCta: "前往 App Store 下载",
    badgeNew: "新",
    badgeVip: "VIP",
    badgeFeatured: "精选",
    syncedLabel: "同步自 GameHub",
    homeLabel: "首页",
    noPreview: "暂无预览",
    playCta: "在 Apple Watch 的 GameHub 中游玩",
    playSupport:
      "收录于 GameHub — Mini Games for Watch。离线可玩，专为手表操控优化。",
    moreGames: "更多 GameHub 游戏",
    detailTitleSuffix: "Apple Watch 版 | Games for Watch",
    detailDescriptionFallback: (name) =>
      `用 GameHub 在 Apple Watch 上玩${name}——手腕上的离线小游戏。`,
  },
  ja: {
    brandTagline: "Apple Watchゲーム",
    gamesNav: "収録ゲーム",
    appsNav: "Watchアプリ",
    updatedNav: "更新",
    freeNav: "無料",
    blogNav: "ブログ",
    downloadNav: "ダウンロード",
    languageLabel: "言語",
    contactLabel: "お問い合わせ",
    storeLabel: "App Store",
    footerNote: "Games for Watch · Apple Watchゲームを探す",
    listEyebrow: "GameHubコレクション",
    listTitle: "収録Watchゲーム",
    listLead:
      "Apple Watch向けミニゲーム{count}本。GameHub — Mini Games for Watchでオフラインプレイ。",
    listMetaTitle: "収録Apple Watchゲーム | Games for Watch",
    listMetaDescription:
      "GameHubでApple Watch向けクラシックミニゲーム30本以上——オフライン、広告なし、Watch優先。",
    downloadCta: "App Storeでダウンロード",
    badgeNew: "新着",
    badgeVip: "VIP",
    badgeFeatured: "注目",
    syncedLabel: "GameHubから同期",
    homeLabel: "ホーム",
    noPreview: "プレビューなし",
    playCta: "Apple WatchのGameHubで遊ぶ",
    playSupport:
      "GameHub — Mini Games for Watchに収録。オフライン対応、Watch向け操作。",
    moreGames: "ほかのGameHubゲーム",
    detailTitleSuffix: "Apple Watch版 | Games for Watch",
    detailDescriptionFallback: (name) =>
      `GameHubでApple Watchの${name}をプレイ——手首で遊べるオフラインミニゲーム。`,
  },
  ko: {
    brandTagline: "Apple Watch 게임",
    gamesNav: "우리 게임",
    appsNav: "Watch 앱",
    updatedNav: "업데이트",
    freeNav: "무료",
    blogNav: "블로그",
    downloadNav: "다운로드",
    languageLabel: "언어",
    contactLabel: "문의",
    storeLabel: "App Store",
    footerNote: "Games for Watch · Apple Watch 게임 발견",
    listEyebrow: "GameHub 컬렉션",
    listTitle: "우리 Watch 게임",
    listLead:
      "Apple Watch용 미니게임 {count}개. GameHub — Mini Games for Watch에서 오프라인으로 플레이하세요.",
    listMetaTitle: "우리 Apple Watch 게임 | Games for Watch",
    listMetaDescription:
      "GameHub로 Apple Watch에서 클래식 미니게임 30개 이상 — 오프라인, 광고 없음, Watch 우선.",
    downloadCta: "App Store에서 다운로드",
    badgeNew: "신규",
    badgeVip: "VIP",
    badgeFeatured: "추천",
    syncedLabel: "GameHub에서 동기화",
    homeLabel: "홈",
    noPreview: "미리보기 없음",
    playCta: "Apple Watch의 GameHub에서 플레이",
    playSupport:
      "GameHub — Mini Games for Watch에 포함. 오프라인 플레이, Watch 우선 조작.",
    moreGames: "더 많은 GameHub 게임",
    detailTitleSuffix: "Apple Watch용 | Games for Watch",
    detailDescriptionFallback: (name) =>
      `GameHub로 Apple Watch에서 ${name} 플레이 — 손목용 오프라인 미니게임.`,
  },
  fr: {
    brandTagline: "Jeux Apple Watch",
    gamesNav: "Nos jeux",
    appsNav: "Apps Watch",
    updatedNav: "Mis a jour",
    freeNav: "Gratuit",
    blogNav: "Blog",
    downloadNav: "Telecharger",
    languageLabel: "Langue",
    contactLabel: "Contact",
    storeLabel: "App Store",
    footerNote: "Games for Watch · Decouvrir des jeux Apple Watch",
    listEyebrow: "Collection GameHub",
    listTitle: "Nos jeux Watch",
    listLead:
      "{count} mini-jeux concus pour Apple Watch. Jouez hors ligne dans GameHub — Mini Games for Watch.",
    listMetaTitle: "Nos jeux Apple Watch | Games for Watch",
    listMetaDescription:
      "Jouez a plus de 30 mini-jeux classiques sur Apple Watch avec GameHub — hors ligne, sans pub, Watch d’abord.",
    downloadCta: "Telecharger sur l’App Store",
    badgeNew: "Nouveau",
    badgeVip: "VIP",
    badgeFeatured: "A la une",
    syncedLabel: "Synchronise depuis GameHub",
    homeLabel: "Accueil",
    noPreview: "Pas d’apercu",
    playCta: "Jouer dans GameHub sur Apple Watch",
    playSupport:
      "Inclus dans GameHub — Mini Games for Watch. Hors ligne, commandes pensees pour la Watch.",
    moreGames: "Plus de jeux GameHub",
    detailTitleSuffix: "pour Apple Watch | Games for Watch",
    detailDescriptionFallback: (name) =>
      `Jouez a ${name} sur Apple Watch avec GameHub — mini-jeux hors ligne au poignet.`,
  },
  de: {
    brandTagline: "Apple-Watch-Spiele",
    gamesNav: "Unsere Spiele",
    appsNav: "Watch Apps",
    updatedNav: "Aktualisiert",
    freeNav: "Kostenlos",
    blogNav: "Blog",
    downloadNav: "Laden",
    languageLabel: "Sprache",
    contactLabel: "Kontakt",
    storeLabel: "App Store",
    footerNote: "Games for Watch · Apple-Watch-Spiele entdecken",
    listEyebrow: "GameHub-Sammlung",
    listTitle: "Unsere Watch-Spiele",
    listLead:
      "{count} Minispiele fur die Apple Watch. Offline spielen in GameHub — Mini Games for Watch.",
    listMetaTitle: "Unsere Apple-Watch-Spiele | Games for Watch",
    listMetaDescription:
      "Spiele 30+ klassische Minispiele auf der Apple Watch mit GameHub — offline, ohne Werbung, Watch-first.",
    downloadCta: "Im App Store laden",
    badgeNew: "Neu",
    badgeVip: "VIP",
    badgeFeatured: "Empfohlen",
    syncedLabel: "Aus GameHub synchronisiert",
    homeLabel: "Startseite",
    noPreview: "Keine Vorschau",
    playCta: "In GameHub auf der Apple Watch spielen",
    playSupport:
      "Enthalten in GameHub — Mini Games for Watch. Offline, Watch-first Steuerung.",
    moreGames: "Weitere GameHub-Spiele",
    detailTitleSuffix: "fur Apple Watch | Games for Watch",
    detailDescriptionFallback: (name) =>
      `Spiele ${name} auf der Apple Watch mit GameHub — Offline-Minispiele am Handgelenk.`,
  },
  es: {
    brandTagline: "Juegos para Apple Watch",
    gamesNav: "Nuestros juegos",
    appsNav: "Apps Watch",
    updatedNav: "Actualizados",
    freeNav: "Gratis",
    blogNav: "Blog",
    downloadNav: "Descargar",
    languageLabel: "Idioma",
    contactLabel: "Contacto",
    storeLabel: "App Store",
    footerNote: "Games for Watch · Descubre juegos para Apple Watch",
    listEyebrow: "Coleccion GameHub",
    listTitle: "Nuestros juegos Watch",
    listLead:
      "{count} minijuegos pensados para Apple Watch. Juega sin conexion en GameHub — Mini Games for Watch.",
    listMetaTitle: "Nuestros juegos para Apple Watch | Games for Watch",
    listMetaDescription:
      "Juega mas de 30 minijuegos clasicos en Apple Watch con GameHub — sin conexion, sin anuncios, Watch primero.",
    downloadCta: "Descargar en el App Store",
    badgeNew: "Nuevo",
    badgeVip: "VIP",
    badgeFeatured: "Destacado",
    syncedLabel: "Sincronizado desde GameHub",
    homeLabel: "Inicio",
    noPreview: "Sin vista previa",
    playCta: "Jugar en GameHub en Apple Watch",
    playSupport:
      "Incluido en GameHub — Mini Games for Watch. Sin conexion, controles pensados para el Watch.",
    moreGames: "Mas juegos de GameHub",
    detailTitleSuffix: "para Apple Watch | Games for Watch",
    detailDescriptionFallback: (name) =>
      `Juega a ${name} en Apple Watch con GameHub — minijuegos sin conexion en la muneca.`,
  },
  pt: {
    brandTagline: "Jogos para Apple Watch",
    gamesNav: "Nossos jogos",
    appsNav: "Apps Watch",
    updatedNav: "Atualizados",
    freeNav: "Gratis",
    blogNav: "Blog",
    downloadNav: "Baixar",
    languageLabel: "Idioma",
    contactLabel: "Contato",
    storeLabel: "App Store",
    footerNote: "Games for Watch · Descubra jogos para Apple Watch",
    listEyebrow: "Colecao GameHub",
    listTitle: "Nossos jogos Watch",
    listLead:
      "{count} minijogos feitos para Apple Watch. Jogue offline no GameHub — Mini Games for Watch.",
    listMetaTitle: "Nossos jogos para Apple Watch | Games for Watch",
    listMetaDescription:
      "Jogue mais de 30 minijogos classicos no Apple Watch com o GameHub — offline, sem anuncios, Watch em primeiro lugar.",
    downloadCta: "Baixar na App Store",
    badgeNew: "Novo",
    badgeVip: "VIP",
    badgeFeatured: "Destaque",
    syncedLabel: "Sincronizado do GameHub",
    homeLabel: "Inicio",
    noPreview: "Sem previa",
    playCta: "Jogar no GameHub no Apple Watch",
    playSupport:
      "Incluido no GameHub — Mini Games for Watch. Offline, controles pensados para o Watch.",
    moreGames: "Mais jogos do GameHub",
    detailTitleSuffix: "para Apple Watch | Games for Watch",
    detailDescriptionFallback: (name) =>
      `Jogue ${name} no Apple Watch com o GameHub — minijogos offline no pulso.`,
  },
  ru: {
    brandTagline: "Игры для Apple Watch",
    gamesNav: "Наши игры",
    appsNav: "Watch Apps",
    updatedNav: "Обновления",
    freeNav: "Бесплатно",
    blogNav: "Blog",
    downloadNav: "Скачать",
    languageLabel: "Язык",
    contactLabel: "Контакт",
    storeLabel: "App Store",
    footerNote: "Games for Watch · Открывайте игры для Apple Watch",
    listEyebrow: "Коллекция GameHub",
    listTitle: "Наши игры для Watch",
    listLead:
      "{count} мини-игр для Apple Watch. Играйте офлайн в GameHub — Mini Games for Watch.",
    listMetaTitle: "Наши игры для Apple Watch | Games for Watch",
    listMetaDescription:
      "Играйте в 30+ классических мини-игр на Apple Watch с GameHub — офлайн, без рекламы, Watch-first.",
    downloadCta: "Скачать в App Store",
    badgeNew: "Новое",
    badgeVip: "VIP",
    badgeFeatured: "Избранное",
    syncedLabel: "Синхронизировано из GameHub",
    homeLabel: "Главная",
    noPreview: "Нет превью",
    playCta: "Играть в GameHub на Apple Watch",
    playSupport:
      "Входит в GameHub — Mini Games for Watch. Офлайн, управление под Watch.",
    moreGames: "Ещё игры GameHub",
    detailTitleSuffix: "для Apple Watch | Games for Watch",
    detailDescriptionFallback: (name) =>
      `Играйте в ${name} на Apple Watch с GameHub — офлайн мини-игры на запястье.`,
  },
};

export function isGamesLocale(
  locale: LandingLocale | string,
): locale is GamesLocale {
  return supportedGamesLocales.includes(locale as GamesLocale);
}

export function getGamesIndexPath(locale: GamesLocale) {
  const config = localeConfig[locale];
  return config.segment ? `/${config.segment}/games/` : "/games/";
}

export function getGamesPath(locale: GamesLocale, slug: string) {
  const config = localeConfig[locale];
  return config.segment
    ? `/${config.segment}/games/${slug}/`
    : `/games/${slug}/`;
}

export function getGamesIndexPathForLanding(locale: LandingLocale | string) {
  return isGamesLocale(locale) ? getGamesIndexPath(locale) : "/games/";
}

export function localizeOwnGame(
  game: OwnGame,
  locale: GamesLocale,
): LocalizedOwnGame {
  const useZh = locale === "zh-CN";
  return {
    slug: game.slug,
    title: useZh ? game.name : game.nameEn,
    subtitle: useZh ? game.nameEn : game.name,
    description: useZh
      ? game.descriptionZh || game.description
      : game.description || game.descriptionZh,
    preview: game.preview,
    isNew: game.isNew,
    isVip: game.isVip,
    isFeatured: game.isFeatured,
  };
}

function buildChrome(
  locale: GamesLocale,
  path: string,
  languagePathFor: (item: GamesLocale) => string,
): GamesChrome {
  const config = localeConfig[locale];

  return {
    locale,
    path,
    homePath: config.homePath,
    gamesPath: getGamesIndexPath(locale),
    appsPath: "/apps/",
    updatedPath: "/apps/updated/",
    freePath: "/apps/free/",
    blogPath: getArticleIndexPathForLanding(locale),
    langAttr: config.langAttr,
    ogLocale: config.ogLocale,
    languages: supportedGamesLocales.map((item) => ({
      title: localeConfig[item].label,
      url: languagePathFor(item),
      locale: item,
      active: item === locale,
    })),
    alternatePaths: supportedGamesLocales.map((item) => ({
      hreflang: localeConfig[item].hreflang,
      path: languagePathFor(item),
    })),
    defaultPath: languagePathFor("en"),
    ui: gamesUiByLocale[locale],
  };
}

export function getGamesListPage(locale: GamesLocale): GamesListPage {
  const ui = gamesUiByLocale[locale];
  const games = ownGames.map((game) => localizeOwnGame(game, locale));

  return {
    ...buildChrome(locale, getGamesIndexPath(locale), getGamesIndexPath),
    title: ui.listMetaTitle,
    description: ui.listMetaDescription,
    games,
    exportedAt: ownGamesMeta.exportedAt,
  };
}

export function getGamesDetailPage(
  locale: GamesLocale,
  slug: string,
): GamesDetailPage | null {
  const raw = ownGames.find((game) => game.slug === slug);
  if (!raw) return null;

  const ui = gamesUiByLocale[locale];
  const game = localizeOwnGame(raw, locale);
  const related = ownGames
    .filter((item) => item.slug !== slug)
    .slice(0, 6)
    .map((item) => localizeOwnGame(item, locale));

  return {
    ...buildChrome(locale, getGamesPath(locale, slug), (item) =>
      getGamesPath(item, slug),
    ),
    title: `${game.title} ${ui.detailTitleSuffix}`,
    description:
      game.description || ui.detailDescriptionFallback(game.title),
    game,
    related,
    ogImage: game.preview || undefined,
  };
}

export function getLocalizedGamesIndexStaticPaths() {
  return supportedGamesLocales
    .filter((locale) => locale !== "en")
    .map((locale) => ({
      params: { locale: localeConfig[locale].segment },
      props: { page: getGamesListPage(locale) },
    }));
}

export function getLocalizedGamesDetailStaticPaths() {
  return supportedGamesLocales
    .filter((locale) => locale !== "en")
    .flatMap((locale) =>
      ownGames.map((game) => ({
        params: {
          locale: localeConfig[locale].segment,
          slug: game.slug,
        },
        props: { page: getGamesDetailPage(locale, game.slug)! },
      })),
    );
}
