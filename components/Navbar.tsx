
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, ContentData } from '../types.ts';

interface Props {
  user: User | null;
  content: ContentData;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const Navbar: React.FC<Props> = ({ user, content, onNavigate, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed w-full z-50 bg-white border-b border-slate-100 px-8 py-4 flex justify-between items-center shadow-sm">
      <Link 
        to="/"
        className="flex items-center group"
      >
        <div className="flex items-center h-10 min-w-[120px]">
          <img 
            src={content.logoUrl} 
            alt="Centralake Capital" 
            className="h-full w-auto object-contain transition-opacity duration-300"
            style={{ minHeight: '32px' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/200x50/00b36e/ffffff?text=Centralake";
            }}
          />
        </div>
      </Link>

      <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a3a32]/80">
        <Link to="/" className="hover:text-[#00B36E] transition-colors">Firm</Link>
        <Link to="/strategy" className="hover:text-[#00B36E] transition-colors">Strategy</Link>
        <Link to="/portfolio" className="hover:text-[#00B36E] transition-colors">Portfolio</Link>
        <Link to="/team" className="hover:text-[#00B36E] transition-colors">Team</Link>
        <Link to="/contact" className="hover:text-[#00B36E] transition-colors">Contact</Link>
        
        {user ? (
          <div className="flex items-center gap-6 border-l border-slate-200 pl-6">
            <button 
              onClick={() => navigate(user.role === 'admin' ? '/admin' : '/portal')}
              className="px-5 py-2.5 bg-[#00B36E]/10 text-[#00B36E] border border-[#00B36E]/20 hover:bg-[#00B36E] hover:text-white transition-all rounded text-[10px]"
            >
              {user.role === 'admin' ? 'Admin Center' : 'Investor Portal'}
            </button>
            <button onClick={onLogout} className="text-red-600 hover:text-red-500 transition-colors">Logout</button>
          </div>
        ) : (
          <button 
            onClick={() => navigate('/login')}
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
