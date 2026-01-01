
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
        className={`relative py-4 px-2 text-[13px] font-normal tracking-wide transition-all duration-300 ${
          isActive ? 'text-[#0066CC]' : 'text-slate-400 hover:text-slate-800'
        }`}
      >
        {label}
        {isActive && (
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0066CC] animate-fadeIn"></div>
        )}
      </Link>
    );
  };

  return (
    <header className="w-full bg-white z-50">
      <div className="max-w-[1600px] mx-auto pt-10 pb-4 flex flex-col items-center">
        {/* Top: Massive Centered Text Logo */}
        <Link to="/" className="mb-8">
          <span className="text-black text-5xl md:text-6xl font-serif-elegant font-light tracking-[0.15em] uppercase transition-opacity hover:opacity-70">
            Centralake
          </span>
        </Link>

        {/* Bottom: Centered Navigation Row */}
        <nav className="flex items-center gap-8 md:gap-10 flex-wrap justify-center px-4">
          <NavItem to="/investment-management" label="Investment Management" />
          <NavItem to="/technology" label="Technology" />
          <NavItem to="/real-assets" label="Real Assets" />
          <NavItem to="/starter-growth" label="Starter & Growth" />
          <NavItem to="/impact" label="Impact" />
          <NavItem to="/news" label="News" />
          
          <div className="flex items-center gap-6 ml-6 border-l border-slate-100 pl-6">
            {user ? (
              <button onClick={onLogout} className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:opacity-70">
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-[10px] font-bold uppercase tracking-widest text-[#0066CC] hover:opacity-70">
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
