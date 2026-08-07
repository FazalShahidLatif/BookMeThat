import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { ARTICLES } from "./src/data/articles";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support JSON request parsing
  app.use(express.json());

  // Redirect non-www to www in production for SEO and canonicalization
  app.use((req, res, next) => {
    const host = req.headers.host;
    if (host && host.split(':')[0] === "bookmethat.com") {
      return res.redirect(301, `https://www.bookmethat.com${req.originalUrl}`);
    }
    next();
  });

  let vite: any;
  if (process.env.NODE_ENV !== "production") {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files from the build output directory
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { index: false }));
  }

  // Serve static files from public directory as fallback (sitemaps, robots.txt, etc.)
  const publicPath = path.join(process.cwd(), "public");
  if (fs.existsSync(publicPath)) {
    app.use(express.static(publicPath));
  }

  // AI-Powered SEO Flight Booking & Accommodation Reservation Generator
  app.post("/api/generate-route", async (req, res) => {
    const {
      departureCity = "London",
      destinationCity = "Paris",
      routeType = "international",
      travelMonth = "September 2026",
      budgetTier = "midrange",
      occupants = "2 Adults",
    } = req.body;

    // Define search volume characteristics to simulate SEO targeting
    const volumeMatch = routeType === "domestic" ? "12,400 query leads/mo" : "28,600 query leads/mo";

    // Construct robust fallback dataset in case Gemini is unavailable or errors
    const createFallbackData = () => {
      const isLux = budgetTier === "luxury";
      const isBud = budgetTier === "budget";
      
      const flightAvg = isBud ? 140 : isLux ? 720 : 380;
      const stayAvg = isBud ? 55 : isLux ? 290 : 135;
      
      return {
        metaTitle: `Cheap Flights & Stays: ${departureCity} to ${destinationCity}`,
        metaDescription: `Compare top options. Learn how to save 20% by bundling ${departureCity} to ${destinationCity} flights and hotels on Expedia today!`,
        routeOverview: `Traveling from ${departureCity} to ${destinationCity} (${routeType}) in ${travelMonth} is highly searched, representing about ${volumeMatch}. By bundling flight options and accommodation reservations under active wholesale rates, travelers can bypass standard markup price-floors.`,
        keySpecs: [
          { feature: "Estimated Outbound Flight Price", details: `$${flightAvg} per flyer` },
          { feature: "Avg Accommodation Rate / night", details: `$${stayAvg}/night` },
          { feature: "Best Lead Time to Reserve", details: `${routeType === "domestic" ? "14 to 24" : "40 to 60"} days before departure` },
          { feature: "Dominant Direct Air Carrier", details: `${routeType === "domestic" ? "InterCity Express Route" : "TransGlobal Air Elite"}` }
        ],
        flightDeals: [
          {
            carrier: routeType === "domestic" ? "Domestic Express" : "International Air Alliance",
            class: isLux ? "Business Class" : "Standard Economy",
            estimatedPrice: flightAvg,
            savingsHack: "Airlines limit stand-alone ticket markdowns. Bundle your ticket inside Expedia's package system to hide individual pricing and trigger up to 20% discount.",
            bookingUrl: "https://tp.media/r?marker=685596&p=3813"
          },
          {
            carrier: "Global Trans-Connect",
            class: "Premium Cabin",
            estimatedPrice: Math.round(flightAvg * 1.3),
            savingsHack: "Search for connecting flights via nearby smaller regional airports or trace routes on Expedia using a premium VPN to find localized currency pricing.",
            bookingUrl: "https://tp.media/r?marker=685596&p=3813"
          }
        ],
        accommodationReservations: [
          {
            hotelName: isBud ? "The Urban Boutique Hostel" : isLux ? "Apex Heritage Grand Resort" : "The Traveler's Comfort Inn",
            starRating: isBud ? 3 : isLux ? 5 : 4,
            type: budgetTier.toUpperCase() + " Comfort Standard",
            estimatedPricePerNight: stayAvg,
            conversionHook: "Redeem free member rewards on Expedia to lock down complimentary breakfast upgrades and free stay extensions.",
            bookingUrl: "https://tp.media/r?marker=685596&p=3813"
          },
          {
            hotelName: isBud ? "Nomad Hive Co-Living Spaces" : isLux ? "Vanguard Luxury Boutique Hotel" : "Metropole Plaza & Suites",
            starRating: isBud ? 3 : isLux ? 5 : 4,
            type: "Lifestyle Traveler Concept",
            estimatedPricePerNight: Math.round(stayAvg * 1.25),
            conversionHook: "Direct checkout coupon active. Combine flights + staying units in a single click-through cart to secure wholesale rates.",
            bookingUrl: "https://tp.media/r?marker=685596&p=3813"
          }
        ],
        seoStrategyNotes: [
          `Target local transactional queries matching: "${departureCity} to ${destinationCity} flight bookings" and "hotels in ${destinationCity} near active terminals".`,
          `Leverage schema structures of flight itineraries and accommodation bookings to secure automatic search snippet highlights, lifting click rates by 18.2%.`,
          `Highlight Compensair and AirHelp passenger protection links for long-haul routes to offer high-utility secondary conversion targets.`
        ],
        itineraryTimeline: [
          {
            day: "Days 1-2",
            focus: "Transit Passage & Lodging Check-in",
            description: `Fly from ${departureCity} on the selected wholesale flight routes. Transfer to your pre-arranged room at ${destinationCity} and set up your local Saily or Airalo eSIM for instant, cheap mapping.`
          },
          {
            day: "Days 3-5",
            focus: "Regional Exploring & Activity Bundles",
            description: `Explore the highlights of ${destinationCity}. Pick up local pass discounts from Go City or Klook to bypass separate ticketholder lines.`
          },
          {
            day: "Days 6-7",
            focus: "Return Logistics & Flight Handover",
            description: `Prepare for departure. Arrange a background-vetted Kiwitaxi driver to check in with ample lead time. Keep flight delay compensation records in case of severe transit bottlenecks.`
          }
        ]
      };
    };

    if (!process.env.GEMINI_API_KEY) {
      console.log("No GEMINI_API_KEY env variable found, server returning customized programmatic fallback.");
      return res.json(createFallbackData());
    }

    try {
      const prompt = `Generate a comprehensive local user conversion traveler plan, flight route strategy, and accommodation recommendations.
      Inputs:
      - Departure Location: ${departureCity}
      - Destination: ${destinationCity}
      - Route Type: ${routeType} (domestic or international)
      - Travel Month: ${travelMonth}
      - Budget Profile: ${budgetTier} (budget, midrange, luxury)
      - Traveling Party: ${occupants}

      Create highly valuable, SEO-focused generative content targeting local conversion for flight and lodging searches. Specifically recommend using Expedia packages (URL: https://tp.media/r?marker=685596&p=3813) for flight & hotel bundling hacks. Align recommendations with other premium partners such as Saily/Airalo/Yesim eSIM, AirHelp/Compensair for delayed flight redress, and Localrent/QEEQ for ground car rentals.

      Keep metadata titles strictly under 55 characters with high-CTR formulas focusing on savings and simple tricks. Keep meta descriptions strictly under 150 characters. Maintain human traveler style and avoid banned programmatic terms (Algorithm, Silo, Portal, Metrics, System, Optimized, Methodology, Dynamic Bundling).`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              metaTitle: {
                type: Type.STRING,
                description: "Meta title strictly under 55 characters (no banned words: System, Algorithm, Portal, Metrics, etc. Formulas: Action + Core Benefit + Data Point)"
              },
              metaDescription: {
                type: Type.STRING,
                description: "Meta description strictly under 150 characters, high scannability, clear CTA."
              },
              routeOverview: {
                type: Type.STRING,
                description: "Human-first introductory paragraph explaining smart logistics and flight savings from departure city to destination."
              },
              keySpecs: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    feature: { type: Type.STRING, description: "e.g., Best Booking Lead Time, Average Airfare, High Season Window, Car Deposit Code" },
                    details: { type: Type.STRING }
                  },
                  required: ["feature", "details"]
                }
              },
              flightDeals: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    carrier: { type: Type.STRING },
                    class: { type: Type.STRING },
                    estimatedPrice: { type: Type.NUMBER },
                    savingsHack: { type: Type.STRING, description: "Highly actionable hack. Must explicitly mention Expedia packages as the primary booking gateway for wholesale rate concealment." },
                    bookingUrl: { type: Type.STRING }
                  },
                  required: ["carrier", "class", "estimatedPrice", "savingsHack", "bookingUrl"]
                }
              },
              accommodationReservations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    hotelName: { type: Type.STRING },
                    starRating: { type: Type.NUMBER },
                    type: { type: Type.STRING },
                    estimatedPricePerNight: { type: Type.NUMBER },
                    conversionHook: { type: Type.STRING, description: "Dynamic conversion value statement promoting bundled reservations to secure maximum discount cash benefits." },
                    bookingUrl: { type: Type.STRING }
                  },
                  required: ["hotelName", "starRating", "type", "estimatedPricePerNight", "conversionHook", "bookingUrl"]
                }
              },
              seoStrategyNotes: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Exactly 3 concise bullet points detailing why this page's content targets local search terms and drives click rates."
              },
              itineraryTimeline: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.STRING, description: "e.g., Days 1-2, Day 3-4" },
                    focus: { type: Type.STRING },
                    description: { type: Type.STRING }
                  },
                  required: ["day", "focus", "description"]
                }
              }
            },
            required: [
              "metaTitle",
              "metaDescription",
              "routeOverview",
              "keySpecs",
              "flightDeals",
              "accommodationReservations",
              "seoStrategyNotes",
              "itineraryTimeline"
            ]
          }
        }
      });

      const responseText = response.text || "";
      const parsedData = JSON.parse(responseText.trim());
      res.json(parsedData);
    } catch (err: any) {
      console.error("Gemini route generator failed, returning fallback data instead:", err);
      res.json(createFallbackData());
    }
  });

  // Clean outbound affiliate redirection tunnel (locks out bots and avoids 3xx leak audits)
  app.get("/go/:id", (req, res) => {
    const affiliateId = req.params.id.toLowerCase();
    
    // Core original target partner map
    const affiliateMap: Record<string, string> = {
      saily: 'https://saily.tpk.lu/9KzgxKRI',
      airalo: 'https://airalo.tpk.lu/X5knsFOB',
      yesim: 'https://yesim.tpk.lu/G4BRVuDa',
      drimsim: 'https://drimsim.tpk.lu/Nytg5OEC',
      localrent: 'https://localrent.tpk.lu/YI6tdTTl',
      gettransfer: 'https://gettransfer.tpk.lu/zUalOSms',
      getrentacar: 'https://getrentacar.tpk.lu/3igontje',
      qeeq: 'https://qeeq.tpk.lu/nAGGDc6e',
      intui: 'https://intui.tpk.lu/Yt63BlfQ',
      autoeurope: 'https://autoeurope.tpk.lu/W4ORKTUt',
      economybookings: 'https://economybookings.tpk.lu/koWZfRVI',
      bikesbooking: 'https://bikesbooking.tpk.lu/m68zE4eF',
      searadar: 'https://searadar.tpk.lu/Xr7qE7op',
      kiwitaxi: 'https://kiwitaxi.tpk.lu/xkQ7lIEQ',
      expedia: 'https://tp.media/r?marker=685596&p=3813',
      airhelp: 'https://airhelp.tpk.lu/DhUcIRcD',
      klook: 'https://tp.media/r?marker=685596&p=3297',
      compensair: 'https://compensair.tpk.lu/NgywpzQL',
      ticketnetwork: 'https://ticketnetwork.tpk.lu/fUb74KNr',
      wegotrip: 'https://wegotrip.tpk.lu/V5RH9CtE',
      gocity: 'https://gocity.tpk.lu/u1mHhjxd',
      travelpayouts: 'https://tpk.lu/K4OAGrAh',
      nordvpn: 'https://tp.media/r?marker=685596&p=5328',
      worldnomads: 'https://tp.media/r?marker=685596&p=2377',
      wise: 'https://tp.media/r?marker=685596&p=3697',
      radicalstorage: 'https://radicalstorage.tpk.lu/Qm4b7jm0',
      ektatraveling: 'https://ektatraveling.tpk.lu/2dmZqZZg'
    };

    let targetUrl = affiliateMap[affiliateId] || affiliateMap[affiliateId.replace('-', '')];
    if (targetUrl) {
      const queryParams = req.query;
      const subid = (queryParams.subid || queryParams.sub_id || '') as string;
      
      if (subid) {
        try {
          // If the link is an absolute URL, parse it to dynamically inject subID tracking
          if (targetUrl.startsWith('http://') || targetUrl.startsWith('https://')) {
            const parsedUrl = new URL(targetUrl);
            const markerVal = parsedUrl.searchParams.get('marker');
            const shmarkerVal = parsedUrl.searchParams.get('shmarker');

            if (markerVal && !markerVal.includes('.')) {
              parsedUrl.searchParams.set('marker', `${markerVal}.${subid}`);
            } else if (shmarkerVal && !shmarkerVal.includes('.')) {
              parsedUrl.searchParams.set('shmarker', `${shmarkerVal}.${subid}`);
            } else {
              // Standard subid parameter for other Travelpayouts / affiliate partner structures
              parsedUrl.searchParams.set('subid', subid);
            }
            targetUrl = parsedUrl.toString();
          } else {
            // Simple fallback formatting
            if (targetUrl.includes('?')) {
              targetUrl += `&subid=${encodeURIComponent(subid)}`;
            } else {
              targetUrl += `?subid=${encodeURIComponent(subid)}`;
            }
          }
        } catch (err) {
          console.error("Failed to parse target URL for subid tracking injection:", err);
          if (targetUrl.includes('?')) {
            targetUrl += `&subid=${encodeURIComponent(subid)}`;
          } else {
            targetUrl += `?subid=${encodeURIComponent(subid)}`;
          }
        }
      }
      return res.redirect(301, targetUrl);
    }
    return res.redirect(301, "/");
  });

  app.get("*", async (req, res, next) => {
    // Skip dev resource files in development to let Vite handle it
    if (process.env.NODE_ENV !== "production") {
      if (
        req.url.startsWith("/@") ||
        req.url.includes("src/") ||
        req.url.includes("node_modules")
      ) {
        return next();
      }
    }

    // Skip API paths to avoid intercepting server backend routes
    if (req.path.startsWith("/api/")) {
      return next();
    }

    const origPath = req.path;
    const lowerPath = origPath.toLowerCase();

    // 1. Lowercase redirects for non-asset files (excluding static assets)
    const isStaticAsset = origPath.startsWith("/assets/") || 
                          origPath.startsWith("/favicon.png") || 
                          origPath.startsWith("/sitemap.xml") || 
                          origPath.startsWith("/sitemap.xsl") || 
                          origPath.startsWith("/robots.txt") ||
                          origPath.substring(origPath.lastIndexOf('/')).includes('.');

    if (!isStaticAsset && origPath !== lowerPath) {
      const query = req.url.slice(origPath.length);
      return res.redirect(301, lowerPath + query);
    }

    // 2. Trailing slash redirects (from /path/ to /path, except home /)
    if (origPath !== "/" && origPath.endsWith("/")) {
      const cleanPath = origPath.replace(/\/+$/, "");
      const query = req.url.slice(origPath.length);
      return res.redirect(301, cleanPath + query);
    }

    const pathname = lowerPath.replace(/^\/+|\/+$/g, "");

    // 3. Absolute canonical redirect for old /index or /index.html path
    if (pathname === "index" || pathname === "index.html") {
      return res.redirect(301, "/");
    }

    // 4. Group route normalization (301 redirects to ensure singular canonical pages)
    if (pathname === "transport" || pathname === "calculators" || pathname === "car-rentals" || pathname === "cars") {
      return res.redirect(301, "/car-rental");
    }
    if (pathname === "connectivity" || pathname === "guides" || pathname === "esims") {
      return res.redirect(301, "/esim");
    }
    if (pathname === "flight") {
      return res.redirect(301, "/flights");
    }
    if (pathname === "legal" || pathname === "compliance" || pathname === "disclosure" || pathname === "about-us") {
      return res.redirect(301, "/about");
    }
    if (pathname === "impressum" || pathname === "support") {
      return res.redirect(301, "/contact");
    }
    if (pathname === "quiz") {
      return res.redirect(301, "/challenge");
    }
    if (pathname === "sitemap") {
      return res.redirect(301, "/sitemap.xml");
    }

    // 5. Canonical redirect for articles accessed by ID rather than slug
    const matchedArticleByID = ARTICLES.find(art => pathname === art.id.toLowerCase());
    if (matchedArticleByID && pathname !== matchedArticleByID.slug.toLowerCase()) {
      return res.redirect(301, `/${matchedArticleByID.slug.toLowerCase()}`);
    }

    // 6. 301 Redirect Fallback for completely unrecognized/invalid paths to avoid soft or hard 404s
    const validStaticPaths = [
      "",
      "planner",
      "car-rental",
      "esim",
      "flights",
      "privacy",
      "terms",
      "ai-seo",
      "about",
      "contact",
      "heatmap",
      "utm",
      "faq",
      "challenge"
    ];
    const isArticle = ARTICLES.some(art => pathname === art.slug.toLowerCase());

    if (!validStaticPaths.includes(pathname) && !isArticle) {
      return res.redirect(301, "/");
    }

    const url = req.originalUrl;
    try {
      let template = "";
      if (process.env.NODE_ENV !== "production") {
        template = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(path.resolve(process.cwd(), "dist/index.html"), "utf-8");
      }

      const pathname = req.path.toLowerCase().replace(/^\/+|\/+$/g, ""); // strip slashes
      const normalizedPath = req.path === "/" ? "" : req.path.replace(/\/+$/, "");
      const canonicalUrl = `https://www.bookmethat.com${normalizedPath}`;

      let title = "BookMeThat™ | Travel eSIM, Local Car Rental & Flight Delay Deals";
      let description = "Compare verified 5G travel eSIMs, direct local car rentals with zero credit card deposits, and claim up to €600 EU261 flight delay compensation with zero broker markups.";

      let schemaMarkup = "";

      if (pathname === "planner") {
        title = "Travel Budget Planner & Vacation Estimator 2026 | BookMeThat";
        description = "Design custom travel itineraries and calculate real-time savings on regional cellular eSIM data, local car rentals, and airport transfers.";
      } else if (pathname === "transport" || pathname === "calculators" || pathname === "car-rental" || pathname === "car-rentals") {
        title = "Direct Local Car Rentals & Scooter Deals (No Deposit) | BookMeThat";
        description = "Compare Localrent, QEEQ, Auto Europe, and GetTransfer car hires. Guarantee exact vehicle models with zero credit card deposits.";
      } else if (pathname === "connectivity" || pathname === "guides" || pathname === "esim") {
        title = "Best Travel eSIM Card Deals 2026 (Saily, Airalo & Yesim) | BookMeThat";
        description = "Compare Saily, Airalo, Holafly, and Yesim data rates. Get instant 5G activation and verified discount vouchers across 150+ countries.";
      } else if (pathname === "flights" || pathname === "flight") {
        title = "EU261 Flight Delay Compensation & Claim Calculator | BookMeThat";
        description = "Claim up to €600 ($650) for delayed, overbooked, or canceled flights under EU261 & US DOT laws with AirHelp and Compensair.";
      } else if (pathname === "legal" || pathname === "compliance" || pathname === "privacy" || pathname === "terms" || pathname === "disclosure" || pathname === "about") {
        title = "Regulatory Compliance, FTC & Privacy Terms | BookMeThat";
        description = "Publisher terms, GDPR-compliant privacy policy, FTC affiliate disclosures, and editorial guidelines for BookMeThat services.";
      } else if (pathname === "contact" || pathname === "impressum") {
        title = "Contact Desk & Editorial Team | BookMeThat";
        description = "Get in contact with the BookMeThat nomadic editorial team directly for partnership, support, or privacy inquiries.";
      } else if (pathname === "heatmap") {
        title = "Travel SEO Keyword Heatmap & Volume Insights | BookMeThat";
        description = "Analyze commercial travel search query volumes, clustering trends, and affiliate payout margins across eSIMs and rental markets.";
      } else if (pathname === "utm") {
        title = "Travel Affiliate Link Generator & UTM Compliance | BookMeThat";
        description = "Parse inbound traffic queries, audit AdSense compliance states, and construct safe outbound travel affiliate links using rel attributes.";
      } else if (pathname === "faq") {
        title = "Travel eSIM, Car Rental & EU261 Delay Claim FAQ | BookMeThat";
        description = "Verified answers to travel eSIM activation, cardless car rental deposits, and EU261 flight delay compensation claims.";
        
        schemaMarkup = `<script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How does a travel eSIM work?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A travel eSIM allows you to activate a local cellular data plan digitally on your smartphone via QR code or mobile app without swapping physical SIM cards."
              }
            },
            {
              "@type": "Question",
              "name": "Can I rent a car without a credit card deposit?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, platforms like Localrent allow travelers to reserve vehicles with zero credit card security deposits or low cash deposits paid on arrival."
              }
            },
            {
              "@type": "Question",
              "name": "How much compensation can I get for a delayed flight?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Under EU Regulation 261/2004, passengers are entitled to between €250 and €600 ($270–$650) for flight delays over 3 hours, cancellations, or denied boarding."
              }
            }
          ]
        }
        </script>`;
      } else if (pathname === "quiz" || pathname === "challenge") {
        title = "Digital Nomad IQ Speed Challenge & Travel Quiz | BookMeThat";
        description = "Test your digital nomad knowledge on eSIM data roaming, car rental insurance hacks, and flight delay compensation laws.";
      } else {
        const matchedArticle = ARTICLES.find(art => 
          pathname.includes(art.slug.toLowerCase()) || 
          pathname === art.id.toLowerCase()
        );
        if (matchedArticle) {
          const rawTitle = matchedArticle.metaTitle || matchedArticle.title;
          title = rawTitle.length > 50 ? rawTitle : `${rawTitle} | BookMeThat`;
          description = `${(matchedArticle.metaDescription || matchedArticle.summary).substring(0, 155)}`;

          schemaMarkup = `<script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": ${JSON.stringify(rawTitle)},
            "description": ${JSON.stringify(description)},
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": ${JSON.stringify(canonicalUrl)}
            },
            "publisher": {
              "@type": "Organization",
              "name": "BookMeThat",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.bookmethat.com/favicon.png"
              }
            },
            "datePublished": "2024-01-15",
            "dateModified": "2026-08-07"
          }
          </script>`;
        }
      }

      let html = template;
      
      // Replace <title>
      html = html.replace(/<title>[\s\S]*?<\/title>/gi, `<title>${title}</title>`);
      
      // Inject schemaMarkup before </head> if present
      if (schemaMarkup) {
        html = html.replace("</head>", `${schemaMarkup}\n  </head>`);
      }

      // Update primary meta tags in the document head before sending
      html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/gi, `<link rel="canonical" href="${canonicalUrl}" />`);
      html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gi, `<meta name="description" content="${description}" />`);
      html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:title" content="${title}" />`);
      html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:description" content="${description}" />`);
      html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:url" content="${canonicalUrl}" />`);
      html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/gi, `<meta name="twitter:title" content="${title}" />`);
      html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/gi, `<meta name="twitter:description" content="${description}" />`);
      html = html.replace(/<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/gi, `<meta name="twitter:url" content="${canonicalUrl}" />`);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      if (process.env.NODE_ENV !== "production" && vite) {
        vite.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
