
import React from 'react';
import { User, ClientData } from '../types';

interface Props {
  user: User;
  data: ClientData;
}

const ClientPortal: React.FC<Props> = ({ user, data }) => {
  return (
    <div className="pt-32 pb-12 px-6 max-w-6xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-serif text-white">Partner Portal</h2>
          <p className="text-slate-400">Logged in as {user.name} | <span className="text-emerald-500">{user.firmName}</span></p>
        </div>
        <div className="bg-emerald-600/10 border border-emerald-600/30 px-6 py-2 rounded-full">
          <span className="text-emerald-500 text-sm font-medium">End-to-End Encryption Enabled</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-900 p-6 rounded-xl border border-emerald-500/10 shadow-xl">
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Net Portfolio Value</p>
          <p className="text-3xl font-bold text-white">{data.portfolioValue}</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border border-emerald-500/10 shadow-xl">
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Q3 Performance</p>
          <p className="text-3xl font-bold text-emerald-500">{data.quarterlyReturn}</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border border-emerald-500/10 shadow-xl">
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Reporting Period</p>
          <p className="text-3xl font-bold text-white">{data.latestReportDate}</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="px-8 py-6 border-b border-white/10 bg-emerald-900/10 flex justify-between items-center">
          <h3 className="text-xl font-medium">Secure Reports & Governance</h3>
          <button className="text-sm text-slate-400 hover:text-white">Archive</button>
        </div>
        <div className="divide-y divide-white/5">
          {data.documents.map(doc => (
            <div key={doc.id} className="px-8 py-5 flex justify-between items-center hover:bg-emerald-900/5 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-900/20 rounded flex items-center justify-center group-hover:bg-emerald-600 transition-all">
                  <span className="text-[10px] font-bold text-emerald-500 group-hover:text-white">PDF</span>
                </div>
                <div>
                  <p className="font-medium text-white">{doc.name}</p>
                  <p className="text-xs text-slate-500">Validated: {doc.date}</p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm border border-emerald-600/30 text-emerald-500 rounded hover:bg-emerald-600 hover:text-white transition-all">
                Access Document
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;
