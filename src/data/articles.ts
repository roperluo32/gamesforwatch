import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import type { LandingLocale } from "~/data/landing";

export type ArticleLocale = "en" | "zh-CN" | "ja" | "de";
export type ArticleEntry = CollectionEntry<"articles">;

interface ArticleLocaleConfig {
  segment: string;
  langAttr: string;
  ogLocale: string;
  label: string;
  hreflang: string;
  homePath: string;
}

export interface ArticleUi {
  eyebrow: string;
  title: string;
  description: string;
  homeLabel: string;
  blogLabel: string;
  languageLabel: string;
  storeLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  readArticleLabel: string;
  backToBlogLabel: string;
  updatedLabel: string;
  footerNote: string;
}

export interface ArticleListPage {
  locale: ArticleLocale;
  path: string;
  homePath: string;
  langAttr: string;
  ogLocale: string;
  title: string;
  description: string;
  languages: Array<{
    title: string;
    url: string;
    locale: ArticleLocale;
    active: boolean;
  }>;
  alternatePaths: Array<{ hreflang: string; path: string }>;
  defaultPath: string;
  articles: ArticleEntry[];
  ui: ArticleUi;
}

export interface ArticleDetailPage {
  entry: ArticleEntry;
  locale: ArticleLocale;
  path: string;
  homePath: string;
  blogPath: string;
  langAttr: string;
  ogLocale: string;
  languages: Array<{
    title: string;
    url: string;
    locale: ArticleLocale;
    active: boolean;
  }>;
  alternatePaths: Array<{ hreflang: string; path: string }>;
  defaultPath: string;
  relatedArticles: ArticleEntry[];
  ui: ArticleUi;
}

export const supportedArticleLocales: ArticleLocale[] = [
  "en",
  "zh-CN",
  "ja",
  "de",
];

const localeConfig: Record<ArticleLocale, ArticleLocaleConfig> = {
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
  de: {
    segment: "de",
    langAttr: "de",
    ogLocale: "de_DE",
    label: "DE",
    hreflang: "de",
    homePath: "/de/",
  },
};

export const articleUiByLocale: Record<ArticleLocale, ArticleUi> = {
  en: {
    eyebrow: "Blog",
    title: "Notes on Apple Watch games",
    description:
      "Short articles about watchOS mini games, design tradeoffs, offline play, and what makes a game feel good on the wrist.",
    homeLabel: "Home",
    blogLabel: "Blog",
    languageLabel: "Language",
    storeLabel: "App Store",
    emptyTitle: "Articles are coming soon",
    emptyDescription:
      "This language is ready for publishing. Add a Markdown file under src/content/articles/en to make it appear here.",
    readArticleLabel: "Read article",
    backToBlogLabel: "Back to blog",
    updatedLabel: "Updated",
    footerNote:
      "Games for Watch is the website brand. In the App Store, the app appears as GameHub - Mini Games for Watch.",
  },
  "zh-CN": {
    eyebrow: "博客",
    title: "Apple Watch 游戏与 watchOS 小游戏笔记",
    description:
      "记录 Apple Watch 小游戏、watchOS 交互、离线体验和手腕场景设计相关的文章。",
    homeLabel: "首页",
    blogLabel: "博客",
    languageLabel: "语言",
    storeLabel: "App Store",
    emptyTitle: "文章即将发布",
    emptyDescription:
      "这个语言入口已经准备好。把 Markdown 文件放到 src/content/articles/zh 就会显示在这里。",
    readArticleLabel: "阅读文章",
    backToBlogLabel: "返回博客",
    updatedLabel: "更新于",
    footerNote:
      "Games for Watch 是网站品牌；在 App Store 中，这个应用显示为 GameHub - Mini Games for Watch。",
  },
  ja: {
    eyebrow: "ブログ",
    title: "Apple Watchゲームのメモ",
    description:
      "watchOS向けミニゲーム、オフラインプレイ、手首で遊びやすい設計についての短い記事をまとめます。",
    homeLabel: "ホーム",
    blogLabel: "ブログ",
    languageLabel: "言語",
    storeLabel: "App Store",
    emptyTitle: "記事はまもなく公開されます",
    emptyDescription:
      "この言語の入口は準備済みです。src/content/articles/ja に Markdown を追加すると表示されます。",
    readArticleLabel: "記事を読む",
    backToBlogLabel: "ブログへ戻る",
    updatedLabel: "更新日",
    footerNote:
      "Games for Watch はWebサイト上のブランド名で、App Storeでは GameHub - Mini Games for Watch と表示されます。",
  },
  de: {
    eyebrow: "Blog",
    title: "Notizen zu Apple-Watch-Spielen",
    description:
      "Kurze Artikel über watchOS-Minispiele, Offline-Spiel, Interaktion und gutes Spieldesign am Handgelenk.",
    homeLabel: "Startseite",
    blogLabel: "Blog",
    languageLabel: "Sprache",
    storeLabel: "App Store",
    emptyTitle: "Artikel erscheinen bald",
    emptyDescription:
      "Dieser Sprachbereich ist vorbereitet. Lege Markdown-Dateien unter src/content/articles/de ab, damit sie hier erscheinen.",
    readArticleLabel: "Artikel lesen",
    backToBlogLabel: "Zurück zum Blog",
    updatedLabel: "Aktualisiert",
    footerNote:
      "Games for Watch ist die Website-Marke. Im App Store erscheint die App als GameHub - Mini Games for Watch.",
  },
};

export function isArticleLocale(
  locale: LandingLocale | string,
): locale is ArticleLocale {
  return supportedArticleLocales.includes(locale as ArticleLocale);
}

export function getArticleIndexPath(locale: ArticleLocale) {
  const config = localeConfig[locale];
  return config.segment ? `/${config.segment}/articles/` : "/articles/";
}

export function getArticlePath(locale: ArticleLocale, slug: string) {
  const config = localeConfig[locale];
  return config.segment
    ? `/${config.segment}/articles/${slug}/`
    : `/articles/${slug}/`;
}

export function getArticleIndexPathForLanding(locale: LandingLocale | string) {
  return isArticleLocale(locale) ? getArticleIndexPath(locale) : "/articles/";
}

function sortArticles(items: ArticleEntry[]) {
  return [...items].sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );
}

export async function getPublishedArticles() {
  return getCollection("articles", ({ data }) => !data.draft);
}

export async function getArticleListPage(
  locale: ArticleLocale,
): Promise<ArticleListPage> {
  const config = localeConfig[locale];
  const ui = articleUiByLocale[locale];
  const articles = sortArticles(
    (await getPublishedArticles()).filter(
      (item) => item.data.locale === locale,
    ),
  );

  return {
    locale,
    path: getArticleIndexPath(locale),
    homePath: config.homePath,
    langAttr: config.langAttr,
    ogLocale: config.ogLocale,
    title: `${ui.title} | Games for Watch`,
    description: ui.description,
    languages: supportedArticleLocales.map((item) => ({
      title: localeConfig[item].label,
      url: getArticleIndexPath(item),
      locale: item,
      active: item === locale,
    })),
    alternatePaths: supportedArticleLocales.map((item) => ({
      hreflang: localeConfig[item].hreflang,
      path: getArticleIndexPath(item),
    })),
    defaultPath: getArticleIndexPath("en"),
    articles,
    ui,
  };
}

export async function getArticleDetailPage(
  entry: ArticleEntry,
): Promise<ArticleDetailPage> {
  const locale = entry.data.locale;
  const config = localeConfig[locale];
  const allArticles = await getPublishedArticles();
  const translations = allArticles.filter(
    (item) => item.data.translationKey === entry.data.translationKey,
  );
  const relatedArticles = sortArticles(
    allArticles.filter(
      (item) =>
        item.data.locale === locale &&
        item.id !== entry.id &&
        item.data.translationKey !== entry.data.translationKey,
    ),
  ).slice(0, 3);

  return {
    entry,
    locale,
    path: getArticlePath(locale, entry.data.articleSlug),
    homePath: config.homePath,
    blogPath: getArticleIndexPath(locale),
    langAttr: config.langAttr,
    ogLocale: config.ogLocale,
    languages: translations.map((item) => ({
      title: localeConfig[item.data.locale].label,
      url: getArticlePath(item.data.locale, item.data.articleSlug),
      locale: item.data.locale,
      active: item.data.locale === locale,
    })),
    alternatePaths: translations.map((item) => ({
      hreflang: localeConfig[item.data.locale].hreflang,
      path: getArticlePath(item.data.locale, item.data.articleSlug),
    })),
    defaultPath: translations.find((item) => item.data.locale === "en")?.data
      .articleSlug
      ? getArticlePath(
          "en",
          translations.find((item) => item.data.locale === "en")!.data
            .articleSlug,
        )
      : getArticlePath(locale, entry.data.articleSlug),
    relatedArticles,
    ui: articleUiByLocale[locale],
  };
}

export async function getEnglishArticleIndexStaticPaths() {
  return [{ params: {}, props: { page: await getArticleListPage("en") } }];
}

export async function getLocalizedArticleIndexStaticPaths() {
  return Promise.all(
    supportedArticleLocales
      .filter((locale) => locale !== "en")
      .map(async (locale) => ({
        params: { locale: localeConfig[locale].segment },
        props: { page: await getArticleListPage(locale) },
      })),
  );
}

export async function getEnglishArticleStaticPaths() {
  const articles = await getPublishedArticles();
  return Promise.all(
    articles
      .filter((entry) => entry.data.locale === "en")
      .map(async (entry) => ({
        params: { slug: entry.data.articleSlug },
        props: { page: await getArticleDetailPage(entry) },
      })),
  );
}

export async function getLocalizedArticleStaticPaths() {
  const articles = await getPublishedArticles();
  return Promise.all(
    articles
      .filter((entry) => entry.data.locale !== "en")
      .map(async (entry) => ({
        params: {
          locale: localeConfig[entry.data.locale].segment,
          slug: entry.data.articleSlug,
        },
        props: { page: await getArticleDetailPage(entry) },
      })),
  );
}
