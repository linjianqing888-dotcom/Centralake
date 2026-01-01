
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, ContentData } from '../types.ts';

interface Props {
  user: User | null;
  content: ContentData;
  onRefresh: () => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const Navbar: React.FC<Props> = ({ user, onLogout }) => {
  const location = useLocation();

  const NavItem = ({ to, label }: { to: string; label: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        className={`relative py-4 px-2 text-[12px] font-medium tracking-wider transition-all duration-300 uppercase ${
          isActive ? 'text-[#00A3FF]' : 'text-slate-400 hover:text-white'
        }`}
      >
        {label}
        {isActive && (
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#00A3FF] animate-fadeIn"></div>
        )}
      </Link>
    );
  };

  return (
    <header className="w-full bg-[#001226]/80 backdrop-blur-md z-50 sticky top-0 border-b border-white/5">
      <div className="max-w-[1600px] mx-auto pt-8 pb-4 flex flex-col items-center">
        {/* Top: Massive Centered Text Logo */}
        <Link to="/" className="mb-6">
          <span className="text-white text-4xl md:text-5xl font-serif-elegant font-light tracking-[0.2em] uppercase transition-opacity hover:opacity-70">
            Centralake
          </span>
        </Link>

        {/* Bottom: Centered Navigation Row */}
        <nav className="flex items-center gap-6 md:gap-8 flex-wrap justify-center px-4">
          <NavItem to="/investment-management" label="Investment Management" />
          <NavItem to="/technology" label="Technology" />
          <NavItem to="/real-assets" label="Real Assets" />
          <NavItem to="/starter-growth" label="Starter & Growth" />
          <NavItem to="/impact" label="Impact" />
          <NavItem to="/news" label="News" />
          
          <div className="flex items-center gap-6 ml-4 border-l border-white/10 pl-6">
            {user ? (
              <button onClick={onLogout} className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300">
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-[10px] font-bold uppercase tracking-widest text-[#00A3FF] hover:text-white transition-colors">
                Portal
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
