
import React from 'react';
import { ContentData } from '../types';

interface Props {
  content: ContentData;
}

const Hero: React.FC<Props> = ({ content }) => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url('${content.heroImageUrl}')` }}
      >
        <div className="absolute inset-0 bg-black/75"></div>
      </div>

      <div className="relative z-10 max-w-5xl px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
          {content.heroTitle}
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          {content.heroSubtitle}
        </p>
        <div className="flex justify-center gap-6">
          <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium uppercase tracking-widest transition-all">
            Investment Strategy
          </button>
          <button className="px-8 py-3 border border-white/30 hover:bg-white hover:text-black text-white font-medium uppercase tracking-widest transition-all">
            Recent Deals
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-black/40 backdrop-blur-md border-t border-white/10 py-8 px-6 hidden lg:block">
        <div className="max-w-7xl mx-auto flex justify-around text-center">
          <div>
            <div className="text-emerald-500 text-3xl font-bold">$12B+</div>
            <div className="text-slate-400 text-xs uppercase tracking-widest mt-1">AUM</div>
          </div>
          <div>
            <div className="text-emerald-500 text-3xl font-bold">25+</div>
            <div className="text-slate-400 text-xs uppercase tracking-widest mt-1">Portfolio Companies</div>
          </div>
          <div>
            <div className="text-emerald-500 text-3xl font-bold">150+</div>
            <div className="text-slate-400 text-xs uppercase tracking-widest mt-1">M&A Transactions</div>
          </div>
          <div>
            <div className="text-emerald-500 text-3xl font-bold">15yrs</div>
            <div className="text-slate-400 text-xs uppercase tracking-widest mt-1">Firm Experience</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
