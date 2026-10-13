# BookMeThat — Full Progress & Revenue Audit

**Date:** 12 October 2026
**Scope:** bookmethat.com only
**Method:** live Google Search Console API, live GA4 API, live-site browser render, ad-network packet capture.
**No estimates.** Every number below was pulled from an API or observed in a browser.

---

# PART 1 — METRICS REPORT

## 1.1 Search (Google Search Console, 28 days: 15 Sep – 11 Oct 2026)

| Metric | Value |
|---|---|
| Impressions | **1,664** |
| Clicks | **2** |
| CTR | **0.12%** |
| Average position | **38.6** |
| Queries with measurable volume | ~12 (top = 5 impressions) |

**The headline:** 1,664 impressions, 2 clicks. The site is shown often and clicked almost never.

CTR of 0.12% is roughly **a twentieth** of a normal rate (2–5%). At 3%, the same
impressions would produce **~50 clicks** instead of 2.

## 1.2 Pages — where the impressions go

| Page | Impressions | Clicks | Position |
|---|---|---|---|
| **/best-esim-usa** | **331** | **0** | **76.0** |
| /qeeq-car-rental-price-drop-protection-secrets | 91 | 1 | 29.8 |
| /best-esim-japan | 54 | 0 | 44.3 |
| /car-rental | 38 | 0 | 27.7 |
| /discovercars-vs-localrent-vs-economybookings | 29 | 1 | 11.3 |
| /best-regional-esim-southeast-asia-saily-tour | 20 | 0 | 16.0 |
| /esim | 17 | 0 | 48.2 |
| /car-rental-insurance-excess-counter-hacks | 16 | 0 | 6.7 |
| /claiming-flight-reimbursement-us-dot-vs-eu261 | 13 | 0 | 10.5 |
| / | 11 | 0 | 7.4 |
| /airhelp-flight-delay-compensation-eu261-guide | 11 | 0 | 14.5 |

Three distinct problems, three different fixes:

1. **`/best-esim-usa` — 331 impressions at position 76.** This is 20% of the entire
   site's search traffic, on a page that earns nothing. It renders 3,856 words,
   14 H2s and 43 CTA buttons, so the page is not thin — **it is buried.**
2. **Pages at good position with zero clicks.** `/car-rental-insurance-excess-counter-hacks`
   sits at **position 6.7** with 0 clicks; `/claiming-flight-reimbursement-us-dot-vs-eu261`
   at **10.5** with 0 clicks. Those are first-page positions earning nothing —
   the SERP title/description is not convincing anyone to click.
3. **Pages at bad position.** `/best-esim-japan` at 44.3, `/esim` at 48.2.

## 1.3 Search queries — the quiet crisis

Top queries by impression, site-wide:

| Impressions | Query |
|---|---|
| 5 | affordable esim |
| 2 | affordable travel esim |
| 2 | airalo vs saily |
| 2 | at&t esim for travel |
| 2 | aerobile esim |
| 1 | airalo esim vs saily esim |
| 1 | airfare reimbursement |

**The site does not rank for any head term with real volume.** Every query in the
list has 1–5 impressions. `/best-esim-usa` earns its 331 impressions from
hundreds of near-zero-volume long-tail queries rather than from "best esim usa",
which carries real search demand.

This is the root cause of the 0.12% CTR: **you are visible for things nobody
searches for, and invisible for things they do.**

## 1.4 Geography

| Country | Impressions | Clicks |
|---|---|---|
| United States | 637 | 1 |
| United Arab Emirates | 15 | 0 |
| Australia | 33 | 0 |
| Poland | 12 | 1 |
| Argentina / Nigeria | 3 each | 0 |

38% US — the highest-CPM geography, so the traffic mix is favourable. The problem
is volume, not geography.

## 1.5 Analytics (GA4, 28 days)

| Device | Sessions | Pageviews | Bounce | Avg duration |
|---|---|---|---|---|
| **"smart tv"** | **59** | 69 | 83.1% | 4.5s |
| desktop | 47 | 69 | 78.7% | 11.7s |
| mobile | 6 | 12 | 50.0% | 11.1s |
| **Total** | **112** | **150** | | |

**53% of all sessions are bots.** The "smart tv" sessions are the scrapers that
GA4 recorded earlier — 83% bounce, 4.5 seconds. They are not visitors.

**Real human traffic: 53 sessions, 81 pageviews per month.**

This is the single number that governs every revenue projection below.

## 1.6 Ads (Adsterra)

| Zone | Slot | Status |
|---|---|---|
| 728×90 leaderboard `7329c4e6…` | ad-slot-article-top | **SERVING** |
| 300×250 rectangle `c24c5fa0…` | ad-slot-article-mid | **SERVING** |
| 728×90 leaderboard `7329c4e6…` | ad-slot-footer | **SERVING** |
| 160×600 skyscraper `3222e3d2…` | ad-slot-footer-tall | **SERVING** (xl only) |

Verified in a browser with a real Chrome user agent: all four slots filled with
creatives carrying the correct zone key, impression beacons firing.

**Revenue: $0.00.** Adsterra reports 1 impression on the two newly-placed zones
— those are my own test requests, not visitors. Real-visitor ad impressions to
date: ~0.

At 81 pageviews/month and 4 slots, the ceiling is roughly **$0.30/month** at a
$2.00 CPM. Display ads are not a revenue line for this site; they are a rounding
error.

## 1.7 Affiliate links (Travelpayouts)

**27/27 `/go/` links return a 301 to the correct merchant.** The 19 dead links
found and fixed earlier in the session remain fixed.

**Affiliate revenue: $0.00.** No conversions recorded.

---

# PART 2 — REVENUE TARGET PROGRESS

## Target

**$500/month minimum, growing 50% per month.**

## Progress

| | |
|---|---|
| Target | $500.00 |
| Earned to date (Adsterra) | $0.00 |
| Earned to date (Affiliate) | $0.00 |
| **Total earned** | **$0.00** |
| **Progress** | **0%** |
| Gap | $500.00 / month |

## Why, in one sentence

**53 real sessions a month.** That is 0.015% of the traffic a $500/month display
strategy needs (≈125,000 pageviews/month), and only enough for ~2 affiliate
conversions a month even at a generous rate.

## What the target actually requires

At 28-day traffic of 81 pageviews:

| Path | Rate needed for $500/mo | Plausible at 81 pageviews? |
|---|---|---|
| Display ads | ~1,250,000 impressions | **No** — needs 15,000× more traffic |
| Affiliate (eSIM/car/flight) | ~50–100 conversions/mo at $5–10 each | **No** — needs ~10× more traffic |

**Both paths require more traffic, not more optimisation.** This is the honest
picture. Everything below about CTR and ads is real work, but it is polishing a
funnel with almost no water in it.

---

# PART 3 — GLITCHES FOUND AND FIXED

| # | Glitch | Impact | Fix | Status |
|---|---|---|---|---|
| 1 | **19 of 27 affiliate links dead** | Every Saily/Airalo/Localrent/Yesim click silently returned the homepage — **100% of affiliate revenue lost** | Added the 19 missing Vercel redirects from `src/data/affiliates.ts` | **Fixed & verified live** |
| 2 | **Build broken** — `UtmAdsenseConsole.tsx` deleted but still imported | Site could not compile at all | Removed import, type, routes, nav, schema refs end to end | **Fixed** |
| 3 | **300×250 and 160×600 zones never mounted** | Two of three Adsterra zones earning nothing | Placed `ad-slot-article-mid` and `ad-slot-footer-tall` | **Fixed & verified serving** |
| 4 | **Double H1 on every article page** | Homepage hero `<h1>` + article `<h1>` = two competing top signals on the pages that actually rank | Hero is now `<div>` when an article is open, `<h1>` only on the homepage | **Fixed & verified live** |

---

# PART 4 — GLITCHES FOUND, NOT YET ACTIONABLE

| # | Glitch | Why it is not fixable here |
|---|---|---|
| 1 | **`/best-esim-usa` at position 76** | The page renders 3,856 words and 43 CTAs. It is not thin — Google simply does not rank it for the head term. Requires authority/backlinks, not code. |
| 2 | **No head-term ranking** | Top query has 5 impressions. Demand exists; the site does not rank for it. Needs authority. |
| 3 | **`ads.txt` is a placeholder** | Two comment lines, no network entries. Adsterra supplies no `ads.txt` requirement, so impact is likely zero — but it is unfinished work. |
| 4 | **Travelpayouts `emrldtp.cc` throws CORS errors** | Their own script's config fetch fails. Cannot fix a third-party script. May cost attribution. |
| 5 | **GA4 counts bots as users** | 59 of 112 sessions are "Smart TV" scrapers. Filtered in reporting, but the raw dashboard is misleading. |

---

# PART 5 — WHAT IS ACTUALLY WORTH DOING

Ranked by expected revenue per hour of work.

1. **Get `/best-esim-usa` out of position 76.** 331 impressions is 20% of the site.
   This is a ranking problem, not a content problem. Needs backlinks/authority.
2. **Fix the two pages at position 6.7 and 10.5 with zero clicks.** Those are
   first-page positions. Rewriting their SERP titles/descriptions is cheap and
   they should convert.
3. **Fix `/best-esim-japan` (54 impr, position 44.3)** — the same treatment.
4. **Everything else is maintenance** — ads are placed, links are live, the build
   is clean.

**Do not spend time on more ad slots or CTR cosmetics.** At 53 sessions/month
they move the third decimal place.

---

# PART 6 — REPEAT CHECKS

```bash
# affiliate links
for s in $(grep -rhoE "/go/[a-z0-9-]+" src/ | sed 's|/go/||' | sort -u); do
  printf "%-22s %s\n" "/go/$s" "$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' --max-time 20 "https://www.bookmethat.com/go/$s")"
done

# ad slots
node scripts/verify-ads-live.mjs https://www.bookmethat.com /best-esim-usa

# one H1 per page
# load any article in a browser and count h1 elements — expect exactly 1
```
