
import React from 'react';
import { ContentData } from '../types.ts';

interface Props {
  content: ContentData;
}

const Portfolio: React.FC<Props> = ({ content }) => {
  return (
    <div className="pt-24 pb-32 px-6 max-w-[1400px] mx-auto min-h-screen bg-white">
      <div className="mb-20 text-center">
        <h2 className="text-[#0066CC] text-[11px] font-bold uppercase tracking-[0.4em] mb-4">// Representative Portfolio</h2>
        <h3 className="text-4xl md:text-5xl font-serif-elegant font-light text-slate-900">Investing in Market Leaders</h3>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {content.portfolioItems.map(item => (
          <div key={item.id} className="bg-slate-50 border border-slate-100 p-12 rounded-sm hover:border-[#0066CC]/30 transition-all group flex flex-col h-full hover:shadow-xl hover:shadow-slate-100">
            <span className="text-[#0066CC] text-[10px] font-bold uppercase tracking-[0.2em]">{item.sector}</span>
            <h4 className="text-2xl font-serif-elegant font-light text-slate-900 mt-4 mb-6 group-hover:text-[#0066CC] transition-colors">{item.name}</h4>
            <p className="text-slate-500 text-sm leading-relaxed mb-10 flex-grow font-light">{item.description}</p>
            <div className="pt-8 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Global Platform</span>
              <button className="text-[#0066CC] text-[10px] font-bold uppercase tracking-widest hover:underline underline-offset-4">Case Study</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
