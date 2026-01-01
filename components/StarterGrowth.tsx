
import React from 'react';

const StarterGrowth: React.FC = () => {
  return (
    <div className="pt-24 pb-32 px-6 max-w-[1400px] mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
        <div className="max-w-2xl">
          <h2 className="text-[#0066CC] text-[11px] font-bold uppercase tracking-[0.4em] mb-4">// Future Titans</h2>
          <h3 className="text-4xl md:text-5xl font-serif-elegant font-light text-slate-900 mb-8">Empowering Visionaries from Seed to Scale</h3>
          <p className="text-slate-500 text-lg font-light leading-relaxed">
            We provide more than just capital. We provide an ecosystem for entrepreneurs to build enduring companies through deep operational expertise and global reach.
          </p>
        </div>
        <div className="pb-2">
          <button className="group flex items-center gap-4 text-[#0066CC]">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Pitch Your Idea</span>
            <div className="w-12 h-[1px] bg-[#0066CC]/30 group-hover:w-20 transition-all duration-500"></div>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { title: 'Early Venture', desc: 'Providing the critical first-check for disruptive ideas.' },
          { title: 'Incubation', desc: 'Full-service operational support for founding teams.' },
          { title: 'Growth Equity', desc: 'Scaling successful models into global market leaders.' },
          { title: 'Global Network', desc: 'Access to partners and markets in 40+ countries.' }
        ].map((item, i) => (
          <div key={i} className="p-10 border border-slate-100 hover:shadow-lg hover:shadow-slate-100 transition-all rounded-sm flex flex-col justify-between h-64">
             <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">0{i+1}</div>
             <div>
               <h4 className="text-xl font-serif-elegant text-[#001226] mb-3">{item.title}</h4>
               <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarterGrowth;
