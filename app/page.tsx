"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useTransition } from "react";
import { useActionState } from "react";
import { submitWaitlistForm } from "./waitlist/action";

export default function Page() {
  const [heroState, heroFormAction] = useActionState(submitWaitlistForm, { message: "" });
  const heroFormRef = useRef<HTMLFormElement>(null);
  const [isHeroPending, startHeroTransition] = useTransition();

  const onHeroSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startHeroTransition(() => {
      heroFormAction(new FormData(heroFormRef.current!));
      heroFormRef.current?.reset();
    });
  };

  return (
    <div className="w-full min-h-screen bg-black text-white">

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image - sea.jpg */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src="/sea.jpg"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Hero Text */}
        <div className="relative z-10 px-6 max-w-6xl mx-auto text-center flex flex-col items-center justify-center h-screen">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-extralight leading-tight mb-4 text-white drop-shadow-lg"
          >
            <span className="block text-[clamp(80px,12vw,153px)] tracking-tight hero-wordmark leading-none">frontforumfocus</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.9 }}
            className="mx-auto max-w-3xl text-3xl md:text-4xl text-white font-semibold mt-6"
          >
            We help founders build with clarity
          </motion.p>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            {/* Waitlist email input + CTA */}
            <form
              ref={heroFormRef}
              action={heroFormAction}
              onSubmit={onHeroSubmit}
              className="flex items-center gap-3"
            >
              <label htmlFor="email" className="sr-only">Email</label>
              <input id="email" name="Email" type="email" placeholder="support@frontforumfocus.com" className="rounded-full px-6 py-3 bg-white/60 backdrop-blur-sm placeholder-black/50 text-black outline-none w-64" />
              <Button type="submit" size="lg" className="rounded-full px-6 bg-black text-white" disabled={isHeroPending}>{isHeroPending ? "Sending..." : "Join us Today"}</Button>
            </form>
            {heroState.message && (
              <div className="mt-3 text-sm text-green-300">{heroState.message}</div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Problem & Vision Section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-3xl text-center py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Most platforms track your output—not your true impact.
          </h2>
          <p className="text-lg md:text-xl opacity-80 mb-8">
            In today&apos;s world, it&apos;s easy to get lost in busywork, fragmented tasks, and metrics that don&apos;t move the needle. FrontForumFocus is built for those who believe that every action, task, and goal should drive real progress towards purpose—individually and at scale.
          </p>
          <p className="text-base md:text-lg font-medium text-teal-300">
            We put purpose at the heart of productivity.
          </p>
        </div>
      </section>

      {/* Ecosystem: Greta + Impact Dashboard + Podcast */}
      <section className="min-h-screen flex items-center justify-center py-20 px-6 bg-gradient-to-b from-black via-neutral-900 to-black">
        <div className="max-w-6xl w-full">
          <h2 className="font-bold text-4xl text-center mb-6">Our Ecosystem</h2>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Greta Card */}
            <div className="flex-1 bg-white/5 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-2">Greta: Your Mission OS</h3>
              <p className="mb-3">
                Turn your daily grind into purpose-driven progress. Score your tasks for mission alignment, reflect with AI-powered insights, and stay truly on track—all in one app.
              </p>
              <a href="https://greta-v2.vercel.app/dashboard" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">See Greta in action →</a>
            </div>
            {/* Impact Dashboard Card */}
            <div className="flex-1 bg-white/5 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-2">Impact Dashboard (Enterprise)</h3>
              <p className="mb-3">
                Visualize and report your organization’s real-world impact. From ESG and SDGs to custom outcomes, track progress, spot opportunities, and share your story with the world.
              </p>
              <a href="https://impact-dash-ten.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">Explore the dashboard →</a>
            </div>
            {/* Podcast Card */}
            <div className="flex-1 bg-white/5 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-2">Podcast</h3>
              <p className="mb-3">
                Unfiltered conversations with founders and leaders who make purpose practical. Get inspired—and get moving.
              </p>
              <a href="#" className="text-cyan-300 underline">Listen now →</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* What We Do Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-6 bg-neutral-950">
        <div className="max-w-6xl w-full text-center">
          <h2 className="font-bold text-4xl mb-8">What We Do</h2>
          <div className="max-w-4xl mx-auto text-left space-y-6">
            <p className="text-lg leading-relaxed">
              A community of mission-driven founders helping each other turn daily work into measurable impact.
            </p>
            <p className="text-lg leading-relaxed">
              We&apos;ve built tools that show you which activities actually advance your mission—so you can focus your energy on what matters, celebrate real progress, and build the change you&apos;re working toward.
            </p>
            <p className="text-lg leading-relaxed">
              Together.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="min-h-screen flex items-center justify-center py-16 bg-black">
        <div className="max-w-4xl w-full text-center">
          <h2 className="font-bold text-3xl mb-4">Real Impact, Real Stories</h2>
          <div className="text-lg mb-8 opacity-80">
            <p>“Greta helped our team stay focused—impact is now a conversation, not just a spreadsheet.”</p>
            <p className="mt-4 italic text-cyan-300">— FFF Beta User</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white/5 rounded-xl p-6">+20 founders aligned daily</div>
            <div className="bg-white/5 rounded-xl p-6">Enterprise dashboards for 2+ pilot companies</div>
            <div className="bg-white/5 rounded-xl p-6">Podcast listeners in 12+ countries</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center py-16">
          <h2 className="text-4xl font-extrabold mb-4">Make purpose the north star for your team</h2>
          <p className="text-white/70 mb-6">Start a free trial and see how small changes in focus create outsized impact.</p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="https://greta-v2.vercel.app/" target="_blank" rel="noopener noreferrer">Try Greta</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8">
              <Link href="https://sourcia.ai/agent-george" target="_blank" rel="noopener noreferrer">Request Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-white/70">© {new Date().getFullYear()} Greta — Built for founders</div>
          <nav className="flex gap-4 text-sm">
            <Link href="/privacy" className="text-white/60 hover:underline">Privacy</Link>
            <Link href="/terms" className="text-white/60 hover:underline">Terms</Link>
            <Link href="/contact" className="text-white/60 hover:underline">Contact</Link>
          </nav>
        </div>
      </footer>

    </div>
  );
}
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useTransition } from "react";
import { useActionState } from "react";
import { submitWaitlistForm } from "./waitlist/action";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Page() {
  export default function Page() {
    const [heroState, heroFormAction] = useActionState(submitWaitlistForm, { message: "" });
    const heroFormRef = useRef<HTMLFormElement>(null);
    const [isHeroPending, startHeroTransition] = useTransition();

    const onHeroSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      startHeroTransition(() => {
        heroFormAction(new FormData(heroFormRef.current!));
        heroFormRef.current?.reset();
      });
    };

    return (
      <div className="w-full min-h-screen bg-black text-white">

        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image - sea.jpg */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src="/sea.jpg"
              alt="Hero background"
              fill
              className="object-cover"
              priority
            />
            {/* Remove overlay to show image clearly */}
          </motion.div>

          {/* Hero Text */}
          <div className="relative z-10 px-6 max-w-6xl mx-auto text-center flex flex-col items-center justify-center h-screen">
              <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="font-extralight leading-tight mb-4 text-white drop-shadow-lg"
            >
              <span className="block text-[clamp(80px,12vw,153px)] tracking-tight hero-wordmark leading-none">frontforumfocus</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.9 }}
              className="mx-auto max-w-3xl text-3xl md:text-4xl text-white font-semibold mt-6"
            >
              We help founders build with clarity
            </motion.p>

            {/* CTA Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.2 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              {/* Waitlist email input + CTA */}
              <form
                ref={heroFormRef}
                action={heroFormAction}
                onSubmit={onHeroSubmit}
                className="flex items-center gap-3"
              >
                <label htmlFor="email" className="sr-only">Email</label>
                <input id="email" name="Email" type="email" placeholder="support@frontforumfocus.com" className="rounded-full px-6 py-3 bg-white/60 backdrop-blur-sm placeholder-black/50 text-black outline-none w-64" />
                <Button type="submit" size="lg" className="rounded-full px-6 bg-black text-white" disabled={isHeroPending}>{isHeroPending ? "Sending..." : "Join us Today"}</Button>
              </form>
              {heroState.message && (
                <div className="mt-3 text-sm text-green-300">{heroState.message}</div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Problem & Vision Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-3xl text-center py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Most platforms track your output—not your true impact.
            </h2>
            <p className="text-lg md:text-xl opacity-80 mb-8">
              In today&apos;s world, it&apos;s easy to get lost in busywork, fragmented tasks, and metrics that don&apos;t move the needle. FrontForumFocus is built for those who believe that every action, task, and goal should drive real progress towards purpose—individually and at scale.
            </p>
            <p className="text-base md:text-lg font-medium text-teal-300">
              We put purpose at the heart of productivity.
            </p>
          </div>
        </section>
=======
    <div className="w-full min-h-screen bg-black text-white">

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background Image - Using MOSHED image */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute inset-0 overflow-hidden"
        >
          <Image
            src="/new.png"
            alt="Hero background"
            fill
            className="object-cover opacity-80"
            priority
          />
          {/* Dark overlay to improve text contrast */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
          
          {/* Glitch effect overlay elements */}
          <motion.div
            animate={{ 
              x: [0, 10, -5, 0],
              opacity: [0.3, 0.7, 0.3] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute top-20 left-20 w-[30px] h-[30px] bg-cyan-400 opacity-30"
          />
          <motion.div
            animate={{ 
              x: [0, -8, 12, 0],
              opacity: [0.2, 0.6, 0.2] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1 
            }}
            className="absolute top-40 right-32 w-[30px] h-[30px] bg-pink-400 opacity-30"
          />
          <motion.div
            animate={{ 
              x: [0, 15, -10, 0],
              opacity: [0.4, 0.8, 0.4] 
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2 
            }}
            className="absolute bottom-32 left-40 w-[30px] h-[30px] bg-purple-400 opacity-30"
          />
        </motion.div>

        {/* Hero Text */}
        <div className="relative z-10 px-8 max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-6xl md:text-7xl lg:text-8xl font-light leading-tight mb-4 text-white drop-shadow-lg"
          >
            
                Community + tools to connect purpose
            
                with outcomes
           
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.9 }}
            className="mx-auto max-w-2xl text-lg md:text-xl text-white/80 font-medium"
          >
            Where ambitious founders and teams align daily work to what matters—with community, breakthrough tools, and AI-powered insights.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/start">Try Greta</Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="rounded-full px-6">
              <Link href="/start?demo=1">Request Demo</Link>
            </Button>

            <Button asChild size="lg" variant="ghost" className="rounded-full px-6">
              <Link href="/waitlist">Join Newsletter</Link>
            </Button>
          </motion.div>

        </div>
      </section>

      {/* Credibility Section */}
      <section id="proof" className="py-24 px-20 bg-background-alt">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="heading-2 text-center mb-16">Proof it works</h2>
          <div className="grid grid-cols-12 gap-6 mb-12">
            {/* Testimonial */}
            <div className="col-span-6">
              <Card className="border-border-color shadow-sm h-full">
                <CardContent className="pt-6">
                  <p className="body-large text-text-high mb-6">
                    &quot;We cut ESG reporting time by 50% and shipped 9/12 weekly priorities.&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-impact-green flex items-center justify-center text-white font-semibold">
                      CT
                    </div>
                    <div>
                      <p className="body-medium font-semibold text-text-high">CleanTech Founder</p>
                      <p className="caption-text text-text-low">Nairobi</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-warning-color text-warning-color" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats */}
            <div className="col-span-6 grid grid-cols-3 gap-4">
              <Card className="border-border-color shadow-sm text-center">
                <CardContent className="pt-6">
                  <div className="heading-1 text-impact-green mb-2">14</div>
                  <p className="caption-text text-text-low">days to first Impact Snapshot</p>
                </CardContent>
              </Card>
              <Card className="border-border-color shadow-sm text-center">
                <CardContent className="pt-6">
                  <div className="heading-1 text-focus-purple mb-2">80-90%</div>
                  <p className="caption-text text-text-low">weekly &quot;Top 3&quot; completion</p>
                </CardContent>
              </Card>
              <Card className="border-border-color shadow-sm text-center">
                <CardContent className="pt-6">
                  <div className="heading-1 text-impact-green mb-2">9/10</div>
                  <p className="caption-text text-text-low">cohort satisfaction</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Bar */}
          <div className="flex items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-impact-green hover:bg-impact-green/90 text-white rounded-xl button-text">
              <Link href="/start">Apply for the next Focus Cohort</Link>
            </Button>
            <Link href="https://sourcia.ai/agent-george" target="_blank" rel="noopener noreferrer" className="body-medium text-focus-purple hover:underline">
              Book a 15‑min intro
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section id="product" className="py-24 px-20">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="heading-2 text-center mb-16">What you get</h2>
          
          {/* Feature Block A */}
          <div className="grid grid-cols-12 gap-12 mb-16 items-center">
            <div className="col-span-5">
              <div className="aspect-square bg-gradient-to-br from-impact-green/20 to-focus-purple/20 rounded-xl flex items-center justify-center border border-border-color">
                <Target className="w-24 h-24 text-impact-green" />
              </div>
            </div>
            <div className="col-span-7">
              <h3 className="heading-3 mb-4">Mission Map</h3>
              <p className="body-medium text-text-medium">
                Clear line of sight from vision to weekly actions.
              </p>
            </div>
          </div>

          {/* Feature Block B */}
          <div className="grid grid-cols-12 gap-12 mb-16 items-center">
            <div className="col-span-7">
              <h3 className="heading-3 mb-4">Impact Snapshot</h3>
              <p className="body-medium text-text-medium">
                Auto‑generated one‑pager for investors, partners, and grants.
              </p>
            </div>
            <div className="col-span-5">
              <div className="aspect-square bg-gradient-to-br from-focus-purple/20 to-impact-green/20 rounded-xl flex items-center justify-center border border-border-color">
                <BarChart3 className="w-24 h-24 text-focus-purple" />
              </div>
            </div>
          </div>

          {/* Feature Block C */}
          <div className="grid grid-cols-12 gap-12 mb-16 items-center">
            <div className="col-span-5">
              <div className="aspect-square bg-gradient-to-br from-impact-green/20 to-focus-purple/20 rounded-xl flex items-center justify-center border border-border-color">
                <Users className="w-24 h-24 text-impact-green" />
              </div>
            </div>
            <div className="col-span-7">
              <h3 className="heading-3 mb-4">Focus Cohorts</h3>
              <p className="body-medium text-text-medium">
                Weekly sessions, peer check‑ins, and mentor office hours.
              </p>
            </div>
          </div>

          {/* Feature Block D */}
          <div className="grid grid-cols-12 gap-12 items-center">
            <div className="col-span-7">
              <h3 className="heading-3 mb-4">Public Profiles (opt‑in)</h3>
              <p className="body-medium text-text-medium">
                Show wins and impact to attract partners and talent.
              </p>
            </div>
            <div className="col-span-5">
              <div className="aspect-square bg-gradient-to-br from-focus-purple/20 to-impact-green/20 rounded-xl flex items-center justify-center border border-border-color">
                <Globe className="w-24 h-24 text-focus-purple" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Who Section */}
      <section id="cohorts" className="py-24 px-20 bg-background-alt">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="heading-2 text-center mb-16">Built for mission‑driven teams</h2>
          <div className="grid grid-cols-3 gap-6">
            <Card className="border-border-color shadow-sm">
              <CardHeader>
                <CardTitle className="heading-3">Founders & small teams (2-20)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="body-medium text-text-medium">
                  <strong>Outcome:</strong> Prioritize what moves the mission. Share progress with investors and accelerators.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border-color shadow-sm">
              <CardHeader>
                <CardTitle className="heading-3">Sustainability/ESG leads (SMEs 50-500)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="body-medium text-text-medium">
                  <strong>Outcome:</strong> Centralize simple metrics and reduce reporting time without enterprise overhead.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border-color shadow-sm">
              <CardHeader>
                <CardTitle className="heading-3">Hubs & programs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="body-medium text-text-medium">
                  <strong>Outcome:</strong> Run &quot;Cohort‑in‑a‑Box&quot; to help startups ship measurable outcomes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section id="pricing" className="py-24 px-20">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="heading-2 text-center mb-16">Join the next 4‑week Focus Cohort</h2>
          <div className="grid grid-cols-12 gap-12">
            {/* Left - Checklist */}
            <div className="col-span-6 space-y-4">
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-impact-green flex-shrink-0 mt-1" />
                <p className="body-medium text-text-high">Weekly live sessions + templates + office hours</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-impact-green flex-shrink-0 mt-1" />
                <p className="body-medium text-text-high">Your first Impact Snapshot in 14 days</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-impact-green flex-shrink-0 mt-1" />
                <p className="body-medium text-text-high">A public profile to showcase wins (optional)</p>
              </div>
            </div>

            {/* Right - Pricing Card */}
            <div className="col-span-6">
              <Card className="border-impact-green shadow-lg">
                <CardHeader>
                  <CardTitle className="heading-3">Early member pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border-color">
                    <span className="body-medium font-semibold">Starter</span>
                    <span className="body-medium text-impact-green">USD 25/user/month</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border-color">
                    <span className="body-medium font-semibold">Team</span>
                    <span className="body-medium text-impact-green">USD 99/user/month</span>
                  </div>
                  <div className="bg-background-alt p-4 rounded-lg">
                    <p className="caption-text text-text-medium">
                      <strong>Guarantee:</strong> If you don&apos;t publish an Impact Snapshot by week 2, join the next cohort free.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="apply" className="py-24 px-20 bg-background-alt">
        <div className="max-w-[640px] mx-auto">
          <h2 className="heading-2 text-center mb-4">Apply for the next Focus Cohort (25 spots)</h2>
          <p className="body-medium text-text-low text-center mb-12">We&apos;ll review applications within 48 hours. Enter your email to get started.</p>
          
          <Card className="border-border-color shadow-lg">
            <CardContent className="pt-6">
              <WaitlistForm 
                buttonText="Apply now"
                placeholder="you@example.com"
                successMessage="Application received! We'll review it within 48 hours and send next steps to your email."
                className="space-y-2"
                inputClassName="bg-white border-border-color text-text-high placeholder-text-low h-12 rounded-xl"
                buttonClassName="bg-impact-green hover:bg-impact-green/90 text-white h-12 rounded-xl button-text px-8"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-20">
        <div className="max-w-[800px] mx-auto">
          <h2 className="heading-2 text-center mb-16">Frequently asked</h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-border-color rounded-xl px-6">
              <AccordionTrigger className="heading-3 text-left hover:no-underline">
                Do I need to migrate from Notion/Trello?
              </AccordionTrigger>
              <AccordionContent className="body-medium text-text-medium">
                No. Keep your tools. Use Frontforumfocus to set priorities, track impact, and create snapshots.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-border-color rounded-xl px-6">
              <AccordionTrigger className="heading-3 text-left hover:no-underline">
                Is this only for &quot;ESG teams&quot;?
              </AccordionTrigger>
              <AccordionContent className="body-medium text-text-medium">
                No. It&apos;s for mission‑driven founders and teams who want momentum and measurable outcomes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-border-color rounded-xl px-6">
              <AccordionTrigger className="heading-3 text-left hover:no-underline">
                How much time weekly?
              </AccordionTrigger>
              <AccordionContent className="body-medium text-text-medium">
                90 mins total: 30 mins plan; 60 mins live/check‑ins.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-border-color rounded-xl px-6">
              <AccordionTrigger className="heading-3 text-left hover:no-underline">
                What if I can&apos;t share data publicly?
              </AccordionTrigger>
              <AccordionContent className="body-medium text-text-medium">
                Metrics are private by default. Public profiles are opt‑in.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-20 bg-gradient-to-br from-impact-green/10 to-focus-purple/10">
        <div className="max-w-[800px] mx-auto text-center">
          <h3 className="heading-2 mb-6">Ready to go from scattered to mission‑aligned?</h3>
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button asChild size="lg" className="bg-impact-green hover:bg-impact-green/90 text-white rounded-xl button-text">
              <Link href="/start">Apply for the next Focus Cohort</Link>
            </Button>
            <Link href="https://sourcia.ai/agent-george" target="_blank" rel="noopener noreferrer" className="body-medium text-focus-purple hover:underline">
              Book a 15‑min intro
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-20 bg-text-high text-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="text-2xl font-bold text-impact-green">FrontForumFocus</div>
            <nav className="flex gap-6">
              <Link href="/privacy" className="body-medium text-text-low hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="body-medium text-text-low hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="body-medium text-text-low hover:text-white transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          <Separator className="bg-white/10 mb-8" />
          <div className="text-center caption-text text-text-low">
            © {new Date().getFullYear()} FrontForumFocus — Built for founders
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border-color p-4 shadow-lg z-40">
        <div className="flex items-center gap-3">
          <Button asChild className="flex-1 bg-impact-green hover:bg-impact-green/90 text-white rounded-xl">
            <Link href="/start">Apply</Link>
          </Button>
          <Link href="https://sourcia.ai/agent-george" target="_blank" rel="noopener noreferrer" className="caption-text text-focus-purple hover:underline whitespace-nowrap">
            Intro call
          </Link>
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background Image - Using MOSHED image */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute inset-0 overflow-hidden"
        >
          <Image
            src="/new.png"
            alt="Abstract hero background"
            fill
            className="object-cover opacity-80"
            priority
          />
          
          {/* Glitch effect overlay elements */}
          <motion.div
            animate={{ 
              x: [0, 10, -5, 0],
              opacity: [0.3, 0.7, 0.3] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute top-20 left-20 w-[30px] h-[30px] bg-cyan-400 opacity-30"
          />
          <motion.div
            animate={{ 
              x: [0, -8, 12, 0],
              opacity: [0.2, 0.6, 0.2] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1 
            }}
            className="absolute top-40 right-32 w-[30px] h-[30px] bg-pink-400 opacity-30"
          />
          <motion.div
            animate={{ 
              x: [0, 15, -10, 0],
              opacity: [0.4, 0.8, 0.4] 
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2 
            }}
            className="absolute bottom-32 left-40 w-[30px] h-[30px] bg-purple-400 opacity-30"
          />
        </motion.div>

        {/* Hero Text */}
        <div className="relative z-10 px-8 max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-6xl md:text-7xl lg:text-8xl font-light leading-tight mb-4"
          >
            
                Community + tools to connect purpose
            
                with outcomes
           
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.9 }}
            className="mx-auto max-w-2xl text-lg md:text-xl text-white/70 font-medium"
          >
            Where ambitious founders and teams align daily work to what matters—with community, breakthrough tools, and AI-powered insights.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/start">Try Greta</Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="rounded-full px-6">
              <Link href="/start?demo=1">Request Demo</Link>
            </Button>

            <Button asChild size="lg" variant="ghost" className="rounded-full px-6">
              <Link href="/waitlist">Join Newsletter</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Problem & Vision Section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-3xl text-center py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Most platforms track your output—not your true impact.
          </h2>
          <p className="text-lg md:text-xl opacity-80 mb-8">
            In today&apos;s world, it&apos;s easy to get lost in busywork, fragmented tasks, and metrics that don&apos;t move the needle. FrontForumFocus is built for those who believe that every action, task, and goal should drive real progress towards purpose—individually and at scale.
          </p>
          <p className="text-base md:text-lg font-medium text-teal-300">
            We put purpose at the heart of productivity.
          </p>
        </div>
      </section>

      {/* Ecosystem: Greta + Impact Dashboard + Podcast */}
      <section className="min-h-screen flex items-center justify-center py-20 px-6 bg-gradient-to-b from-black via-neutral-900 to-black">
        <div className="max-w-6xl w-full">
          <h2 className="font-bold text-4xl text-center mb-6">Our Ecosystem</h2>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Greta Card */}
            <div className="flex-1 bg-white/5 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-2">Greta: Your Mission OS</h3>
              <p className="mb-3">
                Turn your daily grind into purpose-driven progress. Score your tasks for mission alignment, reflect with AI-powered insights, and stay truly on track—all in one app.
              </p>
              <a href="https://greta-v2.vercel.app/dashboard" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">See Greta in action →</a>
            </div>
            {/* Impact Dashboard Card */}
            <div className="flex-1 bg-white/5 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-2">Impact Dashboard (Enterprise)</h3>
              <p className="mb-3">
                Visualize and report your organization’s real-world impact. From ESG and SDGs to custom outcomes, track progress, spot opportunities, and share your story with the world.
              </p>
              <a href="https://impact-dash-ten.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">Explore the dashboard →</a>
            </div>
            {/* Podcast Card */}
            <div className="flex-1 bg-white/5 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-2">Podcast</h3>
              <p className="mb-3">
                Unfiltered conversations with founders and leaders who make purpose practical. Get inspired—and get moving.
              </p>
              <a href="#" className="text-cyan-300 underline">Listen now →</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-6 bg-neutral-950">
        <div className="max-w-6xl w-full text-center">
          <h2 className="font-bold text-4xl mb-8">How It Works</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="flex-1">
              <div className="text-5xl text-cyan-300 mb-2">1</div>
              <div>Join FrontForumFocus—free for founders and teams</div>
            </div>
            <div className="flex-1">
              <div className="text-5xl text-cyan-300 mb-2">2</div>
              <div>Activate Greta or request Enterprise Impact tools</div>
            </div>
            <div className="flex-1">
              <div className="text-5xl text-cyan-300 mb-2">3</div>
              <div>Get actionable AI nudges, track alignment, measure results</div>
            </div>
            <div className="flex-1">
              <div className="text-5xl text-cyan-300 mb-2">4</div>
              <div>Celebrate impact—share your story and learn from the community</div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="min-h-screen flex items-center justify-center py-16 bg-black">
        <div className="max-w-4xl w-full text-center">
          <h2 className="font-bold text-3xl mb-4">Real Impact, Real Stories</h2>
          <div className="text-lg mb-8 opacity-80">
            <p>“Greta helped our team stay focused—impact is now a conversation, not just a spreadsheet.”</p>
            <p className="mt-4 italic text-cyan-300">— FFF Beta User</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white/5 rounded-xl p-6">+20 founders aligned daily</div>
            <div className="bg-white/5 rounded-xl p-6">Enterprise dashboards for 2+ pilot companies</div>
            <div className="bg-white/5 rounded-xl p-6">Podcast listeners in 12+ countries</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center py-16">
          <h2 className="text-4xl font-extrabold mb-4">Make purpose the north star for your team</h2>
          <p className="text-white/70 mb-6">Start a free trial and see how small changes in focus create outsized impact.</p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="https://greta-v2.vercel.app/" target="_blank" rel="noopener noreferrer">Try Greta</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8">
              <Link href="https://sourcia.ai/agent-george" target="_blank" rel="noopener noreferrer">Request Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-white/70">© {new Date().getFullYear()} Greta — Built for founders</div>
          <nav className="flex gap-4 text-sm">
            <Link href="/privacy" className="text-white/60 hover:underline">Privacy</Link>
            <Link href="/terms" className="text-white/60 hover:underline">Terms</Link>
            <Link href="/contact" className="text-white/60 hover:underline">Contact</Link>
          </nav>
        </div>
      </footer>

    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> f1e1d81 (Refactor and enhance FrontForumFocus platform)
