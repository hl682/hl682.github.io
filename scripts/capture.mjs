import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const base = process.env.BASE_URL || "http://127.0.0.1:3456";
const out = process.env.OUT_DIR || "/opt/cursor/artifacts/screenshots";

async function scrollTo(page, selector) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 24;
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(y, { immediate: true });
    else window.scrollTo(0, y);
  }, selector);
  await page.waitForTimeout(450);
}

const shots = [];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(base, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await mkdir(out, { recursive: true });

async function save(name) {
  const file = path.join(out, name);
  await page.screenshot({ path: file });
  shots.push(file);
  console.log(file);
}

await page.waitForTimeout(1400);
await save("home-frontispiece.png");
await scrollTo(page, "#research");
await save("home-research.png");
await scrollTo(page, "#practice");
await save("home-practice.png");
await scrollTo(page, "#runway");
await save("home-runway.png");
await page.locator(".story-menu-btn").click();
await page.waitForTimeout(400);
await save("home-menu.png");
await page.keyboard.press("Escape");
await page.waitForTimeout(300);

await page.goto(`${base}/research`, { waitUntil: "networkidle" });
await save("research.png");
await page.goto(`${base}/papers/htde-maddpg`, { waitUntil: "networkidle" });
await save("paper.png");
await page.goto(`${base}/runway`, { waitUntil: "networkidle" });
await save("runway.png");
await page.goto(`${base}/zh`, { waitUntil: "networkidle" });
await save("home-zh.png");

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(base, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await save("home-mobile.png");

await browser.close();
console.log(JSON.stringify(shots, null, 2));
