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

await save("home-frontispiece.png");
await scrollTo(page, "#manifesto");
await save("home-manifesto.png");
await scrollTo(page, "#doors");
await save("home-doors.png");
await scrollTo(page, "#catalogue");
await save("home-catalogue.png");

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
