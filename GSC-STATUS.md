# BookMeThat — Google Search Console Status

**Property:** `https://www.bookmethat.com/`
**Data pulled:** live from Google Search Console API
**Window analysed:** 3 September 2026 – 30 September 2026 (28 days)

---

## 1. Where We Stand

| Measure | Last 28 days | Previous 28 days | Change |
|---|---|---|---|
| Times Google showed us | 1,547 | 436 | **+255%** |
| Clicks to the site | 2 | 0 | +2 |
| Click-through rate | 0.13% | 0% | — |
| Average position | 42.4 | 68.5 | **26 places better** |

**Plain reading:** Google is showing BookMeThat far more often than a month ago, and ranking us much higher. But almost nobody is clicking. Two clicks in 28 days is no traffic — which matches the Travelpayouts report of zero sales across every program.

---

## 2. Why The Clicks Are Not Coming

### Problem 1 — Our best-ranking pages are not getting clicked
| Page | Position | Impressions | Clicks |
|---|---|---|---|
| Homepage | 6.1 | 41 | 0 |
| /flights | 7.4 | 29 | 0 |
| /esim | 11.0 | 40 | 0 |

These already rank well. Google shows them and travelers scroll past. That is a headline and description problem, not a ranking problem.

### Problem 2 — Our biggest traffic pool sits on page 3
| Page | Position | Impressions | Clicks |
|---|---|---|---|
| /best-esim-usa | 76.8 | **390** | 0 |
| /flight-delay-cancellation-refund-chargeback-guide | 75.0 | 111 | 0 |
| /best-esim-japan | 38.5 | 82 | 0 |

The USA eSIM page alone is 25% of everything Google shows us, and it is buried.

### Problem 3 — Mobile is far behind desktop
| Device | Clicks | Impressions | Position |
|---|---|---|---|
| Desktop | 2 | 921 | 34.7 |
| Mobile | 0 | 624 | **53.8** |

Nearly half our audience sees us 19 places lower on their phone.

---

## 3. What Is Working

- **Sitemap is clean** — 0 errors, fully indexed.
- **New content is climbing:**
  - `/luggage-storage-radical-storage-guide` — 335 impressions, position 32
  - `/localrent-georgia-tbilisi-car-rental-reviews-model` — 70 impressions, position 14
- **Comparison pages earn our only clicks:**
  - `/discovercars-vs-localrent-vs-economybookings` — 1 click, position 12.6
  - `/safetywing-vs-world-nomads-heymondo` — 1 click, position 19.1

---

## 4. Revenue Reality Check

2 clicks in 28 days produces effectively $0 against the **$500/month** target. Travelpayouts reported 210 network clicks last 7 days and still zero sales, so even referred traffic is not converting. **The gap to target is essentially the whole target.**

---

## 5. Fixes Implemented (committed to GitHub main)

### Fix 1 — Rewrote titles and descriptions on pages that rank but don't get clicked
New copy is plain-language and leads with what the traveler saves.

| Route | New title |
|---|---|
| Homepage | Cheap Travel eSIM, Car Rental & Flight Deals \| Save Up To 60% |
| /flights | Flight Delay Compensation 2026: Claim Up To €600 Free \| BookMeThat |
| /esim | Cheap Travel eSIM Deals 2026: Compare Saily, Airalo & Yesim \| BookMeThat |
| /car-rental | Car Rental With No Deposit 2026: Compare Zero-Hold Companies \| BookMeThat |

**Where changed:** `index.html` (Vite entry — this is the file Google actually reads), `src/App.tsx` (both the in-app metadata switch and the static template), and `scripts/generate-static-pages.ts` (the generator that stamps titles onto every one of the 60 generated pages).

### Fix 2 — Answer-first blocks on the two biggest under-ranking pages
- `/best-esim-usa`: added a plain-language "What Is the Best eSIM for USA Travel?" answer block with a four-line decision list, and renamed the table heading to "Which USA eSIM Is Cheapest? Full Price Comparison" so it can be linked to directly.
- `/flight-delay-cancellation-refund-chargeback-guide`: added a "Can You Claim Flight Delay Compensation? The 30-Second Answer" block with the three eligibility tests and a three-step action list.

Both put the answer above the fold, which is what Google's answer boxes pull from.

---

## 6. Still To Do (next phase)

1. **Add the `sc-domain:bookmethat.com` property in Search Console.** Only the `https://` version is connected, so we are not collecting all available search data. This is a setup action in the Search Console screen and cannot be done from code.
2. **Close the 19-position mobile gap** — check mobile titles and headings separately from desktop.
3. **Publish more comparison pages** — the only format currently producing clicks.
4. **Re-measure in 28 days** and compare against this baseline.
