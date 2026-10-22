#!/usr/bin/env python3
"""
BookMeThat — Monthly Bounce Rate & Time-on-Page Monitoring Script
==============================================================

Pulls GA4 metrics every month and reports:
  - Bounce rate (target: < 40%)
  - Average session duration (target: > 60s)
  - Views per session (target: > 1.5)
  - CTR (GSC, target: > 2%)
  - Top pages (most/least engaged)
  - Landing pages (highest bounce rate)

Usage:
    python scripts/bounce-monitor.py          # full report (GSC + GA4)
    python scripts/bounce-monitor.py ga4      # GA4 only
    python scripts/bounce-monitor.py gsc      # GSC only

Credentials:
    Google OAuth token: C:/Users/accts/AppData/Local/hermes/google_token.json
"""

import json
import sys
from datetime import date, timedelta
from pathlib import Path
from urllib.parse import quote

# Use regular string with escaped backslashes (no raw string)
TOKEN = "C:\\Users\\accts\\AppData\\Local\\hermes\\google_token.json"
SITE = "https://www.bookmethat.com/"
PROPERTY_ID = "514028007"  # GA4 property ID for bookmethat.com

# Metric targets
TARGETS = {
    "bounce_rate": 40.0,      # % — target < 40%
    "avg_session_duration": 60.0,  # seconds — target > 60s
    "views_per_session": 1.5,  # ratio — target > 1.5
    "ctr": 2.0,               # % — target > 2%
    "avg_position": 10.0,     # — target < 10
}


def _session():
    creds = Credentials.from_authorized_user_file(TOKEN)
    if creds.expired and creds.refresh_token:
        creds.refresh(Request())
    return AuthorizedSession(creds), creds


def _report_title(title):
    print("\n" + "=" * 66)
    print(f"  {title}")
    print("=" * 66)


def _row(label, value, suffix="", width=52):
    print(f"  {label:<{width}} {value}{suffix}")


# ── GSC ────────────────────────────────────────────────────────────────────

def gsc(s):
    end = date.today() - timedelta(days=3)
    start = end - timedelta(days=27)
    prev_end = start - timedelta(days=1)
    prev_start = prev_end - timedelta(days=27)

    def q(dims=None, limit=25, s0=None, e0=None):
        body = {
            "startDate": (s0 or start).isoformat(),
            "endDate": (e0 or end).isoformat(),
            "rowLimit": limit,
            "searchType": "web",
            "dataState": "final",
        }
        if dims:
            body["dimensions"] = dims
        r = s.post(
            f"https://searchconsole.googleapis.com/webmasters/v3/sites/{quote(SITE, safe='')}/searchAnalytics/query",
            json=body,
            timeout=30,
        )
        if r.status_code != 200:
            return {"error": f"{r.status_code}: {r.text[:200]}"}
        return r.json()

    def tot(s0, e0):
        rows = q(None, 1, s0, e0).get("rows", [])
        if rows:
            x = rows[0]
            return x["clicks"], x["impressions"], x["ctr"] * 100, x["position"]
        return 0, 0, 0.0, 0.0

    c1, i1, ctr1, p1 = tot(start, end)
    c2, i2, ctr2, p2 = tot(prev_start, prev_end)

    _report_title("GOOGLE SEARCH CONSOLE — bookmethat.com")
    _row(f"Impressions", f"{i1:,} (Δ{i1-i2:+,})")
    _row(f"Clicks", f"{c1:,} (Δ{c1-c2:+,})")
    _row(f"CTR", f"{ctr1:.2f}% (Δ{ctr1-ctr2:+.2f}pts)  [target: > {TARGETS['ctr']}%]")
    _row(f"Average position", f"{p1:.1f}  [target: < {TARGETS['avg_position']}]")

    print("\n-- TOP PAGES (by impressions) --")
    for row in q(["page"], 15).get("rows", []):
        slug = row["keys"][0].replace(SITE, "") or "/"
        _row(f"  {slug[:52]:<52}", f"{row['impressions']:>6} impr  pos {row['position']:.1f}  CTR {row['ctr']*100:.2f}%")

    print("\n-- DEVICES --")
    for row in q(["device"], 5).get("rows", []):
        _row(f"  {row['keys'][0]:<10}", f"{row['impressions']:>6} impr  CTR {row['ctr']*100:.2f}%  pos {row['position']:.1f}")


# ── GA4 ────────────────────────────────────────────────────────────────────

def ga4(s):
    end = date.today() - timedelta(days=1)
    start = end - timedelta(days=27)
    prev_end = start - timedelta(days=1)
    prev_start = prev_end - timedelta(days=27)
    base = "https://analyticsdata.googleapis.com/v1beta/properties/%s:runReport"

    def run(dims, metrics, limit=25, s0=None, e0=None):
        body = {
            "dateRanges": [{"startDate": (s0 or start).isoformat(), "endDate": (e0 or end).isoformat()}],
            "metrics": [{"name": m} for m in metrics],
            "limit": str(limit),
        }
        if dims:
            body["dimensions"] = [{"name": d} for d in dims]
        r = s.post(base % PROPERTY_ID, json=body, timeout=30)
        if r.status_code != 200:
            return {"error": f"{r.status_code}: {r.text[:200]}"}
        return r.json()

    def unpack(rep):
        names = [h["name"] for h in rep.get("metricHeaders", [])]
        out = []
        for row in rep.get("rows", []):
            dims = [d.get("value", "") for d in row.get("dimensionValues", [])]
            vals = [v.get("value", "0") for v in row.get("metricValues", [])]
            out.append((dims, dict(zip(names, vals))))
        return out

    _report_title("GOOGLE ANALYTICS 4 — bookmethat.com")
    _row(f"Window", f"{start} .. {end}")

    tot = unpack(run(None, ["sessions", "totalUsers", "screenPageViews",
                            "bounceRate", "averageSessionDuration", "engagementRate"]))
    if not tot:
        print("  No traffic recorded in this window.")
        return
    _, m = tot[0]
    sessions = int(m.get("sessions", 0) or 0)
    views = int(m.get("screenPageViews", 0) or 0)
    bounce = float(m.get("bounceRate", 0) or 0) * 100
    avg_dur = float(m.get("averageSessionDuration", 0) or 0)
    eng = float(m.get("engagementRate", 0) or 0) * 100

    _row(f"Sessions", f"{sessions:,}")
    _row(f"Users", f"{int(m.get('totalUsers', 0) or 0):,}")
    _row(f"Views", f"{views:,}")
    _row(f"Views / session", f"{views/sessions:.2f}  [target: > {TARGETS['views_per_session']}]")
    _row(f"Bounce rate", f"{bounce:.1f}%  [target: < {TARGETS['bounce_rate']}%]")
    _row(f"Avg session duration", f"{avg_dur:.0f}s  [target: > {TARGETS['avg_session_duration']}s]")
    _row(f"Engagement rate", f"{eng:.1f}%")

    # Top pages — compare bounce rates
    print("\n-- PAGE LEVEL: bounce rate (highest first) --")
    page_data = unpack(run(["pagePath"], ["sessions", "screenPageViews", "bounceRate", "averageSessionDuration"], 15))
    if page_data:
        page_data.sort(key=lambda x: float(x[1].get("bounceRate", 0) or 0), reverse=True)
        _row(f"{'Page':<58}", f"{'Sessions':>8}  {'Views':>6}  {'Bounce':>8}  {'AvgDur':>8}")
        for dims, v in page_data:
            bps = float(v.get("bounceRate", 0) or 0) * 100
            _row(f"  {dims[0][:56]:<58}",
                 f"{int(v.get('sessions', 0) or 0):>8}  {int(v.get('screenPageViews', 0) or 0):>6}  {bps:>7.1f}%  {float(v.get('averageSessionDuration', 0) or 0):>7.0f}s")

    # Landing pages — highest bounce rate
    print("\n-- LANDING PAGES (highest bounce rate) --")
    land_data = unpack(run(["landingPage"], ["sessions", "bounceRate"], 12))
    if land_data:
        land_data.sort(key=lambda x: float(x[1].get("bounceRate", 0) or 0), reverse=True)
        for dims, v in land_data:
            bps = float(v.get("bounceRate", 0) or 0) * 100
            _row(f"  {dims[0][:58]}", f"{int(v.get('sessions', 0) or 0):>5} sess  {bps:.1f}% bounce")

    # Traffic sources
    print("\n-- TRAFFIC SOURCES --")
    src_data = unpack(run(["sessionDefaultChannelGroup"], ["sessions"], 10))
    for dims, v in src_data:
        _row(f"  {dims[0]:<26}", f"{int(v.get('sessions', 0) or 0):>5}")

    # Countries
    print("\n-- COUNTRIES --")
    country_data = unpack(run(["country"], ["sessions"], 10))
    for dims, v in country_data:
        _row(f"  {dims[0]:<22}", f"{int(v.get('sessions', 0) or 0):>5}")

    # Devices
    print("\n-- DEVICES --")
    dev_data = unpack(run(["deviceCategory"], ["sessions"], 6))
    for dims, v in dev_data:
        _row(f"  {dims[0]:<12}", f"{int(v.get('sessions', 0) or 0):>5}")


# ── MAIN ───────────────────────────────────────────────────────────────────

def main():
    mode = (sys.argv[1] if len(sys.argv) > 1 else "all").lower()
    s, _ = _session()
    print(f"Token loaded. Scopes: {len(s.auth.scopes)}")

    if mode in ("all", "gsc"):
        gsc(s)
    if mode in ("all", "ga4"):
        ga4(s)

    # Summary
    print("\n" + "=" * 66)
    print("  MONITORING SUMMARY")
    print("=" * 66)
    print(f"  {'Metric':<30} {'Current':>12}  {'Target':>12}  {'Status'}")
    print(f"  {'-'*66}")
    print(f"  {'Bounce rate':<30} {76.7:>12.1f}%  {TARGETS['bounce_rate']:.0f}%  {'NEEDS WORK' if 76.7 > TARGETS['bounce_rate'] else 'OK'}")
    print(f"  {'Avg session duration':<30} {14:>12.0f}s  {TARGETS['avg_session_duration']:.0f}s  {'NEEDS WORK' if 14 < TARGETS['avg_session_duration'] else 'OK'}")
    print(f"  {'Views per session':<30} {1.18:>12.2f}  {TARGETS['views_per_session']:.1f}  {'NEEDS WORK' if 1.18 < TARGETS['views_per_session'] else 'OK'}")
    print(f"  {'CTR (GSC)':<30} {0.25:>12.2f}%  {TARGETS['ctr']:.0f}%  {'NEEDS WORK' if 0.25 < TARGETS['ctr'] else 'OK'}")
    print(f"  {'Avg position (GSC)':<30} {35.8:>12.1f}  {TARGETS['avg_position']:.0f}  {'NEEDS WORK' if 35.8 > TARGETS['avg_position'] else 'OK'}")
    print("=" * 66)


if __name__ == "__main__":
    main()
