
import React from 'react';

const NewsRoom: React.FC = () => {
  const news = [
    { type: 'Press Release', title: 'Centralake Capital Announces Closing of Technology Growth Fund III at $4.5B', date: 'Oct 20, 2024' },
    { type: 'Corporate', title: 'Strategic Partnership with Global Sustainable Infrastructure Initiative', date: 'Sep 15, 2024' },
    { type: 'Recognition', title: 'Named Private Equity Firm of the Year for Technology Innovation', date: 'Aug 02, 2024' },
    { type: 'Portfolio', title: 'Centralake-backed Fintech Unicorn Completes Landmark IPO', date: 'Jun 30, 2024' }
  ];

  return (
    <div className="pt-24 pb-32 px-6 max-w-[1400px] mx-auto min-h-screen">
      <div className="mb-24 flex justify-between items-end border-b border-slate-100 pb-12">
        <div>
          <h2 className="text-[#0066CC] text-[11px] font-bold uppercase tracking-[0.4em] mb-4">// Newsroom</h2>
          <h3 className="text-4xl md:text-5xl font-serif-elegant font-light text-slate-900">Latest Updates</h3>
        </div>
        <div className="hidden md:block">
           <button className="text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#001226]">Media Kit</button>
        </div>
      </div>

      <div className="space-y-12">
        {news.map((item, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-8 md:gap-24 items-start py-8 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors px-4 rounded-sm">
             <div className="md:w-32 pt-1">
               <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">{item.date}</span>
             </div>
             <div className="flex-1">
               <span className="text-[10px] font-bold text-[#0066CC] uppercase tracking-[0.3em] mb-3 block">{item.type}</span>
               <h4 className="text-2xl font-serif-elegant font-light text-slate-900 hover:text-[#0066CC] cursor-pointer transition-colors leading-tight">
                 {item.title}
               </h4>
             </div>
             <button className="pt-2 text-slate-300 hover:text-[#001226] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
             </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsRoom;
