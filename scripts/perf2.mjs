
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const puppeteer = require("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new",
  args: ["--no-sandbox","--disable-setuid-sandbox"] });
for (const run of [1,2]) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.setUserAgent(UA);
  await page.setCacheEnabled(false);
  const slow = [];
  page.on("request", r => { r.__t0 = Date.now(); });
  page.on("response", async res => { try { const b = await res.buffer(); slow.push({u:res.url().slice(0,80), ms: Date.now()-(res.request().__t0||Date.now()), kb:(b.length/1024).toFixed(0)}); } catch {} });
  const t0 = Date.now();
  await page.goto("https://www.bookmethat.com/best-esim-usa", { waitUntil: "domcontentloaded", timeout: 60000 });
  const dcl = Date.now()-t0;
  const vitals = await page.evaluate(async () => {
    const g = (n) => { const e = performance.getEntriesByType("paint").find(x=>x.name===n); return e?Math.round(e.startTime):null; };
    let lcp=null; const o=new PerformanceObserver(l=>{const es=l.getEntries();lcp=es[es.length-1].startTime;});
    try{o.observe({type:"largest-contentful-paint",buffered:true});}catch(e){}
    let cls=0; const c=new PerformanceObserver(l=>{for(const e of l.getEntries()) if(!e.hadRecentInput) cls+=e.value;});
    try{c.observe({type:"layout-shift",buffered:true});}catch(e){}
    await new Promise(r=>setTimeout(r,3000));
    return { fcp:g("first-contentful-paint"), lcp:lcp?Math.round(lcp):null, cls:cls.toFixed(4),
             navStart: performance.getEntriesByType("navigation")[0] ? Math.round(performance.getEntriesByType("navigation")[0].responseStart) : null };
  });
  await new Promise(r=>setTimeout(r,6000));
  const slowBig = slow.filter(s=>s.kb>50).sort((a,b)=>b.ms-a.ms).slice(0,6);
  console.log(`\n--- desktop run ${run} ---`);
  console.log(`  domcontentloaded : ${dcl} ms`);
  console.log(`  FCP              : ${vitals.fcp} ms`);
  console.log(`  LCP              : ${vitals.lcp} ms`);
  console.log(`  CLS              : ${vitals.cls}`);
  console.log(`  slowest >50KB    :`);
  slowBig.forEach(s=>console.log(`     ${String(s.ms).padStart(6)} ms  ${s.kb} KB  ${s.u}`));
  await page.close();
}
await browser.close();
