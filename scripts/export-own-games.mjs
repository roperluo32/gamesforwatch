#!/usr/bin/env node
/**
 * Export GameHub own games from GameModel.swift + copy preview images.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DEFAULT_SWIFT =
  process.env.GAME_MODEL_PATH ||
  "/Users/happyyan/work/ios/game-box/Games/GameModel.swift";
const DEFAULT_ASSETS =
  process.env.GAME_PREVIEWS_PATH ||
  "/Users/happyyan/work/ios/game-box/GameBox_App/Assets.xcassets/game_previews";

const NAME_EN = {
  太空侵略者: "Space Invaders",
  黑白棋: "Reversi",
  空气手势: "Air Gesture",
  青蛙过河: "Frogger",
  合成西红柿: "Watermelon Merge",
  小行星: "Asteroids",
  月球着陆: "Lunar Lander",
  接水管: "Pipe Connect",
  斗地主: "Dou Dizhu",
  推箱子: "Sokoban",
  俄罗斯方块: "Tetris",
  "2048": "2048",
  五子棋: "Gomoku",
  扫雷: "Minesweeper",
  打砖块: "Brick Breaker",
  挖金子: "Gold Miner",
  飞刀挑战: "Knife Hit",
  跳一跳: "Jump Jump",
  记忆翻牌: "Memory Match",
  足球之星: "Soccer Star",
  彩球排序: "Ball Sort",
  都市赛车: "City Racer",
  经典乒乓: "Classic Pong",
  颜色反应: "Color Reaction",
  躲避方块: "Dodge Blocks",
  井字棋: "Tic Tac Toe",
  数独: "Sudoku",
  数字华容道: "Sliding Puzzle",
  贪吃蛇: "Snake",
  打地鼠: "Whack-a-Mole",
  泡泡消除: "Bubble Shooter",
  飞机大战: "Plane Battle",
  飞机大冒险: "Plane Adventure",
  别踩白块: "Don't Tap White",
  堆木头: "Stack Wood",
  切水果: "Fruit Ninja",
  连连看: "Lian Lian Kan",
  消消乐: "Match-3",
  功德木鱼: "Wooden Fish",
};

const EXTRA_SLUGS = {
  月球着陆: "lunar_lander",
  接水管: "pipe_connect",
};

function parseSlugMap(swift) {
  const map = { ...EXTRA_SLUGS };
  const block = swift.match(/static func slug\(for name: String\) -> String \{([\s\S]*?)\n    \}/);
  if (!block) return map;
  const re = /case "([^"]+)":\s*\n\s*return "([^"]+)"/g;
  let m;
  while ((m = re.exec(block[1]))) {
    map[m[1]] = m[2];
  }
  return map;
}

function parseGames(swift) {
  const start = swift.indexOf("static let availableGames: [Game] = [");
  if (start < 0) throw new Error("availableGames not found");
  const end = swift.indexOf("// 未来可以在这里添加更多游戏", start);
  const body = swift.slice(start, end > 0 ? end : start + 50000);

  const games = [];
  let i = 0;
  while (i < body.length) {
    const idx = body.indexOf("Game(", i);
    if (idx < 0) break;

    // Skip commented Game( lines
    const lineStart = body.lastIndexOf("\n", idx) + 1;
    const linePrefix = body.slice(lineStart, idx);
    if (/\/\/|^\s*\*/.test(linePrefix) || /^\s*\/\//.test(body.slice(Math.max(0, idx - 20), idx))) {
      // check if the line itself is commented
      const beforeLine = body.slice(lineStart, idx + 4);
      if (/^\s*\/\//.test(beforeLine) || /\/\/[^\n]*Game\(/.test(body.slice(lineStart, idx + 10))) {
        i = idx + 5;
        continue;
      }
    }
    // Stronger: if from lineStart to idx only whitespace or // comment
    if (/^\s*\/\//.test(body.slice(lineStart))) {
      i = idx + 5;
      continue;
    }

    // Balanced paren parse from Game(
    let depth = 0;
    let j = idx + 4; // at '('
    for (; j < body.length; j++) {
      const ch = body[j];
      if (ch === "(") depth++;
      else if (ch === ")") {
        depth--;
        if (depth === 0) {
          j++;
          break;
        }
      }
    }
    const block = body.slice(idx + 5, j - 1);
    i = j;

    const nameMatch = block.match(/name:\s*"([^"]+)"/);
    if (!nameMatch) continue;
    const name = nameMatch[1];

    let description = "";
    const descLit = block.match(/description:\s*"([^"]*)"/);
    if (descLit) description = descLit[1];

    const isNew = /isNew:\s*true/.test(block);
    const isFeatured = /isFeatured:\s*true/.test(block);
    const isVip = /isVip:\s*true/.test(block);
    const isAvailable = !/isAvailable:\s*false/.test(block);
    if (!isAvailable) continue;

    games.push({ name, description, isNew, isFeatured, isVip });
  }
  return games;
}

function copyPreview(assetsDir, name, outDir, slug) {
  const imageset = path.join(assetsDir, `${name}.imageset`);
  if (!fs.existsSync(imageset)) {
    console.warn(`Missing preview imageset: ${name}`);
    return null;
  }
  const files = fs.readdirSync(imageset).filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f));
  if (!files.length) {
    console.warn(`No image in imageset: ${name}`);
    return null;
  }
  // Prefer largest file
  files.sort((a, b) => {
    return fs.statSync(path.join(imageset, b)).size - fs.statSync(path.join(imageset, a)).size;
  });
  const src = path.join(imageset, files[0]);
  const ext = path.extname(files[0]).toLowerCase() || ".png";
  const destName = `${slug}${ext}`;
  fs.copyFileSync(src, path.join(outDir, destName));
  return destName;
}

function main() {
  const swiftPath = process.argv[2] || DEFAULT_SWIFT;
  const assetsDir = process.argv[3] || DEFAULT_ASSETS;
  if (!fs.existsSync(swiftPath)) {
    console.error(`GameModel.swift not found: ${swiftPath}`);
    process.exit(1);
  }

  const swift = fs.readFileSync(swiftPath, "utf8");
  const slugMap = parseSlugMap(swift);
  const parsed = parseGames(swift);

  const outDir = path.join(ROOT, "public/games/previews");
  fs.mkdirSync(outDir, { recursive: true });

  const games = parsed.map((g) => {
    const slug = slugMap[g.name] || g.name.replace(/\s+/g, "_").toLowerCase();
    const preview = copyPreview(assetsDir, g.name, outDir, slug);
    return {
      slug,
      name: g.name,
      nameEn: NAME_EN[g.name] || g.name,
      description: g.description || `${NAME_EN[g.name] || g.name} for Apple Watch.`,
      descriptionZh: g.description || "",
      isNew: g.isNew,
      isFeatured: g.isFeatured,
      isVip: g.isVip,
      preview: preview ? `/games/previews/${preview}` : null,
    };
  });

  const outJson = path.join(ROOT, "src/data/own-games.json");
  fs.mkdirSync(path.dirname(outJson), { recursive: true });
  fs.writeFileSync(
    outJson,
    JSON.stringify(
      {
        source: swiftPath,
        exportedAt: new Date().toISOString(),
        appStoreId: "6752821820",
        appStoreUrl: "https://apps.apple.com/app/id6752821820",
        games,
      },
      null,
      2
    ) + "\n"
  );

  console.log(`Exported ${games.length} games → ${outJson}`);
  console.log(`Previews → ${outDir} (${games.filter((g) => g.preview).length} files)`);
}

main();
