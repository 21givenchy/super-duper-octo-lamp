"use client";

import { useState, useEffect } from "react";
import { LoadingCurtain } from "@/components/magicui/loading-curtain";
import { SpinningText } from "@/components/magicui/spinning-text";
import { Navigation } from "@/components/ui/navigation";
import AdsConsent from "./ads-consent";

// Separate HeaderLogo component that could be potentially shared
const HeaderLogo = () => (
  <div className="fixed top-6 right-6 text-right z-50 p-4 rounded-full bg-[#111]/70 backdrop-blur-md shadow-lg">
    <SpinningText className="text-white opacity-90 font-medium" radius={3.5}>front • forum • focus •</SpinningText>
  </div>
);

// Global Navigation Bar with adaptive styling
const GlobalNavbar = () => {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isWhitePage = pathname === '/';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only apply scroll behavior on the home page
    if (pathname !== '/') {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      // Show navbar after scrolling past the hero section (100vh)
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      
      if (scrollPosition > heroHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    } ${
      isWhitePage 
        ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm' 
        : 'bg-transparent backdrop-blur-sm border-b border-white/10'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className={`text-3xl font-bold tracking-wider transition-colors ${
              isWhitePage ? 'text-gray-900' : 'text-white'
            }`}>
              frontforumfocus
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:block">
            <Navigation isWhitePage={isWhitePage} />
          </div>
          
          {/* TRY GRETA Button */}
          <div className="flex items-center">
            <a 
              href="https://greta-v2.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`px-6 py-2 border rounded-full transition-colors font-medium ${
                isWhitePage 
                  ? 'border-gray-300 text-gray-900 hover:bg-gray-100' 
                  : 'border-gray-600 text-white hover:bg-gray-800'
              }`}
            >
              TRY GRETA
            </a>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 pb-2">
          <Navigation isWhitePage={isWhitePage} />
        </div>
      </div>
    </nav>
  );
};

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const handleLoadingComplete = () => {
    setIsLoadingComplete(true);
  };

  return (
    <>
      {isMounted && !isLoadingComplete && (
        <LoadingCurtain onLoadingComplete={handleLoadingComplete} />
      )}
      <HeaderLogo />
      <GlobalNavbar />
      <AdsConsent />
      {/* No padding-top needed since navbar is hidden on hero */}
      <div>
        {children}
      </div>
    </>
  );
}