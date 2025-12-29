
import React from 'react';
import { ContentData } from '../types.ts';

interface Props {
  content: ContentData;
}

const Team: React.FC<Props> = ({ content }) => {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-20">
        <h2 className="text-emerald-500 text-sm font-bold uppercase tracking-widest mb-4">Our People</h2>
        <h3 className="text-4xl font-serif text-white mb-6">Expertise Across Industries</h3>
        <p className="text-slate-400 max-w-2xl mx-auto">Centralake's success is driven by the collective experience of our professionals who bring together investment acumen and operational skill.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {content.teamMembers.map(member => (
          <div key={member.id} className="flex flex-col md:flex-row gap-8 items-center bg-slate-900/50 p-8 rounded-2xl border border-white/5">
            <div className="w-32 h-32 bg-emerald-600/20 rounded-full flex-shrink-0 border border-emerald-500/20 flex items-center justify-center text-emerald-500 text-4xl font-bold font-serif">
              {member.name[0]}
            </div>
            <div>
              <h4 className="text-2xl font-serif text-white">{member.name}</h4>
              <p className="text-emerald-500 text-sm font-medium mb-4 uppercase tracking-wider">{member.title}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
