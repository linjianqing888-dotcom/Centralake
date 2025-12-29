
import React from 'react';
import { ContentData } from '../types';

interface Props {
  content: ContentData;
}

const Portfolio: React.FC<Props> = ({ content }) => {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-emerald-500 text-sm font-bold uppercase tracking-widest mb-4">Investment History</h2>
        <h3 className="text-4xl font-serif text-white">Representative Portfolio</h3>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {content.portfolioItems.map(item => (
          <div key={item.id} className="bg-slate-900 border border-white/5 p-8 rounded-xl hover:border-emerald-500/50 transition-all group">
            <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest">{item.sector}</span>
            <h4 className="text-2xl font-serif text-white mt-2 mb-4 group-hover:text-emerald-400 transition-colors">{item.name}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center">
              <span className="text-xs text-slate-500">Acquired 2023</span>
              <button className="text-emerald-500 text-xs font-bold uppercase hover:underline">Case Study</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
