
import React from 'react';
import { ContentData } from '../types.ts';

interface Props {
  content: ContentData;
}

const Team: React.FC<Props> = ({ content }) => {
  return (
    <div className="pt-24 pb-32 px-6 max-w-[1400px] mx-auto min-h-screen">
      <div className="max-w-3xl mb-24">
        <h2 className="text-[#00A3FF] text-[10px] font-bold uppercase tracking-[0.5em] mb-4">// Our Professionals</h2>
        <h3 className="text-4xl md:text-5xl font-serif-elegant font-light text-white mb-8">Expertise in Innovation</h3>
        <p className="text-slate-400 text-lg font-light leading-relaxed">Centralake's success is driven by the collective experience of our professionals who bring together investment acumen and operational skill.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {content.teamMembers.map(member => (
          <div key={member.id} className="flex flex-col md:flex-row gap-10 items-center bg-[#001a33] p-10 rounded-sm border border-white/5 group hover:bg-[#002244] transition-all">
            <div className="w-24 h-24 bg-[#0066CC]/10 rounded-full flex-shrink-0 border border-[#0066CC]/20 flex items-center justify-center text-[#0066CC] text-3xl font-serif-elegant group-hover:bg-[#0066CC] group-hover:text-white transition-all">
              {member.name[0]}
            </div>
            <div>
              <h4 className="text-2xl font-serif-elegant font-light text-white mb-2">{member.name}</h4>
              <p className="text-[#00A3FF] text-[10px] font-bold mb-6 uppercase tracking-[0.2em]">{member.title}</p>
              <p className="text-slate-400 text-sm leading-relaxed font-light">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
