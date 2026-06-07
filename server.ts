import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { ARTICLES } from "./src/data/articles";

async function startServer() {
  const app = express();
  const PORT = 3000;

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
