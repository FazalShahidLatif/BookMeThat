# BookMeThat — Monetisation & Revenue Status

**Scope:** this document covers **bookmethat.com only**. Other sites in the wider
portfolio are tracked in their own repositories and sessions; figures from them do
not belong here and are not included.

**Last verified:** 12 October 2026, against the live site.

---

## 1. Ad provider: Adsterra (AdSense fully removed)

AdSense was never viable on this site and is now gone — not just unused, but
**removed end to end**: the import, the `ActiveTab` union member, the route cases,
the nav entry and the breadcrumb schema. A leftover AdSense/UTM admin tab
(`UtmAdsenseConsole`) was deleted along with every reference to it.

**Adsterra zones for bookmethat.com** (from the publisher dashboard — website ID
`6112813`, status **Approved**, all three units **Active**):

| Format | Zone ID | Zone key |
|---|---|---|
| 728×90 leaderboard | 31657941 | `7329c4e64bae7da3d58f530f76605126` |
| 300×250 rectangle | 31657939 | `c24c5fa0ca416b18e274984483fd14be` |
| 160×600 skyscraper | 31657940 | `3222e3d2386f6549c6d7142fae656294` |

Script host for this site: **`https://ballisticcomainvitation.com/<key>/invoke.js`**

> The host and keys are **per-website**, not account-wide. Another site on the same
> Adsterra account uses a different host and a different key set, and both serve
> correctly. Never copy a key or host between sites — re-read the snippet from the
> dashboard for the site you are working on.

### Live slots

| Slot id | Zone | Placement |
|---|---|---|
| `ad-slot-article-top` | leaderboard 728×90 | Article pages, **below** the hero image |
| `ad-slot-footer` | leaderboard 728×90 | Every route, after the content, before the footer |

The rectangle and skyscraper zones are **implemented but not placed**. They are
available in the component and earn nothing until a slot is added.

### How the implementation works

`src/components/AdsterraAd.tsx`.

Two non-obvious constraints drive the design:

1. **`invoke.js` reads a bare global `window.atOptions`.** There is no per-zone
   namespace, so two snippets sharing one document overwrite each other and only
   the first slot fills. Each slot therefore gets **its own iframe with its own
   `srcdoc`**, giving every ad a private global and its own insertion context.
2. **`invoke.js` positions the creative relative to its own `<script>` tag**
   (`document.currentScript`). Appending the script to `document.body` renders the
   ad at the bottom of the page instead of in its slot. The per-slot iframe solves
   this too.

Also enforced:

- **Consent-gated.** Nothing is fetched until the visitor accepts **marketing**
  cookies. DNT and GPC are honoured as refusals.
- **Lazy.** Slots load via `IntersectionObserver` (400px margin) so ads never
  compete with the article for bandwidth.
- **No `min-height`** on a slot container, so an unfilled slot leaves no blank gap.
- Ads load **after** the article's opening paragraph, never above the fold.

### Verified serving

Proven from the DOM, not from the bundle. On `/`, `/luggage-storage-radical-storage-guide`
and `/best-esim-usa`, all slots filled with a real creative:

```
ad-slot-article-top   FILLED  <rotating-host>/watch.<digits>.js?key=7329c4e6…&kw=["best","esim"…]
ad-slot-footer        FILLED  <rotating-host>/watch.<digits>.js?key=7329c4e6…&kw=["radical","stor"…]
```

with `impr.gif` impression beacons alongside. The creative hostname rotates per
impression, so assert on the **shape** (`watch.<digits>` carrying your `key=`),
never on the host.

**Re-verify any time:**

```bash
node scripts/verify-ads-live.mjs https://www.bookmethat.com / /best-esim-usa
```

Two traps this script exists to avoid, both of which produced false readings here:

- **A headless user agent gets a 200 with a 0-byte body from this network.** That
  looks identical to a broken slot. Send a normal Chrome UA (no `HeadlessChrome`
  token). A bare `curl` with no UA also gets 0 bytes.
- **A slot's nested iframe reads `about:blank` even while an ad serves** — the
  creative is written into that document by the watch script. Asserting on the
  iframe `src` reports a false negative. Assert on the network.

### Revenue expectation — be honest about the scale

Adsterra banner CPM runs roughly **$0.30–$2.00**; bookmethat's audience is ~70%
United States, so the top of that range applies.

| CPM | Impressions/month needed for $500 |
|---|---|
| $1.00 | 500,000 |
| $2.00 | 250,000 |

BookMeThat's own traffic (GA4, bots filtered) is **~38 human sessions/month**. With
two ad slots per pageview that is roughly **76 impressions/month — under $0.20 at
$2.00 CPM.**

**Display ads are not the route to $500/month on this site.** They are correct,
harmless and free, and worth keeping, but the traffic needed is ~6,500× what exists.
The lever is search visibility and affiliate conversion, not ad placement.

### Open items

- **`public/ads.txt` is a placeholder** — two comment lines, no network entries.
  Worth adding the Adsterra publisher line.
- **The Travelpayouts acceleration script (`emrldtp.cc`) fails with CORS errors on
  every page load.** It is their own script, but it may be costing link attribution.

---

## 2. Affiliate: Travelpayouts (the actual revenue path)

The site monetises through Travelpayouts (marker `685596`). Outbound links use a
`/go/<partner>` proxy that Vercel 301s to the partner, forwarding the query string
so `subid` tracking keeps working.

### The bug that was costing every click

**27 `/go/` links are used across the articles, but only 8 redirects existed.**

The other **19 fell through the SPA catch-all** (`/(.*)` → `/index.html`) and
returned **HTTP 200 with the homepage**. No 404, no error — the visitor simply
landed back on BookMeThat and the affiliate was never credited. Every Saily,
Airalo, Localrent, Yesim, AirHelp, Compensair, QEEQ and EconomyBookings click was
silently discarded.

Proven in a browser: clicking `/go/saily` landed on `bookmethat.com/esim`.

**Fixed.** All 27 now 301 to the correct merchant, destinations read
programmatically from `src/data/affiliates.ts` so they cannot drift from the links.
Confirmed in a browser that a Saily click now reaches `saily.com` carrying live
tracking parameters.

**Re-verify:**

```bash
for s in $(grep -rhoE "/go/[a-z0-9-]+" src/ | sed 's|/go/||' | sort -u); do
  printf "%-22s %s\n" "/go/$s" "$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' --max-time 20 "https://www.bookmethat.com/go/$s")"
done
```

Any row showing `200` with an empty `redirect_url`, or a `Location` on
`bookmethat.com`, is a dead affiliate link.

---

## 3. Search visibility — the real constraint

Google Search Console, bookmethat.com only, 28-day window:

| Measure | Value |
|---|---|
| Impressions | 1,769 |
| Clicks | 2 |
| CTR | 0.11% |
| Average position | 38.3 |

A normal CTR is 2–5%. The site is capturing roughly **a twentieth** of the clicks
its rankings already earn. That gap — not ad placement — is where the revenue is.

Pages ranking but earning nothing:

| Page | Impressions | Position |
|---|---|---|
| /best-esim-usa | 390 | 76.8 |
| /luggage-storage-radical-storage-guide | 335 | 32.1 |
| /flight-delay-cancellation-refund-chargeback-guide | 111 | 75.0 |

Pages at position 70+ will not be clicked regardless of title. Position is the
bottleneck on those, not copy.

`/luggage-storage-radical-storage-guide` is the most reachable — position 32 with
long-tail questions already ranking. It has been rebuilt answer-first (safety,
price, bag size limits, hotel alternatives, two added FAQs) targeting the exact
queries it already appears for.

---

## 4. Other fixes on record

- **Five `travelpayouts-*` articles were ranking on page one for commercial
  keywords** — 142 impressions (9.2% of all visibility) going to pages that sell
  nothing. A `noindex` rule existed but ran only in the browser, where crawlers
  never see it; it now runs in the static build. Also applied to `/ai-seo`,
  `/heatmap`, `/challenge`.
- **Three broken internal links** pointed at pages that do not exist, and `/utm`
  sat in the sitemap with no page behind it. All fixed.
- **GA4 was counting scrapers as users** — 58 of 96 sessions were bots posing as
  "Smart TV". Bot filtering is in place; the honest figure is ~38 human sessions.
- **`scripts/google_report.py`** pulls combined GSC + GA4 for this property.

---

## 5. Build & deploy

| | |
|---|---|
| Repo | `C:\Users\accts\bookmethat-repo` |
| Branch | `main` |
| Host | Vercel (`www.bookmethat.com`) |
| Build | `npm run build` — 60 static routes generated |
| Static generator | `scripts/generate-static-pages.ts` |

**Per-route SEO must be stamped in the static build, not only client-side.**
`App.tsx` sets meta tags in the browser, where crawlers never see them. Anything
that must be visible to Google (titles, descriptions, `noindex`) has to be written
by `generate-static-pages.ts` into the served HTML.
