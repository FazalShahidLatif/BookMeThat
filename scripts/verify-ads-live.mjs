
/**
 * Prove the BookMeThat Adsterra slots actually SERVE.
 * Grepping the bundle only proves the keys shipped.
 * Usage: node scripts/verify-ads-live.mjs https://www.bookmethat.com / /luggage-storage-radical-storage-guide
 */
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const puppeteer = require("puppeteer-core");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const ZONES = {
  leaderboard: "51cd458a7327856abfbff5e0cc4c1f48",
  rectangle:   "88444f4484ca606988ee4f54bb7db44b",
  skyscraper:  "b0f6c2e26dccbefa938e07e7f6f38f69",
};
const [site, ...paths] = process.argv.slice(2);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

let anyFilled = false;
for (const p of paths) {
  const url = site.replace(/\/$/, "") + p;
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  const reqs = [];
  page.on("request", (r) => { if (/invoke\.js/.test(r.url())) reqs.push(r.url()); });

  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

  // Accept marketing cookies so the consent gate opens.
  await page.evaluate(() => {
    localStorage.setItem("gdpr_consent_status", JSON.stringify({ necessary: true, analytics: true, marketing: true }));
  });
  await page.reload({ waitUntil: "networkidle2", timeout: 60000 });

  // Scroll everything into view to trigger the lazy loader.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 6000));

  const slots = await page.evaluate(() => {
    return [...document.querySelectorAll("[data-ad-zone]")].map((el) => {
      const f = el.querySelector("iframe");
      let inner = "";
      try {
        const d = f && f.contentDocument;
        const nested = d && d.querySelector("iframe, img, ins");
        inner = nested ? (nested.src || nested.tagName) : "";
      } catch (e) { inner = "cross-origin"; }
      return { id: el.id, zone: el.getAttribute("data-ad-zone"), status: el.getAttribute("data-ad-status"), hasIframe: !!f, inner };
    });
  });

  console.log(`\n${p}`);
  console.log(`  invoke.js requests: ${reqs.length}`);
  reqs.slice(0, 4).forEach((r) => console.log(`     ${r.replace(/^https?:\/\//, "").slice(0, 80)}`));
  if (!slots.length) console.log("  NO AD SLOTS IN DOM");
  for (const s of slots) {
    const ok = s.status === "filled" || s.inner === "cross-origin";
    if (ok) anyFilled = true;
    console.log(`  ${s.id.padEnd(22)} ${s.zone.padEnd(12)} ${s.status.padEnd(7)} iframe=${s.hasIframe} inner=${String(s.inner).slice(0, 60)}`);
  }
  await page.close();
}

await browser.close();
console.log(anyFilled ? "\nRESULT: at least one slot rendered ad content" : "\nRESULT: no slot rendered ad content");
process.exit(anyFilled ? 0 : 1);
