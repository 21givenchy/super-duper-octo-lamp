"use client";

import React, { useEffect, useState } from "react";

const ADS_KEY = "fff_ads_consent";
const ADS_PUB = "ca-pub-5890845623424973"; // keep in sync with layout meta

// Type declaration for Google AdSense
declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdsConsent() {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(ADS_KEY);
    setConsent(stored);

    // If previously granted, ensure the script is loaded on mount
    if (stored === "granted") {
      loadAdsScript();
      // notify ad slots
      window.dispatchEvent(new CustomEvent('ad-consent-changed', { detail: { consent: true } }));
    }
  }, []);

  const loadAdsScript = () => {
    try {
      // Avoid injecting multiple times
      if (document.querySelector(`script[data-ads-consent="${ADS_PUB}"]`)) return;

      // Create and configure the script element
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_PUB}`;
      s.crossOrigin = "anonymous";
      s.setAttribute("data-ads-consent", ADS_PUB);
      document.head.appendChild(s);

      // Ensure window.adsbygoogle exists
      window.adsbygoogle = window.adsbygoogle || [];
    } catch (err) {
      // Fail silently; do not break the site on script injection issues
      console.error("Failed to load ads script", err);
    }
  };

  const handleAccept = () => {
    try {
      localStorage.setItem(ADS_KEY, "granted");
      setConsent("granted");
      loadAdsScript();
      // notify ad slots
      window.dispatchEvent(new CustomEvent('ad-consent-changed', { detail: { consent: true } }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleReject = () => {
    try {
      localStorage.setItem(ADS_KEY, "denied");
      setConsent("denied");
      // notify ad slots
      window.dispatchEvent(new CustomEvent('ad-consent-changed', { detail: { consent: false } }));
    } catch (e) {
      console.error(e);
    }
  };

  // If user already made a choice, don't show the banner
  if (consent) return null;

  return (
    <div aria-live="polite" className="fixed inset-x-4 md:inset-x-auto md:left-8 md:right-8 bottom-6 z-50">
      <div className="max-w-4xl mx-auto bg-black/70 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 text-sm text-white/90">
          We use Google Ads to help fund our work. By allowing personalized ads you help support development — you can change this choice anytime.
        </div>
        <div className="flex-shrink-0 flex gap-2">
          <button onClick={handleAccept} className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-cyan-400 text-black font-semibold">Allow Ads</button>
          <button onClick={handleReject} className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-white/10 text-white">Decline</button>
        </div>
      </div>
    </div>
  );
}
