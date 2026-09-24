import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const base = process.env.BASE_URL || "http://127.0.0.1:3456";
const out = process.env.OUT_DIR || "/opt/cursor/artifacts/screenshots";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await mkdir(out, { recursive: true });
const shots = [];

async function save(name) {
  const file = path.join(out, name);
  await page.screenshot({ path: file });
  shots.push(file);
  console.log(file);
}

await page.goto(base, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(600);
await save("home-split.png");

await page.goto(`${base}/academic`, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
await save("academic-gown.png");

await page.goto(`${base}/academic#library`, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
await save("academic-library.png");

await page.goto(`${base}/papers/htde-maddpg`, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await save("paper-reader.png");

await page.goto(`${base}/model`, { waitUntil: "networkidle" });
await page.waitForTimeout(400);
await page.locator(".pose-next").click();
await page.waitForTimeout(160);
await save("studio-flash.png");

await page.locator("#card").scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await save("digicard.png");

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(base, { waitUntil: "networkidle" });
await page.waitForTimeout(400);
await save("home-mobile.png");

await browser.close();
console.log(JSON.stringify(shots, null, 2));
