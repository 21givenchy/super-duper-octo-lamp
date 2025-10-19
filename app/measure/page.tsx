"use client";

import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-[family-name:var(--font-poppins)] bg-gray-50 text-gray-800">
      {/* Left Side - Content */}
      <div className="lg:w-1/2 p-8 md:p-12 lg:p-24 flex flex-col justify-center">
        {/* Mission Badge */}
        <div className="inline-block px-6 py-2 bg-green-200 text-green-800 rounded-full text-2xl font-semibold mb-8 transform -rotate-3">
          our mission
        </div>
        
        {/* Mission Content */}
        <p className="text-2xl md:text-3xl lg:text-4xl leading-snug mb-10">
          We take <strong className="font-semibold">purpose</strong> seriously because that&apos;s where we find meaning. Yet, the platforms we use today often disconnect us from our true intentions, built on outdated models that haven&apos;t evolved.
        </p>
        
        <p className="text-2xl md:text-3xl lg:text-4xl leading-snug">
          We realized that many of you felt the same way. That&apos;s why we built FrontForumFocus — a community-driven platform that connects your <strong className="font-semibold italic">purpose</strong> with real-world <strong className="font-semibold italic">impact</strong>, not just empty metrics.
        </p>
      </div>

      {/* Right Side - Image & App Preview */}
      <div className="lg:w-1/2 relative">
        {/* Try Now Button */}
        <div className="absolute top-4 right-4 z-10">
          <a 
            href="https://greta-v2.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors inline-block"
          >
            Try Now
          </a>
        </div>

        {/* Background Image Container */}
        <div 
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAPQgspbwuxZ6F6fy-WjpfEosGAzydDjklEgm6nsMmkXDeOoI9h0-NSoJyYmCDAu-o9ah4eq1OC94pLlFBiOglspu3o-vmB66--lR-IKYQL65NEKguZmPJtkULxqrFtHa3VP7R_Dgcrm_fbeYwHA8DI9XI06wlo606sh9tybuUMGcjgFIibqH3OlE97eGNWZparxU8u-A2mAzIAsszbRj3UKvKzIs3ocaYhELToeMfkbCfQMsMDMS80IWkIgKwJnTmP-oUo4qOrDeD7')"
          }}
        >
          <div className="h-full w-full bg-black bg-opacity-20 flex items-center justify-center p-8">
            <div className="relative w-full max-w-2xl">
              {/* App Images Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {['/mm.png', '/n.png', '/nn.png'].map((src, index) => (
                  <div key={src} className={`relative transform transition-transform duration-500 hover:scale-105 ${
                    index === 0 ? 'rotate-3' : index === 1 ? '-rotate-2' : 'rotate-1'
                  }`}>
                    <Image 
                      alt={`App interface screenshot ${index + 1}`}
                      className="w-full h-auto rounded-3xl shadow-2xl" 
                      src={src}
                      width={300}
                      height={600}
                    />
                  </div>
                ))}
              </div>
              
              {/* Measure-focused App Text */}
              <div className="text-center text-white mt-8">
                <p className="text-sm uppercase tracking-widest opacity-80">MEASURE</p>
                <p className="text-2xl font-bold">YOUR IMPACT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
