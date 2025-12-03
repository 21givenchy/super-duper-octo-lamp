"use client";

import { podcastEpisodes } from "@/lib/podcastEpisodes";
import { useState } from "react";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, TrendingUp, FileText } from "lucide-react";

function HeroWaitlistInput() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email }),
      });

      if (res.ok) {
        setMessage("Thanks — we've added you to the waitlist.");
        setEmail("");
      } else {
        const data = await res.json();
        setMessage(data?.error || "Failed to submit. Please try again.");
      }
    } catch {
      setMessage("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <label htmlFor="hero-email" className="sr-only">Email</label>
      <input
        id="hero-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="px-6 py-3 rounded-md bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 min-w-[250px]"
      />
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={submitting}
        className="px-8 py-3 bg-white text-gray-900 rounded-md font-semibold hover:bg-gray-100 transition-colors"
      >
        {submitting ? "Sending..." : "Join Us Today"}
      </button>
      {message && <div className="text-sm text-teal-400 mt-2">{message}</div>}
    </>
  );
}

function HowItWorksInteractive() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 0,
      title: "Track daily activities",
      icon: CheckCircle2,
      activeClasses: "border-purple-600 bg-purple-50",
      iconActiveClasses: "bg-purple-600 text-white",
      textActiveClasses: "text-purple-700",
      examples: [
        {
          activity: "Supplier Call",
          score: 87,
          alignment: "High impact—keep focusing here!",
          scoreColor: "text-green-600"
        },
        {
          activity: "Fundraising Email",
          score: 65,
          alignment: "Shows value but review your approach.",
          scoreColor: "text-yellow-600"
        },
        {
          activity: "Social Media Update",
          score: 23,
          alignment: "Consider delegating this.",
          scoreColor: "text-red-600"
        }
      ]
    },
    {
      id: 1,
      title: "Get real time insights",
      icon: TrendingUp,
      activeClasses: "border-blue-600 bg-blue-50",
      iconActiveClasses: "bg-blue-600 text-white",
      textActiveClasses: "text-blue-700",
      examples: [
        {
          activity: "Weekly Review",
          score: 78,
          alignment: "Your mission alignment is improving!",
          scoreColor: "text-green-600"
        }
      ]
    },
    {
      id: 2,
      title: "Report and communicate progress",
      icon: FileText,
      activeClasses: "border-red-600 bg-red-50",
      iconActiveClasses: "bg-red-600 text-white",
      textActiveClasses: "text-red-700",
      examples: [
        {
          activity: "Monthly Report",
          score: 85,
          alignment: "Clear progress demonstrated to stakeholders.",
          scoreColor: "text-green-600"
        }
      ]
    }
  ];

  const currentStep = steps[activeStep];
  const Icon = currentStep.icon;

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Left: Steps */}
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`w-full text-left p-6 rounded-lg border-2 transition-all duration-300 ${
                activeStep === idx
                  ? step.activeClasses
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${
                  activeStep === idx
                    ? step.iconActiveClasses
                    : "bg-gray-100 text-gray-600"
                }`}>
                  <StepIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className={`text-xl font-semibold ${
                    activeStep === idx
                      ? step.textActiveClasses
                      : "text-gray-900"
                  }`}>
                    {step.title}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right: Example */}
      <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-full bg-purple-600 text-white">
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">See Greta in action</h3>
        </div>

        <div className="space-y-4">
          {currentStep.examples.map((example, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div className="font-semibold text-gray-900 text-lg">{example.activity}:</div>
                <div className={`text-2xl font-bold ${example.scoreColor}`}>
                  {example.score}%
                </div>
              </div>
              <p className="text-gray-700">
                {example.score}% mission-aligned. {example.alignment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="px-4 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 w-full focus:outline-none focus:border-white/40"
        disabled={status === "submitting"}
      />
      {status === "success" && (
        <p className="text-xs text-green-400">Thanks for signing up!</p>
      )}
      {status === "error" && (
        <p className="text-xs text-red-400">Please enter a valid email</p>
      )}
    </form>
  );
}

export default function Page() {
  return (
    <div className="w-full min-h-screen relative flex flex-col" data-oid="in61k2.">
      {/* Hero Section with Background */}
      <div
        className="relative w-full min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('/sea.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        data-oid="x4qlm95"
      >
        <div className="absolute inset-0 bg-black/20" data-oid="g3j60uh" />

        <div className="relative z-10 text-center px-4 flex flex-col items-center gap-8" data-oid="vgzgwxf">
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-light text-white/90 tracking-wider" data-oid="r3te6-_">
            share your impact online.
          </h1>

          <p className="text-xl md:text-2xl text-white font-medium max-w-4xl" data-oid="9s6bq.l">
            frontforumfocus shows founders and teams—step by step—which activities truly advance your mission, so you grow with purpose and clarity.
          </p>

          <div className="flex items-center gap-3 mt-4" data-oid=":6a0ymm">
            <HeroWaitlistInput />
          </div>
        </div>
      </div>

      {/* Logo Carousel for Social Proof */}
      <LogoCarousel />

      {/* Pain Agitation Section */}
      <section className="w-full bg-gray-900 py-24 px-8" data-oid="pain-section">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-12 text-center">
            Why founders struggle to build with clarity:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 text-lg text-gray-300">
            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-lg backdrop-blur-sm">
              <div className="text-red-400 mt-1">✗</div>
              <p>Most days are filled with busywork and notifications — not real progress.</p>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-lg backdrop-blur-sm">
              <div className="text-red-400 mt-1">✗</div>
              <p>It&apos;s impossible to prove your impact to investors, donors, or your own team.</p>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-lg backdrop-blur-sm">
              <div className="text-red-400 mt-1">✗</div>
              <p>You use 10+ tools daily, but none tie your work to your deeper mission.</p>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-lg backdrop-blur-sm">
              <div className="text-red-400 mt-1">✗</div>
              <p>Reporting takes hours and never captures what matters most.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="w-full bg-gradient-to-b from-gray-900 to-black py-32 px-8" data-oid="why-now">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl md:text-7xl lg:text-8xl font-light text-white/90 tracking-wider mb-8">
            AI
          </div>
          <p className="text-2xl md:text-3xl text-white/80 font-light leading-relaxed">
            and automation are changing how work is measured and rewarded.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-b from-black to-gray-900 py-24 px-8" data-oid="cta-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Join the Founders Circle
          </h2>
          <p className="text-3xl md:text-4xl text-teal-400 font-semibold mb-4">
            Get Greta for only $25/month
          </p>
          <p className="text-lg text-gray-400 mb-8">(billed yearly)</p>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Bring clarity to your impact—and your story.
          </p>
          
          <div className="flex items-center justify-center gap-3">
            <HeroWaitlistInput />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-gray-900 py-24 px-8" data-oid="testimonials">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-16 text-center">
            What Founders Say
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10">
              <p className="text-lg text-gray-300 mb-6 italic">
                &ldquo;Now I know if my daily grind actually grows my impact—it&apos;s become my north star.&rdquo;
              </p>
              <div className="text-white font-semibold">Edna</div>
              <div className="text-gray-400 text-sm">EdTech Founder</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10">
              <p className="text-lg text-gray-300 mb-6 italic">
                &ldquo;Donor reports went from 12 hours to 30 minutes. Our team finally shares the same definition of progress.&rdquo;
              </p>
              <div className="text-white font-semibold">Samuel</div>
              <div className="text-gray-400 text-sm">Health NGO Leader</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10">
              <p className="text-lg text-gray-300 mb-6 italic">
                &ldquo;Greta gave me confidence to fundraise and expand internationally.&rdquo;
              </p>
              <div className="text-white font-semibold">Joy</div>
              <div className="text-gray-400 text-sm">Youth Skills Innovator</div>
            </div>
          </div>
        </div>
      </section>

      {/* Community & Podcast Section */}
      <section className="w-full bg-white py-24 px-8" data-oid="omlvf1r">
        <div className="max-w-6xl mx-auto" data-oid="qfz6po2">
          <div className="text-center mb-16" data-oid="d-v5psh">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4" data-oid="k-9.:.r">
              Our Community
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto" data-oid="9yadk1o">
              Join our vibrant community of founders, builders, and creators
            </p>
          </div>

          <div className="mb-12" data-oid="1ul-w:2">
            <span className="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-wider inline-block" data-oid="-jdn-rj">
              PODCAST EPISODES
            </span>
          </div>

          <div className="relative min-h-[600px] flex items-center justify-center" data-oid="86had5r">
            {/* Top-left card */}
            <div className="absolute top-0 left-[5%] w-[380px] bg-white p-4 pb-16 shadow-2xl transform -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300 hover:z-10" style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }} data-oid="o1f6ck3">
              <div className="aspect-video bg-gray-200" data-oid="trlo36b">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${podcastEpisodes[0].youtubeId}?start=${podcastEpisodes[0].startTime}&autoplay=0&controls=1&modestbranding=1&rel=0`}
                  title={podcastEpisodes[0].title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  data-oid="8fpkidq"
                />
              </div>
              <p className="mt-4 text-center text-sm font-medium text-gray-700" data-oid="zo6xn39">
                {podcastEpisodes[0].title}
              </p>
            </div>

            {/* Top-right card */}
            <div className="absolute top-[20px] right-[8%] w-[380px] bg-white p-4 pb-16 shadow-2xl transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 hover:z-10" style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }} data-oid="-g-dka1">
              <div className="aspect-video bg-gray-200" data-oid="ht1k1zf">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${podcastEpisodes[1].youtubeId}?start=${podcastEpisodes[1].startTime}&autoplay=0&controls=1&modestbranding=1&rel=0`}
                  title={podcastEpisodes[1].title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  data-oid="da:g..q"
                />
              </div>
              <p className="mt-4 text-center text-sm font-medium text-gray-700" data-oid="hswdozv">
                {podcastEpisodes[1].title}
              </p>
            </div>

            {/* Bottom-center card */}
            <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 w-[420px] bg-white p-4 pb-16 shadow-2xl transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 hover:z-10" style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }} data-oid="4pyu.x-">
              <div className="aspect-video bg-gray-200" data-oid=".99jm2_">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${podcastEpisodes[2].youtubeId}?start=${podcastEpisodes[2].startTime}&autoplay=0&controls=1&modestbranding=1&rel=0`}
                  title={podcastEpisodes[2].title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  data-oid=".4vlgj9"
                />
              </div>
              <p className="mt-4 text-center text-sm font-medium text-gray-700" data-oid="qk12uf-">
                {podcastEpisodes[2].title}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="w-full bg-gray-50 py-24 px-8" data-oid="l_sl9:c">
        <div className="max-w-5xl mx-auto" data-oid="a3ac0:g">
          <div className="mb-8" data-oid="j6gv6n:">
            <span className="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-wider inline-block" data-oid="byg2671">
              WHAT WE DO
            </span>
          </div>

          <div className="mb-12" data-oid="4r58rh8">
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-gray-900 mb-6" data-oid="omj:h1v">
              A community of mission-driven founders helping each other turn daily work into measurable impact.
            </h2>

            <div className="space-y-4 text-lg text-gray-800 leading-relaxed" data-oid="txncf6m">
              <p>We&apos;ve built tools that show you which activities actually advance your mission</p>
              <p className="italic">—so you can focus your energy on what matters, celebrate real progress, and build the change you&apos;re working toward. Together</p>
            </div>
          </div>

          <div className="overflow-hidden" data-oid="kp0asku">
            <div className="text-lg md:text-xl text-gray-800 leading-relaxed" data-oid="n_1yt38">
              <p className="mb-4">From software development and research initiatives to creative works and community projects—we support founders tracking impact across diverse project types:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>Technology & Software:</strong> Track development milestones, user adoption, and technical impact metrics</li>
                <li><strong>Research & Academia:</strong> Measure publication impact, citation metrics, and knowledge dissemination</li>
                <li><strong>Creative Arts:</strong> Monitor exhibition reach, audience engagement, and cultural impact</li>
                <li><strong>Social Enterprises:</strong> Quantify beneficiaries reached, communities served, and sustainable development goals achieved</li>
                <li><strong>Environmental Initiatives:</strong> Track carbon reduction, conservation efforts, and ecosystem restoration</li>
              </ul>
              <p className="mt-4 italic">Whatever your mission, Greta helps you measure what matters and celebrate meaningful progress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section - Interactive */}
      <section className="w-full bg-white py-24 px-8" data-oid="how-it-works">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-12 text-center">
            How Greta works
          </h2>
          
          <HowItWorksInteractive />
        </div>
      </section>

      {/* About Us Section - Detailed */}
      <section className="w-full bg-white py-24 px-8" data-oid="about-us-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-12 text-center">
            About frontforumfocus
          </h2>
          
          <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
            <p className="text-xl font-semibold text-gray-900">
              We&apos;re building the future of mission-driven productivity—where every action counts toward meaningful impact.
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 my-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
                <p>
                  frontforumfocus exists to help mission-driven founders and teams align their daily work with their core purpose. We believe that meaningful change happens when people can see clearly how their efforts contribute to their larger mission. Too many founders struggle with distractions, misaligned activities, and the inability to measure what truly matters.
                </p>
                <p className="mt-4">
                  Our platform, Greta, transforms abstract goals into concrete, trackable activities. We help you understand which tasks move the needle and which ones drain your energy without advancing your mission. This clarity empowers you to focus on high-impact work and build the change you envision.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h3>
                <p>
                  We envision a world where every mission-driven organization can demonstrate clear, measurable impact. Where founders don&apos;t have to choose between growth and purpose. Where transparency in impact measurement becomes the standard, not the exception.
                </p>
                <p className="mt-4">
                  By 2030, we aim to be the leading platform for mission alignment and impact tracking, serving over 100,000 mission-driven founders across 50+ countries. We&apos;re not just building software—we&apos;re fostering a global community of purpose-driven leaders who support each other in creating meaningful change.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Purpose First</h4>
                  <p className="text-base">We prioritize mission alignment over vanity metrics. Every feature we build serves the goal of helping founders stay true to their core purpose.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Radical Transparency</h4>
                  <p className="text-base">We practice what we preach—tracking our own impact publicly and sharing our learnings openly with the community.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Community-Driven</h4>
                  <p className="text-base">We&apos;re bootstrapped and founder-led, building alongside our users and incorporating their feedback into every decision.</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why We Built This</h3>
              <p>
                As founders ourselves, we experienced firsthand the challenge of staying focused on what matters. We spent countless hours on tasks that felt productive but didn&apos;t advance our core mission. We saw brilliant founders burn out chasing metrics that looked good on paper but didn&apos;t reflect real impact.
              </p>
              <p className="mt-4">
                Traditional productivity tools focus on getting more done, but they don&apos;t help you prioritize what&apos;s truly important. Impact measurement tools exist for large NGOs and enterprises, but they&apos;re too complex and expensive for individual founders and small teams. We built frontforumfocus to bridge this gap—providing sophisticated impact tracking in a simple, accessible format.
              </p>
              <p className="mt-4">
                Today, we&apos;re proud to serve over 500 mission-driven founders across multiple countries, helping them track thousands of activities and align their work with meaningful impact. We&apos;re bootstrapped, profitable, and growing sustainably—proving that you can build a successful business while staying true to your mission.
              </p>
            </div>
            
            <div className="text-center mt-12">
              <a 
                href="https://greta-v2.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 bg-gray-900 text-white rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors"
              >
                Start Your Impact Journey with Greta
              </a>
              <p className="mt-4 text-sm text-gray-600">
                Join 500+ founders building with purpose. <a href="https://greta-v2.vercel.app" className="text-blue-600 hover:underline">Try Greta free for 14 days</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="w-full bg-gray-50 py-24 px-8" data-oid="case-studies-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-12 text-center">
            Real Founder Stories
          </h2>
          
          <div className="space-y-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    From Scattered to Focused: How Sarah Tripled Her Impact in 6 Months
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">Sarah Chen, Founder of EcoTech Solutions</p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Sarah was running a sustainable technology startup but felt overwhelmed by competing priorities. &quot;I was working 70-hour weeks but couldn&apos;t tell if I was making progress toward my core mission of reducing e-waste,&quot; she explains.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    After implementing Greta, Sarah discovered that 40% of her time was spent on activities with low mission alignment—primarily administrative tasks and meetings that could be delegated or eliminated. She restructured her schedule to focus on high-impact activities like product development and partnership building.
                  </p>
                  <p className="text-gray-700 leading-relaxed font-semibold">
                    Results: Sarah reduced her work hours by 20% while tripling the number of e-waste collection partnerships established. Her team now tracks their collective impact daily, maintaining 92% mission alignment.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Scaling Impact Without Losing Focus: A Social Enterprise Success Story
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">Michael Rodriguez, CEO of Community First Initiative</p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    As Community First Initiative grew from 5 to 25 team members, Michael struggled to ensure everyone remained aligned with the organization&apos;s mission of providing vocational training to underserved communities.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    &quot;Different teams were pursuing different goals, and we had no way to measure whether our activities were actually advancing our mission,&quot; Michael recalls. Greta provided a unified platform where every team member could track their activities and see their contribution to organizational impact.
                  </p>
                  <p className="text-gray-700 leading-relaxed font-semibold">
                    Results: Team-wide mission alignment increased from 67% to 89% within three months. The organization now serves 3x more beneficiaries while maintaining high program quality, thanks to data-driven resource allocation.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Demonstrating Impact to Secure Funding: An NGO&apos;s Journey
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">Amara Okafor, Executive Director of Youth Empowerment Network</p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Amara&apos;s NGO struggled to secure funding because they couldn&apos;t clearly demonstrate their impact to potential donors. Traditional impact reports were time-consuming to produce and didn&apos;t capture the day-to-day progress of their youth empowerment programs.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Using Greta&apos;s automated impact reporting, Amara&apos;s team generated real-time dashboards showing exactly how program activities translated into youth outcomes. &quot;For the first time, we could show donors precisely how their money would create impact,&quot; Amara says.
                  </p>
                  <p className="text-gray-700 leading-relaxed font-semibold">
                    Results: The organization secured $250,000 in new funding within four months and improved program effectiveness by 35% through data-driven program design.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-700 mb-4">Ready to write your own success story?</p>
            <a 
              href="/impact" 
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              See Our Impact Dashboard
            </a>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="w-full bg-white py-24 px-8" data-oid="resources-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-12 text-center">
            Resources for Mission-Driven Founders
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">📺 Video Content</h3>
              <p className="text-gray-700 mb-4">
                Our YouTube channel features tutorials, founder interviews, and deep dives into mission alignment strategies. Learn from other founders who are successfully building purpose-driven organizations.
              </p>
              <div className="space-y-3">
                <a 
                  href="https://youtube.com/@frontforumfocus" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline font-medium"
                >
                  → Watch Getting Started with Greta
                </a>
                <a 
                  href="https://youtube.com/@frontforumfocus" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline font-medium"
                >
                  → Founder Interviews Series
                </a>
                <a 
                  href="https://youtube.com/@frontforumfocus" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline font-medium"
                >
                  → Impact Measurement Best Practices
                </a>
                <p className="text-sm text-gray-600 mt-4">8,740+ views and growing daily</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">✍️ Written Content</h3>
              <p className="text-gray-700 mb-4">
                Our Substack newsletter delivers weekly insights on mission alignment, founder productivity, and impact measurement. Join thousands of founders who read our articles to stay focused on what matters.
              </p>
              <div className="space-y-3">
                <a 
                  href="https://21givenchy.substack.com/p/the-rise-of-impact-investment-what" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline font-medium"
                >
                  → The Rise of Impact Investment: What Founders Need to Know
                </a>
                <a 
                  href="https://21givenchy.substack.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline font-medium"
                >
                  → How to Measure Intangible Impact
                </a>
                <a 
                  href="https://21givenchy.substack.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline font-medium"
                >
                  → Building Sustainable Founder Habits
                </a>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">🎙️ Podcast Series</h3>
              <p className="text-gray-700 mb-4">
                Listen to conversations with mission-driven founders, impact investors, and social entrepreneurs. Learn how they balance growth with purpose and measure what matters.
              </p>
              <div className="space-y-3">
                <a 
                  href="/vibes" 
                  className="block text-blue-600 hover:underline font-medium"
                >
                  → Browse All Episodes
                </a>
                <p className="text-sm text-gray-600">12+ episodes published and counting</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">💬 Community</h3>
              <p className="text-gray-700 mb-4">
                Join our Discord community to connect with other mission-driven founders. Share challenges, celebrate wins, and get support from peers who understand the unique journey of building with purpose.
              </p>
              <div className="space-y-3">
                <a 
                  href="https://discord.gg/qpV9Gg3S54" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline font-medium"
                >
                  → Join Discord Community
                </a>
                <p className="text-sm text-gray-600">500+ active members from 50+ countries</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-10 text-center">
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">
              Try Greta—Powered by frontforumfocus
            </h3>
            <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
              Experience the power of AI-driven mission alignment. Track your activities, measure your impact, and build with purpose.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://greta-v2.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-10 py-4 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-colors"
              >
                Launch Greta App
              </a>
              <p className="text-sm text-gray-600">
                Free 14-day trial • No credit card required
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-6">
              Powered by frontforumfocus—helping founders worldwide build with purpose since 2024
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-gray-50 py-24 px-8" data-oid="faq-section">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg px-6 border border-gray-200">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-gray-700">
                Who is Greta for?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Mission-driven founders, teams, and impact-focused enterprises who want to align their daily activities with their core mission and demonstrate measurable progress.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg px-6 border border-gray-200">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-gray-700">
                Can I use Greta with my organization?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Yes! Teams and enterprises can sync work, aggregate reports, and customize dashboards to track organizational impact at scale.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg px-6 border border-gray-200">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-gray-700">
                How does Greta measure impact?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Greta analyzes your daily activities and scores them based on how much they advance your core mission—using real data, not self-reports. Our AI-powered system evaluates alignment with your stated goals and provides actionable insights.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg px-6 border border-gray-200">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-gray-700">
                Which tools does Greta integrate with?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                WhatsApp, Slack, Google Calendar, Notion, QuickBooks Africa, and other popular productivity tools. We&apos;re constantly adding new integrations based on user feedback.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg px-6 border border-gray-200">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-gray-700">
                Is there support for enterprise/NGO use?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Yes—we offer custom onboarding, advanced reporting features, and dedicated support for large organizations and NGOs with complex reporting needs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black py-16 px-8" data-oid="footer">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
              <p className="text-gray-400">hello@frontforumfocus.com</p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Newsletter</h3>
              <NewsletterSignup />
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Social</h3>
              <div className="space-y-2">
                <a href="https://linkedin.com/company/frontforumfocus" className="block text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                <a href="https://x.com/frontforumfocus" className="block text-gray-400 hover:text-white transition-colors">X (Twitter)</a>
                <a href="https://youtube.com/@frontforumfocus" className="block text-gray-400 hover:text-white transition-colors">YouTube</a>
                <a href="https://instagram.com/frontforumfocus" className="block text-gray-400 hover:text-white transition-colors">Instagram</a>
                <a href="https://21givenchy.substack.com/p/the-rise-of-impact-investment-what" className="block text-gray-400 hover:text-white transition-colors">Substack</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Legal</h3>
              <div className="space-y-2">
                <a href="/privacy" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="/terms" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} frontforumfocus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
