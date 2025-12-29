
import React from 'react';
import { User, ContentData } from '../types';

interface Props {
  user: User | null;
  content: ContentData;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const Navbar: React.FC<Props> = ({ user, content, onNavigate, onLogout }) => {
  return (
    <nav className="fixed w-full z-50 bg-white border-b border-slate-100 px-8 py-4 flex justify-between items-center shadow-sm">
      <div 
        className="flex items-center cursor-pointer group"
        onClick={() => onNavigate('home')}
      >
        <div className="flex items-center h-10">
          <img 
            src={content.logoUrl} 
            alt="Centralake Capital" 
            className="h-full w-auto object-contain"
            onError={(e) => {
              // Fallback if image fails
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          {/* Text span removed as requested */}
        </div>
      </div>

      <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a3a32]/80">
        <button onClick={() => onNavigate('home')} className="hover:text-[#00B36E] transition-colors">Firm</button>
        <button onClick={() => onNavigate('strategy')} className="hover:text-[#00B36E] transition-colors">Strategy</button>
        <button onClick={() => onNavigate('portfolio')} className="hover:text-[#00B36E] transition-colors">Portfolio</button>
        <button onClick={() => onNavigate('team')} className="hover:text-[#00B36E] transition-colors">Team</button>
        <button onClick={() => onNavigate('contact')} className="hover:text-[#00B36E] transition-colors">Contact</button>
        
        {user ? (
          <div className="flex items-center gap-6 border-l border-slate-200 pl-6">
            <button 
              onClick={() => onNavigate(user.role === 'admin' ? 'admin' : 'portal')}
              className="px-5 py-2.5 bg-[#00B36E]/10 text-[#00B36E] border border-[#00B36E]/20 hover:bg-[#00B36E] hover:text-white transition-all rounded text-[10px]"
            >
              {user.role === 'admin' ? 'Admin Center' : 'Investor Portal'}
            </button>
            <button onClick={onLogout} className="text-red-600 hover:text-red-500 transition-colors">Logout</button>
          </div>
        ) : (
          <button 
            onClick={() => onNavigate('login')}
            className="px-6 py-2.5 bg-[#00B36E] text-white hover:bg-[#008f58] transition-all rounded shadow-md shadow-emerald-900/10"
          >
            Client Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
