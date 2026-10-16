
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const puppeteer = require("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const REAL_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36";
const URL = process.argv[2] || "https://www.bookmethat.com/best-esim-usa";

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new",
  args: ["--no-sandbox","--disable-setuid-sandbox"] });

async function measure(label, opts) {
  const page = await browser.newPage();
  if (opts.mobile) {
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    await page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1");
  } else {
    await page.setViewport({ width: 1440, height: 900 });
    await page.setUserAgent(REAL_UA);
  }
  await page.setCacheEnabled(false);
  const res = [];
  page.on("response", r => { try { const u=r.url(); if(!u.startsWith("data:")) res.push({url:u,status:r.status(),size:(r.headers()["content-encoding"]?"":null)});}catch{} });
  const t0 = Date.now();
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 90000 });
  const navMs = Date.now() - t0;
  await new Promise(r => setTimeout(r, 3000));

  const vitals = await page.evaluate(async () => {
    const out = { fcp:null, lcp:null, cls:0, tbt:null, resources:[], totalBytes:0 };
    const po = new PerformanceObserver(l => { for (const e of l.getEntries()) { if (e.entryType==="paint" && e.name==="first-contentful-paint") out.fcp = e.startTime; } });
    try { po.observe({type:"paint", buffered:true}); } catch(e){}
    const lcp = new PerformanceObserver(l => { const es=l.getEntries(); out.lcp = es[es.length-1].startTime; });
    try { lcp.observe({type:"largest-contentful-paint", buffered:true}); } catch(e){}
    const cls = new PerformanceObserver(l => { for (const e of l.getEntries()) if(!e.hadRecentInput) out.cls += e.value; });
    try { cls.observe({type:"layout-shift", buffered:true}); } catch(e){}
    await new Promise(r => setTimeout(r, 2500));
    for (const r of performance.getEntriesByType("resource")) {
      const isDoc = r.initiatorType === "navigation";
      out.totalBytes += r.transferSize || r.encodedBodySize || 0;
      out.resources.push({ t: r.initiatorType, name: (r.name||"").slice(0,80), size: r.encodedBodySize||0, transfer: r.transferSize||0, dur: Math.round(r.duration||0) });
    }
    out.resources.sort((a,b)=>b.size-a.size);
    out.blocking = (performance.getEntriesByType("longtask")||[]).length;
    return out;
  });
  console.log(`\n### ${label}`);
  console.log(`  time to networkidle : ${navMs} ms`);
  console.log(`  FCP                 : ${vitals.fcp ? Math.round(vitals.fcp) : "n/a"} ms`);
  console.log(`  LCP                 : ${vitals.lcp ? Math.round(vitals.lcp) : "n/a"} ms`);
  console.log(`  CLS                 : ${vitals.cls.toFixed(4)}`);
  console.log(`  total bytes         : ${(vitals.totalBytes/1024).toFixed(1)} KB`);
  console.log(`  top resources (encoded KB):`);
  vitals.resources.slice(0,8).forEach(r => console.log(`     ${(r.size/1024).toFixed(1).padStart(8)} KB  ${r.t.padEnd(14)} ${r.name}`));
  await page.close();
}

await measure("DESKTOP 1440x900", { mobile:false });
await measure("MOBILE 390x844 (touch)", { mobile:true });
await browser.close();
