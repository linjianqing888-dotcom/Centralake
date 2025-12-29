
import React from 'react';
import { ContentData } from '../types';

interface Props {
  content: ContentData;
}

const Strategy: React.FC<Props> = ({ content }) => {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-emerald-500 text-sm font-bold uppercase tracking-widest mb-4">Our Approach</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
            {content.strategyTitle}
          </h3>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            {content.strategyText}
          </p>
          <div className="space-y-4">
            {content.sectors.map((sector, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-slate-200 font-medium">{sector}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square bg-emerald-900/20 rounded-2xl border border-emerald-500/30 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1454165833767-1316b34460d9?auto=format&fit=crop&q=80&w=1000" 
              alt="Strategy"
              className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-emerald-600 p-8 rounded shadow-2xl hidden md:block">
            <p className="text-white font-serif text-2xl italic">"Operational Excellence is not an act, but a habit."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Strategy;
