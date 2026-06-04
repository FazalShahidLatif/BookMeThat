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
      let title = "Best Travel eSIM Deals, Direct Car Rentals, & Flight Delay Compensation | BookMeThat™";
      let description = "Save on your next adventure with zero broker markups. Instantly compare verified travel eSIM promo codes (Saily, Airalo, Drimsim), wholesale car rentals (Localrent, EconomyBookings, Auto Europe), luggage storage, and legal flight delay compensation advocates.";

      if (pathname === "planner") {
        title = "Smart Interactive Travel Budget Planner & Vacation Package Estimator (2026)";
        description = "Design your custom itinerary and calculate real-time savings on multi-country cellular data, local car rentals, and travel security. Maximize discounts instantly.";
      } else if (pathname === "transport" || pathname === "calculators") {
        title = "Best Travel eSIM & Global Car Rental Price Comparison Calculator";
        description = "Compare Airalo, Saily, and Yesim alongside Localrent, QEEQ, and Auto Europe. Match real-time rates to claim direct checkout flight refunds and active vouchers.";
      } else if (pathname === "connectivity" || pathname === "guides") {
        title = "Deals & Bargains: Expert Destination Guides, Coupon Vouchers & Travel Hacks";
        description = "Browse premium cost-saving guides for eSIM connections, cheap car hires, and flight delay redress. Optimize travel layouts and save on vacation budgets.";
      } else if (pathname === "legal" || pathname === "compliance" || pathname === "privacy" || pathname === "terms") {
        title = "Regulatory Compliance, FTC Disclosure & GDPR Terms of Service | BookMeThat";
        description = "Transparent publisher directories showing compliance disclosures, zero added commissions, and verified buyer links.";
      } else if (pathname === "heatmap") {
        title = "Commercial SEO Search Engine Mapping & Intent Dashboard - BookMeThat";
        description = "Analyze search trends, volume clustering, and high-payout travel keywords for eSIM connectivity, car rentals, and discount tickets.";
      } else if (pathname === "utm") {
        title = "AdSense Optimization, Traffic Tracking & UTM Parameter Builder | BookMeThat";
        description = "Audit your website for Google AdSense compliance, parse inbound UTM reference queries, and build safe outbound affiliate links with rel rules.";
      } else if (pathname === "faq") {
        title = "Travel & eSIM Intelligence FAQ Helpdesk - BookMeThat";
        description = "Get verified answers to highly searched long-tail travel questions, eSIM hotspot rules, EU261 compensations, and cardless car rentals.";
      } else if (pathname === "quiz" || pathname === "challenge") {
        title = "Nomadic Speed Quiz Challenge & Travel Trivia | BookMeThat";
        description = "Test your digital nomad knowledge and travel trivia. Answer connectivity, transport, and travel cost questions under pressure.";
      } else {
        const matchedArticle = ARTICLES.find(art => 
          pathname.includes(art.slug.toLowerCase()) || 
          pathname === art.id.toLowerCase()
        );
        if (matchedArticle) {
          title = `${matchedArticle.metaTitle || matchedArticle.title} | Travel Deals & Discounts Guide`;
          description = `${(matchedArticle.metaDescription || matchedArticle.summary).substring(0, 160)}... Browse verified eSIM, transfer coupons & travel hacks on BookMeThat.`;
        }
      }

      let html = template;
      
      // Replace <title>
      html = html.replace(/<title>[\s\S]*?<\/title>/gi, `<title>${title}</title>`);
      
      // Update primary meta tags in the document head before sending
      html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gi, `<meta name="description" content="${description}" />`);
      html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:title" content="${title}" />`);
      html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:description" content="${description}" />`);
      html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/gi, `<meta name="twitter:title" content="${title}" />`);
      html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/gi, `<meta name="twitter:description" content="${description}" />`);

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
