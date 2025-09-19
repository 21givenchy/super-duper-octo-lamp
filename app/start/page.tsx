"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { memo } from "react";
import { WaitlistForm } from "@/components/ui/waitlist-form";
import { GoogleCalendarIntegration } from "@/components/ui/google-calendar-integration";

// Community card component
const CommunityCard = memo(({ onDiscordClick }: { onDiscordClick: () => void }) => (
  <div className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-lg p-4 shadow-xl">
    <h3 className="text-lg font-medium text-white mb-2">Join Our Community</h3>
    <p className="text-sm text-gray-300 mb-3">Connect with like-minded individuals making an impact</p>
    
    <div className="space-y-2 mb-3">
      <div className="flex items-center text-sm">
        <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center mr-2">
          <span className="text-teal-400 text-xs">✓</span>
        </div>
        <span className="text-gray-300">Weekly impact challenges</span>
      </div>
      <div className="flex items-center text-sm">
        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
          <span className="text-blue-400 text-xs">✧</span>
        </div>
        <span className="text-gray-300">Exclusive content & resources</span>
      </div>
      <div className="flex items-center text-sm">
        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">
          <span className="text-purple-400 text-xs">♻️</span>
        </div>
        <span className="text-gray-300">Sustainable living tips</span>
      </div>
    </div>

    <Button 
      className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 h-10 text-sm z-20"
      onClick={onDiscordClick}
    >
      Join Discord Community
    </Button>
  </div>
));

CommunityCard.displayName = 'CommunityCard';

export default function Page() {
  const handleDiscordClick = () => {
    window.open("https://discord.gg/qpV9Gg3S54", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-between overflow-hidden relative">
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
        {/* Main content */}
        <main className="flex-grow flex items-center justify-center py-6 sm:py-12">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-6 max-w-6xl mx-auto items-center">
              {/* Left Column - Personal Impact Tracking */}
              <motion.div 
                className="flex flex-col justify-center order-2 lg:order-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl sm:text-3xl font-medium text-white mb-3">By providing tools to identify, measure and monitor impact</h2>
                
                <ul className="space-y-3 text-sm sm:text-base text-gray-300 mb-6">
                  <li className="flex items-start">
                    <span className="text-teal-400 mr-2">→</span>
                    <span>Map daily activities to UN SDGs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-400 mr-2">→</span>
                    <span>Track carbon footprint through purchases</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-400 mr-2">→</span>
                    <span>See your impact grow over time</span>
                  </li>
                </ul>

                <div className="mb-6 relative">
                  <WaitlistForm />
                </div>
                
                <div className="mb-6">
                  <GoogleCalendarIntegration />
                </div>
                
                <CommunityCard onDiscordClick={handleDiscordClick} />
              </motion.div>

              {/* Right Column - Earth Image */}
              <motion.div 
                className="flex justify-center items-center order-1 lg:order-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
                  <Image
                    src="/earth.png"
                    alt="Earth"
                    fill
                    sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
                    priority
                    className="object-contain"
                    style={{
                      filter: "drop-shadow(0 0 20px rgba(67, 190, 255, 0.3))"
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        {/* Navigation */}
        {/* Navigation is now handled globally in ClientWrapper */}
      </div>
    </div>
  );
}
