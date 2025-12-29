
import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { User, ContentData } from '../types.ts';

interface Props {
  user: User | null;
  content: ContentData;
  onRefresh: () => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const Navbar: React.FC<Props> = ({ user, content, onRefresh, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      onRefresh();
    }
  };

  const NavItem: React.FC<{ to: string, label: string, hasDropdown?: boolean }> = ({ to, label, hasDropdown }) => (
    <Link 
      to={to} 
      className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-800 hover:text-[#00B36E] transition-colors"
    >
      {label}
      {hasDropdown && (
        <svg className="w-3 h-3 text-slate-400 group-hover:text-[#00B36E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      )}
    </Link>
  );

  return (
    <header className="fixed w-full z-50 shadow-sm">
      {/* Top Bar - Screenshot Style with Green Theme */}
      <div className="bg-[#064e3b] text-white py-2 px-8 flex justify-center items-center gap-4 text-xs font-medium tracking-tight">
        <span className="opacity-95">Discover our new strategic approach for mid-market transformation 2024</span>
        <button className="border border-white/40 px-3 py-1 rounded-md text-[10px] hover:bg-white hover:text-[#064e3b] transition-all font-bold">
          Learn More
        </button>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-slate-100 px-8 py-3.5 flex justify-between items-center">
        {/* Left: Logo */}
        <Link 
          to="/"
          onClick={handleLogoClick}
          className="flex items-center min-w-[180px]"
        >
          <img 
            src={content.logoUrl} 
            alt="Centralake Capital" 
            className="h-10 w-auto object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/200x50/00b36e/ffffff?text=Centralake";
            }}
          />
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          <NavItem to="/strategy" label="Strategy" hasDropdown />
          <NavItem to="/portfolio" label="Portfolio" hasDropdown />
          <NavItem to="/team" label="Company" hasDropdown />
          <NavItem to="/contact" label="Resources" />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          {!user ? (
            <>
              <button 
                onClick={() => navigate('/login')}
                className="text-[13px] font-semibold text-slate-800 hover:text-[#00B36E] transition-colors"
              >
                Log In
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="bg-white border-2 border-[#00B36E] text-[#00B36E] px-5 py-2 rounded-lg text-[13px] font-bold hover:bg-[#00B36E] hover:text-white transition-all shadow-sm"
              >
                Book a Demo
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-bold text-[#064e3b] uppercase tracking-wider hidden md:block">
                Welcome, {user.name.split(' ')[0]}
              </span>
              <button 
                onClick={() => navigate(user.role === 'admin' ? '/admin' : '/portal')}
                className="bg-[#00B36E] text-white px-5 py-2 rounded-lg text-[13px] font-bold hover:bg-[#008f58] transition-all"
              >
                {user.role === 'admin' ? 'Admin Center' : 'Investor Portal'}
              </button>
              <button onClick={onLogout} className="text-red-500 text-[13px] font-bold hover:underline ml-2">
                Logout
              </button>
            </div>
          )}
          
          {/* Globe Icon Placeholder */}
          <div className="p-2 bg-slate-100 rounded-lg cursor-pointer hover:bg-slate-200 transition-colors hidden sm:block">
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
