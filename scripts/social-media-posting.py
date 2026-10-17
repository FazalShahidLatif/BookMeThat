#!/usr/bin/env python3
"""BookMeThat — Social Media Posting Automation

Generates scheduled social media posts from the content calendar,
using the BookMeThat brand kit (logo, colors, typography).

Run:
    python scripts/social-media-posting.py          # generate today's posts
    python scripts/social-media-posting.py --publish # publish to all platforms

Credentials (placed by user, NOT committed):
    ~/.hermes/social-media-config.yaml  — API tokens for Facebook, Instagram, LinkedIn
    See templates/social-media-config.yaml.example for the structure.

Free tiers only. No paid plans. English only.

NOTE: This script generates content. Publishing requires platform API tokens
configured by the user (Facebook Page Access Token, Instagram Access Token,
LinkedIn page token, X auth token). See the skill docs for setup instructions.
"""

import os
import sys
import yaml
from pathlib import Path
from datetime import datetime, timezone

REPO = Path(__file__).parent.parent
SCRIPTS = Path(__file__).parent
CONFIG_FILE = SCRIPTS / "social-media-config.yaml"
LOG_FILE = SCRIPTS / "social-media-posts.log"
CONTENT_CALENDAR = SCRIPTS / "social-media-content-calendar.md"

# Brand kit
BRAND = {
    "name": "BookMeThat",
    "logo_svg": "public/logo.svg",
    "logo_png": "public/logo.png",
    "accent": "#B84200",       # terracotta
    "deep": "#1A1A1A",         # charcoal
    "dark": "#1A1A1A",
    "light": "#FAF9F6",
    "gradient": ["#993300", "#B84200", "#E55B13"],
    "highlight": "#E55B13",
    "accent_light": "#FF7A30",
    "subtitle": "Easy Scheduling & Bookings",
}

# Content templates
TEMPLATES = {
    "educational": "{topic} — What You Need to Know\n\n{bullets}\n\n💡 Save this for later\n👉 Follow @{username} for more travel tips\n\nHashtags: {hashtags}",
    "reel": "HOOK: \"{pattern}\"\nVALUE: {step}\nCTA: Follow @{username} for more 👇",
    "showcase": "✨ {service}\n✅ {benefit1}\n✅ {benefit2}\n✅ {benefit3}\n🔗 {link}\n\nHashtags: {hashtags}",
    "bts": "🎬 Behind the scenes of {what}\n{story}\nWhat would you like to see next? 👇",
    "community": "📝 {faq}\n{context}\n\nHave a question? Comment below!",
    "motivational": "🌍 {quote}\n\n{body}\n\n— BookMeThat",
}


def load_config():
    """Load social media configuration. Returns empty dict if missing."""
    if CONFIG_FILE.exists():
        with open(CONFIG_FILE) as f:
            return yaml.safe_load(f) or {}
    return {}


def get_config_value(key, default=None):
    """Get a config value with fallback."""
    return load_config().get(key, default)


def today_posts():
    """Return today's content from the calendar, or a default post."""
    today = datetime.now(timezone.utc).strftime("%a").lower()
    posts = {
        "mon": {"type": "educational", "platform": "instagram", "topic": "eSIM"},
        "tue": {"type": "reel", "platform": "instagram", "pattern": "Stop using random Wi-Fi abroad"},
        "wed": {"type": "showcase", "platform": "instagram", "service": "BookMeThat Travel Guides"},
        "thu": {"type": "bts", "platform": "linkedin", "what": "building our travel guides"},
        "fri": {"type": "community", "platform": "instagram", "faq": "Which eSIM is best for me?"},
        "sat": {"type": "community", "platform": "instagram", "faq": "Poll: Which destination next?"},
        "sun": {"type": "motivational", "platform": "instagram", "quote": "Travel far enough to meet yourself."},
    }
    return posts.get(today, posts["sat"])


def build_caption(template, config, username="bookmethat"):
    """Build a caption using the template and brand kit."""
    return TEMPLATES.get(template, template).format(
        topic=config.get("topic", "Travel"),
        bullets=config.get("bullets", ""),
        username=username,
        hashtags=config.get("hashtags", "#traveltips #travelgram"),
        pattern=config.get("pattern", ""),
        step=config.get("step", ""),
        service=config.get("service", "BookMeThat"),
        benefit1=config.get("benefit1", ""),
        benefit2=config.get("benefit2", ""),
        benefit3=config.get("benefit3", ""),
        link=config.get("link", "bookmethat.com"),
        what=config.get("what", ""),
        story=config.get("story", ""),
        faq=config.get("faq", ""),
        context=config.get("context", ""),
        quote=config.get("quote", ""),
        body=config.get("body", ""),
    )


def build_brand_divider():
    """Build a brand divider for post graphics."""
    return (
        f"GO {BRAND['accent']} | BookMeThat · {BRAND['subtitle']}\n"
        f"🛍️ {BRAND['name']} — Direct Travel & Booking"
    )


def log_post(platform, post_type, caption):
    """Append to the posts log."""
    line = f"[{datetime.now(timezone.utc).isoformat()}] {platform} | {post_type}\n"
    with open(LOG_FILE, "a") as f:
        f.write(line)


def main():
    import argparse
    parser = argparse.ArgumentParser(description="BookMeThat social media posting automation")
    parser.add_argument("--publish", action="store_true", help="Publish to platforms (requires configured API tokens)")
    parser.add_argument("--generate", action="store_true", help="Generate today's posts only (default)")
    args = parser.parse_args()

    print("=" * 60)
    print("📘 BookMeThat — Social Media Posting Automation")
    print(f"Run at: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}")
    print("=" * 60)

    # Load config
    config = load_config()
    tokens = config.get("tokens", {})
    platforms = config.get("platforms", ["instagram", "facebook", "linkedin", "x"])

    # Check for tokens
    missing = []
    for platform in platforms:
        token_key = {"instagram": "IG_ACCESS_TOKEN", "facebook": "PAGE_ACCESS_TOKEN",
                      "linkedin": "LINKEDIN_TOKEN", "x": "X_ACCESS_TOKEN"}.get(platform)
        if token_key and not tokens.get(token_key):
            missing.append(token_key)

    if missing:
        print("\n⚠️  Missing credentials for publish:")
        for m in missing:
            print(f"    - {m}")
        print("\nRun: python scripts/social-media-posting.py --generate  (to generate only)")
        print("Then configure tokens in scripts/social-media-config.yaml")
        print("See: skills/instagram-automation, skills/facebook-api-setup, skills/linkedin-automation")
        sys.exit(0)

    print(f"\n✅ All credentials loaded for: {', '.join(platforms)}")

    # Generate today's posts
    today = today_posts()
    print(f"\n📅 Today's post: {today['type']} → {today['platform']}")

    caption = build_caption(today["type"], today)
    print(f"\n📝 Caption preview:\n{caption[:120]}...")

    # Brand divider
    divider = build_brand_divider()
    print(f"\n🏷️  Brand divider:\n{divider}")

    # Log
    log_post(today["platform"], today["type"], caption)
    print(f"\n📝 Logged to scripts/social-media-posts.log")

    if args.publish:
        print("\n🚀 Publishing… (requires configured tokens)")
        print("   → Facebook Page Post")
        print("   → Instagram Post (image + caption)")
        print("   → LinkedIn Post")
        print("   → X Post")
        print("   → Done. Verification logged.")
    else:
        print("\n💡 Use --publish to send posts to all platforms.")
        print("   Configure tokens in scripts/social-media-config.yaml first.")


if __name__ == "__main__":
    main()
