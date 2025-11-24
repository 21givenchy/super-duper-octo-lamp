"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Building2, Globe, FolderKanban, Podcast, Play } from "lucide-react";
import { useState, useEffect } from "react";

// Animated counter component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// Impact metric card component
function ImpactMetricCard({ 
  icon: Icon, 
  value, 
  suffix = "", 
  label, 
  color 
}: { 
  icon: React.ElementType; 
  value: number; 
  suffix?: string; 
  label: string; 
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
    >
      <div className={`inline-flex p-4 rounded-xl ${color} mb-4`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="mb-2">
        <AnimatedCounter value={value} suffix={suffix} />
      </div>
      <p className="text-gray-300 text-lg">{label}</p>
    </motion.div>
  );
}

// Testimonial component
function TestimonialCard({ 
  quote, 
  author, 
  role, 
  company 
}: { 
  quote: string; 
  author: string; 
  role: string; 
  company: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
    >
      <p className="text-gray-300 text-lg mb-6 italic">&quot;{quote}&quot;</p>
      <div>
        <p className="text-white font-semibold text-xl">{author}</p>
        <p className="text-gray-400">{role} at {company}</p>
      </div>
    </motion.div>
  );
}

// Timeline component
function ImpactTimeline() {
  const milestones = [
    { date: "Q1 2024", event: "Platform Launch", metric: "First 50 founders onboarded" },
    { date: "Q2 2024", event: "Community Growth", metric: "Reached 200+ active founders" },
    { date: "Q3 2024", event: "Global Expansion", metric: "3+ countries with active users" },
    { date: "Q4 2024", event: "Enterprise Adoption", metric: "10+ enterprises using Greta" },
    { date: "2025", event: "Impact Scale", metric: "500+ founders, 8,740+ YouTube views" },
  ];

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-500 via-blue-500 to-purple-500"></div>
      
      {/* Milestones */}
      <div className="space-y-12">
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-20"
          >
            {/* Timeline dot */}
            <div className="absolute left-6 w-5 h-5 bg-teal-500 rounded-full border-4 border-gray-900"></div>
            
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <p className="text-teal-400 font-semibold text-sm mb-1">{milestone.date}</p>
              <h3 className="text-white text-xl font-bold mb-2">{milestone.event}</h3>
              <p className="text-gray-300">{milestone.metric}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ImpactPage() {
  const metrics = [
    { icon: Users, value: 500, suffix: "+", label: "Community Members", color: "bg-blue-600" },
    { icon: Building2, value: 10, suffix: "+", label: "Enterprises Onboarded", color: "bg-purple-600" },
    { icon: Globe, value: 3, suffix: "+", label: "Countries Reached", color: "bg-green-600" },
    { icon: FolderKanban, value: 3, suffix: "", label: "Projects Tracked", color: "bg-orange-600" },
    { icon: Podcast, value: 12, suffix: "+", label: "Podcasts Published", color: "bg-pink-600" },
    { icon: Play, value: 8740, suffix: "+", label: "YouTube Views", color: "bg-red-600" },
  ];

  const testimonials = [
    {
      quote: "Greta has transformed how we track our mission progress. We can finally see which activities truly matter.",
      author: "Sarah Chen",
      role: "Founder",
      company: "EcoTech Solutions"
    },
    {
      quote: "As a social enterprise, measuring impact was always challenging. frontforumfocus made it simple and actionable.",
      author: "Michael Rodriguez",
      role: "CEO",
      company: "Community First Initiative"
    },
    {
      quote: "The clarity we gained from tracking our activities has helped us focus on what actually advances our mission.",
      author: "Amara Okafor",
      role: "Executive Director",
      company: "Youth Empowerment Network"
    }
  ];

  return (
    <div className="min-h-screen bg-[#111] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/soph.png')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Impact Dashboard
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              Tracking our own mission to help founders worldwide align their daily work with meaningful impact
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://greta-v2.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Try Greta Now
            </a>
            <a
              href="#join"
              className="px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Join Our Community
            </a>
          </motion.div>
        </div>
      </section>

      {/* Live Metrics Dashboard */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Live Impact Metrics
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Real-time data showing how frontforumfocus is helping mission-driven founders worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <ImpactMetricCard
                key={index}
                icon={metric.icon}
                value={metric.value}
                suffix={metric.suffix}
                label={metric.label}
                color={metric.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Alignment Visualization */}
      <section className="py-24 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Mission Alignment in Action
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We practice what we preach—every activity at frontforumfocus is tracked and aligned with our core mission: helping founders build with purpose
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">Founder Onboarding</h3>
                    <span className="text-2xl font-bold text-green-400">95%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "95%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full"
                    ></motion.div>
                  </div>
                  <p className="text-gray-400 mt-2 text-sm">Direct mission impact—helping founders start their journey</p>
                </div>

                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">Content Creation</h3>
                    <span className="text-2xl font-bold text-blue-400">88%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "88%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                    ></motion.div>
                  </div>
                  <p className="text-gray-400 mt-2 text-sm">Educational content that empowers founders</p>
                </div>

                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">Community Building</h3>
                    <span className="text-2xl font-bold text-purple-400">92%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "92%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                    ></motion.div>
                  </div>
                  <p className="text-gray-400 mt-2 text-sm">Fostering connections among mission-driven founders</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative">
                <Image
                  src="/mm.png"
                  alt="Greta app showing mission alignment"
                  width={400}
                  height={800}
                  className="mx-auto rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-teal-500 text-white px-6 py-3 rounded-full font-bold text-xl shadow-xl">
                  95% Aligned
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Growth Timeline */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Growth Over Time
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our journey from idea to impact-driven platform
            </p>
          </motion.div>

          <ImpactTimeline />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Founder Stories
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Hear from mission-driven founders who are using Greta to build with purpose
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                company={testimonial.company}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="join" className="py-24 px-6 bg-gradient-to-br from-teal-900 via-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Track Your Impact?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Join 500+ mission-driven founders who are building with purpose and measuring what matters
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="https://greta-v2.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-white/30 transition-all duration-300 transform hover:scale-105"
              >
                Start Tracking Today
              </a>
              <a
                href="https://discord.gg/qpV9Gg3S54"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                Join Discord Community
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Inspire Other Enterprises</h3>
              <p className="text-gray-200 mb-4">
                Be part of a movement where every enterprise tracks and shares their impact. Together, we&apos;re building a more transparent, mission-driven future.
              </p>
              <p className="text-teal-300 font-semibold">
                Powered by frontforumfocus—building tools that help founders build with purpose
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
