
import React from 'react';
import { ContentData } from '../types.ts';

interface Props {
  content: ContentData;
}

const Hero: React.FC<Props> = ({ content }) => {
  return (
    <div className="relative h-[80vh] w-full flex items-center justify-center bg-[#001226] overflow-hidden">
      {/* Subtle Artistic Background Texture */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/canvas-orange.png')` }}
      ></div>

      {/* Massive Centered Faded Logo Background */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none px-4">
        <h2 className="text-[14vw] font-serif-elegant font-light text-[#003366] uppercase tracking-[0.25em] opacity-40">
          Centralake
        </h2>
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 text-center px-6 animate-fadeIn">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#00A3FF] text-xs font-bold uppercase tracking-[0.5em] mb-6">
            // High-End Private Equity
          </p>
          <h1 className="text-4xl md:text-6xl font-serif-elegant font-light text-white mb-10 leading-tight">
            Advancing the potential of <br/> visionary entrepreneurs
          </h1>
          
          <div className="flex justify-center">
            <button className="group flex items-center gap-4 text-white/80 hover:text-[#00A3FF] transition-all">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Explore Our Strategy</span>
              <div className="w-12 h-[1px] bg-white/20 group-hover:bg-[#00A3FF] group-hover:w-20 transition-all duration-500"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Side Accent */}
      <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-[#00A3FF]/40 to-transparent hidden md:block"></div>
    </div>
  );
};

export default Hero;
