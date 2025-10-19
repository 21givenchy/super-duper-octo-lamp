"use client";

import { useState, memo, useCallback, useMemo, useEffect } from "react";
import { StickyBanner } from "@/components/ui/sticky-banner";

import { podcastEpisodes } from '@/lib/podcastEpisodes';

// Memoized video player component
const VideoPlayer = memo(({ youtubeId, startTime, title }: { 
  youtubeId: string;
  startTime: number;
  title: string;
}) => (
  <div className="aspect-video w-full max-w-md mx-auto bg-zinc-900 relative rounded-lg overflow-hidden shadow-xl">
    <iframe
      src={`https://www.youtube.com/embed/${youtubeId}?start=${startTime}&autoplay=0&controls=1&modestbranding=1&rel=0`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      className="absolute inset-0 w-full h-full"
      loading="lazy"
    />
  </div>
));

// Ensure component has displayName for better debugging in React DevTools
VideoPlayer.displayName = "VideoPlayer";

// Memoized typography component
const SpacedTypography = memo(() => (
  <div className="space-y-1 tracking-wider">
    <div className="flex gap-4 sm:gap-8">
      <span className="text-white text-lg sm:text-xl md:text-2xl">w</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl">e</span>
    </div>
    
    <div>
      <span className="text-white text-lg sm:text-xl md:text-2xl block">believe</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl block">in</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl block">the</span>
    </div>
    
    <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-8">
      <span className="text-white text-lg sm:text-xl md:text-2xl">p</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl">o</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl">w</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl">e</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl">r</span>
    </div>
    
    <div className="flex gap-4 sm:gap-8">
      <span className="text-white text-lg sm:text-xl md:text-2xl">o</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl">f</span>
    </div>
    
    <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-8">
      <span className="text-white text-lg sm:text-xl md:text-2xl">c</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl">o</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl">l</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl">l</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl">e</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl">c</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl">t</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl">i</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl">v</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl">e</span>
    </div>
    
    <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-8">
      <span className="text-white text-lg sm:text-xl md:text-2xl">a</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl">c</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl">t</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl">i</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl">o</span>
      <span className="text-white text-lg sm:text-xl md:text-2xl">n</span>
    </div>
  </div>
));

// Ensure component has displayName for better debugging in React DevTools
SpacedTypography.displayName = "SpacedTypography";

// Memoized episode selector component
const EpisodeSelector = memo(({ 
  currentEpisode, 
  onChange 
}: { 
  currentEpisode: number;
  onChange: (index: number) => void;
}) => (
  <div className="flex space-x-4 mt-6 sm:mt-8">
    {podcastEpisodes.map((_, index) => (
      <button 
        key={index} 
        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${index === currentEpisode ? 'bg-white' : 'bg-gray-600'} transition-colors`}
        onClick={() => onChange(index)}
        aria-label={`Select podcast episode ${index + 1}`}
      />
    ))}
  </div>
));

EpisodeSelector.displayName = "EpisodeSelector";

export default function VibesPage() {
  const [currentEpisode, setCurrentEpisode] = useState(0);
  
  // Use the current podcast for the main video display
  const mainEpisode = useMemo(() => podcastEpisodes[currentEpisode], [currentEpisode]);
  
  // Use useCallback for event handlers to prevent unnecessary re-renders
  const handleEpisodeChange = useCallback((index: number) => {
    setCurrentEpisode(index);
  }, []);

  // Auto-advance functionality - move to next video every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEpisode((prevEpisode) => (prevEpisode + 1) % podcastEpisodes.length);
    }, 3000); // 3 seconds

    // Cleanup interval on component unmount or when currentEpisode changes
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this effect runs once on mount
  
  return (
    <div className="min-h-screen bg-black flex flex-col justify-between overflow-x-hidden relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('/soph.png')"
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        <StickyBanner className="bg-gradient-to-b from-blue-500 to-blue-600">
          <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
            Subscribe to our monthly newsletter for insights on impact measurement and sustainability.{" "}
            <a 
              href="https://21givenchy.substack.com/p/the-rise-of-impact-investment-what" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition duration-200 hover:underline font-semibold"
            >
              Read our July collaboration with defemagency.com
            </a>
          </p>
        </StickyBanner>
        
        <main className="flex-grow flex items-center py-8 sm:py-12">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 md:gap-4">
            {/* Left section - Podcast video embed */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <VideoPlayer 
                youtubeId={mainEpisode.youtubeId}
                startTime={mainEpisode.startTime}
                title={mainEpisode.title}
              />
            </div>
            
            {/* Right section - Typography */}
            <div className="w-full md:w-1/2 mt-8 md:mt-0 flex flex-col items-start justify-center">
              <SpacedTypography />
              
              {/* Episode selector - Small dots */}
              <EpisodeSelector 
                currentEpisode={currentEpisode}
                onChange={handleEpisodeChange}
              />
            </div>
          </div>
        </main>

        {/* Navigation - Similar to other pages */}
        {/* Navigation is now handled globally in ClientWrapper */}
      </div>
    </div>
  );
}
