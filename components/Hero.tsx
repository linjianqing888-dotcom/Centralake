
import React from 'react';
import { ContentData } from '../types.ts';

interface Props {
  content: ContentData;
}

const Hero: React.FC<Props> = ({ content }) => {
  return (
    <div className="relative h-[80vh] w-full flex items-center justify-center bg-[#fcfcfc] overflow-hidden">
      {/* Subtle Artistic Background Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/canvas-orange.png')` }}
      ></div>

      {/* Massive Centered Faded Logo Background */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none px-4">
        <h2 className="text-[14vw] font-serif-elegant font-light text-slate-100 uppercase tracking-[0.2em] opacity-80">
          Centralake
        </h2>
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 text-center px-6 animate-fadeIn">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#0066CC] text-xs font-bold uppercase tracking-[0.4em] mb-8">
            // Global Private Equity
          </p>
          <h1 className="text-4xl md:text-6xl font-serif-elegant font-light text-slate-800 mb-12 leading-tight">
            Advancing the potential of <br/> visionary entrepreneurs
          </h1>
          
          <div className="flex justify-center">
            <button className="group flex items-center gap-4 text-slate-800 hover:text-[#0066CC] transition-all">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Our Platforms</span>
              <div className="w-10 h-[1px] bg-slate-300 group-hover:bg-[#0066CC] group-hover:w-16 transition-all duration-500"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Side Accent ( Teal bar inspiration ) */}
      <div className="absolute right-0 top-1/4 bottom-1/4 w-[2px] bg-[#0066CC]/10 hidden md:block"></div>
    </div>
  );
};

export default Hero;
