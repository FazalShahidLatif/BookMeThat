# BookMeThat — Social Media Content Calendar

**Prepared:** 17 October 2026
**Purpose:** Regular posting automation for BookMeThat across Facebook, Instagram, LinkedIn, and X (Twitter).
**Reference:** `scripts/social-media-posting.py` runs this calendar automatically.

---

## 1. Post Types & Cadence

| Day | Time (PKT) | Platform | Post Type | Topic Source | Caption Style |
|---|---|---|---|---|---|
| Mon | 10:00 AM | Instagram + Facebook | Carousel (3-5 slides) | SEO quick wins / page tips | Educational |
| Tue | 2:00 PM | Instagram Reel + Facebook Reel | Short video (15-30s) | Tip/guide from journey pages | Hook→Value→CTA |
| Wed | 12:00 PM | Instagram + LinkedIn | Image post | Product/service showcase | Showcase |
| Thu | 3:00 PM | LinkedIn + X | Text post / article share | Case study / data | Storytelling |
| Fri | 11:00 AM | Instagram + Facebook | Carousel | Weekly recap / FAQ | Community |
| Sat | 4:00 PM | Instagram Story | Poll / Question | Engagement | Engagement |
| Sun | 9:00 AM | Instagram + Facebook | Image | Motivation / seasonal | Inspirational |

---

## 2. Content Library — Leveraged from BookMeThat

### Journey Pages (high-value, evergreen)
| Page | Platform | Post Type | Hook |
|---|---|---|---|
| `georgia-tbilisi-complete-travel-guide` | IG Reel / FB Carousel | "Plan the whole trip" | "Georgia in 5 days? Yes — here's the full plan." |
| `japan-tokyo-kyoto-complete-travel-guide` | IG Reel / FB Carousel | "Plan the whole trip" | "Tokyo to Kyoto in 7 days — the complete guide." |
| `southeast-asia-complete-travel-guide` | IG Reel / FB Carousel | "Plan the whole trip" | "SE Asia in 10 days: Thailand, Vietnam, Cambodia…" |

### SEO Quick Wins (zero-click keywords)
| Keyword | Page | Post Type |
|---|---|---|
| "best esim" | `/best-esim-usa` | Carousel: "Best eSIM in 2026 — tested & compared" |
| "flight delayed compensation" | `/claiming-flight-reimbursement-us-dot-vs-eu261` | Reel: "Flight delayed? Claim up to €600" |
| "car rental excess" | `/car-rental-insurance-excess-counter-hacks` | Carousel: "Avoid the €3,000 deposit hold" |
| "cheapest car rental" | `/discovercars-vs-localrent-vs-economybookings` | Carousel: "Cheapest car rental broker 2026" |

### Brand & Community
| Post Type | Topic | Caption Style |
|---|---|---|
| Behind-the-scenes | Building BookMeThat | BTS style |
| FAQ | Common travel questions | Educational |
| Testimonial/UGC | Traveller stories | Community |

---

## 3. Caption Template Library

### Educational Post (Monday)
```
📚 {Topic} — What You Need to Know

{Bullet points with value}

💡 Save this for later
👉 Follow @{username} for more travel tips

Hashtags: #traveltips #esim #flightdelay #carantrental
```

### Reel Hook (Tuesday)
```
HOOK: "Stop doing {wrong approach}"
VALUE: {Step-by-step solution}
CTA: "Follow for more travel tips 👇"
```

### Product Showcase (Wednesday)
```
✨ {Service/Discount}
✅ Benefit 1
✅ Benefit 2
✅ Benefit 3
🔗 Link in bio
```

### Behind-the-Scenes (Thursday)
```
🎬 Behind the scenes of {what's happening}
{Story or insight}
What would you like to see next? 👇
```

### Community/FAQ (Friday)
```
📝 {FAQ Answer}
{Context}
Have a question we didn't answer? Comment below!
```

---

## 4. Hashtag Strategy

### Tier 1 (niche, 100K+ posts)
`#traveltips #esim #flightdelay #carantrental #travelhacks`

### Tier 2 (mid-size, 500K-2M posts)
`#travelblog #travelplanning #flightcompensation #carrentals #travel2026`

### Tier 3 (large, 2M+ posts)
`#wanderlust #travelgram #explore #travellover #adventure`

### Regional (UK/US/DE)
`#uktravel #usatravel #europe #asia #southeastasia`

---

## 5. Posting Schedule

| Platform | Frequency | Time (PKT) | Type |
|---|---|---|---|
| Instagram | 5x/week | Mon-Fri | Carousel, Reel, Story |
| Facebook | 5x/week | Mon-Fri | Carousel, Reel, Image |
| LinkedIn | 3x/week | Mon, Wed, Thu | Text, Carousel, Article |
| X (Twitter) | 2-3x/week | Tue, Thu | Text, Media |

---

## 6. Automation Workflow

```
Content Calendar (this file)
  → scripts/social-media-posting.py (generates posts)
  → Format → Upload → Post via API (Facebook, Instagram, LinkedIn, X)
  → Log to scripts/social-media-posts.log
  → Cron: daily 8:00 AM PKT (generate), weekly (publish)
```

---

## 7. New Brand Kit Reference

| Asset | File | Usage |
|---|---|---|
| Logo (SVG) | `public/logo.svg` | All social media profile pictures |
| Logo (PNG) | `public/logo.png` | Facebook cover, LinkedIn header |
| Brand color | `#B84200` (terracotta) | All post graphics |
| Brand color | `#1A1A1A` (charcoal) | All post graphics/text |
| Gradient | `#993300 → #B84200 → #E55B13` | All post graphics |
| Subtitle | "Easy Scheduling & Bookings" | Instagram bio, LinkedIn headline |
