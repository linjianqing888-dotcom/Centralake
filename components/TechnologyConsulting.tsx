
import React from 'react';

const TechnologyConsulting: React.FC = () => {
  return (
    <div className="pt-24 pb-32 px-6 max-w-[1400px] mx-auto min-h-screen">
      <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
        <div>
          <h2 className="text-[#0066CC] text-[11px] font-bold uppercase tracking-[0.4em] mb-4">// Intelligence & Growth</h2>
          <h3 className="text-4xl md:text-5xl font-serif-elegant font-light text-slate-900 mb-8">Centralake Research Group</h3>
          <p className="text-slate-500 text-lg font-light leading-relaxed mb-10">
            Our specialized consulting arm provides deep-sector research and strategic guidance for enterprises navigating the rapidly evolving technology landscape. We don't just invest; we engineer growth.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-[#001226] text-white text-[11px] font-bold uppercase tracking-widest">Inquire for Research</button>
            <button className="px-8 py-3 border border-slate-200 text-[#001226] text-[11px] font-bold uppercase tracking-widest hover:bg-slate-50">Latest Whitepapers</button>
          </div>
        </div>
        <div className="bg-slate-50 aspect-video rounded-sm flex items-center justify-center border border-slate-100 p-12 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0066CC_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="relative text-center">
            <p className="text-[#0066CC] text-6xl font-serif-elegant mb-2 tracking-tighter">98%</p>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-[0.3em]">Sector Accuracy Rate</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {['Strategic Roadmap', 'Operational Scaling', 'Market Intelligence'].map((service, idx) => (
          <div key={idx} className="p-10 border border-slate-100 rounded-sm">
            <h5 className="text-[#001226] font-bold text-sm uppercase tracking-widest mb-4">{service}</h5>
            <div className="h-[1px] w-8 bg-[#0066CC] mb-6"></div>
            <p className="text-slate-500 text-sm leading-relaxed">Developing proprietary data frameworks to help organizations identify non-obvious growth levers in competitive markets.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnologyConsulting;
