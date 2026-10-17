# BookMeThat — Social Media Brand Asset Update Guide

## Purpose
Update the current brand assets (logo, favicon, colors, typography) on all
social media pages so they are consistent with the BookMeThat website brand kit.

## Brand Kit (source of truth)
- **Logo (SVG):** `public/logo.svg` — terracotta/charcoal monogram
- **Logo (PNG):** `public/logo.png` — 726 KB primary logo
- **Accent color:** `#B84200` (terracotta)
- **Deep color:** `#1A1A1A` (charcoal)
- **Gradient:** `#993300 → #B84200 → #E55B13`
- **Highlight:** `#E55B13`, `#FF7A30`
- **Background:** `#FAF9F6`
- **Subtitle:** "Easy Scheduling & Bookings"

---

## 1. Facebook Pages (Book Me That, Mentor Arena, UK LTD Registration, Falconian, US LLC)

### Profile Picture
- Upload `public/logo.png` (or `public/logo.svg` → export 600×600 PNG)
- Size: 170×170 px (desktop), 120×120 px (mobile)
- Background: transparent or #FAF9F6

### Cover Photo
- Upload `public/logo.png` (or a 820×312 px branded cover)
- Include the logo + tagline: "Easy Scheduling & Bookings"
- Background: #1A1A1A with terracotta logo overlay

### Page Info
- **Name:** BookMeThat
- **Bio:** Travel made simple. Compare eSIM, car rentals & flight deals. No broker markups.
- **Website:** https://www.bookmethat.com
- **Contact:** accts.pak@gmail.com

### About Section
- Add brand kit: terracotta accents, charcoal text, "Easy Scheduling & Bookings"

---

## 2. Instagram (BookMeThat profile)

### Profile Picture
- Upload `public/logo.png` (square, 108×108 px minimum)
- Use transparent background

### Profile Banner
- 2048×108 px
- Design: gradient (#993300→#B84200→#E55B13) + logo at left
- Tagline: "Easy Scheduling & Bookings"

### Bio
```
🌍 BookMeThat — Direct travel, no broker markups.
📱 Best eSIM · Car Rental · Flight Compensation
🔗 bookmethat.com
```

### Post Graphics
- All post images: white/light bg (#FAF9F6)
- Text: charcoal (#1A1A1A) or terracotta (#B84200)
- Logo: terracotta on light bg, white on dark bg
- Use the gradient for headers/accents

---

## 3. LinkedIn (BookMeThat Company Page)

### Profile/Company Photo
- Upload `public/logo.png` (square, 300×300 px)

### Banner/Background
- 1536×420 px
- Design: gradient + logo + "Easy Scheduling & Bookings"

### Company Page Details
- **Name:** BookMeThat
- **Description:** Premium global travel booking comparison & affiliate recommendation engine
- **Website:** https://www.bookmethat.com
- **Headline:** "Direct travel comparison & affiliate booking — no broker markups"

### Post Graphics
- LinkedIn posts: clean, professional
- Logo: left-aligned, terracotta on white
- Text: navy/charcoal for body, terracotta for headers
- Use the gradient for section headers

---

## 4. X (Twitter) — BookMeThat handle

### Profile Picture
- `public/logo.png` (400×400 px, square)

### Banner
- Design: gradient + logo + tagline

### Bio
```
🌍 BookMeThat — Direct travel, no broker markups.
📱 Best eSIM · Car Rental · Flight Compensation
🔗 bookmethat.com
```

---

## 5. YouTube (BookMeThat channel)

### Channel Profile Picture
- `public/logo.png` (800×800 px, square, high quality)

### Channel Banner
- 2560×1440 px
- Design: gradient + logo + "Easy Scheduling & Bookings"

### Channel About
- **Name:** BookMeThat
- **Description:** Direct travel booking & affiliate comparison — eSIM, car rental, flight compensation, travel insurance.
- **Keywords:** travel, eSIM, car rental, flight compensation, booking

---

## 6. Consistency Checklist

| Asset | Website | Instagram | Facebook | LinkedIn | X | YouTube |
|---|---|---|---|---|---|---|
| Logo | ✅ `public/logo.svg` | ✅ Profile pic | ✅ Profile pic | ✅ Profile pic | ✅ Profile pic | ✅ Profile pic |
| Colors | ✅ Gradient + terracotta | ✅ Post graphics | ✅ Post graphics | ✅ Post graphics | ✅ Post graphics | ✅ Channel art |
| Subtitle | ✅ "Easy Scheduling & Bookings" | ✅ Bio | ✅ About | ✅ About | ✅ Bio | ✅ About |
| Website | ✅ bookmethat.com | ✅ Link | ✅ Website | ✅ Website | ✅ Bio | ✅ About |

---

## 7. Automation Plan

1. **Generate today's posts** — `python scripts/social-media-posting.py --generate`
2. **Create post graphics** — use logo + gradient, export as JPEG/PNG
3. **Upload to platforms** — via API (Facebook, Instagram, LinkedIn, X)
4. **Log the post** — `scripts/social-media-posts.log`
5. **Review weekly** — check engagement, adjust cadence

### Scheduled Jobs
- **Daily 8:00 AM PKT** — Generate content for the day
- **Weekly 9:00 AM PKT** — Review performance, schedule next week

---

## 8. Reference Skills
- `instagram-automation` — Instagram Graph API posting
- `facebook-api-setup` — Meta app + token setup
- `linkedin-automation` — LinkedIn posting + Apollo lead gen
- `xurl` — X (Twitter) official API
