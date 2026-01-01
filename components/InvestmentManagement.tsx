
import React from 'react';

const InvestmentManagement: React.FC = () => {
  return (
    <div className="pt-24 pb-32 px-6 max-w-[1400px] mx-auto min-h-screen">
      <div className="max-w-4xl mb-24">
        <h2 className="text-[#0066CC] text-[11px] font-bold uppercase tracking-[0.4em] mb-4">// Bespoke Asset Management</h2>
        <h3 className="text-4xl md:text-6xl font-serif-elegant font-light text-slate-900 mb-8 leading-tight">
          Preserving and Growing Capital Across Generations
        </h3>
        <p className="text-slate-500 text-xl font-light leading-relaxed">
          Centralake provides comprehensive investment solutions tailored to the unique needs of family offices, sovereign wealth funds, and institutional entities.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        <div className="p-12 bg-slate-50 border border-slate-100 rounded-sm hover:border-[#0066CC]/20 transition-all">
          <h4 className="text-2xl font-serif-elegant font-light text-[#001226] mb-6">Private Wealth Solutions</h4>
          <p className="text-slate-500 leading-relaxed mb-8">Customized portfolio construction for high-net-worth individuals, focusing on capital preservation, tax efficiency, and long-term appreciation.</p>
          <ul className="space-y-4 text-sm text-slate-600 font-medium">
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#0066CC] rounded-full"></span> Multi-Asset Class Allocation</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#0066CC] rounded-full"></span> Direct Co-Investment Access</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#0066CC] rounded-full"></span> Philanthropic Advisory</li>
          </ul>
        </div>
        <div className="p-12 bg-slate-50 border border-slate-100 rounded-sm hover:border-[#0066CC]/20 transition-all">
          <h4 className="text-2xl font-serif-elegant font-light text-[#001226] mb-6">Institutional Mandates</h4>
          <p className="text-slate-500 leading-relaxed mb-8">Sophisticated asset management for corporations and endowments, leveraging our global network to deliver alpha in specialized sectors.</p>
          <ul className="space-y-4 text-sm text-slate-600 font-medium">
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#0066CC] rounded-full"></span> Specialized Sector Funds</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#0066CC] rounded-full"></span> Risk Management Frameworks</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#0066CC] rounded-full"></span> Custom Reporting Engine</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InvestmentManagement;
