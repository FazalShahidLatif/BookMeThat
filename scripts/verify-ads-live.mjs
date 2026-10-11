/**
 * Prove the BookMeThat Adsterra slots actually SERVE.
 *
 * Grepping the bundle only proves the keys shipped. This loads the real page
 * and reads the ad network own traffic.
 *
 * WHAT A PASS LOOKS LIKE
 *   a watch.<digits>.js request carrying key=<your zone key>, and an
 *   impression beacon (impr.gif) alongside it.
 *
 * Two traps this script exists to avoid:
 *
 *   1. A headless user agent gets a 200 with a 0-byte body from this network.
 *      That looks identical to a broken slot. Send a normal Chrome UA.
 *   2. The slot nested iframe reads "about:blank" even when the ad is
 *      serving - the creative is written into that document by the watch
 *      script. Asserting on the iframe src reports a false negative. Assert on
 *      the network instead.
 *
 * Usage:
 *   node scripts/verify-ads-live.mjs https://www.bookmethat.com / /best-esim-usa
 */
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const puppeteer = require("puppeteer-core");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const REAL_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36";

// Single source of truth for the zone keys. Never retype these.
const ZONES = {
  leaderboard: "7329c4e64bae7da3d58f530f76605126",
  rectangle: "c24c5fa0ca416b18e274984483fd14be",
  skyscraper: "3222e3d2386f6549c6d7142fae656294",
};

const [site, ...paths] = process.argv.slice(2);
if (!site || !paths.length) {
  console.error("usage: node scripts/verify-ads-live.mjs <site-url> <path> [path...]");
  process.exit(2);
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

let served = 0;
let slotsSeen = 0;

for (const p of paths) {
  const url = site.replace(/\/$/, "") + p;
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.setUserAgent(REAL_UA);

  const creatives = [];
  const beacons = [];
  const invokeBytes = [];
  page.on("response", async (res) => {
    const u = res.url();
    if (/invoke\.js/.test(u)) {
      let len = -1;
      try {
        len = (await res.buffer()).length;
      } catch {}
      invokeBytes.push(len);
    }
    if (/watch\.\d+\.js/.test(u) && /key=/.test(u)) creatives.push(u);
    if (/impr\.gif|pixel\/ase/.test(u)) beacons.push(u);
  });

  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  // Open the consent gate, then reload so the slots initialise.
  await page.evaluate(() => {
    localStorage.setItem(
      "gdpr_consent_status",
      JSON.stringify({ necessary: true, analytics: true, marketing: true })
    );
  });
  await page.reload({ waitUntil: "networkidle2", timeout: 60000 });

  // Scroll to trigger the lazy loader, then let the creatives land.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 9000));

  const slotIds = await page.evaluate(() =>
    [...document.querySelectorAll("[data-ad-zone]")].map((el) => ({
      id: el.id,
      zone: el.getAttribute("data-ad-zone"),
    }))
  );
  slotsSeen += slotIds.length;

  // Match each creative back to the zone key it carries.
  const matched = [];
  for (const u of creatives) {
    const hit = Object.entries(ZONES).find(([, k]) => u.includes("key=" + k));
    if (hit) matched.push(hit[0]);
  }

  const ok = matched.length > 0 && beacons.length > 0;
  if (ok) served++;

  console.log("\n" + p);
  console.log("  ad slots in DOM : " + slotIds.length + "  " + slotIds.map((s) => s.id).join(", "));
  console.log("  invoke.js sizes : " + (invokeBytes.join(", ") || "none"));
  console.log("  creative filled : " + (matched.length ? matched.join(", ") : "NONE"));
  console.log("  impr beacons    : " + beacons.length);
  creatives.slice(0, 4).forEach((u) => console.log("     " + u.replace(/^https?:\/\//, "").slice(0, 105)));
  console.log("  => " + (ok ? "SERVING" : "NOT SERVING"));

  await page.close();
}

await browser.close();
console.log("\nRESULT: " + served + "/" + paths.length + " pages served a real creative (" + slotsSeen + " slots inspected)");
process.exit(served === paths.length ? 0 : 1);
