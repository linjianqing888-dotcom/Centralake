
import React from 'react';

const RealAssets: React.FC = () => {
  return (
    <div className="pt-24 pb-32 px-6 max-w-[1400px] mx-auto min-h-screen">
      <div className="mb-24 text-center max-w-3xl mx-auto">
        <h2 className="text-[#0066CC] text-[11px] font-bold uppercase tracking-[0.4em] mb-4">// Tangible Foundations</h2>
        <h3 className="text-4xl md:text-5xl font-serif-elegant font-light text-slate-900 mb-8">Investing in the Physical World</h3>
        <p className="text-slate-500 text-lg font-light leading-relaxed">
          From prime real estate developments to critical industrial infrastructure, we manage assets that form the backbone of global commerce.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="relative group overflow-hidden aspect-[16/10] bg-slate-100">
           <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" alt="Commercial Real Estate" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
           <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-end p-12">
             <div className="text-white">
               <p className="text-[10px] font-bold uppercase tracking-widest mb-2">Prime Assets</p>
               <h4 className="text-3xl font-serif-elegant font-light leading-none">Commercial Real Estate</h4>
             </div>
           </div>
        </div>
        <div className="relative group overflow-hidden aspect-[16/10] bg-slate-100">
           <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200" alt="Infrastructure" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
           <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-end p-12">
             <div className="text-white">
               <p className="text-[10px] font-bold uppercase tracking-widest mb-2">Critical Core</p>
               <h4 className="text-3xl font-serif-elegant font-light leading-none">Industrial & Logistics</h4>
             </div>
           </div>
        </div>
      </div>

      <div className="mt-20 p-16 bg-slate-50 border border-slate-100 text-center">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.5em] mb-6">Asset Under Management</p>
        <p className="text-5xl md:text-7xl font-serif-elegant font-light text-[#001226] mb-8">$12.4B</p>
        <div className="flex justify-center">
           <div className="w-20 h-[1px] bg-[#0066CC]"></div>
        </div>
      </div>
    </div>
  );
};

export default RealAssets;
