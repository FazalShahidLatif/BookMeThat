
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const puppeteer = require("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const REAL_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"] });
const page = await browser.newPage();
// iPhone-ish viewport
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
await page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1");
await page.goto("https://www.bookmethat.com/best-esim-usa", { waitUntil: "networkidle2", timeout: 60000 });
await page.evaluate(() => localStorage.setItem("gdpr_consent_status", JSON.stringify({necessary:true,analytics:true,marketing:true})));
await page.reload({ waitUntil: "networkidle2", timeout: 60000 });
await new Promise(r => setTimeout(r, 4000));
const r = await page.evaluate(() => {
  const de = document.documentElement;
  const wide = [];
  document.querySelectorAll('*').forEach(el => {
    const b = el.getBoundingClientRect();
    if (b.width > window.innerWidth + 1 && b.width > 0 && b.height > 0) {
      wide.push({ tag: el.tagName, cls: (el.className||'').toString().slice(0,44), w: Math.round(b.width), h: Math.round(b.height) });
    }
  });
  // tap targets smaller than 44px
  const small = [];
  document.querySelectorAll('a,button').forEach(el => {
    const b = el.getBoundingClientRect();
    if (b.width > 0 && (b.width < 44 || b.height < 44)) small.push({ tag: el.tagName, w: Math.round(b.width), h: Math.round(b.height), t: (el.innerText||'').slice(0,20) });
  });
  return { innerWidth: window.innerWidth, scrollWidth: de.scrollWidth, overflowX: de.scrollWidth - de.clientWidth,
           wideCount: wide.length, wide: wide.slice(0,8), smallTap: small.length, smallTapList: small.slice(0,6) };
});
console.log(JSON.stringify(r, null, 1));
await browser.close();
