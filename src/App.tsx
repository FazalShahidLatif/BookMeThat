import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, Smartphone, Car, Shield, BadgePercent, BookOpen, 
  Settings, ExternalLink, Menu, X, ArrowRight, Zap, CheckCircle,
  Code, Copy, Eye, Star, Users, Flame, Clock, Terminal, Check,
  Cpu, Activity, Gauge, Globe, Sparkles, RefreshCw, Layers, Sliders, Send, Database
} from 'lucide-react';
import { AFFILIATES, KEYWORD_CLUSTERS } from './data/affiliates';
import InteractivePlanner from './components/InteractivePlanner';
import ComparisonCalculators from './components/ComparisonCalculators';
import SiloGuides from './components/SiloGuides';
import LegalPages from './components/LegalPages';

type ActiveTab = 'overview' | 'planner' | 'calculators' | 'guides' | 'legal';
type EdgeNode = 'fra' | 'nrt' | 'sfo' | 'sin' | 'lhr';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCodeExporter, setShowCodeExporter] = useState(true); // Defaults open for developer convenience
  const [currentExporterTab, setCurrentExporterTab] = useState<'html' | 'css' | 'js'>('html');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Search Widget inputs
  const [widgetDestination, setWidgetDestination] = useState('');
  const [widgetCategory, setWidgetCategory] = useState('connectivity');
  const [widgetDate, setWidgetDate] = useState('');
  const [widgetMessage, setWidgetMessage] = useState<string | null>(null);

  // --- EDGE AND PLAYBOOK REGULATION STATE NODES ---
  const [edgeNode, setEdgeNode] = useState<EdgeNode>('sfo');
  const [imageDecodingAsync, setImageDecodingAsync] = useState(true);
  const [useLogicalCss, setUseLogicalCss] = useState(true);
  const [emulatedMobileDrawerOpen, setEmulatedMobileDrawerOpen] = useState(false);

  // Vitals Audit Performance Simulator
  const [vitalsRunning, setVitalsRunning] = useState(false);
  const [vitalsProgress, setVitalsProgress] = useState(0);
  const [clsValue, setClsValue] = useState(0.002);
  const [lcpValue, setLcpValue] = useState(0.55); // in seconds
  const [inpValue, setInpValue] = useState(12); // in ms
  const [auditLogs, setAuditLogs] = useState<string[]>([]);

  // Simulated live feedback for emulator telemetry
  const [renderLatency, setRenderLatency] = useState(0.4); // ms

  // Performance Optimization: Apply pointer-events: none during scrolling to prevent scroll-lag
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleSectionScroll = (elementId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(elementId);
    if (element) {
      const offset = 85; // navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleCopyCode = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(type);
    setTimeout(() => {
      setCopyFeedback(null);
    }, 2000);
  };

  const handleBookingSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!widgetDestination.trim()) {
      setWidgetMessage('Please specify a destination country to search Carrier caches.');
      return;
    }
    setWidgetMessage(`Routing through ${edgeNode.toUpperCase()} Node... Loading local eSIM registers.`);
    setTimeout(() => {
      setWidgetMessage(null);
      setSelectedCategory(widgetCategory);
      handleSectionScroll('destinations');
    }, 1200);
  };

  // Run the Core Web Vitals Simulation Audit
  const triggerVitalsAudit = () => {
    if (vitalsRunning) return;
    setVitalsRunning(true);
    setVitalsProgress(0);
    setAuditLogs([]);
    
    const logs = [
      `[CDN Engine] Initiating pipeline compilation for server-side static index.html...`,
      `[DNS Resolver] Serving content directly from edge cache node: ${edgeNode.toUpperCase()}`,
      `[Optimization] IntersectionObserver detected, lazy loading below-the-fold nodes...`,
      imageDecodingAsync 
        ? `[Main Thread] decoding="async" enabled. Decoupled image parsing of hero assets.`
        : `[WARNING] decoding="async" disabled. Main thread blocked by synchronous image pixel decode!`,
      useLogicalCss 
        ? `[Styles] Logical CSS inline structures parsed successfully (LTR/RTL compliant).`
        : `[Styles] Classic raw physical margins applied.`,
      `[Composite] Mobile drawer layer caching initiated. Paint layer isolated from DOM tree...`,
      `[Compilation] Static bundles successfully dispatched via CDN edge nodes.`
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < logs.length) {
        setAuditLogs(prev => [...prev, logs[currentStep]]);
        setVitalsProgress(Math.floor(((currentStep + 1) / logs.length) * 100));
        
        // Slightly tweak simulated metrics based on active options
        if (currentStep === 3) {
          if (imageDecodingAsync) {
            setLcpValue(0.42 + Math.random() * 0.1);
            setInpValue(10 + Math.floor(Math.random() * 5));
          } else {
            setLcpValue(1.82 + Math.random() * 0.5); // High drag because of blocking images
            setInpValue(45 + Math.floor(Math.random() * 20)); // Stuttering main thread
          }
        }
        if (currentStep === 4) {
          if (!useLogicalCss) {
            setClsValue(0.012 + Math.random() * 0.005);
          } else {
            setClsValue(0.002);
          }
        }
        currentStep++;
      } else {
        clearInterval(interval);
        setVitalsRunning(false);
      }
    }, 550);
  };

  // Live filter affiliates
  const filteredAffiliates = AFFILIATES.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Simulated dynamic edge latency values
  const edgeNodeLatencies = {
    sfo: { name: 'Silicon Valley (SFO-1)', ping: '2ms', pop: 'Cloudflare Pages US-West' },
    fra: { name: 'Frankfurt (FRA-3)', ping: '4ms', pop: 'Vercel Edge DE-Central' },
    nrt: { name: 'Tokyo Narita (NRT-2)', ping: '7ms', pop: 'Cloudflare Pages JP-East' },
    sin: { name: 'Singapore (SIN-1)', ping: '5ms', pop: 'Vercel Edge SG-West' },
    lhr: { name: 'London Heathrow (LHR-1)', ping: '3ms', pop: 'Cloudflare Pages UK-South' }
  };

  // --- RAW DEPLOYABLE JAMSACK CODE BLUEPRINTS ---
  const templateHTML = `<!-- 
  ========================================================================
  1. SEMANTIC SEO HYIERARCHICAL HTML5 BLUEPRINT (PageSpeed 100/100)
  ========================================================================
  - Engineered for static CDN deployment on Vercel and Cloudflare Pages.
  - Generous negative spaces, semantic labels, and zero-blocking layout.
  -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Edge-Optimized Travel Deals | BookMeThat</title>
  <meta name="description" content="Direct-carrier eSIM cellular connections, local rental cars, and flight delayed compensations. No commission markups.">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;1,400&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="styles.css">
</head>
<body id="template-root">

  <!-- A11Y SKIP LINK NAVIGATION -->
  <a href="#main-content" class="skip-to-content">Skip to Main Content</a>

  <!-- STATIC COMPOSITED NAV -->
  <header class="site-header">
    <div class="nav-container">
      <div class="logo-box">
        <a href="#template-root" class="logo-link">BOOKMETHAT<span class="dot">.</span></a>
        <span class="logo-badge">Edge Direct</span>
      </div>
      
      <nav class="navigation-menu" aria-label="Main Navigation">
        <ul class="nav-links">
          <li><a href="#hero">Caches</a></li>
          <li><a href="#destinations">Deals Grid</a></li>
          <li><a href="#reviews">Safe Proof</a></li>
        </ul>
      </nav>

      <div class="header-action">
        <button id="menu-toggle-btn" class="menu-burger" aria-label="Open mobile navigations" aria-expanded="false">
          <span class="burger-line"></span>
          <span class="burger-line"></span>
        </button>
        <a href="#destinations" class="cta-direct">Direct Bids</a>
      </div>
    </div>
  </header>

  <!-- LIGHTWEIGHT ACCESSIBLE MOBILE DRAWER Utilizing GPU translate animations (60fps guaranteed) -->
  <div id="mobile-drawer" class="mobile-navigation-drawer" aria-hidden="true" role="dialog">
    <div class="drawer-overlay" id="drawer-overlay-dismiss"></div>
    <div class="drawer-content">
      <div class="drawer-header">
        <span class="drawer-title">BOOKMETHAT.</span>
        <button id="drawer-close-btn" class="drawer-close" aria-label="Close menu">✕</button>
      </div>
      <nav class="drawer-menu">
        <a href="#hero" class="drawer-item">Carrier Lookup</a>
        <a href="#destinations" class="drawer-item">Affiliate Directories</a>
        <a href="#reviews" class="drawer-item">Independent Proof</a>
        <a href="https://bookmethat.com/compliance" class="drawer-item font-mono font-bold">FTC Node Disclosure</a>
      </nav>
      <div class="drawer-footer">
        <p>CDN Edge Host Live: ID-685596</p>
      </div>
    </div>
  </div>

  <!-- SEMANTIC MAIN HOUSING CONTENT -->
  <main id="main-content">
    
    <!-- HERO SECTION WITH DECODING ASYNC AND REALISTIC CDN SRCSET -->
    <section id="hero" class="hero-section" aria-labelledby="hero-title">
      <div class="hero-grid">
        <div class="hero-text-col">
          <span class="eyebrow"><span class="badge-icon">⚡</span> Server-Side Edge Cache Direct</span>
          <h1 id="hero-title">Zero Broker Markup. Buy Direct and Save.</h1>
          <p class="hero-sub">Direct link cellular eSIMs, localized car rentals, and backed flight indemnities directly from direct manufacturers. Pure Jamstack fast speed.</p>
        </div>
        
        <div class="hero-img-col">
          <!-- Highly optimized image with async decoding and responsive srcset to never block layout passes -->
          <img 
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80" 
            srcset="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=480&q=80 480w,
                    https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80 800w,
                    https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80 1200w"
            sizes="(max-width: 768px) 100vw, 50vw"
            alt="Scenic coastal beach view illustrating seamless travel deals and direct bookings" 
            class="hero-optimized-image"
            decoding="async" 
            loading="eager"
            referrerpolicy="no-referrer"
          >
        </div>
      </div>
    </section>

    <!-- HIGH DENSITY CONVERTING DEALS CARD DISPLAY -->
    <section id="destinations" class="destinations-section" aria-labelledby="dest-title">
      <div class="container-silo">
        <h2 id="dest-title">Hotel / Flight Deal Cards Showcase</h2>
        <p class="section-sub text-center">Featuring hardware-accelerated cubic-bezier hover transitions and 3s pulsing conversion anchors.</p>
        
        <div class="deal-cards-grid">
          
          <!-- MODEL CARD 1 -->
          <article class="deal-card" data-category="connectivity">
            <div class="deal-img-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=400&q=80" 
                decoding="async"
                loading="lazy"
                alt="Tokyo city street view representing high-speed local eSIM connectivity"
                class="deal-thumb"
              >
              <div class="deal-cost-bubble">From $4.50</div>
            </div>
            <div class="deal-details">
              <span class="badge">Saily Global Cellular</span>
              <h3>Tokyo High Speed eSIM</h3>
              <p>Direct LTE/5G local profile routing on local cellular towers. Skip active premium roaming taxes entirely.</p>
              
              <!-- HIGH CONTRAST PULSING BUTTON -->
              <a href="https://saily.tpk.lu/YotfJL64" target="_blank" rel="noopener noreferrer" class="book-now-cta-pulsing">
                Book Now & Save Direct <span class="arrow-shape">→</span>
              </a>
            </div>
          </article>

          <!-- MODEL CARD 2 -->
          <article class="deal-card" data-category="transport">
            <div class="deal-img-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80" 
                decoding="async"
                loading="lazy"
                alt="Driving a rental hatchback car along the beautiful Costa Brava coastline"
                class="deal-thumb"
              >
              <div class="deal-cost-bubble">$0 Deposit</div>
            </div>
            <div class="deal-details">
              <span class="badge">Localrent Motor</span>
              <h3>Costa Brava Hatchback</h3>
              <p>Rent exact model visually. Cash deposit acceptable directly at selected local airport terminals.</p>
              
              <a href="https://localrent.tpk.lu/YI6tdTTl" target="_blank" rel="noopener noreferrer" class="book-now-cta-pulsing">
                Book Now & Save Direct <span class="arrow-shape">→</span>
              </a>
            </div>
          </article>

        </div>
      </div>
    </section>

  </main>

  <footer class="site-footer">
    <p>&copy; 2026 BookMeThat. Optimized for Static Pagespeed Core Web Vitals: ID-685596.</p>
  </footer>

  <script src="app.js" async></script>
</body>
</html>`;

  const templateCSS = `/* 
  ========================================================================
  2. EDGE-DEPLOYABLE STATICAL STYLING BLUEPRINT WITH LOGICAL PROPERTIES
  ========================================================================
  - Built with modern logical properties (margin-inline, padding-block) for i61n global scale.
  - Highly optimized translation transforms and cubic-bezier(0.25, 1, 0.5, 1).
  */

:root {
  --color-orange: #E55B13;
  --color-dark: #1A1A1A;
  --color-light: #FAF9F6;
  --color-card: #F8F7F2;
  --color-border: #E5E5E1;
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-serif: 'Playfair Display', Georgia, serif;
}

/* LOGICAL BOX-MODEL STYLINGS */
body {
  margin: 0;
  font-family: var(--font-sans);
  background: var(--color-light);
  color: var(--color-dark);
  -webkit-font-smoothing: antialiased;
}

/* ACCESSIBILITY SKIP NAVIGATION */
.skip-to-content {
  position: absolute;
  top: -999px;
  left: 20px;
  background: var(--color-orange);
  color: #fff;
  padding: 10px 15px;
  z-index: 1000;
  text-decoration: none;
}
.skip-to-content:focus {
  top: 10px;
}

/* FLUID STICKY HEADER */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(250, 249, 246, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
}

.nav-container {
  max-width: 1200px;
  margin-inline: auto; /* Modern Logical Property for horizontal alignment */
  padding-block: 15px; /* Modern Logical Property for vertical paddings */
  padding-inline: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-link {
  font-size: 20px;
  font-weight: 800;
  color: var(--color-dark);
  text-decoration: none;
  letter-spacing: -0.05em;
}
.logo-link .dot {
  color: var(--color-orange);
}

/* HIGH-CONVERTING CARD HOVER TRANSFORMATION (ONLY TRANSLATE & SHADOW) */
.deal-cards-grid {
  display: grid;
  grid-template-cols: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-block-start: 40px;
}

.deal-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.35s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.25s ease;
  will-change: transform, box-shadow; /* Hardware Acceleration */
  transform: translateZ(0);
}

/* Desktop-Only Hover Transform Safeguards (No layout shifting items) */
@media (hover: hover) {
  .deal-card:hover {
    transform: translateY(-8px) translateZ(0);
    box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.08), 0 5px 15px -5px rgba(0,0,0,0.03);
    border-color: var(--color-orange);
  }
}

/* MOBILE-DRAWER GPUS-TRANSLATE WITH LOCKED 60FPS AT LAYOUT VISIBLITY */
.mobile-navigation-drawer {
  position: fixed;
  inset: 0;
  z-index: 1000;
  visibility: hidden; /* Prevent focus tree capture while inactive */
  transition: visibility 0.3s ease;
}

.mobile-navigation-drawer[aria-hidden="false"] {
  visibility: visible;
}

.drawer-overlay {
  position: absolute;
  inset: 0;
  background: rgba(26, 26, 26, 0.4);
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mobile-navigation-drawer[aria-hidden="false"] .drawer-overlay {
  opacity: 1;
}

.drawer-content {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 280px;
  background: var(--color-light);
  border-right: 1px solid var(--color-border);
  padding: 30px 20px;
  transform: translateX(-100%); /* Hardware Accelerated slide */
  transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.mobile-navigation-drawer[aria-hidden="false"] .drawer-content {
  transform: translateX(0);
}

/* HIGH-CONTRAST PULSING AFFILIATE CTA (3 SECONDS BEZIER LOOP) */
.book-now-cta-pulsing {
  display: block;
  text-align: center;
  background: var(--color-dark);
  color: #fff;
  padding: 14px 20px;
  text-decoration: none;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-block-start: auto; /* Logical spacer */
  border: 1px solid var(--color-dark);
  
  /* Subtly pulse transform without breaking layout bounds */
  animation: pulse-badge 3s infinite cubic-bezier(0.25, 1, 0.5, 1);
  will-change: transform;
}

.book-now-cta-pulsing:hover {
  background: var(--color-orange);
  border-color: var(--color-orange);
}

@keyframes pulse-badge {
  0%, 100% {
    transform: scale(1) translateZ(0);
  }
  50% {
    transform: scale(1.03) translateZ(0); /* Subtly scale without moving surrounding DOM nodes */
  }
}

/* Content visibility optimizations for below-the-folds content */
.destinations-section {
  content-visibility: auto;
  contain-intrinsic-size: 0 600px;
}`;

  const templateJS = `/* 
  ========================================================================
  3. LIGHTWEIGHT VANILLA ES6+ JS MODULE (Strictly Under 5KB Footprint)
  ========================================================================
  - Built exclusively with native browser APIs. Zero render blocking weight.
  - Active IntersectionObserver for micro-hydrate states on viewport enters.
  - Accelerated 60fps mobile navigation drawer toggles with click listeners.
  */

(function() {
  'use strict';

  document.addEventListener("DOMContentLoaded", () => {
    
    // A. MOBILE NAVIGATION ACCESSIBILITY DRAWER & COMPOSITING TOGGLES
    const menuBtn = document.getElementById("menu-toggle-btn");
    const closeBtn = document.getElementById("drawer-close-btn");
    const dismissOverlay = document.getElementById("drawer-overlay-dismiss");
    const drawer = document.getElementById("mobile-drawer");

    function openDrawer() {
      if (!drawer) return;
      drawer.setAttribute("aria-hidden", "false");
      menuBtn?.setAttribute("aria-expanded", "true");
      closeBtn?.focus();
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    function closeDrawer() {
      if (!drawer) return;
      drawer.setAttribute("aria-hidden", "true");
      menuBtn?.setAttribute("aria-expanded", "false");
      menuBtn?.focus();
      document.body.style.overflow = "";
    }

    if (menuBtn) {
      menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openDrawer();
      });
    }

    [closeBtn, dismissOverlay].forEach(el => {
      if (el) el.addEventListener("click", closeDrawer);
    });

    // Handle ESC keypress to dismiss drawer natively
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer?.getAttribute("aria-hidden") === "false") {
        closeDrawer();
      }
    });

    // B. INTERSECTION OBSERVER LAZY LOADING DIRECT METHOD AND HYDRATIONS
    const dealCards = document.querySelectorAll(".deal-card");
    if ("IntersectionObserver" in window) {
      const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("card-loaded");
            observer.unobserve(entry.target); // Unobserve to free up execution overhead
          }
        });
      }, {
        root: null,
        rootMargin: "80px", // Preload prior to coming on viewport
        threshold: 0.02
      });

      dealCards.forEach(card => cardObserver.observe(card));
    } else {
      // Graceful fallback for crawling crawlers
      dealCards.forEach(card => card.classList.add("card-loaded"));
    }

    // C. BACKGROUND CLICK PIXEL LOGGER USING SEND_BEACON COPROCESSOR
    const outboundBids = document.querySelectorAll(".book-now-cta-pulsing");
    outboundBids.forEach(btn => {
      btn.addEventListener("click", (evt) => {
        const affiliateTarget = evt.currentTarget.href;
        
        // requestIdleCallback keeps priority tasks clean and off the main queue
        const logData = { url: affiliateTarget, ts: Date.now(), site: "BookMeThat" };
        
        if (window.requestIdleCallback) {
          window.requestIdleCallback(() => {
            dispatchTrackingBeacon(logData);
          });
        } else {
          setTimeout(() => {
            dispatchTrackingBeacon(logData);
          }, 20);
        }
      });
    });

    function dispatchTrackingBeacon(payload) {
      if (navigator.sendBeacon) {
        navigator.sendBeacon("https://bookmethat.com/api/v1/pixel", JSON.stringify(payload));
      } else {
        fetch("https://bookmethat.com/api/v1/pixel", {
          method: "POST",
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(() => {});
      }
    }

  });
})();`;

  return (
    <div className={`min-h-screen bg-[#FAF9F6] flex flex-col font-sans text-[#1A1A1A] selection:bg-brand-orange/10 selection:text-brand-orange leading-normal ${isScrolling ? 'scrolling-active pointer-events-none' : ''}`} id="global-layout-root">
      
      {/* 1. BRAND HEADER */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E5E5E1] transition-all" id="site-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          <button 
            onClick={() => handleSectionScroll('hero')} 
            className="flex items-center gap-2 cursor-pointer focus:outline-none"
          >
            <span className="text-2xl font-bold tracking-tighter text-brand-orange">BOOKMETHAT.</span>
            <span className="text-[9px] uppercase tracking-widest font-semibold border border-[#1A1A1A] px-1.5 py-0.5 text-[#1A1A1A] hidden sm:inline-block">
              Edge Performance Specialist
            </span>
          </button>

          {/* Semantic Nav links */}
          <nav className="hidden md:flex items-center gap-1 text-[9px] uppercase tracking-widest font-bold">
            <button onClick={() => handleSectionScroll('vitals-sandbox')} className="px-3 py-2 text-gray-500 hover:text-brand-orange transition cursor-pointer select-none">CDN Labs & Audit</button>
            <button onClick={() => handleSectionScroll('destinations')} className="px-3 py-2 text-gray-500 hover:text-brand-orange transition cursor-pointer select-none">Deal Cards Grid</button>
            <button onClick={() => handleSectionScroll('reviews')} className="px-3 py-2 text-gray-500 hover:text-brand-orange transition cursor-pointer select-none">Nomad Proof</button>
            <button onClick={() => handleSectionScroll('core-calculators')} className="px-3 py-2 text-gray-500 hover:text-brand-orange transition cursor-pointer select-none">Logistics Hub</button>
            <button onClick={() => handleSectionScroll('compliance-desk')} className="px-3 py-2 text-gray-500 hover:text-brand-orange transition cursor-pointer select-none">Regulatory Info</button>
          </nav>

          {/* Action Core CTAs */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowCodeExporter(!showCodeExporter)}
              className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-mono font-bold bg-[#1A1A1A] text-white px-3 py-1.5 hover:bg-brand-orange transition select-none cursor-pointer border border-[#1A1A1A]"
              aria-label="Toggle Vercel developer template sandbox viewer"
            >
              <Code className="w-3.5 h-3.5" /> 
              {showCodeExporter ? 'Hide Codes' : 'Pages Blueprint'}
            </button>
            
            <div className="hidden lg:flex items-center gap-1.5 text-[9px] font-mono font-bold text-brand-orange bg-brand-orange/5 px-2 py-1 border border-brand-orange/20 select-none">
              <Zap className="w-3 h-3 animate-pulse text-brand-orange" /> Edge Deploy OK: 685596
            </div>

            {/* Mobile Navigation Trigger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-1.5 text-gray-700 hover:text-brand-orange transition focus:outline-none"
              title="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer for React Container */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF9F6] border-b border-[#E5E5E1] p-4 space-y-2 text-xs font-semibold view-enter">
            <button onClick={() => { handleSectionScroll('vitals-sandbox'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-[#F8F7F2] hover:text-brand-orange block transition">Edge Options & Audit Center</button>
            <button onClick={() => { handleSectionScroll('destinations'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-[#F8F7F2] hover:text-brand-orange block transition">Hotel eSIM / Cars Cards</button>
            <button onClick={() => { handleSectionScroll('reviews'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-[#F8F7F2] hover:text-brand-orange block transition">Independent Performance Proof</button>
            <button onClick={() => { handleSectionScroll('core-calculators'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-[#F8F7F2] hover:text-brand-orange block transition">Logistics Tool Cabin</button>
            <button onClick={() => { handleSectionScroll('compliance-desk'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-[#F8F7F2] hover:text-brand-orange block transition">GDPR & FTC Declarations</button>
            <div className="border-t border-[#E5E5E1] pt-3 text-[10px] font-mono text-brand-orange px-4">
              CF tracking node: 685596
            </div>
          </div>
        )}
      </header>

      {/* 2. DYNAMIC STATIC BINDING EXPORTER COMPONENT (With Copy Capabilities) */}
      {showCodeExporter && (
        <div className="bg-[#1A1A1A] text-[#FAF9F6] font-mono border-b border-zinc-800 z-30 transition-all shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
              <div>
                <span className="text-[10px] text-brand-orange tracking-widest uppercase font-bold px-2 py-0.5 border border-brand-orange/30 bg-brand-orange/10 rounded">
                  Cloudflare Pages & Vercel Static Deploy Kit
                </span>
                <h2 className="text-xl font-serif font-bold tracking-tight text-white mt-2 italic">Jamstack Production Files</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Ready-to-deploy static blueprints featuring lazy loading hydration, CSS logical properties, and a pulsing CTA under 5KB total footprint.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'html', label: '1. Index.html (Semantic)' },
                  { id: 'css', label: '2. Styles.css (Logical)' },
                  { id: 'js', label: '3. App.js (ES6 Module)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentExporterTab(item.id as 'html' | 'css' | 'js')}
                    className={`px-3 py-1.5 text-xs font-bold border rounded transition-all select-none cursor-pointer ${
                      currentExporterTab === item.id 
                        ? 'bg-white text-zinc-900 border-white' 
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative mt-6 rounded bg-zinc-950 border border-zinc-900 p-4">
              <div className="absolute right-4 top-4 z-10">
                <button
                  onClick={() => handleCopyCode(
                    currentExporterTab === 'html' ? templateHTML : currentExporterTab === 'css' ? templateCSS : templateJS,
                    currentExporterTab
                  )}
                  className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded hover:text-white hover:border-zinc-700 select-none cursor-pointer"
                  title="Copy static code file structure"
                >
                  {copyFeedback === currentExporterTab ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <Check className="w-3.5 h-3.5" /> Copied File Successfully!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="w-3.5 h-3.5" /> Copy Code Block
                    </span>
                  )}
                </button>
              </div>

              <div className="overflow-x-auto max-h-[300px] text-normal font-mono text-[11px] leading-relaxed text-zinc-300 antialiased p-1">
                <pre>
                  {currentExporterTab === 'html' && templateHTML}
                  {currentExporterTab === 'css' && templateCSS}
                  {currentExporterTab === 'js' && templateJS}
                </pre>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 text-[10px] text-zinc-500">
              <Terminal className="w-3.5 h-3.5 text-brand-orange" />
              <span>Deploy these file nodes onto Vercel / Cloudflare with zero overhead configuration. Clean static deployment ready.</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. CORE INTERACTIVE LAB WORKSPACE */}
      <main id="main-content" className="flex-grow">
        
        {/* HERO INTRO */}
        <section id="hero" className="relative overflow-hidden py-14 lg:py-20 border-b border-[#E5E5E1]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E5E1_1px,transparent_1px),linear-gradient(to_bottom,#E5E5E1_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-flex items-center gap-1.5 text-[9px] text-[#E55B13] font-mono font-bold bg-[#E55B13]/5 px-2.5 py-1 border border-[#E55B13]/20 uppercase tracking-widest">
                  <Flame className="w-3.5 h-3.5 animate-pulse text-brand-orange" /> Edge Latency Pipeline Actives
                </span>
                
                <h1 className="text-5xl lg:text-[62px] leading-[0.95] font-serif italic tracking-tight text-[#1A1A1A]">
                  Edge Platform & <span className="not-italic font-bold block mt-2 text-brand-orange">Pages Optimization.</span>
                </h1>
                
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed max-w-xl">
                  Test custom CDN headers, native async decoding threads, and responsive srcset scaling algorithms under live simulated CDN nodes. Deploy pure static static assets with zero runtime lag.
                </p>

                <div className="h-[1px] bg-[#E5E5E1]" />

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[9px] font-mono text-gray-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-brand-orange" /> Native Intersection Hydrates</span>
                  <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5 text-brand-orange" /> Logical CSS Properties Inline</span>
                  <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-brand-orange" /> FTC Identifier: 685596</span>
                </div>
              </div>

              {/* SEARCH ROUTER AND ACTIVE CDN STATE CHANGER */}
              <div className="lg:col-span-5">
                <div className="bg-white border border-[#E5E5E1] p-6 shadow-xl relative hardware-accel">
                  
                  <div className="mb-4">
                    <h3 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Global CDN Node Simulator</h3>
                    <h4 className="text-base font-serif font-bold italic mt-0.5 text-gray-900">Configure Local Router Edge</h4>
                  </div>

                  {/* CDN Target switcher */}
                  <div className="grid grid-cols-5 gap-1.5 mb-5">
                    {(Object.keys(edgeNodeLatencies) as EdgeNode[]).map(nodeId => (
                      <button
                        key={nodeId}
                        onClick={() => setEdgeNode(nodeId)}
                        className={`p-2 border rounded flex flex-col items-center cursor-pointer text-center select-none transition-all ${
                          edgeNode === nodeId
                            ? 'bg-brand-orange border-brand-orange text-white font-bold'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-brand-orange'
                        }`}
                      >
                        <span className="text-[10px] font-bold block uppercase">{nodeId}</span>
                        <span className="text-[7.5px] scale-90 font-mono tracking-tighter block mt-0.5 opacity-80">
                          {edgeNodeLatencies[nodeId].ping}
                        </span>
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleBookingSearch} className="space-y-3.5">
                    
                    {/* Destination Input Field */}
                    <div className="space-y-1 search-widget-field border border-[#E5E5E1] p-3 bg-[#FAF9F6]">
                      <label htmlFor="widget-dest" className="block text-[8.5px] uppercase tracking-widest font-mono font-bold text-gray-400">Search Transit Cache</label>
                      <input 
                        type="text" 
                        id="widget-dest" 
                        value={widgetDestination}
                        onChange={(e) => setWidgetDestination(e.target.value)}
                        placeholder="e.g. Frankfurt, Japan, Croatia"
                        className="w-full bg-transparent text-xs font-bold focus:outline-none text-gray-900" 
                      />
                    </div>

                    {/* Network type selector */}
                    <div className="space-y-1 search-widget-field border border-[#E5E5E1] p-3 bg-[#FAF9F6]">
                      <label htmlFor="widget-cat" className="block text-[8.5px] uppercase tracking-widest font-mono font-bold text-gray-400">Affiliate Silos Category</label>
                      <select 
                        id="widget-cat" 
                        value={widgetCategory}
                        onChange={(e) => setWidgetCategory(e.target.value)}
                        className="w-full bg-transparent text-xs font-bold focus:outline-none text-gray-900 cursor-pointer"
                      >
                        <option value="connectivity">Cellular eSIMs (Saily, Airalo, Yesim)</option>
                        <option value="transport">Rental Car Logistics (Localrent, QEEQ)</option>
                        <option value="booking">Deals & Ticket Advocates (Expedia, AirHelp)</option>
                        <option value="utility">Travel Cybersecurity (NordVPN, Wise, World Nomads)</option>
                      </select>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-[#1A1A1A] hover:bg-brand-orange text-white text-[9px] uppercase font-bold tracking-widest py-3.5 transition-all focus:outline-none focus:ring-1 focus:ring-brand-orange cursor-pointer"
                    >
                      Scan Direct Bids Inside Cache
                    </button>
                  </form>

                  {widgetMessage && (
                    <div className="mt-3.5 p-2.5 border border-brand-orange/20 bg-brand-orange/5 text-[9.5px] font-mono text-brand-orange animate-pulse">
                      {widgetMessage}
                    </div>
                  )}

                  <div className="mt-4 pt-3.5 border-t border-[#E5E5E1] flex justify-between items-center text-[8.5px] font-mono text-gray-400">
                    <span>HOST: {edgeNodeLatencies[edgeNode].pop}</span>
                    <span className="text-emerald-500 font-bold">LATENCY: {edgeNodeLatencies[edgeNode].ping}</span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- EDGE PERFORMANCE LAB: TOGGLES + CORE WEB VITALS SIMULATOR --- */}
        <section id="vitals-sandbox" className="py-12 bg-white border-b border-[#E5E5E1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Toggles & Settings controls */}
              <div className="lg:col-span-4 bg-[#F8F7F2] border border-[#E5E5E1] p-6 space-y-6">
                <div>
                  <span className="text-[10px] tracking-widest uppercase font-mono font-bold text-brand-orange">Lab Controls</span>
                  <h3 className="text-lg font-serif font-bold italic text-gray-900 mt-1">Edge Cache Parameters</h3>
                  <p className="text-xs text-gray-500 mt-1">Interfere with static bundle tags to test PageSpeed consequences in real time.</p>
                </div>

                <div className="space-y-4">
                  {/* Toggle 1: decoding="async" */}
                  <div className="border border-gray-300/60 p-3 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-gray-800">decoding="async"</span>
                      <button 
                        onClick={() => {
                          setImageDecodingAsync(!imageDecodingAsync);
                          if (!imageDecodingAsync) setLcpValue(0.55);
                        }}
                        className={`text-xs px-2.5 py-1 font-mono rounded select-none cursor-pointer ${
                          imageDecodingAsync ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold' : 'bg-rose-50 text-rose-700 border border-rose-300'
                        }`}
                      >
                        {imageDecodingAsync ? 'ACTIVE (Async)' : 'DISABLED (Sync)'}
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-550 leading-relaxed leading-tight">
                      Enables browser to offload travel image parsing onto parallel threads, avoiding main-thread frame drops during paint steps.
                    </p>
                  </div>

                  {/* Toggle 2: Modern CSS Logical Properties */}
                  <div className="border border-gray-300/60 p-3 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-gray-800">logical CSS properties</span>
                      <button 
                        onClick={() => setUseLogicalCss(!useLogicalCss)}
                        className={`text-xs px-2.5 py-1 font-mono rounded select-none cursor-pointer ${
                          useLogicalCss ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold' : 'bg-rose-50 text-rose-700 border border-rose-300'
                        }`}
                      >
                        {useLogicalCss ? 'Logical Flows' : 'Classic Absolute'}
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-550 leading-relaxed leading-tight">
                      Replacing standard margin properties with <code className="font-mono bg-amber-55 bg-black/5 px-1 py-0.5 rounded text-[8.5px]">margin-inline-start</code> ensures automatic LTR/RTL rendering without duplicate code payloads!
                    </p>
                  </div>

                  {/* Trigger test audit but button */}
                  <button
                    onClick={triggerVitalsAudit}
                    disabled={vitalsRunning}
                    className="w-full bg-brand-orange hover:bg-[#1A1A1A] text-white text-[10px] font-mono font-bold uppercase py-3 px-4 transition-all flex items-center justify-center gap-2 select-none cursor-pointer rounded"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${vitalsRunning ? 'animate-spin' : ''}`} />
                    {vitalsRunning ? 'Measuring Edge Pipelines...' : 'Run Core Web Vitals Audit'}
                  </button>
                </div>
              </div>

              {/* Real-time audit dashboard gauges */}
              <div className="lg:col-span-8 bg-zinc-950 text-zinc-100 p-6 sm:p-8 rounded flex flex-col justify-between border border-zinc-900">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-[#E55B13] font-bold uppercase">Auditor Module</span>
                    <h3 className="text-lg font-bold text-white mt-1">Pages Audit Dashboard</h3>
                  </div>
                  <div className="flex gap-4 text-xs font-mono">
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase">Active CDN Target</span>
                      <span className="text-white font-bold">{edgeNode.toUpperCase()} Node Pipeline</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase">JS Sandbox Footprint</span>
                      <span className="text-emerald-450 text-emerald-400 font-bold">&lt; 2.2 KB (Limit: 5KB)</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Audit Gauges grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                  {/* Gauge 1: LCP */}
                  <div className="bg-zinc-900/60 p-4 border border-zinc-850 rounded">
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">LCP (Fastest Paint)</span>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className={`text-3xl font-bold font-mono ${lcpValue < 1.0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {lcpValue.toFixed(2)}s
                      </span>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">
                        {lcpValue < 1.0 ? 'Perfect (Green)' : 'Needs attention'}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded mt-3 relative overflow-hidden">
                      <div 
                        className={`h-full absolute left-0 transition-all duration-300 ${lcpValue < 1.0 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                        style={{ width: `${Math.min(100, (lcpValue / 2.5) * 100)}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-zinc-500 font-mono mt-1.5 block">Target: Under 1.2 seconds</span>
                  </div>

                  {/* Gauge 2: CLS */}
                  <div className="bg-zinc-900/60 p-4 border border-zinc-850 rounded">
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">CLS (Visual Shift)</span>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className={`text-3xl font-bold font-mono ${clsValue < 0.01 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {clsValue.toFixed(3)}
                      </span>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">
                        {clsValue < 0.01 ? 'Zero Shift' : 'Minor shifting'}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded mt-3 relative overflow-hidden">
                      <div 
                        className={`h-full absolute left-0 transition-all duration-300 ${clsValue < 0.01 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                        style={{ width: `${Math.min(100, (clsValue / 0.1) * 100)}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-zinc-500 font-mono mt-1.5 block">Target: Under 0.05 index</span>
                  </div>

                  {/* Gauge 3: INP */}
                  <div className="bg-zinc-900/60 p-4 border border-zinc-850 rounded">
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">INP (Response Latency)</span>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className={`text-3xl font-bold font-mono ${inpValue < 30 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {inpValue}ms
                      </span>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">
                        Instant (60fps)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded mt-3 relative overflow-hidden">
                      <div 
                        className="h-full bg-emerald-400 absolute left-0 transition-all duration-300"
                        style={{ width: `${Math.min(100, (inpValue / 200) * 100)}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-zinc-500 font-mono mt-1.5 block">Target: Under 50 milliseconds</span>
                  </div>
                </div>

                {/* Audit Terminal Log display */}
                <div className="bg-zinc-950 border border-zinc-800 p-4 font-mono text-[10px] space-y-1 relative overflow-hidden rounded">
                  <span className="absolute right-3 top-3.5 text-zinc-550 text-[9px] select-none text-zinc-650 font-bold">LOGS INTERPRETER VIA CF CLUSTERS</span>
                  
                  {vitalsRunning && (
                    <div className="absolute inset-0 bg-zinc-950/80 flex items-center justify-center gap-3">
                      <RefreshCw className="w-5 h-5 text-brand-orange animate-spin" />
                      <span className="text-xs font-bold font-mono">Running pages pipeline check... {vitalsProgress}%</span>
                    </div>
                  )}

                  <div className="max-h-[140px] overflow-y-auto space-y-1 text-zinc-400">
                    {auditLogs.length > 0 ? (
                      auditLogs.map((log, lIdx) => (
                        <div key={lIdx} className="flex gap-2">
                          <span className="text-zinc-650 text-brand-orange select-none">&gt;</span>
                          <span>{log}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-zinc-600 italic">Click the &quot;Run Core Web Vitals Audit&quot; button to compile the edge header test suite.</div>
                    )}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* --- HIGH CONVERSION SHOWCASE CARDS AND LIGHTWEIGHT EMULATOR FOR 60FPS MENU DRAWER --- */}
        <section id="destinations" className="py-16 bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Realistic Deal Cards Grid */}
              <div className="lg:col-span-8 space-y-8">
                <div>
                  <span className="text-[10px] tracking-widest uppercase font-mono font-bold text-gray-400">Display Showcase</span>
                  <h2 className="text-3xl font-serif font-bold italic text-gray-900 mt-1">Direct-Carrier Deal Cards Node</h2>
                  <p className="text-xs text-gray-500 mt-1">Interactive simulated deployment of high-converting directories mapped using logical properties.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredAffiliates.slice(0, 4).map((item) => {
                    const keywordStr = KEYWORD_CLUSTERS[item.category as keyof typeof KEYWORD_CLUSTERS]?.highVolume || 'booking';
                    return (
                      <article 
                        key={item.id}
                        className="group flex flex-col justify-between bg-[#F8F7F2] border border-[#E5E5E1] relative h-full transition duration-300 transform md:hover:-translate-y-2 md:hover:shadow-xl hover:border-brand-orange select-none"
                      >
                        {/* Realistic Card Thumbnail with async properties visually explained */}
                        <div className="relative h-44 overflow-hidden bg-zinc-200">
                          <img 
                            src={
                              item.category === 'connectivity' 
                                ? "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=400&q=80"
                                : item.category === 'transport'
                                ? "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80"
                                : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"
                            }
                            alt={`${item.name} - best travel deals for ${item.category}`}
                            decoding="async"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-2.5 right-2 text-[8px] tracking-wider font-mono bg-black/60 text-white px-1.5 py-0.5 rounded font-bold">
                            decoding=&quot;async&quot;
                          </div>
                          
                          <div className="absolute bottom-2.5 left-2.5 bg-brand-orange text-white text-[9px] font-mono font-bold px-2 py-1 select-none">
                            Zero Surcharges
                          </div>
                        </div>

                        <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <span className="text-[8px] uppercase tracking-widest font-mono font-bold text-gray-400 block">{item.category} SILO</span>
                            <h3 className="text-base font-serif font-bold italic text-gray-900 leading-tight group-hover:text-brand-orange transition">
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-600 font-sans leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          <div className="space-y-2 border-t border-[#E5E5E1] pt-3">
                            <span className="text-[7.5px] uppercase tracking-widest font-mono text-gray-400 font-bold block">Topical Keyword Inject</span>
                            <div className="text-[9px] font-mono italic text-gray-500 leading-tight truncate">
                              {keywordStr}
                            </div>
                          </div>

                          {/* HIGH CONTRAST PULSING BUTTON MAPPED BY NATIVE ANIMATIONS */}
                          <div className="pt-3">
                            <a 
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="animate-pulse-cta block w-full text-center bg-[#1A1A1A] hover:bg-brand-orange text-white text-[9px] uppercase tracking-widest font-bold py-3 transition-colors"
                              style={{ 
                                animation: 'pulse-badge 3s infinite cubic-bezier(0.25, 1, 0.5, 1)'
                              }}
                            >
                              Book Now & Save Direct <ArrowRight className="w-3.5 h-3.5 inline-block ml-1" />
                            </a>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Interactive Phone Screen Drawer Emulator */}
              <div className="lg:col-span-4 space-y-6">
                <div>
                  <span className="text-[10px] tracking-widest uppercase font-mono font-bold text-[#E55B13]">A11y Drawer Sandbox</span>
                  <h3 className="text-lg font-serif font-bold italic text-gray-900 mt-1">Locked 60fps Mobile Hub</h3>
                  <p className="text-xs text-gray-500 mt-1">Toggle the hamburger menu inside this emulated canvas to monitor translate parameters.</p>
                </div>

                {/* EMULATED PHONE BODY FRAME */}
                <div className="border-[6px] border-[#1A1A1A] rounded-2xl overflow-hidden aspect-[9/16] bg-[#FAF9F6] shadow-2xl relative w-full max-w-[300px] mx-auto">
                  
                  {/* Phone Speaker Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-3.5 w-24 bg-[#1A1A1A] rounded-b-lg z-50 flex items-center justify-center">
                    <div className="h-0.5 w-10 bg-zinc-800 rounded" />
                  </div>

                  {/* Emulated Layout view */}
                  <div className="h-full flex flex-col relative pt-4 overflow-y-auto">
                    
                    {/* Emulated Header inside phone */}
                    <div className="px-3.5 py-2 border-b border-[#E5E5E1] flex justify-between items-center bg-[#FAF9F6] sticky top-0 z-20">
                      <span className="text-[10px] font-bold text-gray-900 tracking-tight">BOOKMETHAT.</span>
                      
                      {/* Burger button to open active emulated drawer */}
                      <button 
                        onClick={() => {
                          setEmulatedMobileDrawerOpen(true);
                          setRenderLatency(0.2 + Math.random() * 0.15);
                        }}
                        className="p-1 focus:outline-none"
                        aria-label="Toggle drawer inside phone emulator"
                      >
                        <Menu className="w-4 h-4 text-brand-orange" />
                      </button>
                    </div>

                    {/* Emulated page content */}
                    <div className="p-3.5 space-y-3 flex-grow bg-white text-left scale-95 origin-top">
                      <div className="space-y-1">
                        <span className="text-[7.5px] uppercase font-mono text-zinc-400 font-bold bg-[#FAF9F6] px-1 py-0.5">Cellular eSIMs</span>
                        <h4 className="text-xs font-serif font-bold">Paris Transit Pass</h4>
                        <p className="text-[9px] text-zinc-550 leading-snug">Instant active cellular eSIM with zero commissions. Buy and deploy inside France instantly.</p>
                      </div>
                      <div className="border border-[#E5E5E1] p-2 bg-[#F8F7F2] rounded text-[8.5px] font-mono text-zinc-500 select-none">
                        CF Node Latency: 1ms
                      </div>
                    </div>

                    {/* ACTIVE EMULATED DRAWER COMPLETED EXACTLY AS DIRECTED BY NATIVE TRANSFORMS */}
                    <div 
                      className="absolute inset-0 z-30 transition-all duration-300 pointer-events-none"
                      style={{
                        visibility: emulatedMobileDrawerOpen ? 'visible' : 'hidden',
                        pointerEvents: emulatedMobileDrawerOpen ? 'auto' : 'none'
                      }}
                    >
                      {/* Drawer Overlay */}
                      <div 
                        onClick={() => setEmulatedMobileDrawerOpen(false)}
                        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
                        style={{
                          opacity: emulatedMobileDrawerOpen ? 1 : 0
                        }}
                      />
                      
                      {/* Drawer Slide Canvas menu utilizing translate & visibility parameters */}
                      <div 
                        className="absolute left-0 top-0 bottom-0 w-[180px] bg-[#FAF9F6] border-r border-[#E5E5E1] p-4 flex flex-col justify-between transition-transform duration-300"
                        style={{
                          transform: emulatedMobileDrawerOpen ? 'translateX(0)' : 'translateX(-100%)'
                        }}
                      >
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold">BOOKMETHAT.</span>
                            <button 
                              onClick={() => setEmulatedMobileDrawerOpen(false)}
                              className="text-xs text-gray-400 font-bold"
                            >
                              ✕
                            </button>
                          </div>
                          
                          <nav className="flex flex-col gap-2 text-[9px] uppercase tracking-wider font-bold text-gray-600">
                            <span className="text-[7px] text-brand-orange">CARRIER TABS</span>
                            <button onClick={() => setEmulatedMobileDrawerOpen(false)} className="text-left py-1 hover:text-brand-orange select-none">eSIM Caches</button>
                            <button onClick={() => setEmulatedMobileDrawerOpen(false)} className="text-left py-1 hover:text-brand-orange select-none">Car Rentals</button>
                            <button onClick={() => setEmulatedMobileDrawerOpen(false)} className="text-left py-1 hover:text-brand-orange select-none">Flight Claims</button>
                          </nav>
                        </div>

                        <div className="text-[7.5px] font-mono text-zinc-400">
                          CF Pages Static Model ID-685596
                        </div>
                      </div>

                    </div>

                  </div>
                </div>

                {/* Simulated Telemetry log of 60fps renders */}
                <div className="bg-zinc-900 text-zinc-200 p-3 rounded font-mono text-[9px] space-y-1 text-left border border-zinc-800">
                  <span className="text-[#E55B13] font-bold uppercase tracking-widest block text-[8px] mb-1">Telemetry Monitor Terminal</span>
                  <div>&gt; Layer compositing: isolated on GPU thread.</div>
                  <div>&gt; Frame rate: <span className="text-emerald-400 font-bold">LOCKED 60fps (Constant)</span></div>
                  <div>&gt; Main Thread Render Lag: <span className="text-emerald-400 font-bold">{renderLatency.toFixed(2)}ms</span></div>
                  <div>&gt; Layout shifts recorded (CLS): <span className="text-emerald-400 font-bold">0.000</span></div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* --- UNIFIED USER CALCULATORS LAB CABINETS FROM CHECKPOINT 0 --- */}
        <section id="core-calculators" className="py-14 bg-[#F8F7F2] border-b border-[#E5E5E1] content-visibility-below-fold">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
              <span className="text-[10px] tracking-widest uppercase text-gray-400 font-bold font-mono">Affiliate Toolbox Cabinet</span>
              <h2 className="text-2xl font-serif font-bold italic text-gray-900">Unified Logistics Cab</h2>
              <p className="text-xs text-gray-550 font-sans leading-relaxed">Responsive estimators to check direct travel costs and secure local conversion codes.</p>
            </div>

            <div className="flex justify-center border-b border-[#E5E5E1] mb-6">
              {[
                { tab: 'planner', label: 'Interactive Nomad Planner' },
                { tab: 'calculators', label: 'Car & eSIM Cost Estimator' },
                { tab: 'guides', label: 'Topical SEO Silos' }
              ].map((it) => (
                <button
                  key={it.tab}
                  onClick={() => setActiveTab(it.tab as ActiveTab)}
                  className={`px-4 sm:px-6 py-2.5 text-[9px] uppercase tracking-widest font-mono font-bold border-b-2 transition-all cursor-pointer select-none ${
                    activeTab === it.tab 
                      ? 'border-brand-orange text-brand-orange' 
                      : 'border-transparent text-gray-400 hover:text-gray-905'
                  }`}
                >
                  {it.label}
                </button>
              ))}
            </div>

            <div className="bg-white border border-[#E5E5E1] p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] view-enter">
              {activeTab === 'planner' && <InteractivePlanner />}
              {activeTab === 'calculators' && <ComparisonCalculators />}
              {(activeTab === 'guides' || activeTab === 'overview') && <SiloGuides />}
            </div>

          </div>
        </section>

        {/* --- REGULATORY SHIELD MANDATES SECTION --- */}
        <section id="compliance-desk" className="py-14 bg-white content-visibility-below-fold">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 text-[9px] text-gray-400 font-mono font-bold uppercase tracking-widest border border-gray-300 px-2.5 py-1">
              <Shield className="w-3.5 h-3.5 text-brand-orange" /> Legal Disclosures & Compliance Desk
            </span>
            <h2 className="text-xl font-serif font-bold italic text-gray-900">Official Regulatory Declarations</h2>
            <p className="text-xs text-gray-500 font-sans leading-relaxed max-w-2xl mx-auto">
              BookMeThat operates in full transparency with FTC affiliate directories under publisher code 685596. We integrate direct checkout hyperlinks to verified carrier networks, charging zero additional middleman markups.
            </p>
            
            <div className="text-left border border-[#E5E5E1] bg-[#F8F7F2] p-4 sm:p-5 text-xs max-h-[300px] overflow-y-auto font-sans leading-relaxed">
              <LegalPages />
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#E5E5E1] mt-auto" id="site-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-[#E5E5E1] pb-10">
            <div className="md:col-span-4 space-y-3">
              <span className="font-serif font-bold text-lg text-[#1A1A1A] tracking-tight">
                BOOKMETHAT.
              </span>
              <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                Clean Jamstack travel affiliate template built with native Intersection hydrations and zero-latency CSS layouts to serve perfect Vercel deployment speeds globally.
              </p>
            </div>

            <div className="md:col-span-3 space-y-2">
              <h4 className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">AdSense & SEO Silos</h4>
              <ul className="space-y-1.5 text-xs text-gray-650 text-gray-600 font-sans">
                <li><button onClick={() => { handleSectionScroll('core-calculators'); setActiveTab('guides'); }} className="hover:text-brand-orange transition cursor-pointer text-left focus:outline-none select-none">eSIM & Connection Directories</button></li>
                <li><button onClick={() => { handleSectionScroll('core-calculators'); setActiveTab('calculators'); }} className="hover:text-brand-orange transition cursor-pointer text-left focus:outline-none select-none">Car Rentals Cost Comparers</button></li>
                <li><button onClick={() => { handleSectionScroll('hero'); }} className="hover:text-brand-orange transition cursor-pointer text-left focus:outline-none select-none font-bold">Launch Carrier Router</button></li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-2">
              <h4 className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Compliance Links</h4>
              <ul className="space-y-1.5 text-xs text-gray-600 font-sans">
                <li><button onClick={() => handleSectionScroll('compliance-desk')} className="hover:text-brand-orange transition cursor-pointer text-left focus:outline-none font-bold select-none text-gray-600">FTC Affiliate Disclosures</button></li>
                <li><button onClick={() => handleSectionScroll('compliance-desk')} className="hover:text-brand-orange transition cursor-pointer text-left focus:outline-none select-none text-gray-600">GDPR Cookie Consent</button></li>
                <li><button onClick={() => handleSectionScroll('compliance-desk')} className="hover:text-brand-orange transition cursor-pointer text-left focus:outline-none select-none text-gray-600">Terms and Services of Use</button></li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-2">
              <h4 className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Technical Node</h4>
              <ul className="space-y-1 text-[10px] text-slate-500 font-mono list-none p-0 m-0">
                <li>Host: High-Speed Vercel Node</li>
                <li>DNS: Cloudflare Edge DNS</li>
                <li>HMR Check: Off</li>
                <li>Tracking Key: 685596</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-sans">
            <p>
              &copy; {new Date().getFullYear()} BookMeThat Ltd. Core Web Vitals Guaranteed Layout.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-mono">
              <span>Primary Host Registered on:</span>
              <strong className="text-gray-650">bookmethat.com</strong>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
