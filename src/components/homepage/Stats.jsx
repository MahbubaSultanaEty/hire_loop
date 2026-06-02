import Image from "next/image";
import {
  BriefcaseBusiness,
  Users,
  Building2,
  BadgeCheck,
} from "lucide-react";

export default function Stats() {
  const stats = [
    {
      icon: BriefcaseBusiness,
      value: "25K+",
      label: "Active Jobs",
    },
    {
      icon: Users,
      value: "120K+",
      label: "Job Seekers",
    },
    {
      icon: Building2,
      value: "8K+",
      label: "Companies",
    },
    {
      icon: BadgeCheck,
      value: "98%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Globe */}
      <div className="absolute inset-0">
    <Image
      src="/globe.png"
      alt="Globe"
      fill
      priority
      className="object-cover "
    />
    <div className="absolute inset-0 bg-[#0F1117]/70" />
  </div>

      {/* Gradient Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1 text-sm font-medium text-purple-400">
            Trusted Worldwide
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-white">
            Empowering Careers,
            <span className="text-purple-400"> Connecting Talent</span>
          </h2>

          <p className="mt-5 text-gray-400 text-lg">
            Thousands of professionals and companies trust HireLoop to find
            opportunities, build teams, and grow faster.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="
                  group
                  rounded-3xl
                  border
                  border-purple-500/10
                  bg-white/[0.02]
                  backdrop-blur-xl
                  p-4
                  text-center
                  transition-all
                  duration-300
                  hover:border-purple-500/30
                  hover:bg-white/[0.04]
                "
              >
                <div
                  className="
                    
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    
                    shadow-lg
                    shadow-purple-500/20
                  "
                >
                  <Icon size={26} className="text-white" />
                </div>

                <h3 className="mt-5 text-4xl font-bold text-white">
                  {stat.value}
                </h3>

                <p className="mt-2 text-gray-400">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}