"use client"

import { WaitlistForm } from "@/components/ui/waitlist-form";
import Image from "next/image";
import { ComicText } from "@/components/magicui/comic-text";
import { motion } from "framer-motion";


/* eslint-disable @typescript-eslint/no-unused-vars */

// Trust indicators component
const TrustIndicators = () => (
  <div className="flex flex-wrap justify-center items-center gap-8 mb-16 opacity-60">
    <div className="text-sm text-gray-400">Trusted by 500+ founders</div>
    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
    <div className="text-sm text-gray-400">Bootstrapped</div>
    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
    <div className="text-sm text-gray-400">SOC 2 compliant</div>
  </div>
);

// Memoized component definitions
const HeaderSection = () => (
  <header className="text-center mb-16">
    <motion.h1 
      className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      FOCUS
    </motion.h1>
    <motion.p 
      className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4 }}
    >
      The platform where founders connect purpose with measurable impact
    </motion.p>
  </header>
);

// Feature highlight component
const FeatureCard = ({ icon, title, description, delay }: { icon: string, title: string, description: string, delay: number }) => (
  <motion.div 
    className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
  >
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-white/70 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

// Social proof testimonial
const TestimonialCard = () => (
  <motion.div 
    className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 backdrop-blur border border-teal-500/20 rounded-xl p-6 max-w-md mx-auto"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1.2, duration: 0.6 }}
  >
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
        SM
      </div>
      <div className="ml-3">
        <div className="text-white font-medium text-sm">Sarah Miller</div>
        <div className="text-white/60 text-xs">Founder, TechFlow</div>
      </div>
    </div>
    <p className="text-white/80 text-sm italic leading-relaxed">
      &quot;Finally, a tool that connects my daily chaos to my bigger vision. It&apos;s like having a personal coach for focus.&quot;
    </p>
  </motion.div>
);

export default function Page() {
  return (
    <div className="min-h-screen bg-[#111] flex flex-col relative">
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
      <div className="relative z-10 flex flex-col min-h-screen">
 
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 pb-24 sm:pb-32 pt-24">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-center text-white mb-4 sm:mb-6">
           Your focus is broken.
          </h1>
          
          <p className="text-base sm:text-lg md:text-2xl text-center text-white/80 max-w-2xl px-4 mb-8 sm:mb-12">
            Align your daily actions with your core mission.
          </p>
          <div className="w-full max-w-5xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6">
                <Image
                  src="/mm.png"
                  alt="Step 1 screenshot"
                  width={240}
                  height={480}
                  className="rounded-xl ring-1 ring-white/10 shadow-lg object-cover w-40 sm:w-48 md:w-60 h-auto"
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  priority={false}
                />
                <Image
                  src="/n.png"
                  alt="Step 2 screenshot"
                  width={240}
                  height={480}
                  className="rounded-xl ring-1 ring-white/10 shadow-lg object-cover w-40 sm:w-48 md:w-60 h-auto"
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  priority={false}
                />
                <Image
                  src="/nn.png"
                  alt="Step 3 screenshot"
                  width={240}
                  height={480}
                  className="rounded-xl ring-1 ring-white/10 shadow-lg object-cover w-40 sm:w-48 md:w-60 h-auto"
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  priority={false}
                />
              </div>
            </div>
          </div>
          {/* Narrative paragraphs (no nested <p>) */}
          <p className="mx-auto max-w-[70ch] text-left text-white/80 text-sm sm:text-base md:text-lg leading-7 md:leading-8 px-4">
            As a founder, you&apos;re constantly pulled in a dozen directions.
          </p>
          <p className="mx-auto max-w-[70ch] text-left text-white/80 text-sm sm:text-base md:text-lg leading-7 md:leading-8 px-4 mt-3">
            The tools we&apos;re forced to use—our calendars, notes, and chats—are just a list of tasks.
          </p>
          <p className="mx-auto max-w-[70ch] text-left text-white/80 text-sm sm:text-base md:text-lg leading-7 md:leading-8 px-4 mt-3">
            They show us what we&apos;re doing, but they have no idea what we&apos;re trying to achieve.
          </p>
          <p className="mx-auto max-w-[70ch] text-left text-white/80 text-sm sm:text-base md:text-lg leading-7 md:leading-8 px-4 mt-3">
            They aren&apos;t aligned with our ambition.
          </p>
          <p className="mx-auto max-w-[70ch] text-left text-white/80 text-sm sm:text-base md:text-lg leading-7 md:leading-8 px-4 mt-3">
            Greta is the first tool of its kind to connect every meeting, every task, and every idea back to your North Star.
          </p>
          <p className="mx-auto max-w-[70ch] text-left text-white/80 text-sm sm:text-base md:text-lg leading-7 md:leading-8 px-4 mt-3">
            It’s the clarity you need to confidently say &quot;no&quot; to distractions and &quot;yes&quot; to building your future.
          </p>

          {/* Try it section */}
          <div className="space-y-8 text-center mb-8">
            <ComicText fontSize={2}>Join the Founder&apos;s Circle!</ComicText>
          </div>
          
          {/* Pricing copy (no nested <p>) */}
          <div className="text-sm sm:text-base md:text-lg text-white/80 max-w-xl text-center mb-8 px-4 space-y-2">
            <p>It’s $15/month, billed annually ($180).</p>
            <p>This charter price is locked in for life for our first 20 members, and includes a 30-minute personal onboarding call with me to set up your North Star.</p>
            <p>The standard price will be $25/month.</p>
          </div>
          
          {/* Waitlist Form */}
          <div className="w-full max-w-sm sm:max-w-md">
            <WaitlistForm
              buttonText="Get Onboarded"
              placeholder="you@company.com"
              inputClassName="bg-gray-800/50 border-gray-700 text-white h-10 sm:h-12 flex-grow min-w-0 text-sm sm:text-base"
              buttonClassName="bg-teal-500 hover:bg-teal-600 text-white h-10 sm:h-12 px-4 sm:px-6 font-semibold whitespace-nowrap text-sm sm:text-base"
              successMessage="We'll contact you soon!"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
