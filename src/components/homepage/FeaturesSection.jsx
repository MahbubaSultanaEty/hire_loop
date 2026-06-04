import React from 'react';

import { 
  Search, 
  TrendingUp, 
  BarChart3, 
  Bookmark, 
  MousePointerClick, 
  FileText, 
  Hexagon, 
  LineChart 
} from 'lucide-react';

export default function FeaturesSection() {
  
  const features = [
    {
      icon: <Search className="w-6 h-6 text-purple-400" />,
      title: "Smart Search",
      description: "Find your ideal job with advanced filters."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-400" />,
      title: "Salary Insights",
      description: "Get real salary data to negotiate confidently."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-purple-400" />,
      title: "Top Companies",
      description: "Apply to vetted companies that are hiring."
    },
    {
      icon: <Bookmark className="w-6 h-6 text-purple-400" />,
      title: "Saved Jobs",
      description: "Manage apps & favorites on your dashboard."
    },
    {
      icon: <MousePointerClick className="w-6 h-6 text-purple-400" />,
      title: "One-Click Apply",
      description: "Simplify your job applications for an easier process!"
    },
    {
      icon: <FileText className="w-6 h-6 text-purple-400" />,
      title: "Resume Builder",
      description: "Create professional resumes with modern templates."
    },
    {
      icon: <Hexagon className="w-6 h-6 text-purple-400" />,
      title: "Skill-Based Matching",
      description: "Discover jobs that match your skills and experience."
    },
    {
      icon: <LineChart className="w-6 h-6 text-purple-400" />,
      title: "Career Growth Resources",
      description: "Boost your career with quick interview tips."
    }
  ];

  return (
    <section className="bg-[#131314] text-white py-20 px-4 md:px-8 min-h-screen flex flex-col justify-center items-center font-sans">
      {/* Header Area */}
      <div className="text-center mb-16 max-w-2xl">
        <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-semibold tracking-widest text-purple-500 uppercase mb-4">
          <span className="w-1.5 h-1.5 bg-purple-500 inline-block"></span>
          FEATURES JOB
          <span className="w-1.5 h-1.5 bg-purple-500 inline-block"></span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          Everything you need <br className="hidden sm:inline" /> to succeed
        </h2>
      </div>

      {/* Grid Layout (Responsive: 1 col on mobile, 2 on tablet, 4 on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 max-w-7xl w-full">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-4 group">
            {/* Icon Wrapper with Custom Dark Background & Border */}
            <div className="flex-shrink-0 w-14 h-14 bg-[#121214] border border-[#1F1F23] rounded-xl flex items-center justify-center shadow-lg transition-colors duration-300 group-hover:border-purple-500/50">
              {feature.icon}
            </div>
            
            {/* Content */}
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-semibold text-gray-100 group-hover:text-white transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-[220px]">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}