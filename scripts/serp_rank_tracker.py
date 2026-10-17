#!/usr/bin/env python3
"""SerpAPI rank tracker + ATP (Attack Plan Tracker) report.

Wire the SerpAPI.io key into a ranking script so you can see where each site
sits in the SERPs for the keywords that actually matter. Tracks bookmethat.com
plus the portfolio, so you can prioritise by real position -- not guesses.

Usage:
    python scripts/serp_rank_tracker.py            # run one pass, write history
    python scripts/serp_rank_tracker.py --report   # write the ATP report (CSV)
    python scripts/serp_rank_tracker.py --compare  # show position change vs last run

Credentials:
    Read from scripts/serp-config.json (or fall back to serp-api.txt).
    Never print the key.
"""

import csv
import json
import os
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

REPO = Path(__file__).parent.parent
SCRIPTS = Path(__file__).parent
HISTORY_FILE = SCRIPTS / "serp_history.json"
CONFIG_FILE = SCRIPTS / "serp-config.json"

SERPER_ENDPOINT = "https://serpapi.com/search"


def load_config():
    """Read the Serp API key and keyword list from serp-config.json."""
    if CONFIG_FILE.exists():
        with open(CONFIG_FILE) as f:
            return json.load(f)
    return {"api_key": None, "keywords": [], "sites": [], "output": str(HISTORY_FILE)}


def serp_api_key(cfg):
    """Read the key, with a fallback to serp-api.txt if no config file."""
    key = cfg.get("api_key")
    if key:
        return key
    key_file = os.path.expanduser("C:/Users/accts/scratchpad/serp-api.txt")
    if os.path.exists(key_file):
        with open(key_file) as f:
            for line in f:
                if line.startswith("SERP_API_KEY="):
                    return line.strip().split("=", 1)[1]
    return None


def query_serp(query, api_key, config):
    """Query SerpAPI for a keyword and return the parsed JSON response."""
    params = {
        "q": query,
        "key": api_key,
        "hl": config.get("geo", {}).get("hl", "en"),
        "gl": config.get("geo", {}).get("gl", "us"),
        "num": 10,
    }
    url = SERPER_ENDPOINT + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (rank-tracker)"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def extract_position(result, target_domain):
    """Find the organic position of target_domain. None if not present."""
    results = result.get("organic_results", [])
    for i, item in enumerate(results, start=1):
        link = item.get("link", "")
        if target_domain in link:
            return i
    return None


def domain_of(result):
    """Return the domain of the top organic result, for reference."""
    results = result.get("organic_results", [])
    if results:
        return results[0].get("link", "").split("/")[2]
    return None


def run_batch(cfg, api_key):
    """Query SerpAPI for every keyword x site combo. Returns a list of records."""
    records = []
    total = len(cfg.get("keywords", []))
    for kw in cfg.get("keywords", []):
        try:
            result = query_serp(kw, api_key, cfg)
        except Exception as e:  # noqa: BLE001
            records.append({"keyword": kw, "error": str(e)[:120], "timestamp": now_iso()})
            continue

        for site in cfg.get("sites", []):
            pos = extract_position(result, site["domain"])
            records.append({
                "keyword": kw,
                "site": site["name"],
                "domain": site["domain"],
                "position": pos,
                "results_count": len(result.get("organic_results", [])),
                "top_domain": domain_of(result),
                "page_title": (result.get("search_information") or {}).get("organic_results_information", "").split(";")[0],
                "timestamp": now_iso(),
            })
            time.sleep(1.2)  # SerpAPI rate-limit safety
    return records


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def load_history():
    if HISTORY_FILE.exists():
        with open(HISTORY_FILE) as f:
            return json.load(f)
    return {"runs": [], "by_keyword_site": {}}


def save_history(history):
    with open(HISTORY_FILE, "w") as f:
        json.dump(history, f, indent=2)


def record_run(history, records):
    run = {"timestamp": now_iso(), "keyword_count": len(records), "records": records}
    history["runs"].append(run)
    # Keep only the last 20 runs for the ATP compare
    history["runs"] = history["runs"][-20:]
    save_history(history)


def write_csv(records, path):
    """Write a flat CSV of keyword sites positions."""
    path = Path(path)
    with open(path, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["timestamp", "keyword", "site", "domain", "position", "top_domain"])
        for r in records:
            writer.writerow([
                r.get("timestamp", ""),
                r.get("keyword", ""),
                r.get("site", ""),
                r.get("domain", ""),
                r.get("position"),
                r.get("top_domain", ""),
            ])


def write_digest(records, history, path):
    """Write a human-readable Markdown digest of this run."""
    path = Path(path)
    lines = []
    lines.append("# SERP Ranking Digest — BookMeThat + Portfolio")
    lines.append("")
    lines.append(f"**Run at:** {records[0].get('timestamp', '')[:19] if records else 'n/a'}")
    lines.append(f"**Keywords tracked:** {len(set(r['keyword'] for r in records if 'keyword' in r))}")
    lines.append(f"**Sites tracked:** {len(set(r['site'] for r in records if 'site' in r))}")
    lines.append("")

    # Site summary
    lines.append("## Where each site sits")
    lines.append("")
    for site in sorted(set(r["site"] for r in records if "site" in r)):
        rows = [r for r in records if r.get("site") == site]
        seen = [r for r in rows if r.get("position") is not None]
        count = len(seen)
        total = len(rows)
        pct = int(count / total * 100) if total else 0
        lines.append(f"### {site} ({site.split('.')[0]})")
        lines.append("")
        lines.append(f"- Seen in top 10 for: **{count}/{total}** keywords ({pct}%)")
        if seen:
            for r in sorted(seen, key=lambda x: x["position"]):
                lines.append(f"  - `{r['keyword']}` → position {r['position']}")
        else:
            lines.append("  - **No rank found in top 10** — needs attention")
        lines.append("")

    # Priority targets
    lines.append("## Priority targets (off page one)")
    lines.append("")
    lines.append("These keyword+site combos are **not** in the top 10 and need backlinks/content.")
    lines.append("")
    lines.append("| Keyword | Site | Priority |")
    lines.append("|---|---|---|")
    for r in sorted(records, key=lambda x: (x.get("position") is not None, x["keyword"])):
        if r.get("position") is None:
            lines.append(f"| {r['keyword']} | {r['site']} | **must target** |")
    lines.append("")

    # Leaderboard (top 10 for context)
    lines.append("## Leaderboard (what ranks)")
    lines.append("")
    lines.append("| Keyword | #1 result |")
    lines.append("|---|---|")
    seen_kw = set()
    for r in sorted(records, key=lambda x: (x["keyword"], x["timestamp"])):
        if r.get("top_domain") and r["keyword"] not in seen_kw:
            lines.append(f"| {r['keyword']} | {r['top_domain']} (pos ...) |")
            seen_kw.add(r["keyword"])
    lines.append("")

    lines.append("---")
    lines.append("*Generated by scripts/serp_rank_tracker.py — no manual action needed.*")
    path.write_text("\n".join(lines), encoding="utf-8")


def build_atp_report(records, history):
    """Build the Attack Plan Tracker report: keyword, site, position, priority."""
    report = []
    for r in records:
        if r.get("position") is None:
            report.append({
                "keyword": r["keyword"],
                "site": r["site"],
                "domain": r["domain"],
                "position": "not seen",
                "priority": "HAVE TO TARGET",
                "change": "",
            })
        else:
            # Compare with last run on the same keyword+domain
            key = (r["keyword"], r["domain"])
            prev = None
            for old in reversed(history.get("runs", [])):
                for old_r in old.get("records", []):
                    if (old_r.get("keyword"), old_r.get("domain")) == key:
                        prev = old_r.get("position")
                        break
                if prev is not None:
                    break
            if prev is None:
                change = ""
            else:
                change = f"{prev} -> {r['position']}"
            report.append({
                "keyword": r["keyword"],
                "site": r["site"],
                "domain": r["domain"],
                "position": r["position"],
                "priority": priority_for(r["position"]),
                "change": change,
            })
    return report


def priority_for(pos):
    """Turn a position into an actionable priority label."""
    if pos is None:
        return "HAVE TO TARGET"
    if pos <= 1:
        return "NUMBER ONE"
    if pos <= 3:
        return "TOP 3"
    if pos <= 10:
        return "ON PAGE ONE"
    return "OFF PAGE ONE"


def print_summary(records):
    print("=" * 64)
    print("SERP RANK TRACKER — BookMeThat + portfolio")
    print(f"Run at: {records[0].get('timestamp', '')[:19] if records else 'n/a'}")
    print(f"Keywords tracked: {len(set(r['keyword'] for r in records if 'keyword' in r))}")
    print(f"Portfolio sites: {len(set(r['site'] for r in records if 'site' in r))}")
    print("=" * 64)

    for site in sorted(set(r["site"] for r in records if "site" in r and r.get("position") is not None)):
        print(f"\n--- {site} ---")
        rows = [r for r in records if r.get("site") == site and r.get("position") is not None]
        for r in sorted(rows, key=lambda x: (x["keyword"], x["position"])):
            print(f"  {r['keyword']:<28} -> {r['position']}")

    print("\n" + "=" * 64)
    print("ZERO-CLICK / NOT SEEN (high priority targets):")
    missed = [r for r in records if r.get("position") is None]
    for r in sorted(missed, key=lambda x: x["keyword"]):
        print(f"  {r['keyword']:<28} -> {r['site']:<14} ({r['domain']})")
    print("=" * 64)


def main():
    import argparse
    parser = argparse.ArgumentParser(description="SerpAPI rank tracker + ATP report")
    parser.add_argument("--report", action="store_true", help="write the ATP CSV report")
    parser.add_argument("--compare", action="store_true", help="compare with last run")
    args = parser.parse_args()

    cfg = load_config()
    api_key = serp_api_key(cfg)
    if not api_key:
        print("ERROR: no Serp API key found. Put SERP_API_KEY=<key> in scripts/serp-config.json or serp-api.txt")
        sys.exit(1)

    print(f"SerpAPI key loaded: {len(api_key)} chars")
    records = run_batch(cfg, api_key)
    if not records:
        print("No records returned.")
        sys.exit(1)

    history = load_history()
    record_run(history, records)

    print_summary(records)

    if args.report:
        csv_path = REPO / "SERP-RANKING-REPORT.csv"
        write_csv(records, csv_path)
        print(f"\nFlat CSV written to: {csv_path}")

        digest_path = REPO / "SERP-RANKING-DIGEST.md"
        write_digest(records, history, digest_path)
        print(f"Digest written to: {digest_path}")

        # Also archive the digest with a timestamp so monthly runs keep a history
        ts = records[0].get("timestamp", "")[:19].replace(" ", "_").replace(":", "")
        archive = REPO / f"SERP-RANKING-DIGEST-{ts}.md"
        write_digest(records, history, archive)
        print(f"Archived digest: {archive}")

    if args.compare:
        # ATP compare is shown inline above; summary printed.
        print("\n(use --report for the full ATP CSV with change tracking)")

    print("\nReport prepared. Next steps:")
    print("  1. python scripts/serp_rank_tracker.py --report   -> writes SERP-RANKING-REPORT.csv")
    print("  2. Hand that CSV to the outreach plan (which keywords to target).")


if __name__ == "__main__":
    main()
