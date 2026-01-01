
import React from 'react';
import { ContentData } from '../types.ts';

interface Props {
  content: ContentData;
}

const Team: React.FC<Props> = ({ content }) => {
  return (
    <div className="pt-24 pb-32 px-6 max-w-[1400px] mx-auto min-h-screen bg-white">
      <div className="max-w-3xl mb-24 text-left">
        <h2 className="text-[#0066CC] text-[11px] font-bold uppercase tracking-[0.4em] mb-4">// Our Professionals</h2>
        <h3 className="text-4xl md:text-5xl font-serif-elegant font-light text-slate-900 mb-8">Expertise in Innovation</h3>
        <p className="text-slate-500 text-lg font-light leading-relaxed">Centralake's success is driven by the collective experience of our professionals who bring together investment acumen and operational skill.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {content.teamMembers.map(member => (
          <div key={member.id} className="flex flex-col md:flex-row gap-10 items-center bg-slate-50 p-10 rounded-sm border border-slate-100 group hover:bg-slate-100/50 transition-all">
            <div className="w-24 h-24 bg-[#0066CC]/5 rounded-full flex-shrink-0 border border-[#0066CC]/10 flex items-center justify-center text-[#001226] text-3xl font-serif-elegant group-hover:bg-[#001226] group-hover:text-white transition-all">
              {member.name[0]}
            </div>
            <div>
              <h4 className="text-2xl font-serif-elegant font-light text-slate-900 mb-2">{member.name}</h4>
              <p className="text-[#0066CC] text-[10px] font-bold mb-6 uppercase tracking-[0.2em]">{member.title}</p>
              <p className="text-slate-500 text-sm leading-relaxed font-light">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
