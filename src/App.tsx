import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, Smartphone, Car, Shield, BadgePercent, BookOpen, 
  Settings, ExternalLink, Menu, X, ArrowRight, Zap, CheckCircle,
  Code, Copy, Eye, Star, Users, Flame, Clock, Terminal, Check,
  Cpu, Activity, Gauge, Globe, Sparkles, RefreshCw, Layers, Sliders, Send, Database,
  ChevronUp
} from 'lucide-react';
import { AFFILIATES, KEYWORD_CLUSTERS } from './data/affiliates';
import { ARTICLES } from './data/articles';
import InteractivePlanner from './components/InteractivePlanner';
import ComparisonCalculators from './components/ComparisonCalculators';
import SiloGuides from './components/SiloGuides';
import LegalPages from './components/LegalPages';
import SEOHeatmapConsole from './components/SEOHeatmapConsole';
import UtmAdsenseConsole from './components/UtmAdsenseConsole';
import TravelFAQConsole from './components/TravelFAQConsole';
import TravelQuizWidget from './components/TravelQuizWidget';
import VoucherCard from './components/VoucherCard';
import AIFlightStayPlanner from './components/AIFlightStayPlanner';
import { AffiliateLink } from './components/AffiliateLink';

type ActiveTab = 'overview' | 'planner' | 'calculators' | 'guides' | 'legal' | 'heatmap' | 'utm' | 'faq' | 'quiz' | 'flightsRooms';
type EdgeNode = 'fra' | 'nrt' | 'sfo' | 'sin' | 'lhr';

export default function App() {
  const [activeTab, setActiveTab ] = useState<ActiveTab>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('gdpr_consent_status');
      if (!consent) {
        const timer = setTimeout(() => {
          setShowCookieBanner(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // safe fallback
    }
  }, []);

  const handleAcceptAllCookies = () => {
    try {
      const updatedConsent = { necessary: true, analytics: true, marketing: true };
      localStorage.setItem('gdpr_consent_status', JSON.stringify(updatedConsent));
      
      // Simulate Google Consent Mode v2 registration
      if (typeof window !== 'undefined') {
        (window as any).gtag?.('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        });
      }
    } catch (e) {}
    setShowCookieBanner(false);
  };

  const [isScrolling, setIsScrolling] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [legalTab, setLegalTab] = useState<'disclosure' | 'privacy' | 'terms' | 'ai_seo' | 'impressum'>('disclosure');

  // Active Article viewed, for meta preview synchronization
  const [activeArticle, setActiveArticle] = useState<any | null>(null);

  // 301 Redirect Notification Toast State
  const [redirectNotice, setRedirectNotice] = useState<string | null>(null);

  // Dynamic Metadata state
  const [editingMetadata, setEditingMetadata] = useState<{ title: string; desc: string }>({
    title: "BookMeThat™: Best Travel Deals, Exclusive Promo Codes & Vacation Packages (2026)",
    desc: "Compare and book direct eSIM mobile data, budget scooter & car rentals, and luxury sightseeing passes with verified discount vouchers. Save up to 40% on holiday activities."
  });

  const [metaIsSaved, setMetaIsSaved] = useState(false);

  // Search Widget inputs
  const [widgetDestination, setWidgetDestination] = useState('');
  const [widgetCategory, setWidgetCategory] = useState('connectivity');
  const [widgetDate, setWidgetDate] = useState('');
  const [widgetMessage, setWidgetMessage] = useState<string | null>(null);
  const [couponCategory, setCouponCategory] = useState<string>('all');

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

  // --- OUTBOUND INTERSTITIAL & DYNAMIC SUBID TRACKING SYSTEM ---
  const [redirectModal, setRedirectModal] = useState<{
    isOpen: boolean;
    partnerId: string;
    partnerName: string;
    targetUrl: string;
    subId: string;
    progress: number;
    stepMessage: string;
  }>({
    isOpen: false,
    partnerId: '',
    partnerName: '',
    targetUrl: '',
    subId: '',
    progress: 0,
    stepMessage: ''
  });

  // Outbound affiliate link redirect interceptor with dynamic subIDs
  const triggerAffiliateRedirect = (url: string, partnerId: string) => {
    // 1. Locate partner metadata to personalize the screen
    const foundPartner = AFFILIATES.find(p => p.id === partnerId.toLowerCase());
    const partnerName = foundPartner ? foundPartner.name : (partnerId.charAt(0).toUpperCase() + partnerId.slice(1));

    // 2. Synthesize tracking subID (context origin + simulated edge node + secure micro time)
    const cleanOrigin = activeTab;
    const cleanNode = edgeNode;
    const timestamp = Date.now().toString().slice(-6);
    const generatedSubId = `${cleanOrigin}_${cleanNode}_${timestamp}`;

    // 3. Inject the dynamic SubID parameter into either outbound endpoint or clean proxy /go/:id
    let finalUrl = url;
    try {
      if (finalUrl.startsWith('http')) {
        const urlObj = new URL(finalUrl);
        urlObj.searchParams.set('subid', generatedSubId);
        finalUrl = urlObj.toString();
      } else {
        // Absolute path (/go/saily, etc.)
        const separator = finalUrl.includes('?') ? '&' : '?';
        finalUrl = `${finalUrl}${separator}subid=${generatedSubId}`;
      }
    } catch (e) {
      const separator = finalUrl.includes('?') ? '&' : '?';
      finalUrl = `${finalUrl}${separator}subid=${generatedSubId}`;
    }

    // 4. Activate the Interstitial anticipation state machine
    setRedirectModal({
      isOpen: true,
      partnerId,
      partnerName,
      targetUrl: finalUrl,
      subId: generatedSubId,
      progress: 0,
      stepMessage: "Querying localized partner database nodes..."
    });
  };

  // Expose to window for components like VoucherCard that trigger redirects procedurally
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).triggerAffiliateRedirect = triggerAffiliateRedirect;
    }
    return () => {
      if (typeof window !== 'undefined') {
        try {
          delete (window as any).triggerAffiliateRedirect;
        } catch (e) {
          (window as any).triggerAffiliateRedirect = undefined;
        }
      }
    };
  }, [activeTab, edgeNode]);

  // Modal progress simulation loop
  useEffect(() => {
    if (!redirectModal.isOpen) return;

    const startTime = Date.now();
    const duration = 1500; // 1.5 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      
      let msg = "Syncing with Travelpayouts Direct Deal Vault...";
      if (pct < 30) {
        msg = "Sourcing direct promo code...";
      } else if (pct < 60) {
        msg = "Bypassing broker markups on wholesale rate...";
      } else if (pct < 95) {
        msg = "Applying active discount & locking user SubID...";
      } else {
        msg = `Redirecting securely via Active Node [${edgeNode.toUpperCase()}]...`;
      }

      setRedirectModal(prev => {
        if (!prev.isOpen) return prev;
        return {
          ...prev,
          progress: pct,
          stepMessage: msg
        };
      });

      if (elapsed >= duration) {
        clearInterval(interval);
        
        // Modal complete - close and perform the safe outbound redirection
        setTimeout(() => {
          setRedirectModal(prev => {
            if (prev.isOpen && prev.targetUrl) {
              window.open(prev.targetUrl, '_blank', 'noopener,noreferrer');
            }
            return { ...prev, isOpen: false };
          });
        }, 150);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [redirectModal.isOpen, edgeNode]);

  // Automatically capture all manual HTML and layout links pointing to /go/ redirection proxy
  useEffect(() => {
    const handleOutboundLinkClicks = (e: MouseEvent) => {
      let currentEl = e.target as HTMLElement | null;
      
      // Traverse up to find potential Anchor targets
      while (currentEl && currentEl.tagName !== 'A') {
        currentEl = currentEl.parentElement;
      }

      if (currentEl && currentEl.tagName === 'A') {
        const hrefValue = currentEl.getAttribute('href');
        if (hrefValue && (hrefValue.startsWith('/go/') || hrefValue.includes('tpk.lu') || hrefValue.includes('tp.media'))) {
          // If we are already running inside our redirection state, allow normal navigation
          if (hrefValue.includes('subid=')) return;

          e.preventDefault();
          
          // Synthesise partner name identifier
          let extractedPartnerId = 'hotel';
          if (hrefValue.startsWith('/go/')) {
            extractedPartnerId = hrefValue.split('/go/')[1]?.split('?')[0] || 'hotel';
          } else if (hrefValue.includes('saily')) {
            extractedPartnerId = 'saily';
          } else if (hrefValue.includes('airalo')) {
            extractedPartnerId = 'airalo';
          } else if (hrefValue.includes('yesim')) {
            extractedPartnerId = 'yesim';
          } else if (hrefValue.includes('localrent')) {
            extractedPartnerId = 'localrent';
          } else if (hrefValue.includes('economybookings')) {
            extractedPartnerId = 'economybookings';
          }
          
          triggerAffiliateRedirect(hrefValue, extractedPartnerId);
        }
      }
    };

    document.addEventListener('click', handleOutboundLinkClicks);
    return () => {
      document.removeEventListener('click', handleOutboundLinkClicks);
    };
  }, [activeTab, edgeNode]);

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

  // Sync active metadata when active tab or active article selection changes
  useEffect(() => {
    let finalTitle = "";
    let finalDesc = "";

    if (activeArticle) {
      const cleanMetaTitle = activeArticle.metaTitle || activeArticle.title;
      finalTitle = cleanMetaTitle.includes('BookMeThat') ? cleanMetaTitle : `${cleanMetaTitle} | BookMeThat`;
      finalDesc = (activeArticle.metaDescription || activeArticle.summary).substring(0, 160);
    } else {
      switch (activeTab) {
        case 'overview':
          finalTitle = "BookMeThat™ | Best Travel eSIM, Car Rental & Flight Deals";
          finalDesc = "Compare verified travel eSIM cards, local direct car rentals, and secure delayed flight compensations with zero broker markups.";
          break;
        case 'flightsRooms':
          finalTitle = "AI Flight Booker & Hotel Reservations | BookMeThat";
          finalDesc = "Instantly plan your domestic and international routes with dynamic AI optimizations. Compare wholesale flight options and Expedia hotel room stays.";
          break;
        case 'planner':
          finalTitle = "Travel Budget Planner & Vacation Estimator | BookMeThat";
          finalDesc = "Design a custom travel itinerary and calculate real-time savings on regional cellular data, car rentals, and airport transfers.";
          break;
        case 'calculators':
          finalTitle = "Travel eSIM & Rental Car Price Comparison | BookMeThat";
          finalDesc = "Compare Saily, Airalo, and Yesim eSIM rates alongside Localrent, QEEQ, and Auto Europe car hires. Save on real-world travel costs.";
          break;
        case 'guides':
          finalTitle = "Travel eSIM Guides, Rental Hacks & Coupons | BookMeThat";
          finalDesc = "Browse expert destination guides and coupon vouchers for travel eSIM connections, cheap car rentals, and flight delay compensation.";
          break;
        case 'legal':
          finalTitle = "Regulatory Compliance & GDPR Terms of Service | BookMeThat";
          finalDesc = "Publisher terms, GDPR-compliant cookie agreements, FTC affiliate disclosures, and privacy policies for BookMeThat services.";
          break;
        case 'heatmap':
          finalTitle = "SEO Keyword Mapping & Search Volume Insights | BookMeThat";
          finalDesc = "Analyze commercial search query volumes, clustering trends, and CPC payout margins for top-tier travel and connectivity topics.";
          break;
        case 'utm':
          finalTitle = "Compliance UTM Generator & AdSense Audit | BookMeThat";
          finalDesc = "Parse inbound queries, audit AdSense compliance states, and construct safe outbound travel affiliate links using rel properties.";
          break;
        case 'faq':
          finalTitle = "eSIM hotspot guides & EU261 Delay Comp FAQ | BookMeThat";
          finalDesc = "Verified answers to highly searched travel questions, dynamic regional cellular rates, and cardless rental deposits.";
          break;
        case 'quiz':
          finalTitle = "Nomad Speed Quiz Challenge & Travel Trivia | BookMeThat";
          finalDesc = "Test your digital traveler wisdom. Solve connectivity, car rental, and flight delay restitution answers under pressure.";
          break;
        default:
          finalTitle = "BookMeThat™ | Best Travel eSIM, Car Rental & Flight Deals";
          finalDesc = "Compare verified travel eSIM cards, local direct car rentals, and secure delayed flight compensations with zero broker markups.";
      }
    }

    setEditingMetadata({
      title: finalTitle,
      desc: finalDesc
    });
    setMetaIsSaved(false);

    // Update the real browser title
    document.title = finalTitle;

    // Dynamically update standard SEO meta tags in the DOM for search indexing engines
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', finalDesc);
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = finalDesc;
      document.head.appendChild(meta);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', finalTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', finalDesc);

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', finalTitle);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', finalDesc);
  }, [activeTab, activeArticle]);

  // Routing and deep link parsing on mount or popstate to prevent any 404/page errors
  useEffect(() => {
    const handleUrlRouting = () => {
      const path = window.location.pathname.toLowerCase();
      const searchParams = new URLSearchParams(window.location.search);
      const articleQuery = searchParams.get('article') || searchParams.get('p');
      const tabQuery = searchParams.get('tab');
      const redirectFrom = searchParams.get('redirect_from') || searchParams.get('ref');

      // Check if there is a direct match for any of our article slugs or IDs in path or query parameters
      const matchedArticle = ARTICLES.find(art => 
        path.includes(art.slug.toLowerCase()) || 
        path.includes(art.id.toLowerCase()) ||
        (articleQuery && (articleQuery.toLowerCase() === art.slug.toLowerCase() || articleQuery.toLowerCase() === art.id.toLowerCase()))
      );

      if (matchedArticle) {
        setActiveTab('guides');
        setActiveArticle(matchedArticle);
        const canonicalArticlePath = `/${matchedArticle.slug}`;
        if (window.location.pathname.toLowerCase() !== canonicalArticlePath.toLowerCase()) {
          window.history.replaceState(null, '', canonicalArticlePath);
          setRedirectNotice(`HTTP 301 Moved Permanently: Redirected to canonical article URL (https://www.bookmethat.com${canonicalArticlePath})`);
          setTimeout(() => setRedirectNotice(null), 5000);
        }
        setTimeout(() => handleSectionScroll('core-calculators'), 300);
        return;
      }

      // Check standard tabs in query params
      if (tabQuery) {
        const allowedTabs: ActiveTab[] = ['overview', 'planner', 'calculators', 'guides', 'legal', 'heatmap', 'utm', 'faq', 'quiz', 'flightsRooms'];
        if (allowedTabs.includes(tabQuery as ActiveTab)) {
          setActiveTab(tabQuery as ActiveTab);
          setActiveArticle(null);
          setTimeout(() => handleSectionScroll('core-calculators'), 300);
          return;
        }
      }

      // 301 Permanent Redirect Mapping Engine for alias & legacy paths
      let targetTab: ActiveTab | null = null;
      let targetSubTab: 'disclosure' | 'privacy' | 'terms' | 'ai_seo' | 'impressum' = 'disclosure';
      let canonicalTarget = '/';
      let wasRedirected = false;

      if (path.includes('compliance') || path.includes('disclosure')) {
        targetTab = 'legal';
        targetSubTab = 'disclosure';
        canonicalTarget = '/about';
        if (path !== '/about') wasRedirected = true;
      } else if (path.includes('privacy')) {
        targetTab = 'legal';
        targetSubTab = 'privacy';
        canonicalTarget = '/privacy';
        if (path !== '/privacy') wasRedirected = true;
      } else if (path.includes('terms') || path.includes('service')) {
        targetTab = 'legal';
        targetSubTab = 'terms';
        canonicalTarget = '/terms';
        if (path !== '/terms') wasRedirected = true;
      } else if (path.includes('ai_seo') || path.includes('ai-seo')) {
        targetTab = 'legal';
        targetSubTab = 'ai_seo';
        canonicalTarget = '/ai-seo';
        if (path !== '/ai-seo') wasRedirected = true;
      } else if (path.includes('contact') || path.includes('impressum') || path.includes('support')) {
        targetTab = 'legal';
        targetSubTab = 'impressum';
        canonicalTarget = '/contact';
        if (path !== '/contact') wasRedirected = true;
      } else if (path.includes('connectivity') || path.includes('esim') || path.includes('sim') || path.includes('airalo') || path.includes('saily')) {
        targetTab = 'guides';
        canonicalTarget = '/esim';
        if (path !== '/esim') wasRedirected = true;
      } else if (path.includes('flights') || path.includes('flight') || path.includes('claims') || path.includes('airhelp')) {
        targetTab = 'flightsRooms';
        canonicalTarget = '/flights';
        if (path !== '/flights') wasRedirected = true;
      } else if (path.includes('transport') || path.includes('car-rental') || path.includes('car-rentals') || path.includes('cars') || path.includes('localrent')) {
        targetTab = 'calculators';
        canonicalTarget = '/car-rental';
        if (path !== '/car-rental') wasRedirected = true;
      } else if (path.includes('planner') || path.includes('itinerary') || path.includes('budget')) {
        targetTab = 'planner';
        canonicalTarget = '/planner';
        if (path !== '/planner') wasRedirected = true;
      } else if (path.includes('heatmap')) {
        targetTab = 'heatmap';
        canonicalTarget = '/heatmap';
        if (path !== '/heatmap') wasRedirected = true;
      } else if (path.includes('utm')) {
        targetTab = 'utm';
        canonicalTarget = '/utm';
        if (path !== '/utm') wasRedirected = true;
      } else if (path.includes('faq') || path.includes('help')) {
        targetTab = 'faq';
        canonicalTarget = '/faq';
        if (path !== '/faq') wasRedirected = true;
      } else if (path.includes('quiz') || path.includes('challenge') || path.includes('trivia')) {
        targetTab = 'quiz';
        canonicalTarget = '/challenge';
        if (path !== '/challenge') wasRedirected = true;
      } else if (path === '/' || path === '' || path.includes('index')) {
        targetTab = 'overview';
        canonicalTarget = '/';
      } else {
        // Fallback for completely unrecognized paths: redirect to home canonical to eliminate client-side soft 404s
        targetTab = 'overview';
        canonicalTarget = '/';
        wasRedirected = true;
      }

      if (targetTab) {
        setActiveTab(targetTab);
        if (targetTab === 'legal') setLegalTab(targetSubTab);
        setActiveArticle(null);

        // Perform 301 Moved Permanently state replacement if coming from legacy alias or query
        if (wasRedirected || redirectFrom) {
          window.history.replaceState(null, '', canonicalTarget);
          setRedirectNotice(`HTTP 301 Moved Permanently: Redirected from legacy route to canonical URL (https://www.bookmethat.com${canonicalTarget})`);
          setTimeout(() => setRedirectNotice(null), 5000);
        }
      }
    };

    // Run custom routing on load
    handleUrlRouting();
    
    // Also attach to popstate events for complete back-button compatibility
    window.addEventListener('popstate', handleUrlRouting);

    const handleSitemapNav = (e: any) => {
      const { tab, slug, sub } = e.detail;
      if (tab) {
        setActiveTab(tab);
        if (slug) {
          const matched = ARTICLES.find(art => art.slug === slug);
          if (matched) {
            setActiveArticle(matched);
            setTimeout(() => handleSectionScroll('core-calculators'), 300);
          }
        } else {
          setActiveArticle(null);
        }
        if (sub) {
          setLegalTab(sub);
        }
      }
    };
    window.addEventListener('bookmethatNav', handleSitemapNav);

    return () => {
      window.removeEventListener('popstate', handleUrlRouting);
      window.removeEventListener('bookmethatNav', handleSitemapNav);
    };
  }, []);

  // Synchronize state changes back to window pathname and trigger canonical links
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let path = '/';

    if (activeArticle) {
      path = `/${activeArticle.slug}`;
    } else {
      switch (activeTab) {
        case 'overview':
          path = '/';
          break;
        case 'flightsRooms':
          path = '/flights';
          break;
        case 'planner':
          path = '/planner';
          break;
        case 'calculators':
          path = '/car-rental';
          break;
        case 'guides':
          path = '/esim';
          break;
        case 'legal':
          if (legalTab === 'privacy') path = '/privacy';
          else if (legalTab === 'terms') path = '/terms';
          else if (legalTab === 'ai_seo') path = '/ai-seo';
          else if (legalTab === 'impressum') path = '/contact';
          else path = '/about';
          break;
        case 'heatmap':
          path = '/heatmap';
          break;
        case 'utm':
          path = '/utm';
          break;
        case 'faq':
          path = '/faq';
          break;
        case 'quiz':
          path = '/challenge';
          break;
        default:
          path = '/';
      }
    }

    // Dynamic state push to keep browser URL correct without reloading the page
    const currentPath = window.location.pathname;
    if (currentPath.toLowerCase() !== path.toLowerCase()) {
      window.history.pushState(null, '', path);
    }

    // Dynamic Canonical tag updater with absolute www.bookmethat.com address pairing
    const canonicalBase = 'https://www.bookmethat.com';
    const canonicalUrl = canonicalBase + (path === '/' ? '' : path);
    
    let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);

    // Keep Open Graph and Twitter URL properties aligned with canonical to prevent trailing slash mismatch
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalUrl);
    }
    const twUrl = document.querySelector('meta[name="twitter:url"]');
    if (twUrl) {
      twUrl.setAttribute('content', canonicalUrl);
    }

    // Dynamic route-level JSON-LD Schema injection for search bots (Breadcrumbs, Articles, Services, FAQ)
    const existingSchema = document.getElementById('bookmethat-dynamic-routing-schema');
    if (existingSchema) {
      existingSchema.remove();
    }

    try {
      const schemaScript = document.createElement('script');
      schemaScript.id = 'bookmethat-dynamic-routing-schema';
      schemaScript.type = 'application/ld+json';
      
      const schemas: any[] = [];

      // 1. Breadcrumb Schema for the active path
      const breadcrumbList: any = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": canonicalBase
          }
        ]
      };

      if (activeArticle) {
        breadcrumbList.itemListElement.push({
          "@type": "ListItem",
          "position": 2,
          "name": "Guides",
          "item": `${canonicalBase}/esim`
        });
        breadcrumbList.itemListElement.push({
          "@type": "ListItem",
          "position": 3,
          "name": activeArticle.title,
          "item": canonicalUrl
        });
        schemas.push(breadcrumbList);

        // Article Schema
        schemas.push({
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${canonicalUrl}#article`,
          "headline": activeArticle.metaTitle || activeArticle.title,
          "description": activeArticle.metaDescription || activeArticle.summary,
          "image": `${canonicalBase}/favicon.png`,
          "url": canonicalUrl,
          "datePublished": "2024-01-15T08:00:00Z",
          "dateModified": "2026-08-26T04:00:00Z",
          "author": {
            "@type": "Organization",
            "name": "BookMeThat Editorial Team",
            "url": canonicalBase
          },
          "publisher": {
            "@id": `${canonicalBase}/#organization`
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
          }
        });

        // Rich Snippet: Product & AggregateRating Schema (Golden Stars & Pricing Badges in SERPs)
        const pricingRanges: Record<string, { low: string; high: string; currency: string; count: string; rating: string; reviews: string }> = {
          connectivity: { low: "1.80", high: "35.00", currency: "USD", count: "12", rating: "4.89", reviews: "524" },
          transport: { low: "12.00", high: "85.00", currency: "EUR", count: "18", rating: "4.92", reviews: "438" },
          booking: { low: "0.00", high: "600.00", currency: "EUR", count: "6", rating: "4.94", reviews: "612" },
          utility: { low: "0.00", high: "45.00", currency: "USD", count: "8", rating: "4.87", reviews: "389" }
        };
        const siloStats = pricingRanges[activeArticle.silo] || pricingRanges.connectivity;

        schemas.push({
          "@context": "https://schema.org",
          "@type": "Product",
          "@id": `${canonicalUrl}#product-deal`,
          "name": `${activeArticle.title} - Verified Rates & Comparison`,
          "description": activeArticle.metaDescription || activeArticle.summary,
          "image": `${canonicalBase}/favicon.png`,
          "brand": {
            "@type": "Brand",
            "name": "BookMeThat Verified Deals"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": siloStats.rating,
            "reviewCount": siloStats.reviews,
            "bestRating": "5",
            "worstRating": "1"
          },
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": siloStats.currency,
            "lowPrice": siloStats.low,
            "highPrice": siloStats.high,
            "offerCount": siloStats.count,
            "availability": "https://schema.org/InStock",
            "seller": {
              "@id": `${canonicalBase}/#organization`
            }
          },
          "review": [
            {
              "@type": "Review",
              "author": { "@type": "Person", "name": "Alex R." },
              "datePublished": "2026-08-10",
              "reviewRating": { "@type": "Rating", "ratingValue": "5" },
              "reviewBody": `Verified advice from BookMeThat saved us money and stress. The direct affiliate links worked seamlessly.`
            }
          ]
        });

        // Rich Snippet: FAQPage Schema (Interactive Accordion Dropdowns in SERPs)
        const generateFaqForArticle = (art: typeof activeArticle) => {
          if (art.silo === 'connectivity') {
            return [
              {
                "@type": "Question",
                "name": `What is the best eSIM deal recommended in "${art.title}"?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Based on live speed benchmarks and price-per-gigabyte evaluations, Saily and Airalo provide the lowest latency and highest value starting from $1.80/GB with 5G connectivity.`
                }
              },
              {
                "@type": "Question",
                "name": "Does personal hotspot and data tethering work with these eSIM plans?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, all verified eSIM plans featured in this guide support unrestricted personal hotspot sharing for laptops and tablets."
                }
              },
              {
                "@type": "Question",
                "name": "How do I avoid unexpected roaming charges when activating an eSIM?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Set your travel eSIM as the primary line for Cellular Data with Roaming ON, while keeping your home physical SIM for calls/SMS with Data Roaming turned OFF."
                }
              }
            ];
          } else if (art.silo === 'transport') {
            return [
              {
                "@type": "Question",
                "name": `Can I rent a car without a credit card deposit as outlined in this guide?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Yes. By booking through Localrent or verified local suppliers, travelers can filter for vehicles requiring €0 or low cash/debit card deposits with zero credit card holds.`
                }
              },
              {
                "@type": "Question",
                "name": "What documents are required when picking up a rental car abroad?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You will need a valid driver's license (held for at least 1-2 years), passport, and an International Driving Permit (IDP) if driving outside your home jurisdiction."
                }
              }
            ];
          } else if (art.silo === 'booking') {
            return [
              {
                "@type": "Question",
                "name": "How much flight delay compensation can I claim under EU261 / UK261?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can legally claim between €250 and €600 per passenger in cash for flights delayed by 3+ hours or canceled without 14 days prior notice."
                }
              },
              {
                "@type": "Question",
                "name": "Is there any upfront fee to file a flight compensation claim?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Services like AirHelp and Compensair operate on a strict no-win, no-fee model where commission is only deducted after winning a payout from the airline."
                }
              }
            ];
          } else {
            return [
              {
                "@type": "Question",
                "name": "How can I avoid foreign transaction and ATM fees when traveling?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Use a multi-currency debit card like Wise or Revolut to spend at real mid-market exchange rates and always decline the ATM's dynamic currency conversion (DCC) prompt."
                }
              },
              {
                "@type": "Question",
                "name": "Is travel medical insurance mandatory for digital nomads?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, specialized nomad insurance from SafetyWing or World Nomads covers emergency hospital treatments, motor accidents, and gear theft across multiple countries."
                }
              }
            ];
          };
        };

        schemas.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${canonicalUrl}#faq`,
          "mainEntity": generateFaqForArticle(activeArticle)
        });
      } else {
        // Tab-specific breadcrumbs and Vertical Service Schemas
        if (activeTab === 'planner') {
          breadcrumbList.itemListElement.push({
            "@type": "ListItem",
            "position": 2,
            "name": "AI Nomad Planner",
            "item": canonicalUrl
          });
          schemas.push(breadcrumbList);
        } else if (activeTab === 'calculators') {
          breadcrumbList.itemListElement.push({
            "@type": "ListItem",
            "position": 2,
            "name": "Car Rentals",
            "item": canonicalUrl
          });
          schemas.push(breadcrumbList);

          // Service Schema for Car Rentals
          schemas.push({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Local Direct Car Rental Engine",
            "serviceType": "Car Rental Comparison",
            "provider": {
              "@id": `${canonicalBase}/#organization`
            },
            "areaServed": "Worldwide",
            "description": "Direct vehicle supplier rates with cash deposit filters and zero broker markups."
          });
        } else if (activeTab === 'guides') {
          breadcrumbList.itemListElement.push({
            "@type": "ListItem",
            "position": 2,
            "name": "eSIM Guides",
            "item": canonicalUrl
          });
          schemas.push(breadcrumbList);

          // Service Schema for Travel eSIMs
          schemas.push({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Travel eSIM Connectivity Comparison",
            "serviceType": "Cellular Data Comparison",
            "provider": {
              "@id": `${canonicalBase}/#organization`
            },
            "areaServed": "Worldwide",
            "description": "Verified cellular data eSIM comparisons for 190+ countries featuring Saily, Airalo, and Yesim."
          });
        } else if (activeTab === 'flightsRooms') {
          breadcrumbList.itemListElement.push({
            "@type": "ListItem",
            "position": 2,
            "name": "Flight Claims",
            "item": canonicalUrl
          });
          schemas.push(breadcrumbList);

          // Service Schema for Flight Delay Claims
          schemas.push({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "EU261 Flight Delay Compensation Claims Portal",
            "serviceType": "Flight Compensation Service",
            "provider": {
              "@id": `${canonicalBase}/#organization`
            },
            "description": "Risk-free flight cancellation and delay compensation claims calculator powered by EU261 regulations."
          });
        } else if (activeTab === 'heatmap') {
          breadcrumbList.itemListElement.push({
            "@type": "ListItem",
            "position": 2,
            "name": "SEO Heatmap",
            "item": canonicalUrl
          });
          schemas.push(breadcrumbList);
        } else if (activeTab === 'utm') {
          breadcrumbList.itemListElement.push({
            "@type": "ListItem",
            "position": 2,
            "name": "UTM Console",
            "item": canonicalUrl
          });
          schemas.push(breadcrumbList);
        } else if (activeTab === 'faq') {
          breadcrumbList.itemListElement.push({
            "@type": "ListItem",
            "position": 2,
            "name": "FAQ Helpdesk",
            "item": canonicalUrl
          });
          schemas.push(breadcrumbList);

          // FAQ Page Schema
          schemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I install a travel eSIM?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "To install a travel eSIM, purchase a plan on Wi-Fi before departure, scan the provided QR code in your phone's cellular settings (or paste the manual activation string), and label the line 'Travel eSIM'. Upon arrival at your destination, toggle the Travel eSIM line on and enable 'Data Roaming' for it."
                }
              },
              {
                "@type": "Question",
                "name": "How does EU261 flight delay compensation work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Under EU Regulation 261/2004, passengers are entitled to cash compensation of €250 to €600 if their flight arrives at its destination 3 or more hours late, unless the delay was caused by 'extraordinary circumstances' such as extreme weather or air traffic control strikes. Operational issues or crew scheduling are not extraordinary."
                }
              },
              {
                "@type": "Question",
                "name": "Can I rent a car without a credit card deposit?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, on platforms like Localrent, you can filter specifically for vehicle rental suppliers that offer 'No Deposit' terms or allow deposits to be paid with standard debit cards or in physical cash, completely bypassing the requirement for a major credit card."
                }
              }
            ]
          });
        } else if (activeTab === 'quiz') {
          breadcrumbList.itemListElement.push({
            "@type": "ListItem",
            "position": 2,
            "name": "Nomad Quiz",
            "item": canonicalUrl
          });
          schemas.push(breadcrumbList);
        } else if (activeTab === 'legal') {
          let pageName = "About";
          if (legalTab === 'privacy') pageName = "Privacy Policy";
          else if (legalTab === 'terms') pageName = "Terms of Service";
          else if (legalTab === 'ai_seo') pageName = "AI SEO Matrix";
          else if (legalTab === 'impressum') pageName = "Contact Desk";

          breadcrumbList.itemListElement.push({
            "@type": "ListItem",
            "position": 2,
            "name": pageName,
            "item": canonicalUrl
          });
          schemas.push(breadcrumbList);
        }
      }

      schemaScript.innerHTML = JSON.stringify(schemas);
      document.head.appendChild(schemaScript);
    } catch (err) {
      console.warn("Schema injection failed", err);
    }

  }, [activeTab, activeArticle, legalTab]);

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
        <a href="https://bookmethat.com/about" target="_blank" rel="noopener noreferrer" class="drawer-item font-mono font-bold">FTC Node Disclosure</a>
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
            alt="Sunny static coastal beach transit layout" 
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
                alt="Tokyo Digital Connectivity Hub"
                class="deal-thumb"
                referrerpolicy="no-referrer"
              >
              <div class="deal-cost-bubble">From $4.50</div>
            </div>
            <div class="deal-details">
              <span class="badge">Saily Global Cellular</span>
              <h3>Tokyo High Speed eSIM</h3>
              <p>Direct LTE/5G local profile routing on local cellular towers. Skip active premium roaming taxes entirely.</p>
              
              <!-- HIGH CONTRAST PULSING BUTTON -->
              <AffiliateLink href="https://saily.tpk.lu/9KzgxKRI" className="book-now-cta-pulsing">
                Book Now & Save Direct <span className="arrow-shape">→</span>
              </AffiliateLink>
            </div>
          </article>

          <!-- MODEL CARD 2 -->
          <article class="deal-card" data-category="transport">
            <div class="deal-img-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80" 
                decoding="async"
                loading="lazy"
                alt="European coastal car transit"
                class="deal-thumb"
                referrerpolicy="no-referrer"
              >
              <div class="deal-cost-bubble">$0 Deposit</div>
            </div>
            <div class="deal-details">
              <span class="badge">Localrent Motor</span>
              <h3>Costa Brava Hatchback</h3>
              <p>Rent exact model visually. Cash deposit acceptable directly at selected local airport terminals.</p>
              
              <AffiliateLink href="https://localrent.tpk.lu/YI6tdTTl" className="book-now-cta-pulsing">
                Book Now & Save Direct <span className="arrow-shape">→</span>
              </AffiliateLink>
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
    <div className={`min-h-screen bg-[#FAF9F6] flex flex-col font-sans text-[#1A1A1A] selection:bg-brand-orange/10 selection:text-brand-orange leading-normal w-full max-w-full overflow-x-hidden ${isScrolling ? 'scrolling-active pointer-events-none' : ''}`} id="global-layout-root">
      
      {/* Accessibility Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-orange text-white px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider z-50 shadow-md border border-[#FAF9F6]"
      >
        Skip to main content
      </a>
      
      {/* 1. BRAND HEADER */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E5E5E1] transition-all" id="site-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button 
            onClick={() => handleSectionScroll('hero')} 
            className="flex items-center gap-2 cursor-pointer focus:outline-none"
          >
            <span className="text-2xl font-bold tracking-tighter text-brand-orange">BOOKMETHAT.</span>
            <span className="text-[9px] uppercase tracking-widest font-semibold border border-brand-orange px-1.5 py-0.5 text-brand-orange hidden sm:inline-block">
              Premium Deal Hub 2026
            </span>
          </button>

          {/* Semantic Nav links with crawlable anchor tags */}
          <nav className="hidden md:flex items-center gap-1 text-[9.5px] uppercase tracking-widest font-bold">
            <a 
              href="#coupon-vault" 
              onClick={(e) => { e.preventDefault(); handleSectionScroll('coupon-vault'); }} 
              className="min-h-[44px] inline-flex items-center px-3 py-2 text-gray-700 hover:text-[#B84200] transition cursor-pointer select-none"
            >
              Promo Coupon Vault
            </a>
            <a 
              href="#hot-packages" 
              onClick={(e) => { e.preventDefault(); handleSectionScroll('hot-packages'); }} 
              className="min-h-[44px] inline-flex items-center px-3 py-2 text-gray-700 hover:text-[#B84200] transition cursor-pointer select-none"
            >
              Holiday Packs
            </a>
            <a 
              href="#destinations" 
              onClick={(e) => { e.preventDefault(); handleSectionScroll('destinations'); }} 
              className="min-h-[44px] inline-flex items-center px-3 py-2 text-gray-700 hover:text-[#B84200] transition cursor-pointer select-none"
            >
              Deal Cards Grid
            </a>
            <a 
              href="/planner" 
              onClick={(e) => { e.preventDefault(); setActiveTab('planner'); handleSectionScroll('core-calculators'); window.history.pushState(null, '', '/planner'); }} 
              className="min-h-[44px] inline-flex items-center px-3 py-2 text-gray-700 hover:text-[#B84200] transition cursor-pointer select-none"
            >
              Nomad Planner
            </a>
            <a 
              href="/esim" 
              onClick={(e) => { e.preventDefault(); setActiveTab('guides'); handleSectionScroll('core-calculators'); window.history.pushState(null, '', '/esim'); }} 
              className="min-h-[44px] inline-flex items-center px-3 py-2 text-gray-700 hover:text-[#B84200] transition cursor-pointer select-none"
            >
              Travel Guides & Silos
            </a>
            <a 
              href="#compliance-desk" 
              onClick={(e) => { e.preventDefault(); handleSectionScroll('compliance-desk'); }} 
              className="min-h-[44px] inline-flex items-center px-3 py-2 text-gray-700 hover:text-[#B84200] transition cursor-pointer select-none"
            >
              Compliance Desk
            </a>
          </nav>

          {/* Action Core CTAs */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1.5 text-[9px] font-mono font-bold text-[#B84200] bg-[#B84200]/10 px-2 py-1 border border-[#B84200]/30 select-none">
              <Sparkles className="w-3 h-3 animate-pulse text-[#B84200]" /> Direct Bargains Active
            </div>

            {/* Mobile Navigation Trigger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-gray-800 hover:text-[#B84200] transition focus:outline-none cursor-pointer"
              title="Toggle Menu"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer for React Container with Crawlable Anchors */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF9F6] border-b border-[#E5E5E1] p-4 space-y-1 text-xs font-semibold view-enter">
            <a href="#coupon-vault" onClick={(e) => { e.preventDefault(); handleSectionScroll('coupon-vault'); setMobileMenuOpen(false); }} className="w-full min-h-[44px] flex items-center text-left px-4 py-2.5 text-gray-800 hover:bg-[#F8F7F2] hover:text-[#B84200] transition">Promo Coupon Vault</a>
            <a href="#hot-packages" onClick={(e) => { e.preventDefault(); handleSectionScroll('hot-packages'); setMobileMenuOpen(false); }} className="w-full min-h-[44px] flex items-center text-left px-4 py-2.5 text-gray-800 hover:bg-[#F8F7F2] hover:text-[#B84200] transition">Holiday Packs Showcases</a>
            <a href="#destinations" onClick={(e) => { e.preventDefault(); handleSectionScroll('destinations'); setMobileMenuOpen(false); }} className="w-full min-h-[44px] flex items-center text-left px-4 py-2.5 text-gray-800 hover:bg-[#F8F7F2] hover:text-[#B84200] transition">Hotel eSIM / Cars Cards</a>
            <a href="/planner" onClick={(e) => { e.preventDefault(); setActiveTab('planner'); handleSectionScroll('core-calculators'); setMobileMenuOpen(false); window.history.pushState(null, '', '/planner'); }} className="w-full min-h-[44px] flex items-center text-left px-4 py-2.5 text-gray-800 hover:bg-[#F8F7F2] hover:text-[#B84200] transition">Nomad Cost Planner</a>
            <a href="/esim" onClick={(e) => { e.preventDefault(); setActiveTab('guides'); handleSectionScroll('core-calculators'); setMobileMenuOpen(false); window.history.pushState(null, '', '/esim'); }} className="w-full min-h-[44px] flex items-center text-left px-4 py-2.5 text-gray-800 hover:bg-[#F8F7F2] hover:text-[#B84200] transition">Travel Guides & Silos</a>
            <a href="#compliance-desk" onClick={(e) => { e.preventDefault(); handleSectionScroll('compliance-desk'); setMobileMenuOpen(false); }} className="w-full min-h-[44px] flex items-center text-left px-4 py-2.5 text-gray-800 hover:bg-[#F8F7F2] hover:text-[#B84200] transition">Compliance Disclosure</a>
            <div className="border-t border-[#E5E5E1] pt-3 text-[10px] font-mono text-[#B84200] font-bold px-4">
              Verified Referral Savings Active
            </div>
          </div>
        )}
      </header>

      {/* HTTP 301 REDIRECT TOAST BANNER */}
      {redirectNotice && (
        <div className="bg-emerald-950 text-white text-xs font-mono py-2.5 px-4 shadow-lg flex items-center justify-between border-b border-emerald-600 animate-fadeIn z-50">
          <div className="flex items-center gap-2.5 max-w-7xl mx-auto w-full">
            <span className="bg-emerald-500 text-slate-950 text-[9px] font-extrabold px-2 py-0.5 uppercase tracking-wider">
              301 REDIRECT
            </span>
            <span className="truncate font-semibold">{redirectNotice}</span>
          </div>
          <button 
            onClick={() => setRedirectNotice(null)} 
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-emerald-200 hover:text-white ml-2 text-xs font-bold cursor-pointer"
            aria-label="Dismiss 301 notification"
          >
            ✕
          </button>
        </div>
      )}

      {/* 3. CORE INTERACTIVE LAB WORKSPACE */}
      <main id="main-content" className="flex-grow">
        
        {/* HERO INTRO */}
        <section id="hero" className="relative overflow-hidden py-10 sm:py-14 lg:py-20 border-b border-[#E5E5E1]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E5E1_1px,transparent_1px),linear-gradient(to_bottom,#E5E5E1_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                <span className="inline-flex items-center gap-1.5 text-[9px] text-[#B84200] font-mono font-bold bg-[#B84200]/10 px-2.5 py-1 border border-[#B84200]/30 uppercase tracking-widest">
                  <Flame className="w-3.5 h-3.5 animate-pulse text-[#B84200]" /> Save Up to 40% globally with Direct contracts
                </span>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[58px] leading-[1.08] sm:leading-[1.02] font-serif italic tracking-tight text-[#1A1A1A]">
                  Direct Travel Deals & <span className="not-italic font-bold block mt-2 text-[#B84200]">Promo Code Vault.</span>
                </h1>
                
                <p className="text-gray-700 text-xs md:text-sm leading-relaxed max-w-xl">
                  Bypass costly travel brokers. Secure wholesale-direct eSIM cell connectivity, premium scooter/car rentals, delayed flight cash-backs, and attraction passes with active promotion codes verified in real time.
                </p>

                {/* 60-Second Challenge Callout Banner for Enhanced Engagement */}
                <div className="bg-white border-l-4 border-[#B84200] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm border-y border-r border-[#E5E5E1]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#B84200] animate-ping" />
                      <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-[#B84200]">Interactive Diagnostic Challenge</span>
                    </div>
                    <h2 className="text-sm font-bold font-serif italic text-gray-950 leading-tight">
                      Are you a smart traveler? Take the 60S Nomad IQ Test
                    </h2>
                    <p className="text-xs text-gray-700 font-sans leading-normal">
                      Read real scenarios to spot hidden carrier markup charges and secure a special secret coupon code.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('quiz');
                      setTimeout(() => handleSectionScroll('core-calculators'), 100);
                    }}
                    className="min-h-[44px] inline-flex items-center justify-center bg-[#1A1A1A] hover:bg-[#B84200] text-white text-[9.5px] font-mono font-bold uppercase py-2.5 px-4 whitespace-nowrap self-start sm:self-center cursor-pointer transition-colors"
                  >
                    Play 60S Challenge &rarr;
                  </button>
                </div>

                <div className="h-[1px] bg-[#E5E5E1]" />

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[9.5px] font-mono text-gray-700 uppercase tracking-wider font-semibold">
                  <span className="flex items-center gap-1"><BadgePercent className="w-3.5 h-3.5 text-[#B84200]" /> Verified ACTIVE Coupon Codes</span>
                  <span className="flex items-center gap-1"><Compass className="w-3.5 h-3.5 text-[#B84200]" /> Direct Car, eSIM & Tour Portals</span>
                  <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-[#B84200]" /> No Hidden Added Commissions</span>
                </div>
              </div>

              {/* SEARCH ROUTER AND ACTIVE CDN STATE CHANGER */}
              <div className="lg:col-span-5">
                <div className="bg-white border border-[#E5E5E1] p-6 shadow-xl relative hardware-accel">
                  
                  <div className="mb-4">
                    <h2 className="text-[10px] font-mono font-bold text-gray-700 uppercase tracking-widest">Global CDN Node Simulator</h2>
                    <h3 className="text-base font-serif font-bold italic mt-0.5 text-gray-900">Configure Local Router Edge</h3>
                  </div>

                  {/* CDN Target switcher */}
                  <div className="grid grid-cols-5 gap-1.5 mb-5">
                    {(Object.keys(edgeNodeLatencies) as EdgeNode[]).map(nodeId => (
                      <button
                        key={nodeId}
                        onClick={() => setEdgeNode(nodeId)}
                        className={`min-h-[44px] p-2 border rounded flex flex-col items-center justify-center cursor-pointer text-center select-none transition-all ${
                          edgeNode === nodeId
                            ? 'bg-[#B84200] border-[#B84200] text-white font-bold'
                            : 'bg-white border-gray-300 text-gray-800 hover:border-[#B84200]'
                        }`}
                      >
                        <span className="text-[10px] font-bold block uppercase">{nodeId}</span>
                        <span className="text-[8px] font-mono tracking-tighter block mt-0.5 opacity-90 font-semibold">
                          {edgeNodeLatencies[nodeId].ping}
                        </span>
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleBookingSearch} className="space-y-3.5">
                    
                    {/* Destination Input Field */}
                    <div className="space-y-1 search-widget-field border border-[#E5E5E1] p-3 bg-[#FAF9F6]">
                      <label htmlFor="widget-dest" className="block text-[9px] uppercase tracking-widest font-mono font-bold text-gray-700">Search Transit Cache</label>
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
                      <label htmlFor="widget-cat" className="block text-[9px] uppercase tracking-widest font-mono font-bold text-gray-700">Affiliate Silos Category</label>
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
                      className="w-full min-h-[44px] flex items-center justify-center bg-[#1A1A1A] hover:bg-[#B84200] text-white text-[9.5px] uppercase font-bold tracking-widest py-3.5 transition-all focus:outline-none focus:ring-1 focus:ring-[#B84200] cursor-pointer"
                    >
                      Scan Direct Bids Inside Cache
                    </button>
                  </form>

                  {widgetMessage && (
                    <div className="mt-3.5 p-2.5 border border-[#B84200]/30 bg-[#B84200]/10 text-[9.5px] font-mono text-[#B84200] font-bold">
                      {widgetMessage}
                    </div>
                  )}

                  <div className="mt-4 pt-3.5 border-t border-[#E5E5E1] flex justify-between items-center text-[9px] font-mono text-gray-700 font-medium">
                    <span>HOST: {edgeNodeLatencies[edgeNode].pop}</span>
                    <span className="text-emerald-700 font-bold">LATENCY: {edgeNodeLatencies[edgeNode].ping}</span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- TRAVEL PROMO CODE VAULT & DIRECT ESCROW ACTIVE DETAILS --- */}
        <section id="coupon-vault" className="py-16 bg-white border-b border-[#E5E5E1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
              <span className="text-[10px] tracking-widest uppercase font-mono font-bold text-[#B84200] bg-[#B84200]/10 px-2.5 py-1 border border-[#B84200]/30">
                ACTIVE TRAVELPAYOUTS SAVINGS VAULT (2026 VERIFIED)
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold italic text-gray-900">
                Exclusive Holiday Promo Codes & Deals
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                Click to instantly copy verified partner coupons and activate direct deals across eSIM data, rental cars, city passes, airport chauffeurs, and nomad security.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {[
                { id: 'all', label: 'All Deals (12)' },
                { id: 'connectivity', label: 'eSIM & Data' },
                { id: 'transport', label: 'Car Hire & Transfers' },
                { id: 'passes', label: 'Passes & Tours' },
                { id: 'utility', label: 'Security & Luggage' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setCouponCategory(tab.id)}
                  className={`min-h-[44px] px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider transition cursor-pointer ${
                    couponCategory === tab.id
                      ? 'bg-[#1A1A1A] text-white border-2 border-[#1A1A1A]'
                      : 'bg-[#F8F7F2] text-gray-800 hover:bg-[#EAE8DF] border-2 border-[#E5E5E1]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  id: 'saily', 
                  brand: 'Saily eSIM Global Data', 
                  category: 'eSIM & Data',
                  code: 'TEE15', 
                  discount: '15% OFF GLOBAL DATA', 
                  desc: 'Bypass expensive roaming across 150+ countries. Powered by Nord Security with instant activation and ultra-fast 5G speeds.', 
                  link: 'https://saily.tpk.lu/9KzgxKRI',
                  validThrough: 'Verified Active 2026'
                },
                { 
                  id: 'airalo', 
                  brand: 'Airalo Regional eSIMs', 
                  category: 'eSIM & Data',
                  code: 'NEWTOAIRALO15', 
                  discount: '15% OFF FIRST ORDER', 
                  desc: 'Save up to 85% on roaming across 200+ countries with local tier networks. Returning users can apply AIRALOESIM10 for 10% off.', 
                  link: 'https://airalo.tpk.lu/X5knsFOB',
                  validThrough: 'Verified Active 2026'
                },
                { 
                  id: 'localrent', 
                  brand: 'Localrent Car Hire', 
                  category: 'Car Hire & Transfers',
                  code: 'LOCALRENT10', 
                  discount: 'UP TO 25% OFF DEALS', 
                  desc: 'Direct car rentals from vetted local suppliers in Montenegro, Greece, Spain, Georgia & Turkey. $0 cash deposits available on-site.', 
                  link: 'https://localrent.tpk.lu/G4vT6NUE',
                  validThrough: 'Verified Active 2026'
                },
                { 
                  id: 'gocity', 
                  brand: 'Go City Sightseeing', 
                  category: 'Passes & Tours',
                  code: 'TTTPOD25', 
                  discount: 'UP TO 25% OFF PASSES', 
                  desc: 'Unlock wholesale multi-attraction Explorer & All-Inclusive passes in London, Paris, Rome, New York, Tokyo, and Barcelona.', 
                  link: 'https://tp.media/r?marker=685596&p=3801',
                  validThrough: 'Verified Active 2026'
                },
                { 
                  id: 'klook', 
                  brand: 'Klook Tours & Rail', 
                  category: 'Passes & Tours',
                  code: 'THATMUMTRAVEL5KLOOK', 
                  discount: 'UP TO 10% OFF TOURS', 
                  desc: 'Skip-the-line tickets for bullet trains (Shinkansen), Disneyland, Universal Studios, and curated local day excursions.', 
                  link: 'https://tp.media/r?marker=685596&p=3297',
                  validThrough: 'Verified Active 2026'
                },
                { 
                  id: 'qeeq', 
                  brand: 'QEEQ Worldwide Rentals', 
                  category: 'Car Hire & Transfers',
                  code: 'IG2026', 
                  discount: '8% OFF + $30 BUNDLE', 
                  desc: 'Global car rentals with automated Price Drop Protection refund algorithm and free cancellation up to 48 hours before pickup.', 
                  link: 'https://qeeq.tpk.lu/D7nSxEBA',
                  validThrough: 'Verified Active 2026'
                },
                { 
                  id: 'economy', 
                  brand: 'EconomyBookings Car Fleet', 
                  category: 'Car Hire & Transfers',
                  code: 'ECONOMY5', 
                  discount: '5% TO 30% OFF FLEET', 
                  desc: 'Access discounted wholesale fleets across 800+ international airport hubs and railway stations with transparent insurance.', 
                  link: 'https://economybookings.tpk.lu/koWZfRVI',
                  validThrough: 'Verified Active 2026'
                },
                { 
                  id: 'gettransfer', 
                  brand: 'GetTransfer Chauffeurs', 
                  category: 'Car Hire & Transfers',
                  code: 'GETTRANSFER10', 
                  discount: '10% OFF AIRPORT RIDES', 
                  desc: 'Private airport transfers and intercity chauffeur trips via transparent driver bidding. Pay 30% less than taxi rank meters.', 
                  link: 'https://gettransfer.tpk.lu/F5Vb9NEC',
                  validThrough: 'Verified Active 2026'
                },
                { 
                  id: 'radicalstorage', 
                  brand: 'Radical Storage Network', 
                  category: 'Security & Luggage',
                  code: 'blog10', 
                  discount: '10% OFF LUGGAGE DROP', 
                  desc: 'Store luggage safely in 1,000+ global cities from just $4.90/£5 per day with £3,000 security guarantee and zero weight limits.', 
                  link: 'https://radicalstorage.tpk.lu/6nK4jW4c',
                  validThrough: 'Verified Active 2026'
                },
                { 
                  id: 'nordvpn', 
                  brand: 'NordVPN Travel Shield', 
                  category: 'Security & Luggage',
                  code: 'SECURETRAVEL', 
                  discount: 'UP TO 68% OFF + 3 MO', 
                  desc: 'Defend credit cards and banking on airport and hotel Wi-Fi networks. Switch IP locations to unlock regional flight discounts.', 
                  link: 'https://tp.media/r?marker=685596&p=5328',
                  validThrough: 'Verified Active 2026'
                },
                { 
                  id: 'autoeurope', 
                  brand: 'Auto Europe International', 
                  category: 'Car Hire & Transfers',
                  code: 'AUTUMN25', 
                  discount: 'UP TO 25% OFF EUROPE', 
                  desc: 'Compare Avis, Hertz, Europcar & Sixt at wholesale rates with 48h free cancellation and dedicated 24/7 multilingual support.', 
                  link: 'https://autoeurope.tpk.lu/C5j78W4C',
                  validThrough: 'Verified Active 2026'
                },
                { 
                  id: 'airhelp', 
                  brand: 'AirHelp Delay Recovery', 
                  category: 'Security & Luggage',
                  code: 'FLIGHTREDRESS', 
                  discount: 'UP TO €600 CLAIM PAYOUT', 
                  desc: 'Check delayed, cancelled, or overbooked flights in 2 minutes under EU261 & UK261 law. No win, no fee legal claims enforcement.', 
                  link: 'https://airhelp.tpk.lu/O7W8mEaB',
                  validThrough: 'Verified Active 2026'
                }
              ]
                .filter(voucher => {
                  if (couponCategory === 'all') return true;
                  if (couponCategory === 'connectivity' && voucher.category === 'eSIM & Data') return true;
                  if (couponCategory === 'transport' && voucher.category === 'Car Hire & Transfers') return true;
                  if (couponCategory === 'passes' && voucher.category === 'Passes & Tours') return true;
                  if (couponCategory === 'utility' && voucher.category === 'Security & Luggage') return true;
                  return false;
                })
                .map((voucher) => (
                  <VoucherCard key={voucher.id} voucher={voucher} />
                ))}
            </div>
          </div>
        </section>

        {/* --- CURATED BENTO TRAVEL PACKAGES & DESTINATIONS SECTOR --- */}
        <section id="hot-packages" className="py-16 bg-[#FAF9F6] border-b border-[#E5E5E1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              
              {/* Left Side: Dynamic Combo deals column */}
              <div className="lg:col-span-8 space-y-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] tracking-widest uppercase font-mono font-bold text-gray-700">
                    Silo bundles showcase
                  </span>
                  <h2 className="text-3xl font-serif font-bold italic text-gray-900 mt-1">
                    Curated Destination Combo Packs
                  </h2>
                  <p className="text-xs text-gray-700 mt-1 max-w-xl">
                    Our editors calculated the perfect multi-brand integrations for ultimate flight, connectivity, and transfer savings with exact price totals.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Package 1 */}
                  <div className="bg-white border border-[#E5E5E1] p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[8.5px] bg-[#B84200]/10 text-[#B84200] border border-[#B84200]/30 font-mono px-2 py-0.5 uppercase tracking-wider font-bold">Asia Tech-Transit</span>
                        <span className="text-xs font-mono line-through text-gray-600">$120</span>
                      </div>
                      <h3 className="text-base font-serif font-bold text-[#1A1A1A]">Tokyo Skyrail Connect Combo</h3>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        Combines Saily 10GB Local eSIM + Klook Tokyo High-Speed Metro Ticket + Go City Sightseeing card. No added middleman broker fees.
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[#E5E5E1]/60">
                      <div>
                        <span className="text-[8.5px] text-gray-700 block uppercase font-mono font-bold">Book Direct Rate</span>
                        <strong className="text-lg font-serif font-bold italic text-[#B84200]">$98.00</strong>
                      </div>
                      <button 
                        onClick={() => {
                          setWidgetDestination('Tokyo, Japan');
                          setWidgetCategory('connectivity');
                          handleSectionScroll('core-calculators');
                        }}
                        className="min-h-[44px] inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#B84200] transition py-2 px-1 cursor-pointer"
                      >
                        Select & Plan Combo →
                      </button>
                    </div>
                  </div>

                  {/* Package 2 */}
                  <div className="bg-white border border-[#E5E5E1] p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[8.5px] bg-emerald-50 text-emerald-800 border border-emerald-300 font-mono px-2 py-0.5 uppercase tracking-wider font-bold">Euro Coastal Cruise</span>
                        <span className="text-xs font-mono line-through text-gray-600">$340</span>
                      </div>
                      <h3 className="text-base font-serif font-bold text-[#1A1A1A]">Costa Brava Hatchback Pack</h3>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        Combines a 7-day Localrent Greek/Spanish Hatchback + World Nomads Premium medical protection + Saily regional data eSIM.
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[#E5E5E1]/60">
                      <div>
                        <span className="text-[8.5px] text-gray-700 block uppercase font-mono font-bold">Book Direct Rate</span>
                        <strong className="text-lg font-serif font-bold italic text-[#B84200]">$265.00</strong>
                      </div>
                      <button 
                        onClick={() => {
                          setWidgetDestination('Spain Costa Brava');
                          setWidgetCategory('transport');
                          handleSectionScroll('core-calculators');
                        }}
                        className="min-h-[44px] inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#B84200] transition py-2 px-1 cursor-pointer"
                      >
                        Select & Plan Combo →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Bento Visual Asset / Image with Real Slogan overlay */}
              <div className="lg:col-span-4 bg-zinc-900 border border-zinc-950 p-6 sm:p-8 text-white flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-[8.5px] font-mono tracking-widest font-extrabold uppercase bg-[#B84200]/20 text-[#B84200] border border-[#B84200]/40 px-2 py-1 inline-block">
                    PROMO DISCOUNTS ACTIVE
                  </span>
                  <h3 className="text-2xl font-serif font-bold italic leading-tight text-white">
                    Unlock Guaranteed Lowest Rates
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    By checking checkout links directly linked with API registries, we bypass global booking search conglomerates. Our readers enjoy verified, reliable direct savings of 15% to 40% across connectivity and car rentals.
                  </p>
                </div>

                <div className="space-y-3 pt-6 border-t border-zinc-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Average eSIM Saving:</span>
                    <span className="text-emerald-400 font-bold">12% off standard roaming</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Car Deposit Obligation:</span>
                    <span className="text-emerald-400 font-bold">Down to $0 with Localrent</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Air Delay Payouts:</span>
                    <span className="text-emerald-400 font-bold">Up to €600 via AirHelp</span>
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <button 
                    onClick={() => handleSectionScroll('destinations')}
                    className="w-full min-h-[44px] flex items-center justify-center bg-[#B84200] hover:bg-white hover:text-[#B84200] text-white text-[10.5px] font-mono font-bold uppercase py-3 transition-colors cursor-pointer"
                  >
                    Compare Direct Carriers Now
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- DYNAMIC INTERACTIVE META-SEO OPTIMIZER & SNIPPET PREVIEWER PANEL --- */}
        <section id="seo-meta-optimizer" className="py-16 bg-[#F8F7F2] border-b border-[#E5E5E1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              
              {/* Controls Column */}
              <div className="lg:col-span-5 bg-white border border-[#E5E5E1] p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] tracking-widest uppercase font-mono font-bold text-[#B84200]">
                    Interactive SEO Controller Desk
                  </span>
                  <h2 className="text-2xl font-serif font-bold italic text-gray-900 leading-tight">
                    Meta Tags & SEO Optimizer
                  </h2>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Select any virtual page view or individual travel article to generate and customize its crawlable Google indexing headers live.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Select controller */}
                  <div className="space-y-1">
                    <label htmlFor="seo-target-selector" className="text-[10px] uppercase tracking-widest font-mono font-extrabold text-gray-700 block">
                      Target Page / Article view
                    </label>
                    <select
                      id="seo-target-selector"
                      value={activeArticle ? activeArticle.id : activeTab}
                      onChange={(e) => {
                        const val = e.target.value;
                        const matchedArt = ARTICLES.find(a => a.id === val);
                        if (matchedArt) {
                          setActiveArticle(matchedArt);
                          // Sync active guides tab view is required to open the article visually
                          setActiveTab('guides');
                        } else {
                          setActiveArticle(null);
                          setActiveTab(val as ActiveTab);
                        }
                      }}
                      className="w-full min-h-[44px] bg-[#FAF9F6] border border-[#E5E5E1] p-2.5 text-xs font-bold text-[#1A1A1A] focus:outline-none focus:border-[#B84200] cursor-pointer"
                    >
                      <optgroup label="Silo Page Views">
                        <option value="overview">Home & Core Deal Hub Summary</option>
                        <option value="planner">Interactive Nomad Trip Planner</option>
                        <option value="calculators">Car Rental & eSIM Joint Price Estimate</option>
                        <option value="guides">Travel Directories & Topical Silos</option>
                        <option value="legal">GDPR Cookie Privacy & FTC Disclosures</option>
                        <option value="heatmap">Keyword intent & Cluster Potential Heatmap</option>
                      </optgroup>
                      <optgroup label="SEO Destination Articles (30 Direct Silos)">
                        {ARTICLES.map(art => (
                          <option key={art.id} value={art.id}>
                            {art.id.substring(0,25)}... ({art.silo})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  {/* Input 1: Meta Title */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <label htmlFor="input-meta-title" className="text-[10px] uppercase tracking-widest font-mono font-extrabold text-gray-700 block">
                        Meta Title (Google Link)
                      </label>
                      <span className={`text-[10px] font-mono ${editingMetadata.title.length > 60 ? 'text-amber-700 font-bold animate-pulse' : 'text-gray-650 font-medium'}`}>
                        {editingMetadata.title.length}/60 chars
                      </span>
                    </div>
                    <input
                      type="text"
                      id="input-meta-title"
                      value={editingMetadata.title}
                      onChange={(e) => setEditingMetadata({ ...editingMetadata, title: e.target.value })}
                      className="w-full min-h-[44px] bg-[#FAF9F6] border border-[#E5E5E1] p-2.5 text-xs font-mono text-[#1A1A1A] focus:outline-none focus:border-[#B84200] font-bold"
                    />
                  </div>

                  {/* Input 2: Meta Description */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <label htmlFor="input-meta-desc" className="text-[10px] uppercase tracking-widest font-mono font-extrabold text-gray-700 block">
                        Meta Description (Google Snippet)
                      </label>
                      <span className={`text-[10px] font-mono ${editingMetadata.desc.length > 160 ? 'text-amber-700 font-bold animate-pulse' : 'text-gray-650 font-medium'}`}>
                        {editingMetadata.desc.length}/160 chars
                      </span>
                    </div>
                    <textarea
                      id="input-meta-desc"
                      rows={3}
                      value={editingMetadata.desc}
                      onChange={(e) => setEditingMetadata({ ...editingMetadata, desc: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#E5E5E1] p-2.5 text-xs font-mono text-[#1A1A1A] focus:outline-none focus:border-[#B84200] font-bold"
                    />
                  </div>

                  <button
                    onClick={() => {
                      document.title = editingMetadata.title;
                      setMetaIsSaved(true);
                      setTimeout(() => setMetaIsSaved(false), 3000);
                    }}
                    className="w-full min-h-[44px] bg-[#B84200] hover:bg-[#1A1A1A] text-white text-[10px] font-mono font-bold uppercase py-3 px-4 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {metaIsSaved ? (
                      <>
                        <Check className="w-4 h-4 text-white animate-bounce" />
                        Live Meta Headers Active!
                      </>
                    ) : (
                      'Update & Save Page Metadata'
                    )}
                  </button>
                </div>
              </div>

              {/* Snippet Previewer Column (Google Search Results) */}
              <div className="lg:col-span-7 bg-[#1E1E1C] text-[#EBEBE8] p-6 sm:p-8 border border-[#2D2D2A] flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div>
                    <span className="text-[9px] font-mono font-bold tracking-widest text-[#B84200] uppercase block">
                      Snippet Emulator
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      2026 Live Search Engine Result Page
                    </h3>
                  </div>
                  <span className="text-[9px] bg-zinc-800 border border-zinc-700 font-mono text-zinc-300 px-2.5 py-0.5 uppercase tracking-widest font-semibold">
                    Google Crawler-Safe
                  </span>
                </div>

                {/* Google Snippet Live Card */}
                <div className="bg-white text-[#202124] p-5 border border-[#dadce0] rounded-lg my-6 max-w-xl mx-auto w-full shadow-sm text-left font-sans">
                  <div className="text-xs text-[#202124] flex items-center gap-1.5 leading-tight mb-1 truncate font-sans">
                    <div className="w-4 h-4 bg-[#FAF9F6] rounded-full border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 text-[10px] font-bold text-[#B84200]">
                      B
                    </div>
                    <div>
                      <span className="text-[12px] text-[#202124]">https://bookmethat.com</span>
                      <span className="text-[11px] text-[#70757a] ml-1">
                        {activeArticle ? ` › articles › ${activeArticle.slug}` : ` › ${activeTab}`}
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="text-[19px] text-[#1a0dab] font-sans hover:underline cursor-pointer leading-snug font-medium mb-1 truncate block">
                    {editingMetadata.title || "BookMeThat™: Direct Travel Deals & Verified Active Promo Codes"}
                  </h4>

                  {/* Rich Snippet: Review Stars, Ratings & Price Range */}
                  <div className="flex items-center gap-2 text-[12px] text-[#70757a] font-sans mb-1.5 flex-wrap">
                    <div className="flex items-center text-[#e37400]">
                      <span className="font-bold text-[#202124] mr-1">4.9</span>
                      <span>★★★★★</span>
                    </div>
                    <span>·</span>
                    <span>(512 reviews)</span>
                    <span>·</span>
                    <span className="bg-[#e6f4ea] text-[#137333] px-1.5 py-0.2 rounded text-[11px] font-medium">
                      {activeArticle?.silo === 'transport' ? 'From €14/day · €0 Deposit' : activeArticle?.silo === 'booking' ? 'Up to €600 Cash Claim' : activeArticle?.silo === 'utility' ? '0% Forex · $0 Setup' : 'From $1.80/GB · 5G Verified'}
                    </span>
                    <span>·</span>
                    <span className="text-[#137333] font-medium">In Stock</span>
                  </div>

                  <p className="text-[14px] leading-relaxed text-[#4d5156] font-sans mb-2">
                    {editingMetadata.desc || "Compare Airalo, Saily, and local car rentals with zero broker markup fees. Use active codes to save immediately on vacation packages."}
                  </p>

                  {/* Rich Snippet: FAQ Dropdown Accordions Preview */}
                  <div className="border-t border-[#f1f3f4] pt-2 mt-2 space-y-1.5">
                    <div className="text-[12px] text-[#1a0dab] flex items-center justify-between cursor-pointer hover:underline">
                      <span>{activeArticle?.silo === 'connectivity' ? 'What is the best eSIM deal recommended?' : activeArticle?.silo === 'transport' ? 'Can I rent a car without a credit card deposit?' : 'How does EU261 flight delay compensation work?'}</span>
                      <span className="text-[#70757a] text-[10px]">▼</span>
                    </div>
                    <div className="text-[12px] text-[#1a0dab] flex items-center justify-between cursor-pointer hover:underline">
                      <span>{activeArticle?.silo === 'connectivity' ? 'Does personal hotspot work with these plans?' : activeArticle?.silo === 'transport' ? 'What documents are required at pickup?' : 'Is there any upfront fee to file a claim?'}</span>
                      <span className="text-[#70757a] text-[10px]">▼</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-zinc-800">
                  <h5 className="text-[9px] font-mono font-bold tracking-wider text-zinc-400 uppercase block">
                    SEO Analytics & Warnings logs
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px] font-mono leading-relaxed">
                    <div className="bg-zinc-900 p-3 border border-zinc-850 space-y-1 text-zinc-300">
                      <span className="text-[8.5px] font-bold uppercase text-zinc-400 block">Link Integrity</span>
                      <div className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> 100% Crawlable Links
                      </div>
                      <p className="text-[9px] text-zinc-400 leading-tight">All active booking URLs utilize direct-host links, bypassing redirects completely.</p>
                    </div>

                    <div className="bg-zinc-900 p-3 border border-zinc-850 space-y-1 text-zinc-300">
                      <span className="text-[8.5px] font-bold uppercase text-zinc-400 block">CTR Quality check</span>
                      {editingMetadata.title.length > 60 || editingMetadata.desc.length > 160 ? (
                        <div className="text-amber-400 font-bold animate-pulse">
                          ⚠️ LENGTH CRITICAL LIMITS
                        </div>
                      ) : (
                        <div className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Perfect CTR Density
                        </div>
                      )}
                      <p className="text-[9px] text-zinc-400 leading-tight">Keep titles &lt; 60 and descriptions &lt; 160 to avoid ellipses truncation on mobile indexes.</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* --- UNIFIED USER CALCULATORS LAB CABINETS FROM CHECKPOINT 0 --- */}
        <section id="core-calculators" className="py-14 bg-[#F8F7F2] border-b border-[#E5E5E1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
              <span className="text-[10px] tracking-widest uppercase text-gray-700 font-bold font-mono">Affiliate Toolbox Cabinet</span>
              <h2 className="text-2xl font-serif font-bold italic text-gray-900">Unified Logistics Cab</h2>
              <p className="text-xs text-gray-700 font-sans leading-relaxed">Responsive estimators to check direct travel costs and secure local conversion codes.</p>
            </div>

            <div className="flex justify-center border-b border-[#E5E5E1] mb-6 overflow-x-auto whitespace-nowrap">
              {[
                { tab: 'flightsRooms', label: 'AI Routes & Stays (Expedia)', path: '/flights' },
                { tab: 'planner', label: 'Interactive Nomad Planner', path: '/planner' },
                { tab: 'calculators', label: 'Car & eSIM Cost Estimator', path: '/car-rental' },
                { tab: 'guides', label: 'Topical SEO Silos', path: '/esim' },
                { tab: 'heatmap', label: 'AI Keyword Potential Heatmap', path: '/heatmap' },
                { tab: 'utm', label: 'AdSense & UTM Tracker', path: '/utm' },
                { tab: 'faq', label: 'FAQ Intelligence', path: '/faq' },
                { tab: 'quiz', label: 'Nomad IQ Challenge (60s)', path: '/challenge' }
              ].map((it) => (
                <a
                  key={it.tab}
                  href={it.path}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                      e.preventDefault();
                      setActiveTab(it.tab as ActiveTab);
                      window.history.pushState(null, '', it.path);
                    }
                  }}
                  className={`min-h-[44px] flex items-center justify-center px-4 sm:px-6 py-2.5 text-[9.5px] uppercase tracking-widest font-mono font-bold border-b-2 transition-all cursor-pointer select-none ${
                    activeTab === it.tab 
                      ? 'border-[#B84200] text-[#B84200] font-extrabold' 
                      : 'border-transparent text-gray-700 hover:text-gray-950 hover:border-gray-300'
                  }`}
                >
                  {it.label}
                </a>
              ))}
            </div>

            <div className="bg-white border border-[#E5E5E1] p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] view-enter">
              {activeTab === 'flightsRooms' && <AIFlightStayPlanner />}
              {activeTab === 'planner' && <InteractivePlanner />}
              {activeTab === 'calculators' && <ComparisonCalculators />}
              {(activeTab === 'guides' || activeTab === 'overview') && (
                <SiloGuides onViewArticle={(art) => setActiveArticle(art)} initialArticle={activeArticle} />
              )}
              {activeTab === 'heatmap' && <SEOHeatmapConsole />}
              {activeTab === 'utm' && <UtmAdsenseConsole />}
              {activeTab === 'faq' && <TravelFAQConsole />}
              {activeTab === 'quiz' && <TravelQuizWidget />}
            </div>

          </div>
        </section>

        {/* --- REGULATORY SHIELD MANDATES SECTION --- */}
        <section id="compliance-desk" className="py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 text-[9px] text-gray-700 font-mono font-bold uppercase tracking-widest border border-gray-300 px-2.5 py-1">
              <Shield className="w-3.5 h-3.5 text-[#B84200]" /> Legal Disclosures & Compliance Desk
            </span>
            <h2 className="text-xl font-serif font-bold italic text-gray-900">Official Regulatory Declarations</h2>
            <p className="text-xs text-gray-700 font-sans leading-relaxed max-w-2xl mx-auto">
              BookMeThat operates in full transparency with FTC affiliate directories under publisher code 685596. We integrate direct checkout hyperlinks to verified carrier networks, charging zero additional middleman markups.
            </p>
            
            <div className="text-left border border-[#E5E5E1] bg-[#F8F7F2] p-4 sm:p-5 text-xs max-h-[300px] overflow-y-auto font-sans leading-relaxed">
              <LegalPages defaultTab={legalTab} />
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#E5E5E1] mt-auto" id="site-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          
          {/* CRAWLABLE TOPICAL KNOWLEDGE SILOS DIRECTORY (48 In-Depth Guides - Depth 1 Crawl Access) */}
          <div className="border-b border-[#E5E5E1] pb-10 space-y-6" id="organic-silos-directory">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[9px] font-mono font-bold text-[#B84200] uppercase tracking-widest bg-[#B84200]/10 px-2 py-0.5 border border-[#B84200]/30">
                  Semantic Knowledge Hub
                </span>
                <h3 className="text-base font-serif font-bold text-gray-900 mt-1">
                  Complete Directory of In-Depth Travel Guides & Comparators
                </h3>
              </div>
              <span className="text-[10px] font-mono text-gray-500">
                48 Live Articles · Direct Carrier Endpoints
              </span>
            </div>

            <nav aria-label="Organic Guides Silo Directory" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
              {/* Silo 1: Cellular & eSIM */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-gray-900 uppercase border-b border-[#E5E5E1] pb-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-[#B84200]" />
                  <span>eSIM & Connectivity (12)</span>
                </div>
                <ul className="space-y-1 text-gray-600 list-none p-0 m-0">
                  {ARTICLES.filter(a => a.silo === 'connectivity').map(art => (
                    <li key={art.id}>
                      <a
                        href={`/${art.slug}`}
                        onClick={(e) => {
                          if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                            e.preventDefault();
                            setActiveArticle(art);
                            setActiveTab('guides');
                            handleSectionScroll('core-calculators');
                            window.history.pushState(null, '', `/${art.slug}`);
                          }
                        }}
                        className="text-[11px] text-gray-700 hover:text-[#B84200] hover:underline transition block py-0.5 line-clamp-1"
                        title={art.title}
                      >
                        {art.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Silo 2: Ground Transport */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-gray-900 uppercase border-b border-[#E5E5E1] pb-1.5">
                  <Car className="w-3.5 h-3.5 text-[#B84200]" />
                  <span>Cars & Transfers (10)</span>
                </div>
                <ul className="space-y-1 text-gray-600 list-none p-0 m-0">
                  {ARTICLES.filter(a => a.silo === 'transport').map(art => (
                    <li key={art.id}>
                      <a
                        href={`/${art.slug}`}
                        onClick={(e) => {
                          if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                            e.preventDefault();
                            setActiveArticle(art);
                            setActiveTab('guides');
                            handleSectionScroll('core-calculators');
                            window.history.pushState(null, '', `/${art.slug}`);
                          }
                        }}
                        className="text-[11px] text-gray-700 hover:text-[#B84200] hover:underline transition block py-0.5 line-clamp-1"
                        title={art.title}
                      >
                        {art.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Silo 3: Flight Booking & Claims */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-gray-900 uppercase border-b border-[#E5E5E1] pb-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#B84200]" />
                  <span>Flights & Delays (14)</span>
                </div>
                <ul className="space-y-1 text-gray-600 list-none p-0 m-0">
                  {ARTICLES.filter(a => a.silo === 'booking').map(art => (
                    <li key={art.id}>
                      <a
                        href={`/${art.slug}`}
                        onClick={(e) => {
                          if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                            e.preventDefault();
                            setActiveArticle(art);
                            setActiveTab('guides');
                            handleSectionScroll('core-calculators');
                            window.history.pushState(null, '', `/${art.slug}`);
                          }
                        }}
                        className="text-[11px] text-gray-700 hover:text-[#B84200] hover:underline transition block py-0.5 line-clamp-1"
                        title={art.title}
                      >
                        {art.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Silo 4: Utility & Nomad Security */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-gray-900 uppercase border-b border-[#E5E5E1] pb-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#B84200]" />
                  <span>Security & Nomad (12)</span>
                </div>
                <ul className="space-y-1 text-gray-600 list-none p-0 m-0">
                  {ARTICLES.filter(a => a.silo === 'utility').map(art => (
                    <li key={art.id}>
                      <a
                        href={`/${art.slug}`}
                        onClick={(e) => {
                          if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                            e.preventDefault();
                            setActiveArticle(art);
                            setActiveTab('guides');
                            handleSectionScroll('core-calculators');
                            window.history.pushState(null, '', `/${art.slug}`);
                          }
                        }}
                        className="text-[11px] text-gray-700 hover:text-[#B84200] hover:underline transition block py-0.5 line-clamp-1"
                        title={art.title}
                      >
                        {art.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-[#E5E5E1] pb-10">
            <div className="md:col-span-4 space-y-3">
              <span className="font-serif font-bold text-lg text-[#1A1A1A] tracking-tight">
                BOOKMETHAT.
              </span>
              <p className="text-xs text-gray-700 leading-relaxed max-w-sm">
                Clean Jamstack travel affiliate template built with native Intersection hydrations and zero-latency CSS layouts to serve perfect Vercel deployment speeds globally.
              </p>
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="text-[10px] font-mono font-bold text-gray-800 uppercase tracking-widest">AdSense & SEO Silos</h3>
              <ul className="flex flex-col gap-1 text-xs text-gray-700 font-sans list-none p-0 m-0">
                <li><a href="/esim" onClick={(e) => { e.preventDefault(); handleSectionScroll('core-calculators'); setActiveTab('guides'); }} className="min-h-[44px] inline-flex items-center py-2 px-1 text-gray-800 hover:text-[#B84200] transition cursor-pointer text-left select-none font-medium">eSIM & Connection Directories</a></li>
                <li><a href="/car-rental" onClick={(e) => { e.preventDefault(); handleSectionScroll('core-calculators'); setActiveTab('calculators'); }} className="min-h-[44px] inline-flex items-center py-2 px-1 text-gray-800 hover:text-[#B84200] transition cursor-pointer text-left select-none font-medium">Car Rentals Cost Comparers</a></li>
                <li><a href="/" onClick={(e) => { e.preventDefault(); handleSectionScroll('hero'); }} className="min-h-[44px] inline-flex items-center py-2 px-1 text-gray-800 hover:text-[#B84200] transition cursor-pointer text-left select-none font-bold">Launch Carrier Router</a></li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="text-[10px] font-mono font-bold text-gray-800 uppercase tracking-widest">Compliance Links</h3>
              <ul className="flex flex-col gap-1 text-xs text-gray-700 font-sans list-none p-0 m-0">
                <li><a href="/about" onClick={(e) => { e.preventDefault(); setLegalTab('disclosure'); handleSectionScroll('compliance-desk'); }} className="min-h-[44px] inline-flex items-center py-2 px-1 text-gray-800 hover:text-[#B84200] transition cursor-pointer text-left font-bold select-none">FTC Affiliate Disclosures</a></li>
                <li><a href="/privacy" onClick={(e) => { e.preventDefault(); setLegalTab('privacy'); handleSectionScroll('compliance-desk'); }} className="min-h-[44px] inline-flex items-center py-2 px-1 text-gray-800 hover:text-[#B84200] transition cursor-pointer text-left select-none font-medium">GDPR Cookie Consent</a></li>
                <li><a href="/terms" onClick={(e) => { e.preventDefault(); setLegalTab('terms'); handleSectionScroll('compliance-desk'); }} className="min-h-[44px] inline-flex items-center py-2 px-1 text-gray-800 hover:text-[#B84200] transition cursor-pointer text-left select-none font-medium">Terms and Services of Use</a></li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-2">
              <h3 className="text-[10px] font-mono font-bold text-gray-800 uppercase tracking-widest">Technical Node</h3>
              <ul className="space-y-1 text-[10px] text-gray-700 font-mono list-none p-0 m-0">
                <li>Host: High-Speed Vercel Node</li>
                <li>DNS: Cloudflare Edge DNS</li>
                <li>HMR Check: Off</li>
                <li>Tracking Key: 685596</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600 font-sans">
            <p className="flex items-center flex-wrap gap-1">
              <span>&copy; {new Date().getFullYear()} BookMeThat Ltd. Core Web Vitals Guaranteed Layout.</span>
              <span className="text-gray-400">|</span>
              <a href="https://saasskul.com" target="_blank" rel="noopener noreferrer" className="min-h-[44px] inline-flex items-center py-1 text-gray-700 hover:text-[#B84200] font-medium underline decoration-[#B84200] decoration-2">
                Product of SAASSKUL
              </a>
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-mono">
              <span className="text-gray-700">Primary Host Registered on:</span>
              <strong className="text-gray-900">bookmethat.com</strong>
            </div>
          </div>

        </div>
      </footer>

      {/* GDPR FLOATING COOKIE CONSENT BANNER (REQUIRED FOR ADSENSE COMPLIANCE) */}
      {showCookieBanner && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-white border-2 border-brand-orange p-4 sm:p-5 shadow-[0_12px_40px_rgba(229,91,19,0.15)] z-50 view-enter" id="gdpr-cookie-banner">
          <div className="space-y-3">
            <div className="flex gap-2 items-center text-[#E55B13]">
              <Shield className="w-4 h-4 shrink-0" />
              <h4 className="font-serif font-bold text-xs">EU User Consent Management Mode v2</h4>
            </div>
            
            <p className="text-[10px] text-gray-650 leading-normal font-sans">
              To keep our travel research free, BookMeThat, AdSense, and verified partners use tracking cookies to build customized mobile search index listings. Please permit standard analytical cookies.
            </p>

            <div className="flex justify-between items-center gap-2 pt-1 font-sans">
              <button
                onClick={() => {
                  try {
                    localStorage.setItem('gdpr_consent_status', JSON.stringify({ necessary: true, analytics: false, marketing: false }));
                  } catch (e) {}
                  setShowCookieBanner(false);
                }}
                className="text-[9px] font-mono font-bold text-gray-450 hover:text-gray-800 underline uppercase tracking-wider cursor-pointer bg-transparent border-0"
              >
                Reject Non-Core
              </button>

              <button
                onClick={handleAcceptAllCookies}
                className="bg-brand-orange hover:bg-[#c94d0e] text-white text-[9px] font-mono px-4 py-2 font-bold uppercase tracking-widest cursor-pointer transition transform active:scale-95"
              >
                Accept Optimal Cookies
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REDIRECT INTERSTITIAL LOADER CARD (ANTICIPATION BUILDER & SECURED SUBID INTEGRITY) */}
      {redirectModal.isOpen && (
        <div 
          className="fixed inset-0 bg-[#0F0F0E]/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 font-sans"
          id="affiliate-redirect-modal"
          aria-live="assertive"
          role="dialog"
        >
          <div className="bg-white border-2 border-[#1A1A1A] max-w-md w-full p-8 shadow-[0_25px_60px_-15px_rgba(229,91,19,0.2)] relative text-center flex flex-col items-center space-y-6 animate-in fade-in zoom-in duration-200">
            
            {/* Active Edge Router Node Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-[#FAF9F6] font-mono text-[8.5px] uppercase tracking-widest px-3.5 py-1.5 border border-[#FAF9F6] flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Node: {edgeNode.toUpperCase()} API
            </div>

            {/* Glowing Icon Base */}
            <div className="w-16 h-16 rounded-full bg-[#FAF9F6] border border-[#E5E5E1] flex items-center justify-center relative shadow-[0_4px_12px_rgba(0,0,0,0.03)] group">
              <div className="absolute inset-0 rounded-full border border-brand-orange animate-ping opacity-25"></div>
              <Sparkles className="w-7 h-7 text-[#E55B13] animate-pulse" />
            </div>

            {/* Dynamic Status Display */}
            <div className="space-y-2">
              <span className="text-[10px] tracking-widest uppercase text-gray-400 font-bold font-mono block">
                Partner Negotiation Tunnel
              </span>
              <h3 className="text-xl font-serif font-bold italic text-[#1A1A1A]">
                Sourcing {redirectModal.partnerName} Rates
              </h3>
              <p className="text-xs text-gray-550 leading-relaxed font-sans max-w-xs mx-auto">
                Guaranteed direct checkout with zero broker markups. Applying active wholesale coupon codes.
              </p>
            </div>

            {/* Simulated Live Action Steps */}
            <div className="w-full bg-[#F8F7F2] border border-[#E5E5E1] p-3 text-[10px] font-mono text-left flex items-center justify-between gap-3 text-gray-650">
              <div className="flex items-center gap-2 overflow-hidden">
                <Terminal className="w-3.5 h-3.5 text-brand-orange shrink-0 animate-pulse" />
                <span className="truncate">{redirectModal.stepMessage}</span>
              </div>
              <span className="text-brand-orange font-bold font-mono whitespace-nowrap">{redirectModal.progress}%</span>
            </div>

            {/* Precise Progress Bar */}
            <div className="w-full h-1 bg-[#E5E5E1] relative overflow-hidden">
              <div 
                className="bg-brand-orange h-full transition-all duration-75 absolute left-0 top-0 bottom-0" 
                style={{ width: `${redirectModal.progress}%` }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/40 blur-sm"></div>
              </div>
            </div>

            {/* Micro Metadata Audit trail */}
            <div className="w-full pt-4 border-t border-[#E5E5E1]/70 flex justify-between text-[8px] text-gray-500 font-mono tracking-wider gap-4">
              <div className="text-left space-y-0.5 shrink-0">
                <div>SOURCE CANONICAL: bookmethat/{activeTab}</div>
                <div className="text-emerald-700 font-bold">HANDSHAKE: HTTP 301 DIRECT MERCHANT</div>
              </div>
              <div className="text-right space-y-0.5 text-ellipsis overflow-hidden truncate">
                <div className="truncate">SUBID: {redirectModal.subId}</div>
                <div className="text-emerald-600 font-bold">CONVERSION LOCK: ACTIVE_PROMO</div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* STICKY HIGH-INTENT TRANSACTIONAL CONVERSION BAR */}
      <aside 
        aria-label="Exclusive Direct Travel Partner Deals"
        className="fixed bottom-0 left-0 right-0 z-30 bg-[#1A1A1A] text-white border-t border-[#333] py-2.5 px-3 sm:px-6 shadow-2xl backdrop-blur-md bg-opacity-95"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2 text-left">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B84200] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B84200]"></span>
            </span>
            <p className="text-[11px] sm:text-xs font-sans text-stone-200">
              <strong className="text-white font-bold">Exclusive Deal:</strong> Get 5% OFF 5G Travel eSIMs with code <span className="bg-[#B84200]/30 text-[#FF8542] px-1.5 py-0.5 font-mono font-bold border border-[#B84200]/50 select-all">SPECIAL5</span> or Book Localrent with zero card deposit.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <AffiliateLink
              href="https://saily.top/3Yv4T8x"
              aria-label="Claim Saily 5% Discount Code"
              className="bg-[#B84200] hover:bg-[#a03800] text-white text-[10px] sm:text-xs font-mono font-bold uppercase py-1.5 px-3 rounded-none transition flex items-center gap-1 shadow-sm"
            >
              Get eSIM Deal &rarr;
            </AffiliateLink>
            <AffiliateLink
              href="https://localrent.tp.st/P9K5Y1f7"
              aria-label="Browse No Deposit Car Rentals on Localrent"
              className="bg-stone-800 hover:bg-stone-700 text-stone-100 text-[10px] sm:text-xs font-mono font-bold uppercase py-1.5 px-3 rounded-none border border-stone-600 transition flex items-center gap-1"
            >
              Zero-Deposit Cars &rarr;
            </AffiliateLink>
          </div>
        </div>
      </aside>

      {/* FLOATING SCROLL TO TOP BUTTON */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-14 right-6 z-40 p-3.5 bg-brand-orange hover:bg-[#c94d0e] text-white rounded-full shadow-[0_10px_25px_-5px_rgba(229,91,19,0.5)] transition-all duration-300 transform hover:scale-110 active:scale-95 border border-white/30 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 flex items-center justify-center group cursor-pointer animate-in fade-in zoom-in-75 duration-200"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ChevronUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </button>
      )}

    </div>
  );
}
