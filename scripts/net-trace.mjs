
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const puppeteer = require("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new",
  args: ["--no-sandbox","--disable-setuid-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36");
await page.setCacheEnabled(false);
const reqs = [];
page.on("request", r => reqs.push({ url: r.url(), type: r.resourceType(), initiator: (r.initiator()||{}).type }));
page.on("response", async res => {
  try {
    const buf = await res.buffer();
    if (buf.length > 30000) reqs.push({ url: res.url(), size: buf.length, type: res.request().resourceType() });
  } catch {}
});
await page.goto("https://www.bookmethat.com/best-esim-usa", { waitUntil: "networkidle2", timeout: 90000 });
await new Promise(r => setTimeout(r, 4000));
console.log("=== large responses (>30KB) ===");
reqs.filter(r => r.size).sort((a,b)=>b.size-a.size).slice(0,10).forEach(r => console.log(`  ${(r.size/1024).toFixed(1).padStart(7)} KB  ${r.type.padEnd(9)} ${r.url.slice(0,95)}`));
console.log("\n=== who requests a2g3? ===");
reqs.filter(r => r.url.includes("a2g3")).forEach(r => console.log(`  ${r.type}  ${r.url.slice(0,90)}`));
await browser.close();
