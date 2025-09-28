"use client"

import { WaitlistForm } from "@/components/ui/waitlist-form";
import Image from "next/image";
import { motion } from "framer-motion";
import { ComicText } from "@/components/magicui/comic-text";

// Trust indicators component
const TrustIndicators = () => (
  <motion.div 
    className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 opacity-60 mb-12"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 0.6, y: 0 }}
    transition={{ delay: 0.8, duration: 0.6 }}
  >
    <div className="text-white/60 text-xs sm:text-sm font-medium">Trusted by 500+ founders</div>
    <div className="w-1 h-1 bg-white/30 rounded-full"></div>
    <div className="text-white/60 text-xs sm:text-sm font-medium">YC-backed companies</div>
    <div className="w-1 h-1 bg-white/30 rounded-full"></div>
    <div className="text-white/60 text-xs sm:text-sm font-medium">14-day free trial</div>
  </motion.div>
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
    <div className="min-h-screen bg-[#111] flex flex-col relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('/soph.png')"
        }}
      />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-teal-500/5 via-transparent to-blue-500/5"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 pb-16 pt-24">
          {/* Main headline with improved hierarchy */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-center text-white mb-6 leading-tight">
              Your focus is
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
                broken.
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-center text-white/80 max-w-3xl mx-auto px-4 leading-relaxed">
              Transform scattered efforts into laser-focused execution.
              <span className="block mt-2 text-white/60">Align every action with your core mission.</span>
            </p>
          </motion.div>

          {/* Trust indicators */}
          <TrustIndicators />

          {/* Primary CTA */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="w-full max-w-md mx-auto">
              <WaitlistForm
                buttonText="Start Your Focus Journey"
                placeholder="founder@yourcompany.com"
                inputClassName="bg-white/10 backdrop-blur border-white/20 text-white h-14 flex-grow min-w-0 text-base placeholder-white/50 focus:border-teal-400 transition-colors"
                buttonClassName="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white h-14 px-8 font-semibold whitespace-nowrap text-base shadow-lg hover:shadow-xl transition-all duration-300"
                successMessage="🚀 Welcome to the founder's circle!"
              />
              <p className="text-white/50 text-xs text-center mt-3">
                Join 20 charter members • $15/month locked forever
              </p>
            </div>
          </motion.div>

          {/* Product preview */}
          <motion.div 
            className="w-full max-w-6xl mx-auto mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6">
                  {['/mm.png', '/n.png', '/nn.png'].map((src, index) => (
                    <motion.div
                      key={src}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                      className="relative group"
                    >
                      <Image
                        src={src}
                        alt={`Product interface ${index + 1}`}
                        width={280}
                        height={560}
                        className="rounded-2xl shadow-2xl object-cover w-48 sm:w-56 lg:w-64 h-auto group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
                        priority={index === 1}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features section */}
          <motion.div 
            className="w-full max-w-5xl mx-auto mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-12">
              Everything you need to stay focused
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard 
                icon="🎯" 
                title="North Star Alignment" 
                description="Connect every task and meeting to your core mission. See the bigger picture in every decision."
                delay={1.1}
              />
              <FeatureCard 
                icon="📊" 
                title="Impact Tracking" 
                description="Measure what matters. Track your progress toward meaningful goals, not just busy work."
                delay={1.2}
              />
              <FeatureCard 
                icon="🚫" 
                title="Distraction Shield" 
                description="Say no with confidence. AI-powered insights help you identify and eliminate focus killers."
                delay={1.3}
              />
            </div>
          </motion.div>

          {/* Social proof testimonial */}
          <TestimonialCard />

          {/* Problem/Solution narrative */}
          <motion.div 
            className="max-w-4xl mx-auto text-center mt-16 mb-16 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
              The founder&apos;s dilemma
            </h2>
            <div className="space-y-6 text-white/80 text-base sm:text-lg leading-relaxed">
              <p>
                As a founder, you&apos;re constantly pulled in a dozen directions. 
                The tools we&apos;re forced to use—calendars, notes, and chats—are just lists of tasks.
              </p>
              <p>
                They show us what we&apos;re doing, but have no idea what we&apos;re trying to achieve. 
                <span className="text-white font-medium">They aren&apos;t aligned with our ambition.</span>
              </p>
              <p>
                <span className="text-teal-400 font-semibold">FxN (frontforumfocus)</span> is the first tool of its kind to connect 
                every meeting, task, and idea back to your North Star.
              </p>
              <p className="text-lg font-medium text-white">
                It&apos;s the clarity you need to confidently say &quot;no&quot; to distractions 
                and &quot;yes&quot; to building your future.
              </p>
            </div>
          </motion.div>

          {/* Final CTA section */}
          <motion.div 
            className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 backdrop-blur border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <ComicText fontSize={1.5}>Join the Founder&apos;s Circle!</ComicText>
            
            <div className="text-white/80 mt-6 mb-8 space-y-3">
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-teal-400">✓</span>
                <span>$15/month (normally $25) - locked forever</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-teal-400">✓</span>
                <span>30-minute personal onboarding call</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-teal-400">✓</span>
                <span>First 20 members only</span>
              </div>
            </div>
            
            <WaitlistForm
              buttonText="Secure Your Spot"
              placeholder="you@company.com"
              inputClassName="bg-white/10 border-white/20 text-white h-12 flex-grow min-w-0 text-sm focus:border-teal-400"
              buttonClassName="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white h-12 px-6 font-semibold whitespace-nowrap text-sm shadow-lg"
              successMessage="🎉 You're in! We'll be in touch soon."
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}