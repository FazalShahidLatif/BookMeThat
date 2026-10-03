#!/usr/bin/env python3
"""BookMeThat - pull live GSC performance data for bookmethat.com."""
import json, sys
from datetime import date, timedelta
from urllib.parse import quote

TOKEN = r"C:\Users\accts\AppData\Local\hermes\google_token.json"
SCOPE = ["https://www.googleapis.com/auth/webmasters.readonly"]

from google.oauth2.credentials import Credentials
from google.auth.transport.requests import AuthorizedSession, Request

c = Credentials.from_authorized_user_file(TOKEN, SCOPE)
if c.expired and c.refresh_token:
    c.refresh(Request())
s = AuthorizedSession(c)

r = s.get("https://www.googleapis.com/webmasters/v3/sites")
if r.status_code != 200:
    print("HTTP", r.status_code, r.text[:400]); sys.exit(1)
sites = [x["siteUrl"] for x in r.json().get("siteEntry", [])]
print("=== GSC PROPERTIES ===")
for x in sites:
    print("  ", x)

bmt = [x for x in sites if "bookmethat" in x.lower()]
if not bmt:
    print("RESULT: bookmethat.com NOT in visible properties"); sys.exit(2)
SITE = bmt[0]
END = date.today() - timedelta(days=3)
cur_start = END - timedelta(days=27)

def q(dims=None, limit=25, start=None, end=None):
    body = {"startDate": (start or cur_start).isoformat(), "endDate": (end or END).isoformat(),
            "rowLimit": limit, "searchType": "web", "dataState": "final"}
    if dims: body["dimensions"] = dims
    enc = quote(SITE, safe="")
    rr = s.post(f"https://searchconsole.googleapis.com/webmasters/v3/sites/{enc}/searchAnalytics/query", json=body)
    if rr.status_code != 200:
        return {"error": f"{rr.status_code}: {rr.text[:200]}"}
    return rr.json()

def totals(start, end):
    d = q(None, 1, start, end)
    rows = d.get("rows", [])
    if rows:
        x = rows[0]
        return x['clicks'], x['impressions'], x['ctr']*100, x['position']
    return 0, 0, 0, 0

# ---- 28-day current vs previous ----
END = date.today() - timedelta(days=3)
cur_start = END - timedelta(days=27)
prev_end = cur_start - timedelta(days=1)
prev_start = prev_end - timedelta(days=27)
print(f"\n=== SITE: {SITE} ===")
print(f"CURRENT  {cur_start} .. {END}")
c1, i1, ctr1, p1 = totals(cur_start, END)
print(f"  clicks={c1} impressions={i1} ctr={ctr1:.2f}% pos={p1:.1f}")
print(f"PREVIOUS {prev_start} .. {prev_end}")
c2, i2, ctr2, p2 = totals(prev_start, prev_end)
print(f"  clicks={c2} impressions={i2} ctr={ctr2:.2f}% pos={p2:.1f}")
delta = ((c1-c2)/c2*100) if c2 else 0
print(f"  CLICK CHANGE: {delta:+.1f}%")

print("\n-- TOP QUERIES (28d) --")
d = q(["query"], 30)
for row in d.get("rows", [])[:30]:
    print(f"  {row['clicks']:>4} clicks | {row['impressions']:>6} impr | {row['ctr']*100:>5.2f}% | pos {row['position']:>5.1f} | {row['keys'][0]}")

print("\n-- TOP PAGES (28d) --")
d = q(["page"], 30)
for row in d.get("rows", [])[:30]:
    print(f"  {row['clicks']:>4} clicks | {row['impressions']:>6} impr | {row['ctr']*100:>5.2f}% | pos {row['position']:>5.1f} | {row['keys'][0]}")

print("\n-- COUNTRIES (28d) --")
d = q(["country"], 15)
for row in d.get("rows", [])[:15]:
    print(f"  {row['clicks']:>4} clicks | {row['impressions']:>6} impr | pos {row['position']:>5.1f} | {row['keys'][0]}")

print("\n-- DEVICES (28d) --")
d = q(["device"], 5)
for row in d.get("rows", [])[:5]:
    print(f"  {row['clicks']:>4} clicks | {row['impressions']:>6} impr | pos {row['position']:>5.1f} | {row['keys'][0]}")

# ---- index coverage / sitemaps ----
enc = quote(SITE, safe="")
print("\n=== SITEMAPS ===")
rr = s.get(f"https://www.googleapis.com/webmasters/v3/sites/{enc}/sitemaps")
if rr.status_code == 200:
    for sm in rr.json().get("sitemap", []):
        print(f"  {sm.get('isPending')} pending | errors={sm.get('errors')} | indexed={sm.get('indexed')} | {sm['path']}")
else:
    print("  ERR", rr.status_code, rr.text[:200])

# ---- quick wins: queries with impressions but low CTR ----
print("\n=== QUICK WINS (impressions>50, pos 4-20) ===")
d = q(["query"], 250)
wins = [r for r in d.get("rows", []) if r['impressions'] > 50 and 4 <= r['position'] <= 20]
for row in sorted(wins, key=lambda x: -x['impressions'])[:20]:
    print(f"  {row['impressions']:>6} impr | {row['clicks']:>3} clicks | {row['ctr']*100:>5.2f}% | pos {row['position']:>5.1f} | {row['keys'][0]}")
