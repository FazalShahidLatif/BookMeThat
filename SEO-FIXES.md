# BookMeThat — SEO Quick Wins (Google Focus)

**Date:** 3 October 2026
**Source:** live Google Search Console data, last 28 days (3 Sep – 30 Sep)
**Baseline:** 1,547 impressions, 2 clicks, average position 42.4

---

## 1. Already achieved (pushed to GitHub main)

### Title and description rewrites — clicks on traffic we already had
These pages ranked on page one and earned nothing. Rewritten to say plainly what the
traveler saves.

| Page | Was | Now |
|---|---|---|
| Homepage | position 6.1 | Cheap Travel eSIM, Car Rental & Flight Deals \| Save Up To 60% |
| /flights | position 7.4 | Flight Delay Compensation 2026: Claim Up To €600 Free |
| /esim | position 11.0 | Cheap Travel eSIM Deals 2026: Compare Saily, Airalo & Yesim |
| /car-rental | position 21.0 | Car Rental With No Deposit 2026: Compare Zero-Hold Companies |

### Answer-first blocks on the two buried pages
- `/best-esim-usa` — 390 impressions (a quarter of all visibility), position 76.8.
  Now opens with a plain "what is the best eSIM for USA travel" answer and a
  four-line decision list.
- `/flight-delay-cancellation-refund-chargeback-guide` — 111 impressions, position 75.
  Now opens with a 30-second eligibility answer and three steps.

### Social share cards fixed
The Facebook and Twitter tags still carried the old homepage copy after the title
rewrite, so every social share used stale text. Both now match.

---

## 2. The two bugs found and fixed in this pass

### Bug 1 — Internal pages were outranking our sales pages

Five `travelpayouts-*` articles — written about the affiliate programme, not about
travel — were ranking on page one for our own commercial keywords.

| Page | Impressions | Position | Clicks |
|---|---|---|---|
| travelpayouts-operational-blueprint | 64 | 5.5 | 0 |
| travelpayouts-destination-guide | 35 | 7.7 | 0 |
| travelpayouts-rpm-masterclass | 18 | 5.6 | 0 |
| travelpayouts-esim-growth-loop | 14 | 6.4 | 0 |
| travelpayouts-tech-automation | 11 | 4.4 | 0 |

**142 impressions — 9.2% of all visibility — going to pages that sell nothing.**

A `noindex` rule already existed in `src/App.tsx` but it runs in the browser, where
crawlers never see it. It now also runs in the build (`scripts/generate-static-pages.ts`),
so it is stamped into the served HTML. Also applied to `/ai-seo`, `/heatmap`, `/challenge`.

**Verified:** all eight pages now serve `noindex, nofollow, noarchive`. All commercial
pages confirmed still `index, follow`.

### Bug 2 — Three internal links pointed at pages that do not exist

- `/home-phone-number-active-abroad-free-2fa-bank-sms` → correct page is `/keep-home-number-active-abroad-otp-sms-guide`
- `/cheap-regional-esim-southeat-asia-europe` → correct page is `/best-regional-esim-southeast-asia-saily-tour`
- `/utm` was listed in the sitemap but has no page

All three fixed. **Verified: zero broken internal links remain.**

---

## 3. Also done: internal links from the two biggest pages

Both high-impression pages now link onward to pages that actually sell:

- `/best-esim-usa` (390 impressions) → Japan eSIM, Saily vs Airalo, car rental deposit
  guide, flight delay claim, luggage storage
- `/flight-delay-cancellation-refund-chargeback-guide` (111 impressions) → US DOT vs
  EU261, Compensair vs AirHelp, AirHelp walkthrough, terminal cancellation steps,
  passenger rights outside the EU

These pages were ranking dead ends. A visitor who lands there now has somewhere to go.

---

## 4. What the data says is still broken

| Page | Impressions | Position | Clicks |
|---|---|---|---|
| `/best-esim-usa` | 390 | 76.8 | 0 |
| `/luggage-storage-radical-storage-guide` | 335 | 32.1 | 0 |
| `/flight-delay-cancellation-refund-chargeback-guide` | 111 | 75.0 | 0 |
| `/world-nomads-adventure-travel-insurance-unbiased-review` | 108 | 35.1 | 0 |

Two patterns worth naming:

1. **The USA eSIM page is the single biggest leak.** 390 impressions at position 77.
   The answer block is in; the ranking still has to climb.
2. **Luggage storage is the closest to breaking through** — 335 impressions at
   position 32, with a cluster of long-tail questions already ranking (bag size
   limits, safety, reviews). This is the most reachable page on the site.

---

## 5. Next phase

1. **Add the `sc-domain:bookmethat.com` property in Search Console.** Only the `https://`
   version is connected, so we are not collecting all available search data. This is a
   screen action, not a code change.
2. **Close the mobile gap** — mobile sits 19 positions lower than desktop.
3. **Publish more comparison pages** — the only format producing clicks
   (both clicks came from `discovercars-vs-...` and `safetywing-vs-world-nomads-heymondo`).
4. **Re-measure in 28 days** against this baseline.

---

## How to re-check

```
python scripts/google_report.py gsc    # Search Console
python scripts/google_report.py ga4    # Analytics
```
