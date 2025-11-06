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
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-light text-white/90 tracking-wider" data-oid="r3te6-_">
            frontforumfocus
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
            <div className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 whitespace-nowrap" data-oid="n_1yt38">
              software, paintings, drawings, research, software, paintings, drawings, research, software
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
                <a href="https://linkedin.com" className="block text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                <a href="https://twitter.com" className="block text-gray-400 hover:text-white transition-colors">X (Twitter)</a>
                <a href="https://youtube.com" className="block text-gray-400 hover:text-white transition-colors">YouTube</a>
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
