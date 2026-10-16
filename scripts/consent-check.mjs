
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const puppeteer = require("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new",
  args: ["--no-sandbox","--disable-setuid-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.setUserAgent(UA);
await page.setCacheEnabled(false);
const sent = [];
page.on("request", r => { const u=r.url(); if (/google-analytics\.com\/g\//.test(u) || /\/collect/.test(u)) sent.push(u.slice(0,90)); });
await page.goto("https://www.bookmethat.com/best-esim-usa", { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise(r=>setTimeout(r,3000));

// what is the consent state before any decision?
const before = await page.evaluate(() => {
  const dl = window.dataLayer || [];
  const consents = dl.filter(x => Array.isArray(x) && x[0]==="consent");
  return { hasBanner: !!document.getElementById("gdpr-cookie-banner"), consentEvents: consents.length };
});
console.log("BEFORE decision:", JSON.stringify(before));
console.log("GA requests before decision:", sent.length);

// click Accept
await page.evaluate(() => {
  const btns = [...document.querySelectorAll("#gdpr-cookie-banner button")];
  const b = btns.find(x => /Accept/i.test(x.innerText));
  if (b) b.click();
});
await new Promise(r=>setTimeout(r,2500));
const afterAccept = await page.evaluate(() => ({
  consentEvents: (window.dataLayer||[]).filter(x => Array.isArray(x) && x[0]==="consent").length,
  ls: localStorage.getItem("gdpr_consent_status")
}));
console.log("AFTER accept:", JSON.stringify(afterAccept));
await browser.close();
