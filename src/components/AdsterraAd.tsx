import React, { useEffect, useRef, useState } from 'react';

/**
 * Adsterra ad slot.
 *
 * Two things here are not obvious and cost real debugging time if you get them
 * wrong:
 *
 * 1. `invoke.js` reads a BARE GLOBAL called `window.atOptions`. There is no
 *    per-zone namespace, so two snippets sharing one document overwrite each
 *    other and only the first slot ever fills. The fix is to give every slot
 *    its own document: one iframe per slot, with that slot's snippet as the
 *    iframe's `srcdoc`. That is why this renders an iframe rather than
 *    appending a script tag.
 *
 * 2. `invoke.js` positions the creative relative to its own <script> tag using
 *    document.currentScript. Appending the script to document.body therefore
 *    renders the ad at the bottom of the page instead of in its slot. Keeping
 *    the snippet inside its own iframe solves this too.
 *
 * Ads are consent-gated: nothing is fetched until the visitor has accepted
 * marketing cookies, which is what GDPR/ePrivacy require. DNT and GPC are
 * honoured as refusals.
 */

type Zone = 'leaderboard' | 'rectangle' | 'skyscraper';

const ZONES: Record<Zone, { key: string; width: number; height: number }> = {
  leaderboard: { key: '7329c4e64bae7da3d58f530f76605126', width: 728, height: 90 },
  rectangle: { key: 'c24c5fa0ca416b18e274984483fd14be', width: 300, height: 250 },
  skyscraper: { key: '3222e3d2386f6549c6d7142fae656294', width: 160, height: 600 },
};

const INVOKE_HOST = 'https://ballisticcomainvitation.com';
const CONSENT_KEY = 'gdpr_consent_status';

/** True only when the visitor has explicitly accepted marketing cookies. */
function hasAdConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    // Honour explicit opt-outs first.
    if (navigator.doNotTrack === '1') return false;
    if ((navigator as any).globalPrivacyControl === true) return false;
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return parsed?.marketing === true;
  } catch {
    return false;
  }
}

interface AdsterraAdProps {
  zone: Zone;
  /** Unique per slot on the page - used for the DOM id. */
  slotId: string;
  className?: string;
}

const AdsterraAd: React.FC<AdsterraAdProps> = ({ zone, slotId, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [inView, setInView] = useState(false);
  const [filled, setFilled] = useState(false);
  // Guards against a slot firing twice. Without this, any re-render that
  // re-runs the effect re-issues the ad request, and Adsterra counts each one
  // as an impression even though only one is ever shown to the visitor.
  const loadedRef = useRef(false);

  // Check consent once on mount, then only when it actually changes.
  useEffect(() => {
    const sync = () => setAllowed(hasAdConsent());
    sync();
    window.addEventListener('storage', sync);
    window.addEventListener('bookmethat:consent', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('bookmethat:consent', sync);
    };
  }, []);

  // Only load when the slot is near the viewport, so ads never compete with
  // the article itself for bandwidth.
  useEffect(() => {
    if (!allowed) return;
    const el = containerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [allowed]);

  // Build the slot's private document once it is in view.
  useEffect(() => {
    if (!allowed || !inView || loadedRef.current) return;
    loadedRef.current = true;
    const el = containerRef.current;
    if (!el) return;
    const cfg = ZONES[zone];
    if (!cfg) return;

    const srcdoc = [
      '<!doctype html><html><head><meta charset="utf-8">',
      '<style>html,body{margin:0;padding:0;overflow:hidden;background:transparent;}</style>',
      '</head><body>',
      '<scr' + 'ipt>',
      `atOptions = { 'key' : '${cfg.key}', 'format' : 'iframe', 'height' : ${cfg.height}, 'width' : ${cfg.width}, 'params' : {} };`,
      '</scr' + 'ipt>',
      '<scr' + `ipt src="${INVOKE_HOST}/${cfg.key}/invoke.js"></scr` + 'ipt>',
      '</body></html>',
    ].join('');

    const iframe = document.createElement('iframe');
    iframe.title = 'Advertisement';
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('frameborder', '0');
    iframe.style.width = `${cfg.width}px`;
    iframe.style.height = `${cfg.height}px`;
    iframe.style.border = '0';
    iframe.style.display = 'block';
    iframe.srcdoc = srcdoc;

    iframe.addEventListener('load', () => {
      try {
        const inner = iframe.contentDocument;
        if (inner && inner.querySelector('iframe, img, ins, a[href]')) setFilled(true);
      } catch {
        // Cross-origin creative: cannot inspect, but it did load.
        setFilled(true);
      }
    });

    el.innerHTML = '';
    el.appendChild(iframe);
  }, [allowed, inView, zone]);

  // The container must collapse to nothing when there is no ad, so it never
  // reserves a blank gap. No min-height here, deliberately.
  return (
    <div
      id={slotId}
      data-ad-zone={zone}
      data-ad-status={filled ? 'filled' : 'empty'}
      ref={containerRef}
      className={className}
      style={{
        margin: '0 auto',
        textAlign: 'center',
        overflow: 'hidden',
        maxWidth: '100%',
      }}
    />
  );
};

export default AdsterraAd;
