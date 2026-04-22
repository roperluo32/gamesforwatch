import type { LandingLocale } from "~/data/landing";
import { appStoreUrl } from "~/data/landing";

export const appStoreListingName = "GameHub - Mini Games for Watch";

export type GuideLocale = "en" | "zh-CN" | "ja" | "de";
export type GuideSlug =
  | "apple-watch-games"
  | "offline-apple-watch-games"
  | "watchos-games";

interface GuideReason {
  title: string;
  description: string;
  icon: string;
}

interface GuideFaq {
  question: string;
  answer: string;
}

interface GuideColumn {
  title: string;
  points: string[];
}

interface GuideImage {
  src: string;
  alt: string;
}

interface GuideUi {
  headerTagline: string;
  homeLabel: string;
  languageLabel: string;
  faqLabel: string;
  relatedNavLabel: string;
  storeLabel: string;
  searchIntentLabel: string;
  quickAnswerLabel: string;
  relatedTitle: string;
  relatedLead: string;
  footerNote: string;
  backHomeLabel: string;
  readGuideLabel: string;
}

interface GuideHubCopy {
  eyebrow: string;
  title: string;
  lead: string;
}

interface GuideContent {
  linkTitle: string;
  resourceDescription: string;
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  lead: string;
  bridgeNote: string;
  searchIntents: string[];
  quickAnswerTitle: string;
  quickAnswerBody: string[];
  reasonsTitle: string;
  reasonsLead: string;
  reasons: GuideReason[];
  examplesTitle: string;
  examplesLead: string;
  exampleGames: string[];
  experienceTitle: string;
  watchColumn: GuideColumn;
  phoneColumn: GuideColumn;
  faqTitle: string;
  faqs: GuideFaq[];
  ctaTitle: string;
  ctaLead: string;
}

interface LocaleConfig {
  segment: string;
  langAttr: string;
  ogLocale: string;
  label: string;
  hreflang: string;
  homePath: string;
}

interface GuideCatalogEntry {
  watchImage: { src: string; alt: Record<GuideLocale, string> };
  phoneImage: { src: string; alt: Record<GuideLocale, string> };
  locales: Record<GuideLocale, GuideContent>;
}

export interface GuidePage extends GuideContent {
  id: GuideSlug;
  locale: GuideLocale;
  path: string;
  homePath: string;
  langAttr: string;
  ogLocale: string;
  appStoreUrl: string;
  watchImage: GuideImage;
  phoneImage: GuideImage;
  languages: Array<{
    title: string;
    url: string;
    locale: GuideLocale;
    active: boolean;
  }>;
  alternatePaths: Array<{ hreflang: string; path: string }>;
  defaultPath: string;
  relatedGuides: Array<{ title: string; description: string; url: string }>;
  ui: GuideUi;
}

export const supportedGuideLocales: GuideLocale[] = ["en", "zh-CN", "ja", "de"];
export const guideSlugs: GuideSlug[] = [
  "apple-watch-games",
  "offline-apple-watch-games",
  "watchos-games",
];

const localeConfig: Record<GuideLocale, LocaleConfig> = {
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

const guideUiByLocale: Record<GuideLocale, GuideUi> = {
  en: {
    headerTagline: "watchOS mini game guides",
    homeLabel: "Home",
    languageLabel: "Language",
    faqLabel: "FAQ",
    relatedNavLabel: "More Guides",
    storeLabel: "App Store",
    searchIntentLabel: "Search intents",
    quickAnswerLabel: "Direct answer",
    relatedTitle: "Explore more guide pages",
    relatedLead:
      "These supporting pages cover nearby Apple Watch search intents and keep the guide cluster internally linked.",
    footerNote:
      "Games for Watch is the website brand. In the App Store, the app appears as GameHub - Mini Games for Watch.",
    backHomeLabel: "Back to homepage",
    readGuideLabel: "Read guide",
  },
  "zh-CN": {
    headerTagline: "watchOS 小游戏主题页",
    homeLabel: "首页",
    languageLabel: "语言",
    faqLabel: "常见问题",
    relatedNavLabel: "更多主题页",
    storeLabel: "App Store",
    searchIntentLabel: "对应搜索意图",
    quickAnswerLabel: "直接答案",
    relatedTitle: "继续看相关主题页",
    relatedLead: "这些页面覆盖相邻搜索意图，也让整组内容形成更清晰的内链关系。",
    footerNote:
      "Games for Watch 是网站品牌；在 App Store 中，这个应用显示为 GameHub - Mini Games for Watch。",
    backHomeLabel: "返回首页",
    readGuideLabel: "查看主题页",
  },
  ja: {
    headerTagline: "watchOS向けミニゲームガイド",
    homeLabel: "ホーム",
    languageLabel: "言語",
    faqLabel: "FAQ",
    relatedNavLabel: "関連ガイド",
    storeLabel: "App Store",
    searchIntentLabel: "想定検索語",
    quickAnswerLabel: "先に結論",
    relatedTitle: "関連するガイドを続けて見る",
    relatedLead:
      "近い検索意図を持つページ同士をつなげて、Apple Watch向けのガイド群として理解しやすくしています。",
    footerNote:
      "Games for Watch はWebサイト上のブランド名で、App Storeでは GameHub - Mini Games for Watch と表示されます。",
    backHomeLabel: "ホームへ戻る",
    readGuideLabel: "ガイドを見る",
  },
  de: {
    headerTagline: "watchOS-Minispiele Guide",
    homeLabel: "Startseite",
    languageLabel: "Sprache",
    faqLabel: "FAQ",
    relatedNavLabel: "Mehr Guides",
    storeLabel: "App Store",
    searchIntentLabel: "Suchintentionen",
    quickAnswerLabel: "Direkte Antwort",
    relatedTitle: "Weitere passende Guide-Seiten",
    relatedLead:
      "Diese Seiten decken benachbarte Apple-Watch-Suchanfragen ab und halten den internen Link-Cluster sauber verbunden.",
    footerNote:
      "Games for Watch ist die Website-Marke. Im App Store erscheint die App als GameHub - Mini Games for Watch.",
    backHomeLabel: "Zur Startseite",
    readGuideLabel: "Guide lesen",
  },
};

const guideHubCopyByLocale: Record<GuideLocale, GuideHubCopy> = {
  en: {
    eyebrow: "Guides",
    title: "Guides built around high-intent Apple Watch searches",
    lead: "These pages answer the questions people ask before they decide which Apple Watch game app to open or download.",
  },
  "zh-CN": {
    eyebrow: "主题页",
    title: "围绕高意图 Apple Watch 搜索词建立的内容页",
    lead: "这些页面用来承接用户在下载前最常搜索的几个问题，也顺手把站内内链结构补完整。",
  },
  ja: {
    eyebrow: "ガイド",
    title: "Apple Watchの高意図検索に合わせたガイド群",
    lead: "ダウンロード前に実際によく調べられる疑問へ答えるためのページを、内部リンク付きでまとめています。",
  },
  de: {
    eyebrow: "Guides",
    title: "Guides rund um konkrete Apple-Watch-Suchanfragen",
    lead: "Diese Seiten beantworten typische Fragen vor dem Download und geben der Website zugleich eine klarere interne Struktur.",
  },
};

const guideCatalog: Record<GuideSlug, GuideCatalogEntry> = {
  "apple-watch-games": {
    watchImage: {
      src: "/screenshots/watchos/2048.webp",
      alt: {
        en: "2048 running on Apple Watch inside Games for Watch",
        "zh-CN": "Games for Watch 中在 Apple Watch 上运行的 2048",
        ja: "Games for Watch でApple Watch上に表示された2048",
        de: "2048 auf der Apple Watch in Games for Watch",
      },
    },
    phoneImage: {
      src: "/screenshots/ios/游戏列表 1.webp",
      alt: {
        en: "Game list on iPhone inside Games for Watch",
        "zh-CN": "Games for Watch 在 iPhone 上的游戏列表",
        ja: "Games for Watch のiPhoneゲーム一覧",
        de: "Spielliste auf dem iPhone in Games for Watch",
      },
    },
    locales: {
      en: {
        linkTitle: "Apple Watch Games",
        resourceDescription:
          "The main guide for what makes an Apple Watch game feel right on the wrist.",
        title:
          "Apple Watch Games: quick mini games for watchOS | Games for Watch",
        description:
          "Looking for Apple Watch games? Games for Watch brings quick watchOS mini games like 2048, Tetris, Gomoku and Bubble Shooter, with offline-friendly play and iPhone support.",
        eyebrow: "Apple Watch Games Guide",
        headline: "Apple Watch games work best when they feel instant",
        lead: "Games for Watch is built around short, easy-to-restart mini games that make sense on the wrist. In the App Store, the app appears as GameHub - Mini Games for Watch.",
        bridgeNote:
          "Website brand: Games for Watch. App Store name: GameHub - Mini Games for Watch.",
        searchIntents: [
          "apple watch games",
          "games for apple watch",
          "mini games on apple watch",
        ],
        quickAnswerTitle: "Yes, Apple Watch games are real now",
        quickAnswerBody: [
          "The most useful Apple Watch games are simple enough to understand at a glance and fast enough to enjoy in a spare minute.",
          "Games for Watch packages familiar formats like 2048, Tetris, Gomoku and Bubble Shooter into one watchOS-first collection instead of treating the watch as an afterthought.",
        ],
        reasonsTitle: "Why this format fits Apple Watch",
        reasonsLead:
          "A good wrist game should start fast, pause easily and stay readable on a small screen.",
        reasons: [
          {
            title: "Short sessions first",
            description:
              "Puzzle and arcade rounds make more sense when you only have a minute or two.",
            icon: "mdi:timer-sand-complete",
          },
          {
            title: "Offline-friendly play",
            description:
              "Useful while commuting, waiting in line or whenever the watch is more convenient than the phone.",
            icon: "mdi:wifi-off",
          },
          {
            title: "iPhone as companion",
            description:
              "Use iPhone to browse the catalog and rankings while the watch stays focused on quick play.",
            icon: "mdi:devices",
          },
        ],
        examplesTitle: "Games that feel natural on the wrist",
        examplesLead:
          "The strongest fits are familiar mechanics with clear rules and fast restarts.",
        exampleGames: [
          "2048",
          "Tetris",
          "Gomoku",
          "Bubble Shooter",
          "Gold Miner",
          "Brick Breaker",
        ],
        experienceTitle: "How the two-device setup helps",
        watchColumn: {
          title: "On Apple Watch",
          points: [
            "Launch a round in seconds.",
            "Use the small screen for focused, bite-size play.",
            "Stop anytime without turning a short break into a long session.",
          ],
        },
        phoneColumn: {
          title: "On iPhone",
          points: [
            "Browse the full collection more comfortably.",
            "Check rankings and supporting screens on a larger display.",
            "Keep discovery and management off the watch when you want more context.",
          ],
        },
        faqTitle: "FAQ",
        faqs: [
          {
            question: "Can you really play games on Apple Watch?",
            answer:
              "Yes. Simple puzzle, board and arcade formats work especially well because they are easy to read and easy to resume.",
          },
          {
            question: "Is this only for the watch?",
            answer:
              "The product is watch-first, but it also uses iPhone as a companion for browsing the collection, rankings and other supporting screens.",
          },
          {
            question: "Which kinds of games fit Apple Watch best?",
            answer:
              "Short rounds, clear rules and low-friction controls usually fit best. Think 2048, Tetris, Gomoku and similar formats.",
          },
          {
            question: "Why do I see the name GameHub in the App Store?",
            answer:
              "Games for Watch is the website brand. The App Store listing currently uses the name GameHub - Mini Games for Watch.",
          },
        ],
        ctaTitle: "Start with the Apple Watch-first collection",
        ctaLead:
          "If you want one place to begin, Games for Watch is a practical entry point for quick watchOS mini games.",
      },
      "zh-CN": {
        linkTitle: "Apple Watch 游戏",
        resourceDescription:
          "主支柱页，解释什么样的 Apple Watch 游戏更适合手腕场景。",
        title:
          "Apple Watch 游戏：适合 watchOS 快速开玩的小游戏 | Games for Watch",
        description:
          "想找 Apple Watch 游戏？Games for Watch 提供适合手表快玩的 watchOS 小游戏，包括 2048、俄罗斯方块、五子棋、泡泡龙等，并支持离线友好体验与 iPhone 配合。",
        eyebrow: "Apple Watch 游戏指南",
        headline: "Apple Watch 游戏真正好玩，关键是足够快、足够直观",
        lead: "Games for Watch 围绕“抬腕就能开一局”的场景设计，优先选择适合短局和小屏的玩法。在 App Store 里，这个应用显示为 GameHub - Mini Games for Watch。",
        bridgeNote:
          "网站品牌是 Games for Watch；App Store 名称是 GameHub - Mini Games for Watch。",
        searchIntents: [
          "apple watch 游戏",
          "手表小游戏",
          "games for apple watch",
        ],
        quickAnswerTitle: "直接答案",
        quickAnswerBody: [
          "可以，Apple Watch 上已经有真正能玩的小游戏，但最适合的通常是规则简单、读屏快、随时能停下来的类型。",
          "Games for Watch 把 2048、俄罗斯方块、五子棋、泡泡龙这类熟悉玩法集中到一个 watchOS-first 的合集里，而不是把手机游戏生硬缩到手表上。",
        ],
        reasonsTitle: "为什么这类游戏适合手表",
        reasonsLead: "手腕场景更看重启动速度、阅读清晰度和中断成本。",
        reasons: [
          {
            title: "先保证短局成立",
            description: "只有一两分钟空档时，回合越短越容易真的玩起来。",
            icon: "mdi:timer-sand-complete",
          },
          {
            title: "离线友好更重要",
            description:
              "通勤、排队、等人时，手表往往比手机更顺手，离线友好就更有价值。",
            icon: "mdi:wifi-off",
          },
          {
            title: "iPhone 做补充而不是抢主场",
            description:
              "浏览列表、看排行交给手机，手表只保留最核心的快玩体验。",
            icon: "mdi:devices",
          },
        ],
        examplesTitle: "更适合 Apple Watch 的游戏类型",
        examplesLead:
          "规则熟悉、回合短、失败后能马上重开，通常更适合手腕场景。",
        exampleGames: [
          "2048",
          "俄罗斯方块",
          "五子棋",
          "泡泡龙",
          "黄金矿工",
          "打砖块",
        ],
        experienceTitle: "双端分工为什么更合理",
        watchColumn: {
          title: "Apple Watch 端",
          points: [
            "几秒内就能开始一局。",
            "小屏只承载最核心的游玩动作。",
            "想停就停，碎片时间也不会有压力。",
          ],
        },
        phoneColumn: {
          title: "iPhone 端",
          points: [
            "更适合看完整游戏列表。",
            "排行榜和补充界面会舒服很多。",
            "把需要更高信息密度的部分留给手机。",
          ],
        },
        faqTitle: "常见问题",
        faqs: [
          {
            question: "Apple Watch 上真的能玩游戏吗？",
            answer:
              "可以。最适合的是规则清楚、读屏压力低、几分钟就能结束一局的小游戏。",
          },
          {
            question: "是不是只能在手表上玩？",
            answer:
              "不是。它是手表优先，但也让 iPhone 承担浏览列表、查看排行和补充界面的角色。",
          },
          {
            question: "哪些玩法更适合 watchOS？",
            answer:
              "像 2048、俄罗斯方块、五子棋、泡泡龙这类短回合、低门槛、可快速重开的玩法，通常更适合。",
          },
          {
            question: "为什么在 App Store 里会看到 GameHub 这个名字？",
            answer:
              "Games for Watch 是网站品牌；当前 App Store 上使用的名称是 GameHub - Mini Games for Watch。",
          },
        ],
        ctaTitle: "从 Apple Watch-first 的合集开始",
        ctaLead:
          "如果你想先找一个靠谱入口，Games for Watch 是了解 Apple Watch 小游戏的一个直接起点。",
      },
      ja: {
        linkTitle: "Apple Watchゲーム",
        resourceDescription:
          "Apple Watchで遊びやすいゲームの条件をまとめた主ガイドです。",
        title:
          "Apple Watchゲーム: watchOSで遊びやすいミニゲーム | Games for Watch",
        description:
          "Apple Watchゲームを探していますか。Games for Watch は 2048、テトリス、五目並べ、バブルシューターなど、watchOSで短時間に遊びやすいミニゲームをまとめています。",
        eyebrow: "Apple Watchゲームガイド",
        headline: "Apple Watchゲームは、すぐ始められてすぐ区切れると強い",
        lead: "Games for Watch は、手首で短く遊べることを前提にしたミニゲーム集です。App Store では GameHub - Mini Games for Watch という名前で表示されます。",
        bridgeNote:
          "Webサイト上のブランドは Games for Watch、App Store上の名称は GameHub - Mini Games for Watch です。",
        searchIntents: [
          "apple watch games",
          "Apple Watchゲーム",
          "games for apple watch",
        ],
        quickAnswerTitle: "先に結論",
        quickAnswerBody: [
          "はい、Apple Watch でちゃんと遊べるゲームはあります。ただし相性が良いのは、ルールが分かりやすく短時間で一区切りつくタイプです。",
          "Games for Watch は 2048、テトリス、五目並べ、バブルシューターのような定番を、watchOS向けにまとまった入口として見つけやすくしています。",
        ],
        reasonsTitle: "Apple Watchに合う理由",
        reasonsLead: "手首の画面では、速さと分かりやすさが特に重要です。",
        reasons: [
          {
            title: "短いプレイ前提",
            description:
              "1〜2分の空き時間でも成立する形式のほうが、時計では自然に使えます。",
            icon: "mdi:timer-sand-complete",
          },
          {
            title: "オフライン寄りだと使いやすい",
            description:
              "移動中や待ち時間でも、接続状態を気にせず始めやすくなります。",
            icon: "mdi:wifi-off",
          },
          {
            title: "iPhoneは補助役に回す",
            description:
              "一覧やランキングはiPhone、短いプレイはApple Watchという分担が素直です。",
            icon: "mdi:devices",
          },
        ],
        examplesTitle: "Apple Watchで自然に遊べるジャンル",
        examplesLead: "短いラウンドで再開しやすい形式が向いています。",
        exampleGames: [
          "2048",
          "テトリス",
          "五目並べ",
          "バブルシューター",
          "Gold Miner",
          "Brick Breaker",
        ],
        experienceTitle: "Apple WatchとiPhoneの役割分担",
        watchColumn: {
          title: "Apple Watch側",
          points: [
            "数秒で1ラウンドを始めやすい。",
            "小さな画面でも集中しやすい遊びに向いている。",
            "途中でやめても負担が残りにくい。",
          ],
        },
        phoneColumn: {
          title: "iPhone側",
          points: [
            "ゲーム一覧をまとめて見やすい。",
            "ランキングや補助画面を広い画面で確認できる。",
            "情報量の多い部分を無理に時計へ載せなくて済む。",
          ],
        },
        faqTitle: "FAQ",
        faqs: [
          {
            question: "Apple Watchで本当にゲームを遊べますか？",
            answer:
              "はい。特に、パズルやボード系、短いアーケード系のように、状態をすぐ把握できる形式が向いています。",
          },
          {
            question: "Apple Watch専用ですか？",
            answer:
              "時計での短時間プレイが中心ですが、一覧の確認やランキングなどはiPhone側でも補えます。",
          },
          {
            question: "watchOSに向くゲームはどんなタイプですか？",
            answer:
              "2048、テトリス、五目並べのように、ルールがすぐ分かって何度も再開しやすいタイプです。",
          },
          {
            question: "なぜApp StoreではGameHubという名前が見えるのですか？",
            answer:
              "Games for Watch はWebサイトのブランド名で、App Storeでは GameHub - Mini Games for Watch が現在の表示名です。",
          },
        ],
        ctaTitle: "Apple Watchファーストの入口から始める",
        ctaLead:
          "Apple Watch向けミニゲームをまとめて把握したいなら、Games for Watch は最初の入口として使いやすいページです。",
      },
      de: {
        linkTitle: "Apple Watch Spiele",
        resourceDescription:
          "Die zentrale Guide-Seite dafür, was auf der Apple Watch wirklich gut funktioniert.",
        title:
          "Apple Watch Spiele: schnelle Minispiele für watchOS | Games for Watch",
        description:
          "Du suchst Apple Watch Spiele? Games for Watch bündelt kurze watchOS-Minispiele wie 2048, Tetris, Gomoku und Bubble Shooter, mit iPhone-Begleitung und offlinefreundlichem Spielgefühl.",
        eyebrow: "Apple Watch Spiele Guide",
        headline:
          "Apple Watch Spiele funktionieren am besten, wenn sie sofort verständlich sind",
        lead: "Games for Watch setzt auf kurze, leicht neu startbare Minispiele, die am Handgelenk Sinn ergeben. Im App Store erscheint die App unter dem Namen GameHub - Mini Games for Watch.",
        bridgeNote:
          "Website-Marke: Games for Watch. Name im App Store: GameHub - Mini Games for Watch.",
        searchIntents: [
          "apple watch spiele",
          "apple watch games",
          "games for apple watch",
        ],
        quickAnswerTitle: "Direkte Antwort",
        quickAnswerBody: [
          "Ja, auf der Apple Watch lassen sich echte Minispiele spielen. Besonders gut funktionieren Formate mit klaren Regeln und kurzen Runden.",
          "Games for Watch bündelt bekannte Spieltypen wie 2048, Tetris, Gomoku und Bubble Shooter in einer watchOS-first Sammlung, statt die Uhr nur als Nebenplattform zu behandeln.",
        ],
        reasonsTitle: "Warum dieses Format zur Apple Watch passt",
        reasonsLead:
          "Am Handgelenk zählen Startgeschwindigkeit, Übersicht und leichte Unterbrechbarkeit.",
        reasons: [
          {
            title: "Kurze Sessions zuerst",
            description:
              "Puzzle- und Arcade-Runden passen besser, wenn nur ein bis zwei Minuten frei sind.",
            icon: "mdi:timer-sand-complete",
          },
          {
            title: "Offlinefreundlich ist wertvoll",
            description:
              "Gerade unterwegs, in Wartesituationen oder zwischendurch ist die Uhr oft schneller zur Hand als das iPhone.",
            icon: "mdi:wifi-off",
          },
          {
            title: "iPhone als Begleiter",
            description:
              "Liste, Rankings und mehr Kontext passen besser aufs iPhone, während die Uhr beim schnellen Spielen bleibt.",
            icon: "mdi:devices",
          },
        ],
        examplesTitle: "Spiele, die sich am Handgelenk natürlich anfühlen",
        examplesLead:
          "Bekannte Mechaniken mit klaren Regeln und schnellem Neustart sind meist die beste Wahl.",
        exampleGames: [
          "2048",
          "Tetris",
          "Gomoku",
          "Bubble Shooter",
          "Gold Miner",
          "Brick Breaker",
        ],
        experienceTitle: "Warum die Zwei-Geräte-Aufteilung hilft",
        watchColumn: {
          title: "Auf der Apple Watch",
          points: [
            "Eine Runde in wenigen Sekunden starten.",
            "Den kleinen Bildschirm für fokussiertes Kurzspiel nutzen.",
            "Jederzeit wieder stoppen, ohne dass die Pause zu lang wird.",
          ],
        },
        phoneColumn: {
          title: "Auf dem iPhone",
          points: [
            "Die komplette Sammlung bequemer durchsehen.",
            "Rankings und Hilfsansichten größer betrachten.",
            "Mehr Kontext bekommen, ohne die Uhr zu überladen.",
          ],
        },
        faqTitle: "FAQ",
        faqs: [
          {
            question: "Kann man auf der Apple Watch wirklich Spiele spielen?",
            answer:
              "Ja. Besonders gut funktionieren Puzzle-, Brett- und Arcade-Formate, die schnell lesbar und leicht fortzusetzen sind.",
          },
          {
            question: "Ist das nur für die Uhr gedacht?",
            answer:
              "Die Nutzung ist watch-first, aber das iPhone dient als Begleiter für Sammlung, Rankings und zusätzliche Ansichten.",
          },
          {
            question: "Welche Spieltypen passen am besten zur Apple Watch?",
            answer:
              "Kurze Runden mit klaren Regeln, zum Beispiel 2048, Tetris, Gomoku oder ähnliche Formate.",
          },
          {
            question: "Warum sehe ich im App Store den Namen GameHub?",
            answer:
              "Games for Watch ist die Website-Marke. Im App Store lautet der aktuelle Name GameHub - Mini Games for Watch.",
          },
        ],
        ctaTitle: "Mit der Apple-Watch-first Sammlung beginnen",
        ctaLead:
          "Wenn du einen klaren Startpunkt suchst, ist Games for Watch ein praktischer Einstieg in watchOS-Minispiele.",
      },
    },
  },
  "offline-apple-watch-games": {
    watchImage: {
      src: "/screenshots/watchos/五子棋.webp",
      alt: {
        en: "Gomoku running on Apple Watch inside Games for Watch",
        "zh-CN": "Games for Watch 中在 Apple Watch 上运行的五子棋",
        ja: "Games for Watch でApple Watch上に表示された五目並べ",
        de: "Gomoku auf der Apple Watch in Games for Watch",
      },
    },
    phoneImage: {
      src: "/screenshots/ios/2048.webp",
      alt: {
        en: "2048 on iPhone inside Games for Watch",
        "zh-CN": "Games for Watch 在 iPhone 上的 2048",
        ja: "Games for Watch のiPhone版2048",
        de: "2048 auf dem iPhone in Games for Watch",
      },
    },
    locales: {
      en: {
        linkTitle: "Offline Apple Watch Games",
        resourceDescription:
          "Why offline-friendly play matters on Apple Watch and what to look for.",
        title:
          "Offline Apple Watch Games: quick play without a connection | Games for Watch",
        description:
          "Need offline Apple Watch games? Games for Watch focuses on quick watchOS mini games that are easy to open during commuting, waiting or other low-connection moments.",
        eyebrow: "Offline Apple Watch Games",
        headline:
          "Offline Apple Watch games matter because the watch is often your fastest screen",
        lead: "When you just want a quick round on the wrist, waiting for a strong connection ruins the point. Games for Watch highlights mini games that stay useful in offline-friendly situations.",
        bridgeNote:
          "Games for Watch is the website brand. In the App Store, the app appears as GameHub - Mini Games for Watch.",
        searchIntents: [
          "offline apple watch games",
          "apple watch games offline",
          "best apple watch games offline",
        ],
        quickAnswerTitle: "Offline-friendly beats always-online",
        quickAnswerBody: [
          "For Apple Watch play, instant access matters more than deep online features. Offline-friendly mini games fit commuting, queues, short breaks and travel much better than games that need a constant connection.",
          "Games for Watch keeps the experience centered on short, replayable formats, while broader features like browsing and rankings can live on the companion iPhone experience.",
        ],
        reasonsTitle: "What to look for in offline Apple Watch games",
        reasonsLead:
          "The best offline-friendly titles still feel complete even when the online layer becomes secondary.",
        reasons: [
          {
            title: "Fast launch with no setup",
            description:
              "A watch game should still be useful when you only have a brief spare moment.",
            icon: "mdi:rocket-launch-outline",
          },
          {
            title: "Readable mechanics",
            description:
              "Clear rules like number merging, falling blocks or board play are easier to enjoy offline on a small screen.",
            icon: "mdi:text-box-search-outline",
          },
          {
            title: "Optional online extras",
            description:
              "Leaderboards and sync can stay secondary; the core round should still feel complete without them.",
            icon: "mdi:cloud-check-outline",
          },
        ],
        examplesTitle: "Formats that hold up offline",
        examplesLead:
          "Short puzzle and arcade loops are usually the safest bet.",
        exampleGames: [
          "2048",
          "Gomoku",
          "Tetris",
          "Bubble Shooter",
          "Sokoban",
          "Gold Miner",
        ],
        experienceTitle: "What offline-friendly usually means",
        watchColumn: {
          title: "Core play on the watch",
          points: [
            "Start a round quickly during commuting or waiting.",
            "Keep the interaction light and easy to pause.",
            "Rely on self-contained game rules instead of live events.",
          ],
        },
        phoneColumn: {
          title: "Online extras on iPhone",
          points: [
            "Use the larger screen when you want rankings or broader browsing.",
            "Let the phone handle supporting context rather than forcing it into every watch session.",
            "Keep the watch experience simple even when the product includes companion features.",
          ],
        },
        faqTitle: "FAQ",
        faqs: [
          {
            question: "Do offline Apple Watch games need Wi-Fi?",
            answer:
              "Offline-friendly core gameplay should not depend on a strong live connection. That is the main reason people look for this category.",
          },
          {
            question: "Are leaderboards part of offline play?",
            answer:
              "Not really. Leaderboards are usually an online bonus layer, while offline play is about whether the main round still works when you just want to start immediately.",
          },
          {
            question: "Why is offline such a big deal on Apple Watch?",
            answer:
              "Because the watch shines in spontaneous moments: commuting, queues, waiting rooms or short breaks where speed matters more than depth.",
          },
          {
            question: "Is Games for Watch the same app as GameHub?",
            answer:
              "Yes. Games for Watch is the website brand, and the App Store listing currently appears as GameHub - Mini Games for Watch.",
          },
        ],
        ctaTitle: "Try the collection built for quick wrist sessions",
        ctaLead:
          "If you care more about instant play than complicated setup, Games for Watch is a sensible place to start.",
      },
      "zh-CN": {
        linkTitle: "离线 Apple Watch 游戏",
        resourceDescription: "解释为什么离线友好对 Apple Watch 游戏尤其重要。",
        title: "离线 Apple Watch 游戏：没有网络也能快速开玩 | Games for Watch",
        description:
          "想找离线 Apple Watch 游戏？Games for Watch 更强调适合通勤、排队、等待等场景的 watchOS 小游戏，让手表上的一局开始得更快。",
        eyebrow: "离线 Apple Watch 游戏",
        headline: "离线友好很重要，因为 Apple Watch 往往是你最顺手的那块屏幕",
        lead: "如果只是想抬腕玩一小局，却还得等网络、等加载，Apple Watch 游戏的价值就会被削弱。Games for Watch 更强调能在离线友好场景里快速开玩的小游戏。",
        bridgeNote:
          "Games for Watch 是网站品牌；在 App Store 中，这个应用显示为 GameHub - Mini Games for Watch。",
        searchIntents: [
          "离线 apple watch 游戏",
          "offline apple watch games",
          "apple watch games offline",
        ],
        quickAnswerTitle: "为什么离线友好比一直联网更重要",
        quickAnswerBody: [
          "对 Apple Watch 来说，最有价值的往往不是重社交或长流程，而是不用准备太多就能马上开始的一小局。",
          "Games for Watch 把核心体验放在短局、可重玩、容易暂停的玩法上；更适合联网展示的排行榜和浏览部分，则交给 iPhone 端去承接。",
        ],
        reasonsTitle: "判断离线手表游戏是否靠谱的几个信号",
        reasonsLead:
          "真正适合离线场景的玩法，应该在没有网络时依然保有完整的一局体验。",
        reasons: [
          {
            title: "不用复杂准备",
            description: "通勤、排队、等人的场景里，启动越快越重要。",
            icon: "mdi:rocket-launch-outline",
          },
          {
            title: "规则清楚",
            description:
              "数字、方块、棋盘、消除这类玩法，在小屏和离线场景里通常更稳。",
            icon: "mdi:text-box-search-outline",
          },
          {
            title: "在线功能是加分项，不该是前提",
            description: "排行榜和同步可以存在，但核心一局最好不要依赖它们。",
            icon: "mdi:cloud-check-outline",
          },
        ],
        examplesTitle: "离线场景更容易成立的玩法",
        examplesLead: "短回合和自解释规则，通常最适合手表上的离线游玩。",
        exampleGames: [
          "2048",
          "五子棋",
          "俄罗斯方块",
          "泡泡龙",
          "推箱子",
          "黄金矿工",
        ],
        experienceTitle: "离线友好通常意味着什么",
        watchColumn: {
          title: "手表上的核心一局",
          points: [
            "通勤或等待时可以快速开玩。",
            "操作要轻，暂停也要轻。",
            "靠自成体系的游戏规则完成主要体验。",
          ],
        },
        phoneColumn: {
          title: "手机上的补充信息",
          points: [
            "想看排行或更多列表时，再切到大屏更舒服。",
            "把需要联网的补充信息留给 iPhone，更符合设备分工。",
            "即使有双端功能，手表这一局也不该被打断。",
          ],
        },
        faqTitle: "常见问题",
        faqs: [
          {
            question: "离线 Apple Watch 游戏需要 Wi-Fi 吗？",
            answer:
              "理想状态下，核心游玩不应该依赖稳定网络，这也是用户会特别搜索“离线 Apple Watch 游戏”的原因。",
          },
          {
            question: "排行榜算离线体验的一部分吗？",
            answer:
              "不算。排行榜通常属于联网加分项，而离线体验指的是你能不能直接开始并完整玩完一局。",
          },
          {
            question: "为什么 Apple Watch 更需要离线友好？",
            answer:
              "因为手表最有价值的场景往往是临时空档，例如通勤、排队、等人、休息几分钟，这时速度比复杂度更重要。",
          },
          {
            question: "Games for Watch 和 GameHub 是同一个应用吗？",
            answer:
              "是同一个应用。Games for Watch 是网站品牌，而 App Store 当前显示的名称是 GameHub - Mini Games for Watch。",
          },
        ],
        ctaTitle: "试试这组更适合快玩场景的小游戏",
        ctaLead:
          "如果你更在意“马上能玩”，而不是复杂设置，Games for Watch 会是一个更顺手的起点。",
      },
      ja: {
        linkTitle: "オフラインApple Watchゲーム",
        resourceDescription:
          "なぜオフライン寄りの設計がApple Watchで重要なのかを整理したページです。",
        title: "オフラインで遊べるApple Watchゲーム | Games for Watch",
        description:
          "オフライン寄りのApple Watchゲームを探していますか。Games for Watch は、移動中や待ち時間でも始めやすい watchOS ミニゲームに向いた構成です。",
        eyebrow: "オフラインApple Watchゲーム",
        headline:
          "オフライン向きかどうかで、Apple Watchゲームの使いやすさは大きく変わる",
        lead: "手首で少し遊びたいだけなのに、接続待ちや読み込み待ちが入ると魅力が下がります。Games for Watch は、そうした場面でも始めやすい短いミニゲームを軸にしています。",
        bridgeNote:
          "Games for Watch はWebサイトのブランド名で、App Storeでは GameHub - Mini Games for Watch と表示されます。",
        searchIntents: [
          "offline apple watch games",
          "Apple Watch オフライン ゲーム",
          "apple watch games offline",
        ],
        quickAnswerTitle: "常時オンラインより、すぐ遊べることが大切",
        quickAnswerBody: [
          "Apple Watchでは、深いオンライン要素よりも、思い立った瞬間に1ラウンド始められることのほうが価値になりやすいです。",
          "Games for Watch は短く繰り返し遊びやすい形式を中心にし、一覧やランキングのような補助的な情報はiPhone側で支える形に寄せています。",
        ],
        reasonsTitle: "オフライン寄りのApple Watchゲームで見るべき点",
        reasonsLead:
          "接続が主役ではなく、コアの1ラウンドが主役であることが大切です。",
        reasons: [
          {
            title: "準備なしで始めやすい",
            description:
              "移動中や待ち時間では、起動の速さがそのまま使いやすさになります。",
            icon: "mdi:rocket-launch-outline",
          },
          {
            title: "ルールが読み取りやすい",
            description:
              "数字、落ちもの、盤面系のような明快な形式は、小さな画面でも安定します。",
            icon: "mdi:text-box-search-outline",
          },
          {
            title: "オンライン要素は補助でよい",
            description:
              "ランキングや同期があってもよいですが、中心の遊びはそれなしで成立してほしいところです。",
            icon: "mdi:cloud-check-outline",
          },
        ],
        examplesTitle: "オフラインでも相性が良い形式",
        examplesLead: "短いループと自明なルールを持つ形式が向いています。",
        exampleGames: [
          "2048",
          "五目並べ",
          "テトリス",
          "バブルシューター",
          "倉庫番",
          "Gold Miner",
        ],
        experienceTitle: "オフライン寄りとはどういうことか",
        watchColumn: {
          title: "時計側のコア体験",
          points: [
            "移動中や待ち時間にすぐ1ラウンド始めやすい。",
            "操作を軽くして、途中でも区切りやすい。",
            "ライブイベントより、自立したルールを優先する。",
          ],
        },
        phoneColumn: {
          title: "iPhone側の補助情報",
          points: [
            "ランキングや一覧は大きな画面で確認しやすい。",
            "時計の短時間プレイを邪魔せずに周辺情報を持てる。",
            "連携機能があっても、時計側はシンプルなまま保ちやすい。",
          ],
        },
        faqTitle: "FAQ",
        faqs: [
          {
            question: "オフラインのApple WatchゲームにWi-Fiは必要ですか？",
            answer:
              "コアの遊びがオフライン寄りであるなら、強い接続は前提になりません。そこがこのカテゴリの重要な条件です。",
          },
          {
            question: "ランキングもオフライン体験に含まれますか？",
            answer:
              "通常は別です。ランキングはオンラインの付加価値で、オフライン体験はまず1ラウンドがすぐ成立するかどうかを指します。",
          },
          {
            question: "なぜApple Watchではオフライン寄りが大事なのですか？",
            answer:
              "Apple Watchは、移動中や待ち時間のような突発的な短い時間で最も便利だからです。そこで待ち時間が増えると価値が下がります。",
          },
          {
            question: "Games for Watch と GameHub は同じアプリですか？",
            answer:
              "はい。同じアプリです。Games for Watch はWebサイトのブランド名で、App Storeでは GameHub - Mini Games for Watch と表示されています。",
          },
        ],
        ctaTitle: "短い手首セッション向けのコレクションを見る",
        ctaLead:
          "接続よりも“すぐ遊べること”を重視するなら、Games for Watch は試しやすい入口です。",
      },
      de: {
        linkTitle: "Offline Apple Watch Spiele",
        resourceDescription:
          "Warum offlinefreundliches Spielen auf der Apple Watch besonders wichtig ist.",
        title:
          "Offline Apple Watch Spiele: schnell spielen ohne Verbindung | Games for Watch",
        description:
          "Du suchst Offline Apple Watch Spiele? Games for Watch konzentriert sich auf kurze watchOS-Minispiele, die sich beim Pendeln, Warten oder in anderen Momenten mit wenig Verbindung schnell starten lassen.",
        eyebrow: "Offline Apple Watch Spiele",
        headline:
          "Offlinefreundliche Apple Watch Spiele sind wichtig, weil die Uhr oft dein schnellster Bildschirm ist",
        lead: "Wenn du am Handgelenk nur kurz eine Runde spielen willst, zerstört Warten auf eine starke Verbindung den eigentlichen Vorteil. Games for Watch betont kurze Minispiele, die sich auch in offlinefreundlichen Situationen gut anfühlen.",
        bridgeNote:
          "Games for Watch ist die Website-Marke. Im App Store erscheint die App als GameHub - Mini Games for Watch.",
        searchIntents: [
          "offline apple watch spiele",
          "offline apple watch games",
          "apple watch games offline",
        ],
        quickAnswerTitle:
          "Offlinefreundlich ist oft besser als permanent online",
        quickAnswerBody: [
          "Auf der Apple Watch zählt sofortiger Zugang mehr als tiefe Online-Features. Offlinefreundliche Minispiele passen deutlich besser zu Pendeln, Warteschlangen, kurzen Pausen und Reisen.",
          "Games for Watch richtet sich auf kurze, wiederholbare Formate aus, während Listen, Rankings und mehr Kontext auf dem begleitenden iPhone liegen können.",
        ],
        reasonsTitle:
          "Worauf du bei Offline Apple Watch Spielen achten solltest",
        reasonsLead:
          "Das beste offlinefreundliche Spiel fühlt sich auch dann vollständig an, wenn die Online-Schicht nur noch Zusatz ist.",
        reasons: [
          {
            title: "Schnell starten, ohne Vorbereitung",
            description:
              "Ein Uhr-Spiel sollte auch dann nützlich sein, wenn nur ein sehr kurzes Zeitfenster frei ist.",
            icon: "mdi:rocket-launch-outline",
          },
          {
            title: "Gut lesbare Mechaniken",
            description:
              "Klare Regeln wie Zahlenfelder, Fallblöcke oder Brettlogik funktionieren offline auf kleinem Bildschirm besser.",
            icon: "mdi:text-box-search-outline",
          },
          {
            title: "Online-Extras bleiben optional",
            description:
              "Rankings und Sync dürfen Zusatz sein; die eigentliche Runde sollte auch ohne sie stimmig bleiben.",
            icon: "mdi:cloud-check-outline",
          },
        ],
        examplesTitle: "Formate, die offline gut tragen",
        examplesLead:
          "Kurze Puzzle- und Arcade-Schleifen sind meist die sicherste Wahl.",
        exampleGames: [
          "2048",
          "Gomoku",
          "Tetris",
          "Bubble Shooter",
          "Sokoban",
          "Gold Miner",
        ],
        experienceTitle: "Was offlinefreundlich hier meistens bedeutet",
        watchColumn: {
          title: "Kernspiel auf der Uhr",
          points: [
            "Schnell eine Runde beim Pendeln oder Warten starten.",
            "Die Interaktion leicht und gut pausierbar halten.",
            "Sich auf geschlossene Spielregeln statt Live-Events stützen.",
          ],
        },
        phoneColumn: {
          title: "Online-Extras auf dem iPhone",
          points: [
            "Rankings oder weitere Listen auf dem größeren Bildschirm nutzen.",
            "Begleitkontext aufs iPhone legen, statt jede Uhr-Session zu überladen.",
            "Die Uhr einfach halten, auch wenn es Zusatzfunktionen gibt.",
          ],
        },
        faqTitle: "FAQ",
        faqs: [
          {
            question: "Brauchen Offline Apple Watch Spiele WLAN?",
            answer:
              "Offlinefreundliches Kernspiel sollte nicht von einer starken Live-Verbindung abhängen. Genau deshalb suchen Nutzer nach dieser Kategorie.",
          },
          {
            question: "Gehören Rankings zum Offline-Spiel?",
            answer:
              "Eher nicht. Rankings sind meist ein Online-Zusatz, während Offline-Spiel bedeutet, dass die Haupt-Runde direkt und vollständig spielbar bleibt.",
          },
          {
            question: "Warum ist Offline auf der Apple Watch so wichtig?",
            answer:
              "Weil die Uhr in spontanen Momenten glänzt: beim Pendeln, in Warteschlangen, im Wartezimmer oder in kurzen Pausen, in denen Tempo wichtiger ist als Tiefe.",
          },
          {
            question: "Sind Games for Watch und GameHub dieselbe App?",
            answer:
              "Ja. Games for Watch ist die Website-Marke, während der aktuelle App-Store-Name GameHub - Mini Games for Watch lautet.",
          },
        ],
        ctaTitle: "Die Sammlung für kurze Sessions am Handgelenk testen",
        ctaLead:
          "Wenn dir sofortiges Spielen wichtiger ist als komplizierte Vorbereitung, ist Games for Watch ein sinnvoller Startpunkt.",
      },
    },
  },
  "watchos-games": {
    watchImage: {
      src: "/screenshots/watchos/俄罗斯方块.webp",
      alt: {
        en: "Tetris running on Apple Watch inside Games for Watch",
        "zh-CN": "Games for Watch 中在 Apple Watch 上运行的俄罗斯方块",
        ja: "Games for Watch でApple Watch上に表示されたテトリス",
        de: "Tetris auf der Apple Watch in Games for Watch",
      },
    },
    phoneImage: {
      src: "/screenshots/ios/俄罗斯方块.webp",
      alt: {
        en: "Tetris on iPhone inside Games for Watch",
        "zh-CN": "Games for Watch 在 iPhone 上的俄罗斯方块",
        ja: "Games for Watch のiPhone版テトリス",
        de: "Tetris auf dem iPhone in Games for Watch",
      },
    },
    locales: {
      en: {
        linkTitle: "watchOS Games",
        resourceDescription:
          "What makes a good watchOS game and why short formats work best.",
        title:
          "watchOS Games: mini games that fit Apple Watch | Games for Watch",
        description:
          "Explore watchOS games built for fast, readable play. Games for Watch brings quick mini games to Apple Watch with a companion iPhone experience for browsing and rankings.",
        eyebrow: "watchOS Games Guide",
        headline: "watchOS games win when they respect the wrist",
        lead: "Good watchOS games are not just shrunken phone games. They are fast to read, simple to control and easy to leave at any moment. That is the design direction behind Games for Watch.",
        bridgeNote:
          "Games for Watch is the website brand. The App Store listing currently uses the name GameHub - Mini Games for Watch.",
        searchIntents: [
          "watchos games",
          "best watchos games",
          "games for watchos",
        ],
        quickAnswerTitle:
          "watchOS games should feel lightweight, not compromised",
        quickAnswerBody: [
          "Apple Watch works best with mechanics you can understand quickly and return to often. Small puzzle, arcade and board formats tend to outperform anything that demands long sessions or dense interface layers.",
          "Games for Watch follows that logic by pairing a watch-first game loop with an iPhone companion for fuller browsing and supporting screens.",
        ],
        reasonsTitle: "Signals of a strong watchOS game",
        reasonsLead: "The platform rewards clarity more than raw depth.",
        reasons: [
          {
            title: "Readable at a glance",
            description:
              "Rules and states should stay clear on a small display.",
            icon: "mdi:eye-outline",
          },
          {
            title: "Easy to resume",
            description:
              "watchOS play works better when each round can stop and restart cleanly.",
            icon: "mdi:refresh-auto",
          },
          {
            title: "Companion support where it helps",
            description:
              "Use iPhone for the pieces that benefit from space, like browsing, rankings and discovery.",
            icon: "mdi:cellphone-link",
          },
        ],
        examplesTitle: "Game types that fit watchOS best",
        examplesLead:
          "Short loops and clear boards translate better than cluttered interfaces.",
        exampleGames: [
          "2048",
          "Tetris",
          "Gomoku",
          "Bubble Shooter",
          "Gold Miner",
          "Soccer Star",
        ],
        experienceTitle: "How Games for Watch splits the job",
        watchColumn: {
          title: "watchOS side",
          points: [
            "Keep the core round on the wrist.",
            "Favor quick taps and glanceable progress.",
            "Make each session feel complete in a minute or two.",
          ],
        },
        phoneColumn: {
          title: "iPhone side",
          points: [
            "Use the larger screen for exploring more games.",
            "Handle broader browsing and supporting screens comfortably.",
            "Give the product more depth without overloading the watch.",
          ],
        },
        faqTitle: "FAQ",
        faqs: [
          {
            question: "What makes a good watchOS game?",
            answer:
              "A good watchOS game is quick to read, easy to restart and clear enough to enjoy on a small screen without heavy setup.",
          },
          {
            question: "Are watchOS games different from iPhone mini games?",
            answer:
              "Usually yes. The watch is better for short, focused sessions, while iPhone can carry fuller browsing, settings or ranking context.",
          },
          {
            question: "Can watchOS games still use iPhone as a companion?",
            answer:
              "Absolutely. That split often makes the overall experience better, because each device handles the part it is best at.",
          },
          {
            question: "Why does the app show GameHub in the App Store?",
            answer:
              "Games for Watch is the website brand. The App Store listing currently uses GameHub - Mini Games for Watch.",
          },
        ],
        ctaTitle: "Explore the watchOS-first collection",
        ctaLead:
          "If you want mini games that feel at home on Apple Watch, Games for Watch gives you a practical place to begin.",
      },
      "zh-CN": {
        linkTitle: "watchOS 游戏",
        resourceDescription: "解释什么样的设计更适合 watchOS 游戏。",
        title:
          "watchOS 游戏：真正适合 Apple Watch 的小游戏长什么样 | Games for Watch",
        description:
          "了解什么样的 watchOS 游戏更适合 Apple Watch。Games for Watch 以手表优先的方式组织小游戏，并让 iPhone 负责更完整的浏览与排行体验。",
        eyebrow: "watchOS 游戏指南",
        headline:
          "好的 watchOS 游戏，不是缩小版手机游戏，而是尊重手腕场景的玩法",
        lead: "watchOS 游戏最怕信息太挤、流程太长、操作太重。Games for Watch 选择的是更轻、更清楚、更容易随时停下来的方向。",
        bridgeNote:
          "Games for Watch 是网站品牌；App Store 当前使用的名称是 GameHub - Mini Games for Watch。",
        searchIntents: ["watchos 游戏", "watchos games", "apple watch 游戏"],
        quickAnswerTitle: "watchOS 游戏应该轻，不应该勉强",
        quickAnswerBody: [
          "Apple Watch 更适合规则清晰、状态一眼可懂、几分钟就能完成一局的玩法。",
          "Games for Watch 的思路，是让手表承担快玩的那一面，再用 iPhone 去承接更完整的浏览、排行和补充界面。",
        ],
        reasonsTitle: "好 watchOS 游戏的几个信号",
        reasonsLead: "这个平台更奖励清晰度，而不是复杂度。",
        reasons: [
          {
            title: "一眼就懂当前状态",
            description: "小屏上信息越清楚，游戏越容易成立。",
            icon: "mdi:eye-outline",
          },
          {
            title: "随时可以中断并继续",
            description: "手表上的一局最好能轻松停下，再顺手接着玩。",
            icon: "mdi:refresh-auto",
          },
          {
            title: "需要更多信息量的部分交给 iPhone",
            description: "浏览、排行和更多说明放到手机端，更符合设备分工。",
            icon: "mdi:cellphone-link",
          },
        ],
        examplesTitle: "更适合 watchOS 的游戏类型",
        examplesLead: "短循环、清规则、低负担，通常更匹配手表。",
        exampleGames: [
          "2048",
          "俄罗斯方块",
          "五子棋",
          "泡泡龙",
          "黄金矿工",
          "足球之星",
        ],
        experienceTitle: "Games for Watch 怎么分配手表与手机的角色",
        watchColumn: {
          title: "watchOS 端",
          points: [
            "把最核心的一局放在手腕上。",
            "优先快速点击和一眼可懂的进度。",
            "让一次游玩在几分钟内也能成立。",
          ],
        },
        phoneColumn: {
          title: "iPhone 端",
          points: [
            "用大屏去探索更多游戏。",
            "更舒服地承接排行和补充界面。",
            "让产品更完整，但不压垮手表体验。",
          ],
        },
        faqTitle: "常见问题",
        faqs: [
          {
            question: "什么样的游戏才算适合 watchOS？",
            answer:
              "通常要满足读屏快、重开快、规则清楚、操作负担低这几个条件，才能在 Apple Watch 上真正成立。",
          },
          {
            question: "watchOS 游戏和 iPhone 小游戏有什么不同？",
            answer:
              "watchOS 更适合短、轻、快的体验；而 iPhone 更适合承接更多浏览、设置和排行信息。",
          },
          {
            question: "watchOS 游戏还需要 iPhone 吗？",
            answer:
              "很多时候需要，而且这种分工反而是优势。手表负责快玩，手机负责补充信息，会更自然。",
          },
          {
            question: "为什么 App Store 里会显示 GameHub？",
            answer:
              "Games for Watch 是网站品牌，而 App Store 当前的应用名称是 GameHub - Mini Games for Watch。",
          },
        ],
        ctaTitle: "看看这组 watchOS-first 的小游戏",
        ctaLead:
          "如果你想找真正适合 Apple Watch 的小游戏，Games for Watch 提供了一个很实用的起点。",
      },
      ja: {
        linkTitle: "watchOSゲーム",
        resourceDescription:
          "watchOS向けに合う設計とは何かを整理したページです。",
        title:
          "watchOSゲーム: Apple Watchに合うミニゲーム設計 | Games for Watch",
        description:
          "どんなwatchOSゲームがApple Watchに合うのかを知りたい人向けのページです。Games for Watch は、手首側の短時間プレイとiPhone側の補助体験を分けて考えています。",
        eyebrow: "watchOSゲームガイド",
        headline:
          "良いwatchOSゲームは、iPhoneゲームを縮小したものではありません",
        lead: "watchOSゲームでは、情報を詰め込みすぎず、短く区切れて、すぐ戻りやすいことが重要です。Games for Watch もその方向で組み立てられています。",
        bridgeNote:
          "Games for Watch はWebサイトのブランド名で、App Storeでは GameHub - Mini Games for Watch と表示されます。",
        searchIntents: ["watchos games", "watchOSゲーム", "games for watchos"],
        quickAnswerTitle: "watchOSゲームは軽くあるべきです",
        quickAnswerBody: [
          "Apple Watchでは、ルールをすぐ理解できて、何度でも短く戻ってこられる仕組みのほうが強いです。複雑すぎるUIは相性が良くありません。",
          "Games for Watch は、時計側に短いゲームループを置き、一覧や補助情報をiPhone側に分けることで、その問題を避けています。",
        ],
        reasonsTitle: "良いwatchOSゲームのサイン",
        reasonsLead: "このプラットフォームでは、深さよりも明快さが効きます。",
        reasons: [
          {
            title: "ひと目で状態が分かる",
            description:
              "小さな画面でも、今どうなっているかがすぐ理解できることが大切です。",
            icon: "mdi:eye-outline",
          },
          {
            title: "止めても戻りやすい",
            description:
              "watchOSでは、いつでも中断して再開しやすい設計が向いています。",
            icon: "mdi:refresh-auto",
          },
          {
            title: "広い画面が必要な部分はiPhoneへ",
            description:
              "一覧、ランキング、説明のような情報密度の高い部分はiPhoneに分けたほうが自然です。",
            icon: "mdi:cellphone-link",
          },
        ],
        examplesTitle: "watchOSに合いやすいゲームタイプ",
        examplesLead: "短いループと明快な盤面を持つ形式は特に相性が良いです。",
        exampleGames: [
          "2048",
          "テトリス",
          "五目並べ",
          "バブルシューター",
          "Gold Miner",
          "Soccer Star",
        ],
        experienceTitle: "Games for Watch の役割分担",
        watchColumn: {
          title: "watchOS側",
          points: [
            "コアの1ラウンドを手首に置く。",
            "短いタップ操作と見やすい進行を優先する。",
            "1〜2分でも満足感が出る形に寄せる。",
          ],
        },
        phoneColumn: {
          title: "iPhone側",
          points: [
            "より多くのゲームを大きな画面で探す。",
            "ランキングや補助画面を楽に確認する。",
            "時計に無理をさせずに全体の奥行きを持たせる。",
          ],
        },
        faqTitle: "FAQ",
        faqs: [
          {
            question: "良いwatchOSゲームとは何ですか？",
            answer:
              "小さな画面でも読みやすく、すぐ再開できて、重い準備がいらないゲームです。",
          },
          {
            question: "watchOSゲームはiPhoneのミニゲームと違いますか？",
            answer:
              "多くの場合は違います。時計は短く集中したプレイに向き、iPhoneは一覧や設定、ランキングなどの補助に向いています。",
          },
          {
            question: "watchOSゲームでもiPhone連携は必要ですか？",
            answer:
              "はい。その分担はむしろ相性が良く、全体として使いやすくなることが多いです。",
          },
          {
            question: "App StoreでGameHubと表示されるのはなぜですか？",
            answer:
              "Games for Watch はWebサイト側のブランド名で、App Storeでは GameHub - Mini Games for Watch が現在の表示名です。",
          },
        ],
        ctaTitle: "watchOSファーストのコレクションを見る",
        ctaLead:
          "Apple Watchで自然に遊べるミニゲームを探したいなら、Games for Watch は実用的な出発点になります。",
      },
      de: {
        linkTitle: "watchOS Spiele",
        resourceDescription:
          "Welche Eigenschaften ein gutes watchOS-Spiel ausmachen und warum kurze Formate meist besser funktionieren.",
        title:
          "watchOS Spiele: welche Minispiele wirklich zur Apple Watch passen | Games for Watch",
        description:
          "Entdecke watchOS Spiele, die für schnelles und gut lesbares Spielen gebaut sind. Games for Watch bringt kurze Minispiele auf die Apple Watch und nutzt das iPhone für Listen und Rankings.",
        eyebrow: "watchOS Spiele Guide",
        headline:
          "watchOS Spiele gewinnen, wenn sie das Handgelenk respektieren",
        lead: "Gute watchOS Spiele sind nicht einfach geschrumpfte iPhone-Spiele. Sie sind schnell lesbar, einfach zu steuern und jederzeit leicht wieder zu verlassen. Genau in diese Richtung geht Games for Watch.",
        bridgeNote:
          "Games for Watch ist die Website-Marke. Im App Store wird die App aktuell als GameHub - Mini Games for Watch geführt.",
        searchIntents: ["watchos spiele", "watchos games", "games for watchos"],
        quickAnswerTitle:
          "watchOS Spiele sollten leicht wirken, nicht eingeschränkt",
        quickAnswerBody: [
          "Die Apple Watch funktioniert am besten mit Mechaniken, die man schnell versteht und oft wieder aufnehmen kann. Kleine Puzzle-, Arcade- und Brettformate schlagen meist alles, was lange Sitzungen oder dichte Interface-Ebenen verlangt.",
          "Games for Watch folgt genau dieser Logik: watch-first Spielrunden auf der Uhr, dazu ein iPhone als Begleiter für mehr Übersicht und Zusatzansichten.",
        ],
        reasonsTitle: "Signale für ein starkes watchOS-Spiel",
        reasonsLead:
          "Die Plattform belohnt Klarheit stärker als rohe Komplexität.",
        reasons: [
          {
            title: "Auf einen Blick lesbar",
            description:
              "Regeln und Spielzustände sollten auch auf kleinem Display klar bleiben.",
            icon: "mdi:eye-outline",
          },
          {
            title: "Leicht wieder aufzunehmen",
            description:
              "watchOS spielt sich besser, wenn jede Runde sauber unterbrochen und neu gestartet werden kann.",
            icon: "mdi:refresh-auto",
          },
          {
            title: "Begleitgerät dort, wo es hilft",
            description:
              "Nutze das iPhone für alles, was mehr Platz braucht: Listen, Rankings und Entdeckung.",
            icon: "mdi:cellphone-link",
          },
        ],
        examplesTitle: "Spieltypen, die zu watchOS passen",
        examplesLead:
          "Kurze Schleifen und klare Spielfelder übersetzen sich deutlich besser als überladene Interfaces.",
        exampleGames: [
          "2048",
          "Tetris",
          "Gomoku",
          "Bubble Shooter",
          "Gold Miner",
          "Soccer Star",
        ],
        experienceTitle: "Wie Games for Watch die Aufgaben trennt",
        watchColumn: {
          title: "watchOS-Seite",
          points: [
            "Die Kernrunde bleibt am Handgelenk.",
            "Schnelle Eingaben und gut sichtbarer Fortschritt stehen im Vordergrund.",
            "Eine Session soll sich auch in ein bis zwei Minuten vollständig anfühlen.",
          ],
        },
        phoneColumn: {
          title: "iPhone-Seite",
          points: [
            "Mehr Spiele auf größerem Bildschirm erkunden.",
            "Breitere Listen und Zusatzansichten bequem tragen.",
            "Mehr Tiefe erlauben, ohne die Uhr zu überladen.",
          ],
        },
        faqTitle: "FAQ",
        faqs: [
          {
            question: "Was macht ein gutes watchOS-Spiel aus?",
            answer:
              "Es ist schnell lesbar, leicht neu zu starten und klar genug, um auf kleinem Bildschirm ohne großen Setup-Aufwand Spaß zu machen.",
          },
          {
            question:
              "Unterscheiden sich watchOS Spiele von iPhone-Minispielen?",
            answer:
              "Meist ja. Die Uhr ist besser für kurze, fokussierte Sessions geeignet, während das iPhone mehr Listen, Einstellungen oder Rankings tragen kann.",
          },
          {
            question:
              "Können watchOS Spiele trotzdem das iPhone als Begleiter nutzen?",
            answer:
              "Auf jeden Fall. Diese Aufteilung verbessert oft sogar das Gesamterlebnis, weil jedes Gerät den Teil übernimmt, der zu ihm passt.",
          },
          {
            question: "Warum sehe ich im App Store den Namen GameHub?",
            answer:
              "Games for Watch ist die Website-Marke. Der aktuelle App-Store-Name lautet GameHub - Mini Games for Watch.",
          },
        ],
        ctaTitle: "Die watchOS-first Sammlung entdecken",
        ctaLead:
          "Wenn du Minispiele suchst, die sich auf der Apple Watch wirklich zuhause anfühlen, ist Games for Watch ein praktischer Einstieg.",
      },
    },
  },
};

function getGuidePath(locale: GuideLocale, slug: GuideSlug) {
  const config = localeConfig[locale];
  return config.segment ? `/${config.segment}/${slug}/` : `/${slug}/`;
}

export function isGuideLocale(
  locale: LandingLocale | string,
): locale is GuideLocale {
  return supportedGuideLocales.includes(locale as GuideLocale);
}

export function getGuidePage(locale: GuideLocale, slug: GuideSlug): GuidePage {
  const config = localeConfig[locale];
  const entry = guideCatalog[slug];
  const content = entry.locales[locale];

  return {
    id: slug,
    locale,
    path: getGuidePath(locale, slug),
    homePath: config.homePath,
    langAttr: config.langAttr,
    ogLocale: config.ogLocale,
    appStoreUrl,
    watchImage: {
      src: entry.watchImage.src,
      alt: entry.watchImage.alt[locale],
    },
    phoneImage: {
      src: entry.phoneImage.src,
      alt: entry.phoneImage.alt[locale],
    },
    languages: supportedGuideLocales.map((item) => ({
      title: localeConfig[item].label,
      url: getGuidePath(item, slug),
      locale: item,
      active: item === locale,
    })),
    alternatePaths: supportedGuideLocales.map((item) => ({
      hreflang: localeConfig[item].hreflang,
      path: getGuidePath(item, slug),
    })),
    defaultPath: getGuidePath("en", slug),
    relatedGuides: guideSlugs
      .filter((item) => item !== slug)
      .map((item) => ({
        title: guideCatalog[item].locales[locale].linkTitle,
        description: guideCatalog[item].locales[locale].resourceDescription,
        url: getGuidePath(locale, item),
      })),
    ui: guideUiByLocale[locale],
    ...content,
  };
}

export function getGuideHubCopy(locale: LandingLocale | GuideLocale) {
  return isGuideLocale(locale) ? guideHubCopyByLocale[locale] : null;
}

export function getGuideResourceCards(locale: LandingLocale | GuideLocale) {
  if (!isGuideLocale(locale)) {
    return [];
  }

  return guideSlugs.map((slug) => {
    const page = getGuidePage(locale, slug);
    return {
      title: page.linkTitle,
      description: page.resourceDescription,
      url: page.path,
    };
  });
}

export function getEnglishGuideStaticPaths() {
  return guideSlugs.map((slug) => ({
    params: { slug },
    props: { page: getGuidePage("en", slug) },
  }));
}

export function getLocalizedGuideStaticPaths() {
  return supportedGuideLocales
    .filter((locale) => locale !== "en")
    .flatMap((locale) =>
      guideSlugs.map((slug) => ({
        params: { locale: localeConfig[locale].segment, slug },
        props: { page: getGuidePage(locale, slug) },
      })),
    );
}
