
import React from 'react';

const ImpactBlog: React.FC = () => {
  const posts = [
    { tag: 'Technology', title: 'The Generative AI Revolution: Implications for Global Enterprise', date: 'October 14, 2024' },
    { tag: 'Markets', title: 'Navigating Volatility in Emerging Real Estate Markets', date: 'September 28, 2024' },
    { tag: 'Strategy', title: 'Why Operational Value Creation is the New Alpha', date: 'August 12, 2024' },
    { tag: 'Impact', title: 'Sustainable Infrastructure: Building for the Next Century', date: 'July 05, 2024' }
  ];

  return (
    <div className="pt-24 pb-32 px-6 max-w-[1400px] mx-auto min-h-screen">
      <div className="mb-24">
        <h2 className="text-[#0066CC] text-[11px] font-bold uppercase tracking-[0.4em] mb-4">// Impact & Insights</h2>
        <h3 className="text-4xl md:text-5xl font-serif-elegant font-light text-slate-900">Perspectives on the Global Economy</h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {posts.map((post, idx) => (
          <article key={idx} className="group cursor-pointer border-b border-slate-100 pb-12 hover:border-[#0066CC]/30 transition-all">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0066CC]">{post.tag}</span>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{post.date}</span>
            </div>
            <h4 className="text-3xl font-serif-elegant font-light text-slate-900 mb-6 group-hover:text-[#0066CC] transition-colors leading-snug">
              {post.title}
            </h4>
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-800">Read Article</span>
              <div className="w-8 h-[1px] bg-slate-300 group-hover:w-16 group-hover:bg-[#0066CC] transition-all duration-500"></div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ImpactBlog;
