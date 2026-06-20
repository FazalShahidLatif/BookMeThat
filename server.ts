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
            bookingUrl: "https://tp.media/r?marker=474841&p=3813"
          },
          {
            carrier: "Global Trans-Connect",
            class: "Premium Cabin",
            estimatedPrice: Math.round(flightAvg * 1.3),
            savingsHack: "Search for connecting flights via nearby smaller regional airports or trace routes on Expedia using a premium VPN to find localized currency pricing.",
            bookingUrl: "https://tp.media/r?marker=474841&p=3813"
          }
        ],
        accommodationReservations: [
          {
            hotelName: isBud ? "The Urban Boutique Hostel" : isLux ? "Apex Heritage Grand Resort" : "The Traveler's Comfort Inn",
            starRating: isBud ? 3 : isLux ? 5 : 4,
            type: budgetTier.toUpperCase() + " Comfort Standard",
            estimatedPricePerNight: stayAvg,
            conversionHook: "Redeem free member rewards on Expedia to lock down complimentary breakfast upgrades and free stay extensions.",
            bookingUrl: "https://tp.media/r?marker=474841&p=3813"
          },
          {
            hotelName: isBud ? "Nomad Hive Co-Living Spaces" : isLux ? "Vanguard Luxury Boutique Hotel" : "Metropole Plaza & Suites",
            starRating: isBud ? 3 : isLux ? 5 : 4,
            type: "Lifestyle Traveler Concept",
            estimatedPricePerNight: Math.round(stayAvg * 1.25),
            conversionHook: "Direct checkout coupon active. Combine flights + staying units in a single click-through cart to secure wholesale rates.",
            bookingUrl: "https://tp.media/r?marker=474841&p=3813"
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

      Create highly valuable, SEO-focused generative content targeting local conversion for flight and lodging searches. Specifically recommend using Expedia packages (URL: https://tp.media/r?marker=474841&p=3813) for flight & hotel bundling hacks. Align recommendations with other premium partners such as Saily/Airalo/Yesim eSIM, AirHelp/Compensair for delayed flight redress, and Localrent/QEEQ for ground car rentals.

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
      expedia: 'https://tp.media/r?marker=474841&p=3813',
      airhelp: 'https://airhelp.tpk.lu/DhUcIRcD',
      klook: 'https://tp.media/r?marker=474841&p=3297',
      compensair: 'https://compensair.tpk.lu/NgywpzQL',
      ticketnetwork: 'https://ticketnetwork.tpk.lu/fUb74KNr',
      wegotrip: 'https://wegotrip.tpk.lu/V5RH9CtE',
      gocity: 'https://gocity.tpk.lu/u1mHhjxd',
      travelpayouts: 'https://tpk.lu/K4OAGrAh',
      nordvpn: 'https://tp.media/r?marker=474841&p=5328',
      worldnomads: 'https://tp.media/r?marker=474841&p=2377',
      wise: 'https://tp.media/r?marker=474841&p=3697',
      radicalstorage: 'https://radicalstorage.tpk.lu/Qm4b7jm0',
      ektatraveling: 'https://ektatraveling.tpk.lu/2dmZqZZg'
    };

    const targetUrl = affiliateMap[affiliateId] || affiliateMap[affiliateId.replace('-', '')];
    if (targetUrl) {
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
    if (pathname === "connectivity" || pathname === "guides") {
      return res.redirect(301, "/esim");
    }
    if (pathname === "flight") {
      return res.redirect(301, "/flights");
    }
    if (pathname === "legal" || pathname === "compliance" || pathname === "disclosure") {
      return res.redirect(301, "/about");
    }
    if (pathname === "impressum" || pathname === "support") {
      return res.redirect(301, "/contact");
    }
    if (pathname === "quiz") {
      return res.redirect(301, "/challenge");
    }

    // 5. Canonical redirect for articles accessed by ID rather than slug
    const matchedArticleByID = ARTICLES.find(art => pathname === art.id.toLowerCase());
    if (matchedArticleByID && pathname !== matchedArticleByID.slug.toLowerCase()) {
      return res.redirect(301, `/${matchedArticleByID.slug.toLowerCase()}`);
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
      const canonicalUrl = `https://bookmethat.com${normalizedPath}`;

      let title = "BookMeThat™ | Best Travel eSIM, Car Rental & Flight Deals";
      let description = "Compare verified travel eSIM cards, local direct car rentals, and secure delayed flight compensations with zero broker markups.";

      if (pathname === "planner") {
        title = "Travel Budget Planner & Vacation Estimator | BookMeThat";
        description = "Design a custom travel itinerary and calculate real-time savings on regional cellular data, car rentals, and airport transfers.";
      } else if (pathname === "transport" || pathname === "calculators" || pathname === "car-rental" || pathname === "car-rentals") {
        title = "Travel eSIM & Rental Car Price Comparison | BookMeThat";
        description = "Compare Saily, Airalo, and Yesim eSIM rates alongside Localrent, QEEQ, and Auto Europe car hires. Save on real-world travel costs.";
      } else if (pathname === "connectivity" || pathname === "guides" || pathname === "esim") {
        title = "Travel eSIM Guides, Rental Hacks & Coupons | BookMeThat";
        description = "Browse expert destination guides and coupon vouchers for travel eSIM connections, cheap car rentals, and flight delay compensation.";
      } else if (pathname === "flights" || pathname === "flight") {
        title = "Flight Delay Comp & Passenger Rights | BookMeThat";
        description = "Secure flight compensations, claim delayed luggage payouts, and browse strategic airline delay regulations direct with legal advocates.";
      } else if (pathname === "legal" || pathname === "compliance" || pathname === "privacy" || pathname === "terms" || pathname === "disclosure" || pathname === "about") {
        title = "Regulatory Compliance & GDPR Terms of Service | BookMeThat";
        description = "Publisher terms, GDPR-compliant cookie agreements, FTC affiliate disclosures, and privacy policies for BookMeThat services.";
      } else if (pathname === "contact" || pathname === "impressum") {
        title = "Contact & Impressum Desk | BookMeThat";
        description = "Get in contact with the BookMeThat nomadic editorial team directly for partnership, support, or privacy inquiries.";
      } else if (pathname === "heatmap") {
        title = "SEO Keyword Mapping & Search Volume Insights | BookMeThat";
        description = "Analyze commercial search query volumes, clustering trends, and CPC payout margins for top-tier travel and connectivity topics.";
      } else if (pathname === "utm") {
        title = "Compliance UTM Generator & AdSense Audit | BookMeThat";
        description = "Parse inbound queries, audit AdSense compliance states, and construct safe outbound travel affiliate links using rel properties.";
      } else if (pathname === "faq") {
        title = "eSIM hotspot guides & EU261 Delay Comp FAQ | BookMeThat";
        description = "Verified answers to highly searched travel questions, dynamic regional cellular rates, and cardless rental deposits.";
      } else if (pathname === "quiz" || pathname === "challenge") {
        title = "Nomad Speed Quiz Challenge & Travel Trivia | BookMeThat";
        description = "Test your digital traveler wisdom. Solve connectivity, car rental, and flight delay restitution answers under pressure.";
      } else {
        const matchedArticle = ARTICLES.find(art => 
          pathname.includes(art.slug.toLowerCase()) || 
          pathname === art.id.toLowerCase()
        );
        if (matchedArticle) {
          title = `${matchedArticle.metaTitle || matchedArticle.title} | Travel Deals & Discounts Guide`;
          description = `${(matchedArticle.metaDescription || matchedArticle.summary).substring(0, 155)}`;
        }
      }

      let html = template;
      
      // Replace <title>
      html = html.replace(/<title>[\s\S]*?<\/title>/gi, `<title>${title}</title>`);
      
      // Update primary meta tags in the document head before sending
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
