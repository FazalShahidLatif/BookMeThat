#!/usr/bin/env python3
"""Pull live Google data for BookMeThat — Search Console + GA4.

Usage:
    python scripts/google_report.py            # both
    python scripts/google_report.py gsc        # search console only
    python scripts/google_report.py ga4        # analytics only

Credentials live at C:\\Users\\accts\\AppData\\Local\\hermes\\google_token.json
Never print token values.
"""
import json
import sys
from datetime import date, timedelta
from urllib.parse import quote

from google.auth.transport.requests import AuthorizedSession, Request
from google.oauth2.credentials import Credentials

TOKEN = r"C:\Users\accts\AppData\Local\hermes\google_token.json"
SITE = "https://www.bookmethat.com/"


def session():
    """Authorize with ALL granted scopes.

    Passing a narrowed scope list makes google-auth raise InvalidScope on the
    stored refresh_token, which surfaces as a confusing 403 from the API.
    """
    creds = Credentials.from_authorized_user_file(TOKEN)
    if creds.expired and creds.refresh_token:
        creds.refresh(Request())
    return AuthorizedSession(creds), creds


def gsc(s):
    enc = quote(SITE, safe="")
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
            f"https://searchconsole.googleapis.com/webmasters/v3/sites/{enc}/searchAnalytics/query",
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
    print("=" * 62)
    print("GOOGLE SEARCH CONSOLE — bookmethat.com")
    print(f"Current  {start} .. {end}")
    print(f"  clicks={c1}  impressions={i1}  ctr={ctr1:.2f}%  position={p1:.1f}")
    print(f"Previous {prev_start} .. {prev_end}")
    print(f"  clicks={c2}  impressions={i2}  ctr={ctr2:.2f}%  position={p2:.1f}")

    print("\n-- TOP PAGES --")
    for row in q(["page"], 15).get("rows", []):
        slug = row["keys"][0].replace(SITE, "") or "/"
        print(
            f"  {row['clicks']:>4} clicks {row['impressions']:>6} impr "
            f"{row['ctr']*100:>5.2f}%  pos {row['position']:>5.1f}  {slug}"
        )

    print("\n-- DEVICES --")
    for row in q(["device"], 5).get("rows", []):
        print(
            f"  {row['clicks']:>4} clicks {row['impressions']:>6} impr "
            f"pos {row['position']:>5.1f}  {row['keys'][0]}"
        )


def ga4(s, property_id="514028007"):
    """GA4 report for bookmethat.com, scoped to this hostname only.

    The property aggregates every hostname sharing the tag, so the hostName
    filter is what keeps other sites on the same property out of the numbers.
    """
    end = date.today() - timedelta(days=1)
    start = end - timedelta(days=27)
    prev_end = start - timedelta(days=1)
    prev_start = prev_end - timedelta(days=27)
    base = "https://analyticsdata.googleapis.com/v1beta/properties/%s:runReport"
    host_filter = {
        "filter": {
            "fieldName": "hostName",
            "stringFilter": {"matchType": "CONTAINS", "value": "bookmethat.com"},
        }
    }

    def run(dims, metrics, limit=25, s0=None, e0=None):
        body = {
            "dateRanges": [
                {"startDate": (s0 or start).isoformat(), "endDate": (e0 or end).isoformat()}
            ],
            "metrics": [{"name": m} for m in metrics],
            "limit": str(limit),
        }
        if dims:
            body["dimensions"] = [{"name": d} for d in dims]
        body["dimensionFilter"] = host_filter
        r = s.post(base % property_id, json=body, timeout=30)
        if r.status_code != 200:
            return {"error": f"{r.status_code}: {r.text[:200]}"}
        return r.json()

    def unpack(rep):
        """GA4 returns metric NAMES in metricHeaders, values positionally."""
        names = [h["name"] for h in rep.get("metricHeaders", [])]
        out = []
        for row in rep.get("rows", []):
            dims = [d.get("value", "") for d in row.get("dimensionValues", [])]
            vals = [v.get("value", "0") for v in row.get("metricValues", [])]
            out.append((dims, dict(zip(names, vals))))
        return out

    print("=" * 62)
    print("GOOGLE ANALYTICS 4 — bookmethat.com")
    print(f"Window {start} .. {end}")

    tot = unpack(run(None, ["sessions", "totalUsers", "screenPageViews",
                            "bounceRate", "averageSessionDuration"]))
    if not tot:
        print("  No traffic recorded in this window.")
        return
    _, m = tot[0]
    print(f"  sessions={m.get('sessions', 0)}  users={m.get('totalUsers', 0)}  "
          f"views={m.get('screenPageViews', 0)}  "
          f"bounce={float(m.get('bounceRate', 0)) * 100:.1f}%  "
          f"avg={float(m.get('averageSessionDuration', 0)):.0f}s")

    ptot = unpack(run(None, ["sessions", "screenPageViews", "bounceRate"],
                      1, prev_start, prev_end))
    if ptot:
        _, pm = ptot[0]
        try:
            d = (float(m["sessions"]) - float(pm["sessions"])) / float(pm["sessions"]) * 100
            print(f"  vs previous 28d: sessions {pm['sessions']} -> {m['sessions']} ({d:+.1f}%)")
        except (KeyError, ZeroDivisionError, ValueError):
            pass

    print("\n-- TOP PAGES --")
    for dims, v in unpack(run(["pagePath"], ["sessions", "screenPageViews"], 15)):
        print(f"  {v['sessions']:>5} sessions  {v['screenPageViews']:>5} views  {dims[0][:58]}")

    print("\n-- LANDING PAGES --")
    for dims, v in unpack(run(["landingPage"], ["sessions", "totalUsers"], 12)):
        print(f"  {v['sessions']:>5} sessions  {v['totalUsers']:>5} users  {dims[0][:58]}")

    print("\n-- TRAFFIC SOURCES --")
    for dims, v in unpack(run(["sessionDefaultChannelGroup"], ["sessions"], 10)):
        print(f"  {v['sessions']:>5} sessions  {dims[0]}")

    print("\n-- COUNTRIES --")
    for dims, v in unpack(run(["country"], ["sessions"], 10)):
        print(f"  {v['sessions']:>5} sessions  {dims[0]}")

    print("\n-- DEVICES --")
    for dims, v in unpack(run(["deviceCategory"], ["sessions"], 6)):
        print(f"  {v['sessions']:>5} sessions  {dims[0]}")


if __name__ == "__main__":
    mode = (sys.argv[1] if len(sys.argv) > 1 else "all").lower()
    sess, creds = session()
    print(f"Token loaded. Granted scopes: {len(creds.scopes or [])}")
    if mode in ("all", "gsc"):
        gsc(sess)
    if mode in ("all", "ga4"):
        ga4(sess)
