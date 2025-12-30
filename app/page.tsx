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
        className="px-6 py-4 border-2 border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent min-w-[250px] bg-white"
      />
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={submitting}
        className="px-10 py-4 bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
      >
        {submitting ? "Sending..." : "Join Waitlist"}
      </button>
      {message && <div className="text-sm text-gray-700 mt-2">{message}</div>}
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
    <div className="w-full min-h-screen relative flex flex-col bg-white" data-oid="in61k2.">
      {/* Hero Section - Modern Clean Design */}
      <div className="relative w-full min-h-screen flex items-center bg-white overflow-hidden pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-8 py-16 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Bold Typography */}
          <div className="relative z-10 space-y-6">
            <div className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-8">
              frontforumfocus PRESENTS
            </div>
            
            <div className="space-y-2">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-gray-900 leading-[0.9]" style={{ fontFamily: 'Georgia, serif' }}>
                Your work is<br />clearer when
              </h1>
              
              <div className="relative -ml-2 my-4">
                <h2 className="text-7xl md:text-8xl lg:text-9xl font-black text-gray-900 uppercase leading-none tracking-tighter">
                  GRETA
                </h2>
              </div>
              
              <div className="flex items-baseline gap-3 -ml-2">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-none">
                  shows you
                </h2>
              </div>
              
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-black italic text-gray-900 uppercase leading-none -ml-2 mt-2">
                OUTCOMES
              </h2>
            </div>

            <p className="text-xl md:text-2xl text-gray-700 font-light max-w-xl leading-relaxed pt-10">
              Turning your daily tasks into live insights
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-10">
              <a 
                href="/product/greta"
                className="px-10 py-4 bg-black text-white font-semibold text-lg hover:bg-gray-800 transition-colors"
              >
                Meet Greta
              </a>
              <a 
                href="/product/greta"
                className="px-10 py-4 border-2 border-black text-black font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right: Large Hero Image */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px] order-first lg:order-last">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden shadow-2xl">
              {/* Hero Image - Using soph.png as portrait */}
              <img 
                src="/soph.png" 
                alt="Greta Impact Dashboard" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating accent elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-black opacity-5 hidden lg:block"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-gray-900 opacity-5 hidden lg:block"></div>
          </div>
        </div>
      </div>

      {/* Logo Carousel for Social Proof */}
      <LogoCarousel />

      {/* Value Proposition Section - Clean Light Design */}
      <section className="w-full bg-gray-50 py-32 px-8" data-oid="pain-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-7xl md:text-8xl lg:text-9xl font-light italic text-gray-900 mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              greta
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-16 text-center leading-tight">
            Guiding you through the<br />
            <span className="font-bold">busy work</span>
          </h2>
          
          <p className="text-2xl md:text-3xl text-gray-700 text-center max-w-4xl mx-auto leading-relaxed font-light">
            and highlighting the few actions that truly move your mission
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full bg-white py-40 px-8" data-oid="why-now">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="text-8xl font-black text-gray-200">01</div>
              <h3 className="text-3xl font-bold text-gray-900 leading-tight">Track daily activities</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                Every action measured against your mission alignment
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="text-8xl font-black text-gray-200">02</div>
              <h3 className="text-3xl font-bold text-gray-900 leading-tight">Get real-time insights</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                Understand what moves the needle as you work
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="text-8xl font-black text-gray-200">03</div>
              <h3 className="text-3xl font-bold text-gray-900 leading-tight">Report progress</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                Communicate impact to stakeholders effortlessly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gray-50 py-32 px-8" data-oid="cta-section">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 leading-tight">
            Join the<br />
            <span className="font-bold">Founders Circle</span>
          </h2>
          <p className="text-4xl md:text-5xl text-gray-900 font-bold mb-4">
            $25/month
          </p>
          <p className="text-lg text-gray-600 mb-16">(billed yearly)</p>
          
          <div className="flex flex-col items-center gap-6 max-w-xl mx-auto">
            <form className="w-full flex flex-col sm:flex-row gap-4">
              <HeroWaitlistInput />
            </form>
            <p className="text-base text-gray-600">
              Bring clarity to your impact—and your story.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-white py-40 px-8" data-oid="testimonials">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-24 text-center">
            What Founders Say
          </h2>
          
          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <p className="text-2xl text-gray-800 leading-relaxed font-light">
                &ldquo;Now I know if my daily grind actually grows my impact—it&apos;s become my north star.&rdquo;
              </p>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-gray-900 font-bold text-lg">Edna</div>
                <div className="text-gray-600 text-sm">EdTech Founder</div>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-2xl text-gray-800 leading-relaxed font-light">
                &ldquo;Donor reports went from 12 hours to 30 minutes. Our team finally shares the same definition of progress.&rdquo;
              </p>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-gray-900 font-bold text-lg">Samuel</div>
                <div className="text-gray-600 text-sm">Health NGO Leader</div>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-2xl text-gray-800 leading-relaxed font-light">
                &ldquo;Greta gave me confidence to fundraise and expand internationally.&rdquo;
              </p>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-gray-900 font-bold text-lg">Joy</div>
                <div className="text-gray-600 text-sm">Youth Skills Innovator</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community & Podcast Section - Simplified */}
      <section className="w-full bg-white py-32 px-8" data-oid="omlvf1r">
        <div className="max-w-5xl mx-auto" data-oid="qfz6po2">
          <div className="text-center mb-16" data-oid="d-v5psh">
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6" data-oid="k-9.:.r">
              Community
            </h2>
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed" data-oid="9yadk1o">
              Join our vibrant community of founders, builders, and creators
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {podcastEpisodes.slice(0, 3).map((episode, idx) => (
              <div key={idx} className="bg-gray-50 border-2 border-gray-200 overflow-hidden">
                <div className="aspect-video bg-gray-200">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${episode.youtubeId}?start=${episode.startTime}&autoplay=0&controls=1&modestbranding=1&rel=0`}
                    title={episode.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <p className="text-base font-semibold text-gray-900">{episode.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="w-full bg-gray-50 py-40 px-8" data-oid="l_sl9:c">
        <div className="max-w-4xl mx-auto" data-oid="a3ac0:g">
          <div className="mb-16" data-oid="j6gv6n:">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500" data-oid="byg2671">
              WHAT WE DO
            </span>
          </div>

          <div className="space-y-12" data-oid="4r58rh8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-gray-900" data-oid="omj:h1v" style={{ fontFamily: 'Georgia, serif' }}>
              A community of mission-driven founders helping each other turn daily work into measurable impact.
            </h2>

            <div className="space-y-8 text-2xl text-gray-700 leading-relaxed font-light" data-oid="txncf6m">
              <p>We&apos;ve built tools that show you which activities actually advance your mission—so you can focus your energy on what matters, celebrate real progress, and build the change you&apos;re working toward.</p>
              <p className="font-semibold text-3xl">Together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section - Simplified */}
      <section className="w-full bg-white py-32 px-8" data-oid="how-it-works">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-20 text-center">
            How Greta works
          </h2>
          
          <div className="space-y-16">
            <div className="border-l-4 border-gray-900 pl-8">
              <div className="text-4xl font-black text-gray-900 mb-4">Track</div>
              <p className="text-xl text-gray-700 leading-relaxed">
                Log your daily activities and let Greta analyze how each task aligns with your mission. Get real-time scoring based on impact.
              </p>
            </div>
            
            <div className="border-l-4 border-gray-900 pl-8">
              <div className="text-4xl font-black text-gray-900 mb-4">Understand</div>
              <p className="text-xl text-gray-700 leading-relaxed">
                Receive actionable insights about which activities drive progress and which drain your focus without moving the needle.
              </p>
            </div>
            
            <div className="border-l-4 border-gray-900 pl-8">
              <div className="text-4xl font-black text-gray-900 mb-4">Communicate</div>
              <p className="text-xl text-gray-700 leading-relaxed">
                Generate clear reports that demonstrate your progress to stakeholders, from donors to team members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section - Simplified */}
      <section className="w-full bg-gray-50 py-32 px-8" data-oid="about-us-section">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-12 text-center">
            About frontforumfocus
          </h2>
          
          <div className="space-y-8 text-xl text-gray-700 leading-relaxed">
            <p className="text-2xl font-light text-gray-900">
              We&apos;re building the future of mission-driven productivity—where every action counts toward meaningful impact.
            </p>
            
            <p>
              frontforumfocus exists to help mission-driven founders and teams align their daily work with their core purpose. We believe that meaningful change happens when people can see clearly how their efforts contribute to their larger mission.
            </p>
            
            <p>
              Today, we&apos;re proud to serve over 500 mission-driven founders across multiple countries, helping them track thousands of activities and align their work with meaningful impact.
            </p>
            
            <div className="text-center mt-16">
              <a 
                href="https://greta-v2.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-12 py-5 bg-gray-900 text-white font-semibold text-lg hover:bg-gray-800 transition-colors"
              >
                Start Your Impact Journey
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section - Simplified */}
      <section className="w-full bg-white py-32 px-8" data-oid="resources-section">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-20 text-center">
            Resources
          </h2>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Community</h3>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Join our Discord community to connect with other mission-driven founders. Share challenges, celebrate wins, and get support.
              </p>
              <a 
                href="https://discord.gg/qpV9Gg3S54" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-lg font-semibold text-gray-900 border-b-2 border-gray-900 hover:text-gray-600 transition-colors"
              >
                Join Discord →
              </a>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Content</h3>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Our newsletter delivers weekly insights on mission alignment, founder productivity, and impact measurement.
              </p>
              <a 
                href="https://21givenchy.substack.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-lg font-semibold text-gray-900 border-b-2 border-gray-900 hover:text-gray-600 transition-colors"
              >
                Read on Substack →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-gray-50 py-32 px-8" data-oid="faq-section">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-16 text-center">
            FAQ
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white px-8 py-2 border border-gray-200">
              <AccordionTrigger className="text-xl font-semibold text-gray-900 hover:text-gray-700">
                Who is Greta for?
              </AccordionTrigger>
              <AccordionContent className="text-lg text-gray-700 leading-relaxed">
                Mission-driven founders, teams, and impact-focused enterprises who want to align their daily activities with their core mission and demonstrate measurable progress.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white px-8 py-2 border border-gray-200">
              <AccordionTrigger className="text-xl font-semibold text-gray-900 hover:text-gray-700">
                How does Greta measure impact?
              </AccordionTrigger>
              <AccordionContent className="text-lg text-gray-700 leading-relaxed">
                Greta analyzes your daily activities and scores them based on how much they advance your core mission—using real data, not self-reports. Our AI-powered system evaluates alignment with your stated goals and provides actionable insights.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white px-8 py-2 border border-gray-200">
              <AccordionTrigger className="text-xl font-semibold text-gray-900 hover:text-gray-700">
                Which tools does Greta integrate with?
              </AccordionTrigger>
              <AccordionContent className="text-lg text-gray-700 leading-relaxed">
                WhatsApp, Slack, Google Calendar, Notion, QuickBooks Africa, and other popular productivity tools. We&apos;re constantly adding new integrations based on user feedback.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 py-16 px-8" data-oid="footer">
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
