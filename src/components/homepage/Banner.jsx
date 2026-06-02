"use client";
import Image from "next/image";
import { Search, MapPin, Briefcase, Building2, Users, Star } from "lucide-react";

const stats = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
];

const trending = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

export default function Banner() {
  return (
    <section className="relative w-full overflow-hidden min-h-screen top-0 pt-40 " >
      {/* Background globe image */}
      <div className="absolute top-0 inset-0 bottom-0  overflow-hidden">
    <Image
      src="/globe.png"
      alt="Globe"
      fill
      priority
      className="object-cover object-top  "
    />
  </div>

      {/* Content layer */}
      <div className="relative z-10 flex flex-col h-full max-w-5xl mx-auto">
        {/* Top content */}
        <div className="flex flex-col items-center px-4 md:pt-20 pt-10">
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm px-4 py-1.5 text-xs text-white/70 mb-5">
            🔥 <span><strong className="text-white">98,000+</strong> NEW JOBS THIS MONTH</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white text-center max-w-2xl leading-tight mb-3">
            Find Your Dream Job Today
          </h1>

          <p className="text-white/50 text-sm text-center max-w-md mb-6">
            HireLoop connects top talent with world-class companies. Browse thousands of
            curated opportunities and land your next role — faster.
          </p>

          <div className="flex w-full max-w-xl rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm overflow-hidden mb-4">
            <div className="flex items-center gap-2 flex-1 px-4 py-3">
              <Search className="w-4 h-4 text-white/40 shrink-0" />
              <input
                type="text"
                placeholder="Job title, skill or company"
                className="bg-transparent text-sm text-white placeholder-white/30 outline-none flex-1"
              />
            </div>
            <div className="w-px bg-white/10" />
            <div className="flex items-center gap-2 px-4 py-3 flex-1">
              <MapPin className="w-4 h-4 text-white/40 shrink-0" />
              <input
                type="text"
                placeholder="Location or Remote"
                className="bg-transparent text-sm text-white placeholder-white/30 outline-none flex-1"
              />
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-500 px-4 flex items-center justify-center transition-colors">
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center text-xs text-white/40">
            <span>Trending Position:</span>
            {trending.map((tag) => (
              <button
                key={tag}
                className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-white/60 hover:text-white transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Middle — "Assisting over" on globe glow area */}
        <div className=" flex items-center justify-center mt-20 md:mt-70">
          <p className="text-white/80 md:text-3xl  text-2xl text-center px-4 m-8 max-w-2xl">
            Assisting over <strong className="text-white">15,000 job seekers</strong> find their dream positions.
          </p>
        </div>

        {/* Stats — pinned to bottom */}
        <div className="grid  grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border-t border-white/10">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col gap-1 bg-black/40 backdrop-blur-sm px-6 py-5">
              <Icon className="w-5 h-5 text-white/40 mb-1" />
              <span className="text-2xl font-bold text-white">{value}</span>
              <span className="text-xs text-white/40">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}