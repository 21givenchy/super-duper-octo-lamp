"use client";

import { podcastEpisodes } from "@/lib/podcastEpisodes";
import { useState } from "react";

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

          <p className="text-xl md:text-2xl text-white font-medium" data-oid="9s6bq.l">
            We help founders build with clarity
          </p>

          <div className="flex items-center gap-3 mt-4" data-oid=":6a0ymm">
            <HeroWaitlistInput />
          </div>
        </div>
      </div>

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

      {/* How it Works Section - includes typographic box and screenshots */}
      <section className="w-full bg-white py-24 px-8" data-oid="how-it-works">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Typographic Box */}
          <div className="">
            <div className="rounded-lg border border-black p-8 bg-gray-50 shadow-sm">
              <div className="space-y-6">
                <h3 className="text-4xl md:text-5xl font-serif text-gray-900">How Greta works</h3>

                <div className="text-3xl md:text-4xl font-serif text-gray-900 space-y-3">
                  <div className="text-purple-700 font-extrabold">Track daily activities</div>
                  <div className="text-blue-600 font-semibold">Get real time insights</div>
                  <div className="text-red-600 font-semibold">Get report and communicate progress</div>
                </div>
              </div>
            </div>
          
          </div>
         
        </div>
      </section>
    </div>
  );
}
