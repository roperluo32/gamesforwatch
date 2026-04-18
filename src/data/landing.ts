export type LandingLocale = "zh-CN" | "en" | "ja" | "ko" | "fr" | "de" | "es" | "pt" | "ru";

export interface LandingCopy {
  lang: LandingLocale;
  title: string;
  description: string;
  url: string;
  nav: Array<{ title: string; url: string }>;
  languages: Array<{ title: string; url: string; active?: boolean }>;
  eyebrow: string;
  heroTitle: string;
  heroLead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  heroSupport: string[];
  appStoreUrl: string;
  availability: string;
  trustBadges: string[];
  socialProof: Array<{ value: string; label: string }>;
  proofTitle: string;
  proofLead: string;
  proofItems: Array<{ title: string; description: string }>;
  marquee: string[];
  reasonsTitle: string;
  reasonsLead: string;
  reasons: Array<{ title: string; description: string; icon: string }>;
  scenariosTitle: string;
  scenariosLead: string;
  scenarios: Array<{ title: string; description: string; label: string }>;
  experienceTitle: string;
  experienceLead: string;
  experience: Array<{ platform: string; title: string; points: string[] }>;
  galleryTitle: string;
  galleryLead: string;
  watchGalleryTitle: string;
  watchGalleryLead: string;
  iosGalleryTitle: string;
  iosGalleryLead: string;
  faqTitle: string;
  faqLead: string;
  faqs: Array<{ question: string; answer: string }>;
  closingTitle: string;
  closingLead: string;
  closingSupport: string[];
  footer: string;
}

export const appStoreUrl =
  "https://geo.itunes.apple.com/app/id6752821820";

export const localeAlternates = [
  { hreflang: "zh-CN", path: "/" },
  { hreflang: "en", path: "/en/" },
  { hreflang: "ja", path: "/ja/" },
  { hreflang: "ko", path: "/ko/" },
  { hreflang: "fr", path: "/fr/" },
  { hreflang: "de", path: "/de/" },
  { hreflang: "es", path: "/es/" },
  { hreflang: "pt", path: "/pt/" },
  { hreflang: "ru", path: "/ru/" },
] as const;

const localeLanguages = (active: LandingLocale) => [
  { title: "中文", url: "/", active: active === "zh-CN" },
  { title: "EN", url: "/en/", active: active === "en" },
  { title: "日本語", url: "/ja/", active: active === "ja" },
  { title: "한국어", url: "/ko/", active: active === "ko" },
  { title: "Fr", url: "/fr/", active: active === "fr" },
  { title: "DE", url: "/de/", active: active === "de" },
  { title: "ES", url: "/es/", active: active === "es" },
  { title: "PT", url: "/pt/", active: active === "pt" },
  { title: "RU", url: "/ru/", active: active === "ru" },
];

export const zhCopy: LandingCopy = {
  lang: "zh-CN",
  title: "单机游戏大全 - Apple Watch 游戏 App | watchOS 小游戏合集",
  description:
    "单机游戏大全是一款适合 Apple Watch 的 watchOS 小游戏 App，支持 iPhone + Apple Watch 双端。包含 2048、俄罗斯方块、五子棋、泡泡龙、黄金矿工等经典玩法，支持离线游玩、排行榜共享与持续更新。",
  url: "/",
  nav: [
    { title: "真实证明", url: "#proof" },
    { title: "游戏展示", url: "#gallery" },
    { title: "双端体验", url: "#experience" },
    { title: "常见问题", url: "#faq" },
  ],
  languages: localeLanguages("zh-CN"),
  eyebrow: "watchOS 小游戏与双端体验",
  heroTitle: "真正把 Apple Watch 当主场的小游戏合集",
  heroLead: "Apple Watch 上打开就能快速开一局。想看更多玩法和完整列表时，再切到 iPhone。",
  ctaPrimary: "去 App Store 下载",
  ctaSecondary: "看看实际游戏画面",
  heroSupport: ["Apple Watch 优先", "经典小游戏合集", "iPhone 补充浏览与排行"],
  appStoreUrl,
  availability: "已上架 App Store，支持 iPhone + Apple Watch 双端。",
  trustBadges: ["离线可玩", "无广告", "每周更新新游戏", "已更新 30+ 手表小游戏"],
  socialProof: [
    { value: "704", label: "公开评分数" },
    { value: "1.3.0", label: "当前版本" },
    { value: "16+", label: "年龄分级" },
  ],
  proofTitle: "不是只写着支持 watchOS，而是真的已经形成可信的下载理由",
  proofLead: "对 Apple Watch 游戏来说，用户最先在意的是是否真的能长期玩、是否轻松、是否还在维护。公开的 App Store 信息已经给出这些答案。",
  proofItems: [
    {
      title: "离线可玩",
      description: "没有网络也能直接开玩，更适合 Apple Watch 的碎片时间场景。",
    },
    {
      title: "无广告",
      description: "打开就玩，不被插页和激励广告打断，体验更干净。",
    },
    {
      title: "每周更新新游戏",
      description: "持续加入新玩法，让手表上的小游戏合集不会很快玩腻。",
    },
    {
      title: "专门为 Apple Watch 定制",
      description: "包含表冠交互、震动反馈、双端同步和排行榜，定位很明确。",
    },
    {
      title: "已更新 30+ 手表小游戏",
      description: "不只是几个示例玩法，已经覆盖 30+ 款适合 Apple Watch 快玩的经典小游戏。",
    },
  ],
  marquee: [
    "2048",
    "俄罗斯方块",
    "五子棋",
    "泡泡龙",
    "黄金矿工",
    "飞刀挑战",
    "足球之星",
    "都市赛车",
    "打砖块",
    "合成西红柿",
  ],
  reasonsTitle: "为什么这类游戏更适合出现在 Apple Watch 上",
  reasonsLead: "它不是把手机游戏硬塞进手表，而是把短时、轻量、容易马上开始的玩法，放到你最容易抬腕的设备上。",
  reasons: [
    {
      title: "抬腕就能开始",
      description: "Apple Watch 本来就更接近日常高频触达场景，打开门槛更低。",
      icon: "mdi:watch-variant",
    },
    {
      title: "经典玩法天然适配",
      description: "2048、俄罗斯方块、五子棋这类规则清晰的游戏，更适合 watchOS 小屏快玩。",
      icon: "mdi:cards-outline",
    },
    {
      title: "双端职责很清楚",
      description: "Apple Watch 负责快玩，iPhone 负责完整浏览、排行和沉浸一点的操作。",
      icon: "mdi:devices",
    },
    {
      title: "碎片时间更有价值",
      description: "不需要预留整段时间，几分钟也能完成一局，停下来也没有负担。",
      icon: "mdi:flash-outline",
    },
  ],
  scenariosTitle: "这些时刻，Apple Watch 游戏会比手机更顺手",
  scenariosLead: "当你只是想打发几分钟，又不想拿出手机时，这种 watchOS 小游戏会自然成为更好的入口。",
  scenarios: [
    {
      label: "通勤",
      title: "通勤路上来一局",
      description: "不用掏手机，也能轻松消磨几分钟。",
    },
    {
      label: "排队",
      title: "排队时不只是刷消息",
      description: "打开就能玩一小局，也更容易停下来。",
    },
    {
      label: "工作间隙",
      title: "工作间隙短暂停顿",
      description: "几分钟刚刚好，不会太沉浸。",
    },
  ],
  experienceTitle: "Apple Watch 负责快玩，iPhone 负责补全体验",
  experienceLead: "这不是简单的 iPhone + Apple Watch 双端支持，而是两个设备各自承担最合适的角色。",
  experience: [
    {
      platform: "watchOS",
      title: "在手腕上快速开始",
      points: [
        "更适合几分钟一局的短时玩法",
        "规则清晰，天然适合 Apple Watch 小屏交互",
        "让 watchOS 小游戏真正有独立存在的价值",
      ],
    },
    {
      platform: "iPhone",
      title: "在手机上看得更全",
      points: [
        "更方便浏览游戏列表和查看排行",
        "大屏展示更舒适，也更像完整小游戏合集",
        "让整个产品既能快玩，也能长期保留",
      ],
    },
  ],
  galleryTitle: "真实画面，能更快说明它值不值得下载",
  galleryLead: "先看 Apple Watch 上的核心体验，再看 iPhone 如何补全列表、排行和更多浏览场景。",
  watchGalleryTitle: "Apple Watch 上的小游戏",
  watchGalleryLead: "先看最能体现差异化的部分。",
  iosGalleryTitle: "iPhone 上的补充体验",
  iosGalleryLead: "再看手机端如何补全浏览和排行。",
  faqTitle: "常见问题",
  faqLead: "先把用户最容易关心的几个问题说清楚，下载决策会更轻松。",
  faqs: [
    {
      question: "这款 App 是真的主要给 Apple Watch 玩的吗？",
      answer: "是。Apple Watch 负责快速开玩，iPhone 更像补充浏览、收藏和排行榜的辅助入口，不是简单把手机游戏缩到手表上。",
    },
    {
      question: "没有网络也能玩吗？",
      answer: "可以。页面里已经明确强调了离线可玩，这也是它适合通勤、排队和短暂空档场景的重要原因。",
    },
    {
      question: "iPhone 端主要有什么用？",
      answer: "iPhone 端更适合看完整游戏列表、浏览收藏和查看排行榜；同时手表端的游戏在 iPhone 上也都可以玩，游戏进度和排行榜会在双端共享。",
    },
    {
      question: "这类游戏适合在什么场景玩？",
      answer: "很适合通勤路上、排队等待、工作间隙这类只有几分钟空档的场景。因为 Apple Watch 抬腕就能开始，不用特意掏手机，玩一小局也更容易及时停下来，不会有太强的打扰感。",
    },
    {
      question: "现在大概有多少小游戏？",
      answer: "当前已经更新 30+ 款适合 Apple Watch 快玩的小游戏，而且还在持续加入新内容。",
    },
    {
      question: "现在支持哪些游戏？",
      answer: "当前游戏列表包括：月球着陆、记忆翻牌、推箱子、挖金子、打砖块、扫雷、合成西红柿、足球之星、彩球排序、飞刀挑战、都市赛车、泡泡消除、飞机大战、跳一跳、斗地主、飞机大冒险、别踩白块、堆木头、切水果、连连看、消消乐、功德木鱼、经典乒乓、颜色反应、躲避方块、井字棋、数独、五子棋、俄罗斯方块、2048、数字华容道、贪吃蛇、打地鼠。",
    },
    {
      question: "游戏是否收费？",
      answer: "游戏内提供了 10 多款免费游戏，其余游戏可以免费试玩 5 次；同时提供买断式购买选项，也可以选择按年订阅。",
    },
  ],
  closingTitle: "想找一款真正适合 Apple Watch 的小游戏 App，这一款已经很接近答案",
  closingLead: "如果你需要的是一款能在碎片时间随手开玩的 Apple Watch 游戏合集，同时又有 iPhone 端补全体验，单机游戏大全值得直接去 App Store 看看。",
  closingSupport: ["离线可玩", "无广告", "每周更新新游戏", "已更新 30+ 手表小游戏"],
  footer:
    "© 2026 Games for Watch. Apple Watch, watchOS, iPhone and App Store are trademarks of Apple Inc.",
};

export const enCopy: LandingCopy = {
  lang: "en",
  title: "Games for Watch - Apple Watch Games App | watchOS Mini Games",
  description:
    "Games for Watch is an Apple Watch games app for watchOS with iPhone support. Play quick classics like 2048, Tetris, Gomoku, and Bubble Shooter with offline play, shared leaderboards, and frequent updates.",
  url: "/en/",
  nav: [
    { title: "Proof", url: "#proof" },
    { title: "Screenshots", url: "#gallery" },
    { title: "Experience", url: "#experience" },
    { title: "FAQ", url: "#faq" },
  ],
  languages: localeLanguages("en"),
  eyebrow: "watchOS mini games with an iPhone companion",
  heroTitle: "A mini game collection that treats Apple Watch as the main stage",
  heroLead: "Start instantly on your wrist. Switch to iPhone when you want the full list and more ways to browse.",
  ctaPrimary: "Download on the App Store",
  ctaSecondary: "See the real screens",
  heroSupport: ["Apple Watch first", "Classic mini game collection", "iPhone companion flow"],
  appStoreUrl,
  availability: "Available on the App Store for both iPhone and Apple Watch.",
  trustBadges: ["Offline play", "No ads", "New games weekly", "30+ watch mini games"],
  socialProof: [
    { value: "704", label: "Public ratings" },
    { value: "1.3.0", label: "Current version" },
    { value: "16+", label: "Age rating" },
  ],
  proofTitle: "This is more than a watchOS checkbox. The trust signals are already there.",
  proofLead: "For Apple Watch games, credibility comes from proof that the app is maintained, easy to pick up, and actually worth keeping installed. The public App Store page already supports that story.",
  proofItems: [
    {
      title: "Offline play",
      description: "You can jump into a quick round without relying on a network connection.",
    },
    {
      title: "No ads",
      description: "Short sessions stay clean and uninterrupted, which matters on Apple Watch.",
    },
    {
      title: "New games weekly",
      description: "Fresh additions keep the collection feeling active instead of static.",
    },
    {
      title: "Built for Apple Watch",
      description: "Crown input, haptics, syncing, and leaderboards make the Apple Watch angle feel real.",
    },
    {
      title: "30+ watch mini games",
      description: "This is already a broad collection, not just a handful of demo screens built for the store page.",
    },
  ],
  marquee: [
    "2048",
    "Tetris",
    "Gomoku",
    "Bubble Shooter",
    "Gold Miner",
    "Knife Challenge",
    "Soccer Star",
    "Racing",
    "Brick Breaker",
    "Merge Tomato",
  ],
  reasonsTitle: "Why this kind of game fits Apple Watch so well",
  reasonsLead: "It is not about shrinking phone games onto a watch. It is about putting short, clear, easy-to-start play on the device you already raise throughout the day.",
  reasons: [
    {
      title: "Instant from your wrist",
      description: "Apple Watch sits closer to high-frequency spare moments than your phone does.",
      icon: "mdi:watch-variant",
    },
    {
      title: "Classic formats fit naturally",
      description: "Games like 2048, Tetris, and Gomoku are clear enough to work well on a watch-sized canvas.",
      icon: "mdi:cards-outline",
    },
    {
      title: "Clear dual-device roles",
      description: "Apple Watch is for quick play, while iPhone covers deeper browsing and rankings.",
      icon: "mdi:devices",
    },
    {
      title: "Better for spare time",
      description: "A few minutes is enough for a satisfying round, without turning into a full commitment.",
      icon: "mdi:flash-outline",
    },
  ],
  scenariosTitle: "These are the moments where Apple Watch games feel more natural",
  scenariosLead: "When you only want a few minutes of play and do not want to reach for your phone, watchOS mini games become the better entry point.",
  scenarios: [
    {
      label: "Commute",
      title: "Quick play on the go",
      description: "You do not always need to pull out your phone.",
    },
    {
      label: "Waiting",
      title: "Better than endless message checking",
      description: "Open a short game, then stop easily when it is your turn.",
    },
    {
      label: "Short breaks",
      title: "A quick mental reset",
      description: "A few minutes is enough without losing your whole afternoon.",
    },
  ],
  experienceTitle: "Apple Watch handles fast play. iPhone completes the experience.",
  experienceLead: "This is not generic dual-device support. Each device has a clearer role in the overall product.",
  experience: [
    {
      platform: "watchOS",
      title: "Start fast on your wrist",
      points: [
        "Perfect for short sessions",
        "Games like 2048 and Gomoku fit the watch naturally",
        "It feels designed for Apple Watch instead of reduced from a phone app",
      ],
    },
    {
      platform: "iPhone",
      title: "See more on the phone",
      points: [
        "Better for lists and rankings",
        "The larger screen makes the collection feel fuller",
        "It helps the app stay worth keeping installed",
      ],
    },
  ],
  galleryTitle: "Real screens make the download decision easier",
  galleryLead: "Start with the Apple Watch core experience, then see how iPhone fills in browsing, rankings, and the rest of the collection.",
  watchGalleryTitle: "Mini games on Apple Watch",
  watchGalleryLead: "Start with the strongest differentiator.",
  iosGalleryTitle: "The iPhone companion layer",
  iosGalleryLead: "Then see how iPhone broadens browsing and support.",
  faqTitle: "FAQ",
  faqLead: "Answer the biggest questions up front so the download decision feels easier.",
  faqs: [
    {
      question: "Is this really built for Apple Watch first?",
      answer: "Yes. Apple Watch is where quick play happens, while iPhone mainly supports browsing, favorites, and rankings instead of acting as the primary game surface.",
    },
    {
      question: "Can I play without a network connection?",
      answer: "Yes. Offline play is one of the clearest reasons this fits commutes, waiting time, and other short spare moments.",
    },
    {
      question: "What is the iPhone app mainly for?",
      answer: "The iPhone app is better for seeing the full list, browsing favorites, and checking rankings. All of the Apple Watch games can also be played on iPhone, with shared progress and leaderboards across both devices.",
    },
    {
      question: "What kinds of moments is it best for?",
      answer: "It fits short spare moments especially well, including commuting, waiting in line, and quick breaks during the workday. Apple Watch makes it easy to start instantly without pulling out your phone, and just as easy to stop after a quick round.",
    },
    {
      question: "How many mini games are included now?",
      answer: "The app already has 30+ Apple Watch-friendly mini games, and it keeps adding more over time.",
    },
    {
      question: "Which games are currently included?",
      answer: "The current lineup includes Moon Landing, Memory Match, Sokoban, Gold Miner, Brick Breaker, Minesweeper, Merge Tomato, Soccer Star, Ball Sort, Knife Challenge, Racing Car, Bubble Shooter, Plane Battle, Jump Jump, Dou Dizhu, Plane Adventure, Don’t Tap the White Tile, Stack Wood, Fruit Cut, Lianliankan, Match-3, Wooden Fish, Classic Pong, Color Reaction, Dodge Blocks, Tic-Tac-Toe, Sudoku, Gomoku, Tetris, 2048, Number Puzzle, Snake, and Whac-A-Mole.",
    },
    {
      question: "Do I have to pay to play?",
      answer: "The app includes 10+ free games. The rest can be tried free 5 times, with both a one-time purchase option and an annual subscription available.",
    },
  ],
  closingTitle: "If you want an Apple Watch game app that actually feels made for the watch, start here",
  closingLead: "Games for Watch gives you a real watchOS mini game collection first, then a broader companion experience on iPhone. That makes it easy to justify a download.",
  closingSupport: ["Offline play", "No ads", "New games weekly", "30+ watch mini games"],
  footer:
    "© 2026 Games for Watch. Apple Watch, watchOS, iPhone and App Store are trademarks of Apple Inc.",
};

export const jaCopy: LandingCopy = {
  ...enCopy,
  lang: "ja",
  title: "Apple Watchゲームアプリ | watchOSミニゲーム集 - Games for Watch",
  description:
    "Apple Watchゲームを探している人向けのwatchOSミニゲームアプリです。2048、テトリス、五目並べ、バブルシューター、ゴールドマイナーなどをApple WatchとiPhoneで遊べて、オフラインにも対応しています。",
  url: "/ja/",
  nav: [
    { title: "特長", url: "#proof" },
    { title: "画面", url: "#gallery" },
    { title: "体験", url: "#experience" },
    { title: "FAQ", url: "#faq" },
  ],
  languages: localeLanguages("ja"),
  eyebrow: "Apple Watch向けミニゲーム集",
  heroTitle: "Apple Watchを主役にしたミニゲーム集",
  heroLead: "手首ですぐに1ゲーム始められます。もっと多くのゲームや一覧を見たいときは、iPhone側でじっくり確認できます。",
  ctaPrimary: "App Storeでダウンロード",
  ctaSecondary: "実際の画面を見る",
  proofItems: [
    { title: "オフライン対応", description: "通信がなくてもすぐ遊べて、Apple Watchの短い空き時間に合います。" },
    { title: "広告なし", description: "短いプレイの途中で広告に止められず、体験がすっきりしています。" },
    { title: "毎週新作追加", description: "新しいゲームが継続的に増え、コレクションが飽きにくくなっています。" },
    { title: "Apple Watch向け設計", description: "Digital Crown、触覚フィードバック、同期、ランキングまできちんと考えられています。" },
    { title: "30本以上のミニゲーム", description: "ストア用の見せかけではなく、すでに十分な数のゲームが揃っています。" },
  ],
  galleryTitle: "実際の画面を見ると、ダウンロードする価値がもっと分かりやすい",
  galleryLead: "まずApple Watchでのコア体験を見て、そのあとiPhoneが一覧表示やランキングをどう補完するかを確認できます。",
  faqTitle: "よくある質問",
  faqLead: "ダウンロード前に気になる点を先にまとめて確認できます。",
  faqs: [
    {
      question: "このアプリは本当にApple Watch向けですか？",
      answer: "はい。すぐ遊ぶのはApple Watchが中心で、iPhoneは一覧確認、お気に入り、ランキングを見るための補助的な役割です。",
    },
    {
      question: "オフラインでも遊べますか？",
      answer: "はい。オフライン対応なので、通勤中や待ち時間などの短いスキマ時間にも向いています。",
    },
    {
      question: "iPhoneアプリは主に何に使いますか？",
      answer: "iPhoneではゲーム一覧、ランキング、お気に入りの確認がしやすくなります。Apple WatchのゲームはiPhoneでも遊べ、進行状況やランキングも共有されます。",
    },
    {
      question: "どんな場面で遊ぶのに向いていますか？",
      answer: "通勤中、列に並んでいるとき、仕事の合間など、数分だけ空いた場面に向いています。スマホを取り出さずに始められ、短い1ゲームで止めやすいのも理由です。",
    },
    {
      question: "いま何本くらい収録されていますか？",
      answer: "Apple Watch向けのミニゲームがすでに30本以上あり、今も継続的に追加されています。",
    },
    {
      question: "現在どんなゲームに対応していますか？",
      answer: "現在は、月球着陸、記憶翻牌、推箱子、挖金子、打砖块、扫雷、合成西红柿、足球之星、彩球排序、飞刀挑战、都市赛车、泡泡消除、飞机大战、跳一跳、斗地主、飞机大冒险、别踩白块、堆木头、切水果、连连看、消消乐、功德木鱼、经典乒乓、颜色反应、躲避方块、井字棋、数独、五子棋、俄罗斯方块、2048、数字华容道、贪吃蛇、打地鼠に対応しています。" },
    {
      question: "課金しないと遊べませんか？",
      answer: "10本以上は無料で遊べます。そのほかのゲームも5回まで無料で試せて、買い切りと年額サブスクリプションの両方に対応しています。",
    },
  ],
  closingTitle: "Apple Watchに本当に合うゲームアプリを探しているなら、ここから始める価値があります",
  closingLead: "Games for Watchは、まずApple Watchでの遊びやすさがあり、そのうえでiPhoneが一覧やランキングを補完します。ダウンロード理由を作りやすい構成です。",
  closingSupport: ["オフライン対応", "広告なし", "毎週新作追加", "30本以上のゲーム"],
  footer:
    "© 2026 Games for Watch. Apple Watch、watchOS、iPhone、App Store は Apple Inc. の商標です。",
};

export const koCopy: LandingCopy = {
  ...enCopy,
  lang: "ko",
  title: "Apple Watch 게임 앱 | watchOS 미니게임 모음 - Games for Watch",
  description:
    "Apple Watch 게임을 찾는 사람을 위한 watchOS 미니게임 앱입니다. 2048, 테트리스, 오목, 버블 슈터, 골드 마이너 등을 Apple Watch와 iPhone에서 즐길 수 있고 오프라인 플레이도 지원합니다.",
  url: "/ko/",
  nav: [
    { title: "특징", url: "#proof" },
    { title: "화면", url: "#gallery" },
    { title: "경험", url: "#experience" },
    { title: "FAQ", url: "#faq" },
  ],
  languages: localeLanguages("ko"),
  eyebrow: "Apple Watch 우선 미니게임 컬렉션",
  heroTitle: "Apple Watch를 메인으로 만든 미니게임 모음",
  heroLead: "손목에서 바로 한 판 시작하고, 더 많은 게임과 목록은 iPhone에서 편하게 둘러볼 수 있습니다.",
  ctaPrimary: "App Store에서 다운로드",
  ctaSecondary: "실제 화면 보기",
  proofItems: [
    { title: "오프라인 플레이", description: "네트워크 없이도 바로 플레이할 수 있어 짧은 빈 시간에 잘 맞습니다." },
    { title: "광고 없음", description: "짧은 플레이 흐름이 광고로 끊기지 않아 더 깔끔합니다." },
    { title: "매주 새 게임 추가", description: "새로운 게임이 계속 추가되어 컬렉션이 금방 지루해지지 않습니다." },
    { title: "Apple Watch 맞춤 설계", description: "디지털 크라운, 햅틱, 동기화, 랭킹까지 Apple Watch용으로 설계되었습니다." },
    { title: "30개 이상의 미니게임", description: "스토어용 데모가 아니라 이미 충분히 많은 게임이 들어 있습니다." },
  ],
  galleryTitle: "실제 화면을 보면 다운로드할 이유가 더 분명해집니다",
  galleryLead: "먼저 Apple Watch의 핵심 플레이를 보고, 그다음 iPhone이 목록과 랭킹을 어떻게 보완하는지 확인할 수 있습니다.",
  faqTitle: "자주 묻는 질문",
  faqLead: "다운로드 전에 가장 궁금한 점을 먼저 정리해 둔 섹션입니다.",
  faqs: [
    {
      question: "이 앱은 정말 Apple Watch 중심인가요?",
      answer: "네. 빠르게 한 판 즐기는 곳은 Apple Watch이고, iPhone은 목록 확인, 즐겨찾기, 랭킹 확인을 보완하는 역할입니다.",
    },
    {
      question: "인터넷 없이도 플레이할 수 있나요?",
      answer: "네. 오프라인 플레이를 지원해서 출퇴근길, 대기 시간, 짧은 공백 시간에 특히 잘 맞습니다.",
    },
    {
      question: "iPhone 앱은 주로 무엇에 쓰나요?",
      answer: "iPhone에서는 전체 게임 목록, 즐겨찾기, 랭킹을 더 편하게 볼 수 있습니다. Apple Watch 게임은 iPhone에서도 플레이 가능하며 진행 상황과 랭킹이 공유됩니다.",
    },
    {
      question: "어떤 상황에서 하기 좋나요?",
      answer: "출퇴근 중, 줄을 서 있을 때, 업무 사이 짧은 휴식 같은 몇 분짜리 빈 시간에 잘 맞습니다. 휴대폰을 꺼내지 않고 바로 시작하고, 한 판 후 바로 멈추기 쉽기 때문입니다.",
    },
    {
      question: "지금 게임은 몇 개 정도 있나요?",
      answer: "Apple Watch에 잘 맞는 미니게임이 이미 30개 이상 들어 있고 계속 추가되고 있습니다.",
    },
    {
      question: "현재 어떤 게임을 지원하나요?",
      answer: "현재 월구 착륙, 메모리 카드 뒤집기, 소코반, 골드 마이너, 브릭 브레이커, 지뢰찾기, 토마토 합치기, 축구 스타, 볼 정렬, 나이프 챌린지, 레이싱, 버블 슈터, 비행기 전투, 점프 점프, 두디주, 비행기 어드벤처, 화이트 타일 피하기, 나무 쌓기, 과일 자르기, 연련간, 매치3, 목어, 클래식 퐁, 컬러 반응, 블록 피하기, 틱택토, 스도쿠, 오목, 테트리스, 2048, 숫자 퍼즐, 스네이크, 두더지 잡기를 지원합니다.",
    },
    {
      question: "유료 결제가 필요한가요?",
      answer: "10개 이상 게임은 무료로 플레이할 수 있습니다. 나머지 게임도 5회까지 무료 체험이 가능하며, 영구 구매와 연간 구독 둘 다 제공합니다.",
    },
  ],
  closingTitle: "Apple Watch에 정말 잘 맞는 게임 앱을 찾는다면, 여기서 시작해 볼 만합니다",
  closingLead: "Games for Watch는 먼저 Apple Watch에서 빠르게 즐기는 경험을 제공하고, iPhone이 목록과 랭킹을 보완합니다. 다운로드할 이유를 만들기 좋은 구성입니다.",
  closingSupport: ["오프라인 플레이", "광고 없음", "매주 새 게임", "30개 이상의 게임"],
  footer:
    "© 2026 Games for Watch. Apple Watch, watchOS, iPhone 및 App Store는 Apple Inc.의 상표입니다.",
};

export const frCopy: LandingCopy = {
  ...enCopy,
  lang: "fr",
  title: "Jeux Apple Watch | mini-jeux watchOS - Games for Watch",
  description:
    "Une app de jeux Apple Watch pour watchOS avec support iPhone. Retrouvez 2048, Tetris, Gomoku, Bubble Shooter, Gold Miner et d’autres mini-jeux jouables sur Apple Watch, meme hors ligne.",
  url: "/fr/",
  nav: [
    { title: "Atouts", url: "#proof" },
    { title: "Captures", url: "#gallery" },
    { title: "Experience", url: "#experience" },
    { title: "FAQ", url: "#faq" },
  ],
  languages: localeLanguages("fr"),
  eyebrow: "Collection de mini-jeux d’abord pour Apple Watch",
  heroTitle: "Une collection de mini-jeux pensee pour Apple Watch",
  heroLead: "Lancez une partie directement au poignet. Quand vous voulez voir plus de jeux ou la liste complete, passez sur iPhone.",
  ctaPrimary: "Telecharger sur l’App Store",
  ctaSecondary: "Voir les ecrans",
  proofItems: [
    { title: "Mode hors ligne", description: "Vous pouvez jouer sans connexion, ce qui convient bien aux moments libres tres courts." },
    { title: "Sans publicite", description: "Les sessions restent fluides et propres, sans interruption publicitaire." },
    { title: "Nouveaux jeux chaque semaine", description: "La collection continue d’evoluer au lieu de rester figee." },
    { title: "Concu pour Apple Watch", description: "Couronne, retours haptiques, synchro et classements renforcent l’usage montre." },
    { title: "30+ mini-jeux", description: "Ce n’est pas une simple demo de boutique, mais deja une collection fournie." },
  ],
  galleryTitle: "Les vraies captures rendent le telechargement plus facile a justifier",
  galleryLead: "Commencez par l’experience principale sur Apple Watch, puis voyez comment l’iPhone complete la navigation et les classements.",
  faqTitle: "FAQ",
  faqLead: "Les questions les plus importantes sont rassemblees ici avant le telechargement.",
  faqs: [
    {
      question: "Cette app est-elle vraiment pensee d’abord pour Apple Watch ?",
      answer: "Oui. L’Apple Watch sert au jeu rapide, tandis que l’iPhone complete surtout avec la navigation, les favoris et les classements.",
    },
    {
      question: "Peut-on jouer sans connexion ?",
      answer: "Oui. Le mode hors ligne est l’une des raisons pour lesquelles l’app convient bien aux trajets, aux files d’attente et aux petits moments libres.",
    },
    {
      question: "A quoi sert principalement l’app iPhone ?",
      answer: "L’iPhone permet de voir plus facilement la liste complete, les favoris et les classements. Les jeux jouables sur Apple Watch le sont aussi sur iPhone, avec progression et classements partages.",
    },
    {
      question: "Dans quels moments est-ce le plus adapte ?",
      answer: "C’est ideal pour les trajets, les files d’attente et les petites pauses au travail. On lance une partie sans sortir le telephone, puis on s’arrete facilement apres quelques minutes.",
    },
    {
      question: "Combien de mini-jeux sont inclus actuellement ?",
      answer: "L’app propose deja plus de 30 mini-jeux adaptes a Apple Watch, et la collection continue de s’agrandir.",
    },
    {
      question: "Quels jeux sont actuellement disponibles ?",
      answer: "La liste actuelle comprend Moon Landing, Memory Match, Sokoban, Gold Miner, Brick Breaker, Minesweeper, Merge Tomato, Soccer Star, Ball Sort, Knife Challenge, Racing Car, Bubble Shooter, Plane Battle, Jump Jump, Dou Dizhu, Plane Adventure, Don’t Tap the White Tile, Stack Wood, Fruit Cut, Lianliankan, Match-3, Wooden Fish, Classic Pong, Color Reaction, Dodge Blocks, Tic-Tac-Toe, Sudoku, Gomoku, Tetris, 2048, Number Puzzle, Snake et Whac-A-Mole.",
    },
    {
      question: "Faut-il payer pour jouer ?",
      answer: "Plus de 10 jeux sont gratuits. Les autres peuvent etre essayes 5 fois gratuitement, avec au choix un achat unique ou un abonnement annuel.",
    },
  ],
  closingTitle: "Si vous cherchez une app de jeux Apple Watch vraiment adaptee a la montre, commencez ici",
  closingLead: "Games for Watch offre d’abord une vraie experience de mini-jeux sur Apple Watch, puis l’iPhone complete avec plus de navigation et de contexte. C’est une base solide pour convaincre au telechargement.",
  closingSupport: ["Hors ligne", "Sans pub", "Nouveaux jeux chaque semaine", "30+ mini-jeux"],
  footer:
    "© 2026 Games for Watch. Apple Watch, watchOS, iPhone et App Store sont des marques d’Apple Inc.",
};

export const deCopy: LandingCopy = {
  ...enCopy,
  lang: "de",
  title: "Apple Watch Spiele-App | watchOS Minispiele - Games for Watch",
  description:
    "Eine Apple Watch Spiele-App fur watchOS mit iPhone-Unterstutzung. Spiele 2048, Tetris, Gomoku, Bubble Shooter, Gold Miner und weitere Minispiele auf Apple Watch, auch offline.",
  url: "/de/",
  nav: [
    { title: "Vorteile", url: "#proof" },
    { title: "Screenshots", url: "#gallery" },
    { title: "Erlebnis", url: "#experience" },
    { title: "FAQ", url: "#faq" },
  ],
  languages: localeLanguages("de"),
  eyebrow: "Minispiele-Sammlung fur Apple Watch",
  heroTitle: "Eine Minispiele-Sammlung, die Apple Watch wirklich ernst nimmt",
  heroLead: "Starte direkt am Handgelenk eine kurze Runde. Wenn du mehr Spiele oder die komplette Liste sehen willst, wechselst du auf das iPhone.",
  ctaPrimary: "Im App Store laden",
  ctaSecondary: "Echte Screens ansehen",
  proofItems: [
    { title: "Offline spielbar", description: "Du kannst ohne Verbindung sofort loslegen, ideal fur kurze freie Momente." },
    { title: "Keine Werbung", description: "Kurze Sessions bleiben sauber und werden nicht durch Anzeigen unterbrochen." },
    { title: "Wochentlich neue Spiele", description: "Neue Inhalte halten die Sammlung lebendig und relevant." },
    { title: "Fur Apple Watch gebaut", description: "Digital Crown, Haptik, Synchronisierung und Ranglisten sind klar auf die Watch ausgelegt." },
    { title: "Uber 30 Minispiele", description: "Das ist schon jetzt eine breite Sammlung und nicht nur eine Store-Demo." },
  ],
  galleryTitle: "Echte Screens machen die Download-Entscheidung einfacher",
  galleryLead: "Sieh dir zuerst das Kernerlebnis auf Apple Watch an und danach, wie das iPhone Listen, Rankings und mehr erganzt.",
  faqTitle: "FAQ",
  faqLead: "Hier werden die wichtigsten Fragen vor dem Download vorweg beantwortet.",
  faqs: [
    {
      question: "Ist die App wirklich zuerst fur Apple Watch gedacht?",
      answer: "Ja. Die Apple Watch ist fur schnelles Spielen gedacht, wahrend das iPhone vor allem Listen, Favoriten und Ranglisten erganzt.",
    },
    {
      question: "Kann ich auch ohne Internetverbindung spielen?",
      answer: "Ja. Offline-Spiel ist einer der klarsten Vorteile fur Pendeln, Warten und andere kurze freie Momente.",
    },
    {
      question: "Wofur ist die iPhone-App hauptsachlich da?",
      answer: "Auf dem iPhone lassen sich die komplette Spieleliste, Favoriten und Ranglisten bequemer ansehen. Die Watch-Spiele konnen auch dort gespielt werden, mit gemeinsamem Fortschritt und gemeinsamen Ranglisten.",
    },
    {
      question: "Fur welche Situationen eignet sich das besonders?",
      answer: "Vor allem fur den Arbeitsweg, Warteschlangen und kurze Pausen zwischendurch. Du startest schnell ohne das Handy herauszuholen und kannst nach einer kurzen Runde genauso leicht wieder aufhoren.",
    },
    {
      question: "Wie viele Minispiele sind aktuell enthalten?",
      answer: "Es gibt bereits mehr als 30 Apple-Watch-taugliche Minispiele und es kommen laufend neue dazu.",
    },
    {
      question: "Welche Spiele sind aktuell enthalten?",
      answer: "Aktuell dabei sind Moon Landing, Memory Match, Sokoban, Gold Miner, Brick Breaker, Minesweeper, Merge Tomato, Soccer Star, Ball Sort, Knife Challenge, Racing Car, Bubble Shooter, Plane Battle, Jump Jump, Dou Dizhu, Plane Adventure, Don’t Tap the White Tile, Stack Wood, Fruit Cut, Lianliankan, Match-3, Wooden Fish, Classic Pong, Color Reaction, Dodge Blocks, Tic-Tac-Toe, Sudoku, Gomoku, Tetris, 2048, Number Puzzle, Snake und Whac-A-Mole.",
    },
    {
      question: "Muss ich bezahlen, um zu spielen?",
      answer: "Mehr als 10 Spiele sind kostenlos. Die ubrigen lassen sich 5 Mal gratis testen. Danach gibt es sowohl einen Einmalkauf als auch ein Jahresabo.",
    },
  ],
  closingTitle: "Wenn du eine Apple-Watch-Spiele-App suchst, die sich wirklich fur die Watch richtig anfuhlt, fang hier an",
  closingLead: "Games for Watch liefert zuerst ein echtes Minispiele-Erlebnis auf Apple Watch und erweitert es dann auf dem iPhone um Listen, Rankings und mehr Kontext. Das ergibt eine starke Download-Grundlage.",
  closingSupport: ["Offline spielbar", "Keine Werbung", "Neue Spiele jede Woche", "Uber 30 Spiele"],
  footer:
    "© 2026 Games for Watch. Apple Watch, watchOS, iPhone und App Store sind Marken der Apple Inc.",
};

export const esCopy: LandingCopy = {
  ...enCopy,
  lang: "es",
  title: "Juegos para Apple Watch | minijuegos watchOS - Games for Watch",
  description:
    "Una app de juegos para Apple Watch en watchOS con soporte para iPhone. Juega a 2048, Tetris, Gomoku, Bubble Shooter, Gold Miner y otros minijuegos para Apple Watch incluso sin conexion.",
  url: "/es/",
  nav: [
    { title: "Ventajas", url: "#proof" },
    { title: "Capturas", url: "#gallery" },
    { title: "Experiencia", url: "#experience" },
    { title: "FAQ", url: "#faq" },
  ],
  languages: localeLanguages("es"),
  eyebrow: "Coleccion de minijuegos para Apple Watch",
  heroTitle: "Una coleccion de minijuegos pensada para Apple Watch",
  heroLead: "Empieza una partida rapida desde la muneca. Cuando quieras ver mas juegos o la lista completa, pasas al iPhone.",
  ctaPrimary: "Descargar en App Store",
  ctaSecondary: "Ver pantallas reales",
  proofItems: [
    { title: "Jugar sin conexion", description: "Puedes empezar una partida incluso sin red, ideal para ratos cortos." },
    { title: "Sin anuncios", description: "Las sesiones cortas se mantienen limpias y sin interrupciones." },
    { title: "Nuevos juegos cada semana", description: "La coleccion sigue creciendo en lugar de quedarse estancada." },
    { title: "Hecho para Apple Watch", description: "Corona digital, vibracion, sincronizacion y rankings refuerzan el uso en reloj." },
    { title: "30+ minijuegos", description: "No es una demo de tienda, sino una coleccion ya bastante amplia." },
  ],
  galleryTitle: "Las pantallas reales hacen mas facil justificar la descarga",
  galleryLead: "Primero mira la experiencia principal en Apple Watch y luego como el iPhone completa listas, rankings y navegacion.",
  faqTitle: "Preguntas frecuentes",
  faqLead: "Aqui reunimos las dudas mas importantes antes de descargar.",
  faqs: [
    {
      question: "Esta app esta pensada de verdad para Apple Watch?",
      answer: "Si. Apple Watch es el lugar para jugar rapido, mientras que el iPhone complementa con lista completa, favoritos y rankings.",
    },
    {
      question: "Puedo jugar sin conexion a internet?",
      answer: "Si. El juego sin conexion es una de las razones por las que encaja tan bien en trayectos, colas y pequenos momentos libres.",
    },
    {
      question: "Para que sirve principalmente la app de iPhone?",
      answer: "En iPhone es mas comodo ver la lista completa, favoritos y rankings. Los juegos del Apple Watch tambien se pueden jugar en iPhone con progreso y rankings compartidos.",
    },
    {
      question: "En que momentos encaja mejor?",
      answer: "Funciona especialmente bien en el trayecto diario, haciendo cola o en pausas cortas del trabajo. Puedes empezar al instante sin sacar el telefono y parar con facilidad tras una partida breve.",
    },
    {
      question: "Cuantos minijuegos incluye ahora mismo?",
      answer: "La app ya incluye mas de 30 minijuegos aptos para Apple Watch y sigue sumando nuevos con el tiempo.",
    },
    {
      question: "Que juegos estan disponibles actualmente?",
      answer: "La lista actual incluye Moon Landing, Memory Match, Sokoban, Gold Miner, Brick Breaker, Minesweeper, Merge Tomato, Soccer Star, Ball Sort, Knife Challenge, Racing Car, Bubble Shooter, Plane Battle, Jump Jump, Dou Dizhu, Plane Adventure, Don’t Tap the White Tile, Stack Wood, Fruit Cut, Lianliankan, Match-3, Wooden Fish, Classic Pong, Color Reaction, Dodge Blocks, Tic-Tac-Toe, Sudoku, Gomoku, Tetris, 2048, Number Puzzle, Snake y Whac-A-Mole.",
    },
    {
      question: "Hay que pagar para jugar?",
      answer: "Mas de 10 juegos son gratuitos. El resto se puede probar 5 veces gratis y luego elegir entre compra unica o suscripcion anual.",
    },
  ],
  closingTitle: "Si buscas una app de juegos para Apple Watch que realmente encaje con el reloj, empieza aqui",
  closingLead: "Games for Watch ofrece primero una experiencia real de minijuegos en Apple Watch y despues el iPhone amplia listas, rankings y navegacion. Es una base muy solida para convertir la descarga.",
  closingSupport: ["Sin conexion", "Sin anuncios", "Nuevos juegos cada semana", "30+ minijuegos"],
  footer:
    "© 2026 Games for Watch. Apple Watch, watchOS, iPhone y App Store son marcas de Apple Inc.",
};

export const ptCopy: LandingCopy = {
  ...enCopy,
  lang: "pt",
  title: "Jogos para Apple Watch | minijogos watchOS - Games for Watch",
  description:
    "Um app de jogos para Apple Watch no watchOS com suporte para iPhone. Jogue 2048, Tetris, Gomoku, Bubble Shooter, Gold Miner e outros minijogos para Apple Watch, ate offline.",
  url: "/pt/",
  nav: [
    { title: "Vantagens", url: "#proof" },
    { title: "Capturas", url: "#gallery" },
    { title: "Experiencia", url: "#experience" },
    { title: "FAQ", url: "#faq" },
  ],
  languages: localeLanguages("pt"),
  eyebrow: "Colecao de minijogos para Apple Watch",
  heroTitle: "Uma colecao de minijogos feita para Apple Watch",
  heroLead: "Comece uma partida rapida direto no pulso. Quando quiser ver mais jogos ou a lista completa, passe para o iPhone.",
  ctaPrimary: "Baixar na App Store",
  ctaSecondary: "Ver telas reais",
  proofItems: [
    { title: "Jogo offline", description: "Da para jogar sem conexao, ideal para intervalos bem curtos." },
    { title: "Sem anuncios", description: "As partidas curtas continuam limpas e sem interrupcoes." },
    { title: "Novos jogos toda semana", description: "A colecao continua crescendo em vez de ficar parada." },
    { title: "Feito para Apple Watch", description: "Coroa digital, haptica, sincronizacao e rankings reforcam o uso no relogio." },
    { title: "30+ minijogos", description: "Nao e apenas uma demo de loja, mas uma colecao que ja e bem ampla." },
  ],
  galleryTitle: "As telas reais ajudam a justificar melhor o download",
  galleryLead: "Veja primeiro a experiencia principal no Apple Watch e depois como o iPhone completa listas, rankings e navegacao.",
  faqTitle: "Perguntas frequentes",
  faqLead: "Aqui ficam reunidas as duvidas mais importantes antes do download.",
  faqs: [
    {
      question: "Este app foi mesmo pensado primeiro para Apple Watch?",
      answer: "Sim. O Apple Watch e o lugar para jogar rapido, enquanto o iPhone complementa com lista completa, favoritos e rankings.",
    },
    {
      question: "Posso jogar sem conexao com a internet?",
      answer: "Sim. O modo offline e uma das razoes mais claras para o app funcionar bem em deslocamentos, filas e pequenos intervalos.",
    },
    {
      question: "Para que serve principalmente o app no iPhone?",
      answer: "No iPhone fica mais facil ver a lista completa, favoritos e rankings. Os jogos do Apple Watch tambem podem ser jogados no iPhone, com progresso e rankings compartilhados.",
    },
    {
      question: "Em que momentos ele combina mais?",
      answer: "Funciona muito bem no trajeto diario, em filas e em pausas curtas do trabalho. Voce comeca na hora sem tirar o celular do bolso e tambem para com facilidade depois de uma rodada rapida.",
    },
    {
      question: "Quantos minijogos existem agora?",
      answer: "O app ja inclui mais de 30 minijogos adequados para Apple Watch e continua recebendo novos jogos com o tempo.",
    },
    {
      question: "Quais jogos estao incluidos atualmente?",
      answer: "A lista atual inclui Moon Landing, Memory Match, Sokoban, Gold Miner, Brick Breaker, Minesweeper, Merge Tomato, Soccer Star, Ball Sort, Knife Challenge, Racing Car, Bubble Shooter, Plane Battle, Jump Jump, Dou Dizhu, Plane Adventure, Don’t Tap the White Tile, Stack Wood, Fruit Cut, Lianliankan, Match-3, Wooden Fish, Classic Pong, Color Reaction, Dodge Blocks, Tic-Tac-Toe, Sudoku, Gomoku, Tetris, 2048, Number Puzzle, Snake e Whac-A-Mole.",
    },
    {
      question: "Preciso pagar para jogar?",
      answer: "Mais de 10 jogos sao gratuitos. Os demais podem ser testados 5 vezes gratis, com opcao de compra unica ou assinatura anual.",
    },
  ],
  closingTitle: "Se voce procura um app de jogos para Apple Watch que realmente combine com o relogio, comece por aqui",
  closingLead: "Games for Watch entrega primeiro uma experiencia real de minijogos no Apple Watch e depois amplia tudo no iPhone com listas, rankings e mais contexto. Isso ajuda bastante na conversao de download.",
  closingSupport: ["Offline", "Sem anuncios", "Novos jogos toda semana", "30+ minijogos"],
  footer:
    "© 2026 Games for Watch. Apple Watch, watchOS, iPhone e App Store sao marcas da Apple Inc.",
};

export const ruCopy: LandingCopy = {
  ...enCopy,
  lang: "ru",
  title: "Игры для Apple Watch | мини-игры watchOS - Games for Watch",
  description:
    "Приложение с играми для Apple Watch на watchOS с поддержкой iPhone. Играйте в 2048, Tetris, Gomoku, Bubble Shooter, Gold Miner и другие мини-игры для Apple Watch даже офлайн.",
  url: "/ru/",
  nav: [
    { title: "Преимущества", url: "#proof" },
    { title: "Скриншоты", url: "#gallery" },
    { title: "Опыт", url: "#experience" },
    { title: "FAQ", url: "#faq" },
  ],
  languages: localeLanguages("ru"),
  eyebrow: "Коллекция мини-игр для Apple Watch",
  heroTitle: "Коллекция мини-игр, в которой Apple Watch - главный экран",
  heroLead: "Запускайте быструю партию прямо с запястья. Когда хочется посмотреть больше игр и полный список, переходите на iPhone.",
  ctaPrimary: "Скачать в App Store",
  ctaSecondary: "Посмотреть реальные экраны",
  proofItems: [
    { title: "Офлайн-игра", description: "Можно играть без сети, что отлично подходит для очень коротких свободных моментов." },
    { title: "Без рекламы", description: "Короткие игровые сессии не прерываются рекламой и ощущаются чище." },
    { title: "Новые игры каждую неделю", description: "Коллекция продолжает расти, а не остается статичной." },
    { title: "Сделано для Apple Watch", description: "Digital Crown, тактильная отдача, синхронизация и рейтинги хорошо встроены в опыт часов." },
    { title: "30+ мини-игр", description: "Это уже большая подборка, а не просто витринная демо-версия." },
  ],
  galleryTitle: "Реальные экраны лучше объясняют, почему приложение стоит скачать",
  galleryLead: "Сначала посмотрите основной опыт на Apple Watch, а затем как iPhone дополняет списки, рейтинги и навигацию.",
  faqTitle: "FAQ",
  faqLead: "Здесь собраны самые важные вопросы перед скачиванием.",
  faqs: [
    {
      question: "Это приложение действительно в первую очередь для Apple Watch?",
      answer: "Да. Apple Watch здесь отвечает за быстрые игровые сессии, а iPhone дополняет опыт списком игр, избранным и рейтингами.",
    },
    {
      question: "Можно ли играть без интернета?",
      answer: "Да. Офлайн-режим - одна из главных причин, почему приложение хорошо подходит для дороги, очередей и коротких свободных пауз.",
    },
    {
      question: "Для чего в основном нужен iPhone?",
      answer: "На iPhone удобнее смотреть полный список игр, избранное и рейтинги. Игры с Apple Watch также доступны на iPhone, а прогресс и таблицы лидеров синхронизируются.",
    },
    {
      question: "Для каких ситуаций это подходит лучше всего?",
      answer: "Лучше всего это подходит для поездок, ожидания в очереди и коротких перерывов в течение дня. Можно быстро начать без телефона в руках и так же быстро остановиться после одной партии.",
    },
    {
      question: "Сколько мини-игр уже доступно?",
      answer: "В приложении уже есть более 30 мини-игр, хорошо подходящих для Apple Watch, и список продолжает расти.",
    },
    {
      question: "Какие игры сейчас доступны?",
      answer: "Сейчас доступны Moon Landing, Memory Match, Sokoban, Gold Miner, Brick Breaker, Minesweeper, Merge Tomato, Soccer Star, Ball Sort, Knife Challenge, Racing Car, Bubble Shooter, Plane Battle, Jump Jump, Dou Dizhu, Plane Adventure, Don’t Tap the White Tile, Stack Wood, Fruit Cut, Lianliankan, Match-3, Wooden Fish, Classic Pong, Color Reaction, Dodge Blocks, Tic-Tac-Toe, Sudoku, Gomoku, Tetris, 2048, Number Puzzle, Snake и Whac-A-Mole.",
    },
    {
      question: "Нужно ли платить, чтобы играть?",
      answer: "Более 10 игр доступны бесплатно. Остальные можно попробовать 5 раз бесплатно, после чего доступны как разовая покупка, так и годовая подписка.",
    },
  ],
  closingTitle: "Если вы ищете игру для Apple Watch, которая действительно подходит для часов, начните отсюда",
  closingLead: "Games for Watch сначала дает полноценный опыт мини-игр на Apple Watch, а потом расширяет его на iPhone списками, рейтингами и дополнительным контекстом. Это хорошая основа для SEO и конверсии в установку.",
  closingSupport: ["Офлайн", "Без рекламы", "Новые игры каждую неделю", "30+ мини-игр"],
  footer:
    "© 2026 Games for Watch. Apple Watch, watchOS, iPhone и App Store являются товарными знаками Apple Inc.",
};
