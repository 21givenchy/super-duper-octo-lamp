"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "Trust Badge 1", text: "500+ Founders" },
  { name: "Trust Badge 2", text: "50+ Countries" },
  { name: "Trust Badge 3", text: "95% Mission Alignment" },
  { name: "Trust Badge 4", text: "10k+ Activities Tracked" },
  { name: "Trust Badge 5", text: "Bootstrapped & Founder-Led" },
];

export function LogoCarousel() {
  return (
    <div className="w-full overflow-hidden bg-white/5 backdrop-blur-sm py-8">
      <div className="relative flex">
        <motion.div
          className="flex gap-12 items-center"
          animate={{
            x: [0, -1000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 text-white/60 font-semibold text-lg px-8 whitespace-nowrap"
            >
              {logo.text}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
