
import React from 'react';
import { ContentData } from '../types.ts';

interface Props {
  content: ContentData;
}

const Strategy: React.FC<Props> = ({ content }) => {
  return (
    <div className="pt-48 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="grid md:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-[#00A3FF] text-sm font-bold uppercase tracking-[0.3em] mb-4">// Our Approach</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium text-white mb-10 leading-tight">
            {content.strategyTitle}
          </h3>
          <p className="text-slate-400 text-lg leading-relaxed mb-10 font-light">
            {content.strategyText}
          </p>
          <div className="grid grid-cols-2 gap-6">
            {content.sectors.map((sector, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-1.5 h-1.5 bg-[#00A3FF] rounded-full group-hover:scale-150 transition-transform"></div>
                <span className="text-slate-300 font-medium tracking-wide text-sm">{sector}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] bg-[#002147]/40 rounded-sm border border-white/5 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1454165833767-1316b34460d9?auto=format&fit=crop&q=80&w=1000" 
              alt="Strategy"
              className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-[#0066CC] p-10 max-w-xs shadow-2xl hidden lg:block">
            <p className="text-white text-xl font-medium leading-relaxed italic">"Transforming technology potential into enterprise value."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Strategy;
