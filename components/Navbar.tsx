
import React, { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      onRefresh();
    }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#002147] py-3 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <nav className="max-w-[1600px] mx-auto px-8 md:px-12 flex justify-between items-center">
        {/* Left: Text-based Logo */}
        <Link 
          to="/"
          onClick={handleLogoClick}
          className="flex items-center group"
        >
          <div className="flex flex-col">
            <span className="text-white text-2xl font-bold tracking-tight uppercase font-sans leading-none group-hover:text-[#00A3FF] transition-colors">
              Centralake
            </span>
            <span className="text-[#00A3FF] text-[8px] font-bold uppercase tracking-[0.4em] mt-1 leading-none opacity-80">
              Capital
            </span>
          </div>
        </Link>

        {/* Right: Menu */}
        <div className="flex items-center gap-10">
          <div className="hidden lg:flex items-center gap-10">
            <Link to="/portfolio" className="text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#00A3FF] transition-colors">Portfolio</Link>
            <Link to="/team" className="text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#00A3FF] transition-colors">People</Link>
            <Link to="/strategy" className="text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#00A3FF] transition-colors">Purpose</Link>
          </div>

          <div className="flex items-center gap-6 border-l border-white/20 pl-10">
            <button className="text-white hover:text-[#00A3FF] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <button className="text-white hover:text-[#00A3FF] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
              </svg>
            </button>

            {!user ? (
              <button 
                onClick={() => navigate('/login')}
                className="bg-white text-[#002147] px-5 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-[#00A3FF] hover:text-white transition-all shadow-md"
              >
                Log In
              </button>
            ) : (
              <button 
                onClick={onLogout}
                className="text-white/60 text-[10px] font-bold uppercase hover:text-white transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
