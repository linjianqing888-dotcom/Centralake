
import React from 'react';
import { ContentData } from '../types.ts';

interface Props {
  content: ContentData;
}

const Portfolio: React.FC<Props> = ({ content }) => {
  return (
    <div className="pt-24 pb-32 px-6 max-w-[1400px] mx-auto min-h-screen">
      <div className="mb-20">
        <h2 className="text-[#00A3FF] text-[10px] font-bold uppercase tracking-[0.5em] mb-4">// Representative Portfolio</h2>
        <h3 className="text-4xl md:text-5xl font-serif-elegant font-light text-white">Investing in Market Leaders</h3>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {content.portfolioItems.map(item => (
          <div key={item.id} className="bg-[#001a33] border border-white/5 p-12 rounded-sm hover:border-[#0066CC]/50 transition-all group flex flex-col h-full shadow-2xl">
            <span className="text-[#00A3FF] text-[10px] font-bold uppercase tracking-[0.2em]">{item.sector}</span>
            <h4 className="text-2xl font-serif-elegant font-light text-white mt-4 mb-6 group-hover:text-[#00A3FF] transition-colors">{item.name}</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-10 flex-grow font-light">{item.description}</p>
            <div className="pt-8 border-t border-white/5 flex justify-between items-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Global Platform</span>
              <button className="text-[#00A3FF] text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">Case Study</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
