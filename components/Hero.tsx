
import React from 'react';
import { ContentData } from '../types.ts';

interface Props {
  content: ContentData;
}

const Hero: React.FC<Props> = ({ content }) => {
  return (
    <div className="relative h-screen w-full flex items-end overflow-hidden">
      {/* Background Image with Silver Lake Style Gradient Overlays */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
        style={{ backgroundImage: `url('${content.heroImageUrl}')` }}
      >
        {/* Top shadow for nav readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent"></div>
        {/* Bottom shadow for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>

      {/* Content Area - Bottom Left aligned like screenshot */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-12 pb-24 animate-fadeIn">
        <div className="max-w-3xl">
          {/* Subtitle / Label with double slash */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[#00A3FF] text-xl font-bold tracking-tighter">//</span>
            <span className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.3em]">
              {content.heroSubtitle}
            </span>
          </div>

          {/* Main Title - Serif and Impactful */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-medium text-white mb-10 leading-[1.1] tracking-tight">
            {content.heroTitle}
          </h1>

          {/* Learn More Action */}
          <button className="group flex items-center gap-4 text-white hover:text-[#00A3FF] transition-all duration-300">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Learn More</span>
            <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center group-hover:border-[#00A3FF] group-hover:bg-[#00A3FF]/10 transition-all">
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Floating Status Indicator (Optional but adds to the high-end feel) */}
      <div className="absolute right-12 bottom-24 hidden xl:block">
        <div className="w-5 h-5 border-2 border-[#00A3FF] rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Hero;
