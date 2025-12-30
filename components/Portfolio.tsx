
import React from 'react';
import { ContentData } from '../types.ts';

interface Props {
  content: ContentData;
}

const Portfolio: React.FC<Props> = ({ content }) => {
  return (
    <div className="pt-48 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-24">
        <h2 className="text-[#00A3FF] text-sm font-bold uppercase tracking-[0.3em] mb-4">// Investment History</h2>
        <h3 className="text-5xl font-sans font-medium text-white">Representative Portfolio</h3>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {content.portfolioItems.map(item => (
          <div key={item.id} className="bg-[#002147]/20 border border-white/5 p-10 rounded-sm hover:border-[#0066CC]/50 transition-all group flex flex-col h-full">
            <span className="text-[#00A3FF] text-[10px] font-bold uppercase tracking-[0.2em]">{item.sector}</span>
            <h4 className="text-3xl font-sans font-medium text-white mt-4 mb-6 group-hover:text-[#00A3FF] transition-colors">{item.name}</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-10 flex-grow">{item.description}</p>
            <div className="pt-8 border-t border-white/5 flex justify-between items-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Acquired 2023</span>
              <button className="text-[#00A3FF] text-[10px] font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Case Study</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
