const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'public', 'facebook-posts');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const WEEKLY_POSTS = [
  {
    day: 'Monday',
    type: 'Deal Post',
    content: `🔥 This week's verified deal: Saily 15% off global eSIM data — code TEE15.

Traveling anytime soon? Get 15% off global data plans with Saily — works in 150+ countries, no physical SIM needed, activate before you fly.

Code: TEE15
Valid: Verified September 2026
Coverage: 150+ countries

Full comparison and how to set it up: https://bookmethat.com/best-esim-italy

#TravelDeals #eSIM #BookMeThat`,
    reel: true,
    reelContent: `Quick tip: How to save 15% on your next eSIM — here's the code (TEE15) and why Saily is the best pick for most travelers. Works in 150+ countries. Set it up before you fly. #TravelHacks #eSIM`
  },
  {
    day: 'Tuesday',
    type: 'Value Post',
    content: `3 things most travelers don't know about EU261 flight delay compensation:

1. You can claim up to 600 per person for delays over 3 hours on eligible EU flights — even if the airline says "extraordinary circumstances."

2. The clock starts from your ARRIVAL time at destination, not departure. A 2-hour departure delay that turns into a 4-hour arrival delay = eligible.

3. You have up to 2-6 years to claim (depends on the country). Most people leave money on the table because they think they missed the deadline.

Full guide and how to claim: https://bookmethat.com/flight-delay-compensation

#TravelTips #EU261 #FlightDelay #BudgetTravel`,
    reel: false
  },
  {
    day: 'Wednesday',
    type: 'Deal Post',
    content: `Zero-deposit car rentals — how to lock a rental without a credit card hold.

Most rental companies put a $1,000-$3,000 hold on your card when you pick up the car. That's your money frozen for the trip.

Localrent lets you book from operators that don't require a card deposit — or only a small one. That means your bank account stays free for the rest of your trip.

- No $3,000 block on your card
- Compare local operators with real reviews
- Works in Europe, US, and more

Find the current deals: https://bookmethat.com/car-rental

#CarRental #TravelHacks #BudgetTravel`,
    reel: true,
    reelContent: `The hidden fee on car rentals most people miss: the security deposit hold. It can be $1,000-$3,000 frozen on your card for the whole trip. Here's how to find zero-deposit rentals and keep your money free. #TravelTips #CarRental`
  },
  {
    day: 'Thursday',
    type: 'Engagement Post',
    content: `Where are you headed next? ✈️

Drop your destination in the comments and I'll share the best eSIM for it — Saily vs Airalo vs Holafly, which one actually works there, and the current promo code.

I read every comment. 👇

#TravelQuestions #eSIM #BookMeThat`,
    reel: false
  },
  {
    day: 'Friday',
    type: 'Deal Roundup',
    content: `3 verified deals this week — save on your next trip:

📱 Saily eSIM — 15% off global data (code TEE15). Works in 150+ countries. https://bookmethat.com/best-esim-italy

🚗 Localrent — zero-deposit car rentals. No $3,000 hold on your card. https://bookmethat.com/car-rental

🎟️ GoCity — 10% off All-Inclusive city passes. 20+ cities worldwide. Offer ends Sep 30. https://bookmethat.com

All deals verified September 2026. Full comparisons and setup guides on the site.

#TravelDeals #WeekendGetaway #BookMeThat`,
    reel: true,
    reelContent: `3 deals this week worth knowing about: 15% off eSIMs, zero-deposit car rentals, and 10% off city passes (ends this week). All verified, all on the site. #TravelDeals #WeekendPlans`
  },
  {
    day: 'Saturday',
    type: 'Light Post',
    content: `Weekend traveler question: what's the one thing you always forget to check before a trip?

For me it's whether my phone is carrier-unlocked for an eSIM. Learned that the hard way once.

Share yours below 👇

#TravelStories #BudgetTravel`,
    reel: false
  }
];

const MONTHLY_FACEBOOK_POST = [
  '📣 If you run a travel blog, website, or social page — here\'s the network I use to monetize travel traffic.',
  '',
  'Travelpayouts gives you access to 90+ travel brands in one dashboard:',
  '✈️ Flights',
  '🏨 Hotels',
  '🚗 Car rentals',
  '📱 eSIMs',
  '🎟️ Tours & activities',
  '🛡️ Travel insurance',
  '',
  'One dashboard. One combined payout. No need to manage separate accounts with each brand.',
  '',
  'If you\'re looking to monetize a travel audience, here\'s the referral link: https://www.travelpayouts.com/?marker=685596',
  '',
  'I earn a referral reward if you sign up through it — at zero extra cost to you. Full disclosure: this is my affiliate referral link.',
  '',
  '#TravelBloggers #TravelMonetization #BookMeThat'
].join('\n');

const MONTHLY_NEWSLETTER_SEGMENT = [
  '📌 For Travel Creators — One Section a Month',
  '',
  'This newsletter is monetized through the Travelpayouts Affiliate Network — 90+ travel brands (flights, hotels, car rentals, eSIMs, tours, insurance) in one dashboard with a single combined monthly payout. No separate accounts to manage.',
  '',
  'If you run a travel blog, website, or page and want to monetize your travel audience the same way, here\'s our referral link to join: https://www.travelpayouts.com/?marker=685596',
  '',
  'We earn a referral reward if you sign up through it — at zero extra cost to you. This section appears once a month. Unsubscribe anytime, but if you run a travel site, this link is worth bookmarking.'
].join('\n');

fs.writeFileSync(path.join(OUTPUT_DIR, 'monthly-facebook-post.txt'), MONTHLY_FACEBOOK_POST);
fs.writeFileSync(path.join(OUTPUT_DIR, 'newsletter-segment-travel-creators.txt'), MONTHLY_NEWSLETTER_SEGMENT);

const weeklyLines = WEEKLY_POSTS.map(p => {
  let lines = [
    `${p.day} — ${p.type}`,
    '='.repeat(40),
    p.content,
  ];
  if (p.reel) lines.push('', `Reel: ${p.reelContent}`);
  return lines.join('\n');
});

fs.writeFileSync(path.join(OUTPUT_DIR, 'weekly-content-calendar.txt'), weeklyLines.join('\n\n'));

console.log('Done. Files written to public/facebook-posts/');
console.log('  - weekly-content-calendar.txt');
console.log('  - monthly-facebook-post.txt');
console.log('  - newsletter-segment-travel-creators.txt');
