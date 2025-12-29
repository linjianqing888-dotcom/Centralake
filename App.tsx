
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AppState, User, ContentData, ContactSubmission } from './types.ts';
import { ApiService } from './services/api.ts';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import ClientPortal from './components/ClientPortal.tsx';
import LoginForm from './components/LoginForm.tsx';
import Strategy from './components/Strategy.tsx';
import Portfolio from './components/Portfolio.tsx';
import Team from './components/Team.tsx';
import Contact from './components/Contact.tsx';

const App: React.FC = () => {
  const [state, setState] = useState<AppState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const initData = async () => {
      try {
        const data = await ApiService.getAppState();
        setState(data);
      } catch (error) {
        console.error("Failed to load state:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initData();
  }, []);

  useEffect(() => {
    if (state?.siteContent.faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = state.siteContent.faviconUrl;
    }
  }, [state?.siteContent.faviconUrl]);

  const handleLogin = async (user: User) => {
    if (!state) return;
    setState({ ...state, currentUser: user });
    navigate(user.role === 'admin' ? '/admin' : '/portal');
  };

  const handleLogout = () => {
    if (!state) return;
    setState({ ...state, currentUser: null });
    navigate('/');
  };

  const handleUpdateContent = async (content: ContentData) => {
    if (!state) return;
    await ApiService.updateSiteContent(content);
    setState({ ...state, siteContent: content });
  };

  const handleContactSubmit = async (submission: ContactSubmission) => {
    if (!state) return;
    const newState = await ApiService.saveContactSubmission(submission);
    setState(newState);
  };

  if (isLoading || !state) {
    return (
      <div className="h-screen bg-[#0a0a0a] flex items-center justify-center text-center">
        <div>
          <div className="w-12 h-12 border-2 border-[#00B36E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#00B36E] font-brand tracking-widest uppercase text-xs">Initializing Terminal...</p>
        </div>
      </div>
    );
  }

  const isAdmin = state.currentUser?.role === 'admin';
  const isClient = state.currentUser?.role === 'client';
  const isSpecialPage = location.pathname === '/admin' || location.pathname === '/portal';

  return (
    <div className="min-h-screen text-slate-200 bg-[#0a0a0a]">
      <Navbar 
        user={state.currentUser} 
        content={state.siteContent}
        onNavigate={(page) => navigate(page === 'home' ? '/' : `/${page}`)} 
        onLogout={handleLogout} 
      />
      
      <main className="animate-fadeIn">
        <Routes>
          <Route path="/" element={<Hero content={state.siteContent} />} />
          <Route path="/strategy" element={<Strategy content={state.siteContent} />} />
          <Route path="/portfolio" element={<Portfolio content={state.siteContent} />} />
          <Route path="/team" element={<Team content={state.siteContent} />} />
          <Route path="/contact" element={<Contact onSubmit={handleContactSubmit} onNavigate={(p) => navigate(p === 'home' ? '/' : `/${p}`)} />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} content={state.siteContent} />} />
          
          <Route 
            path="/admin" 
            element={isAdmin ? <AdminDashboard state={state} onUpdate={handleUpdateContent} /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/portal" 
            element={isClient ? <ClientPortal user={state.currentUser!} data={state.clients[state.currentUser!.id]} /> : <Navigate to="/login" />} 
          />
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {!isSpecialPage && (
        <footer className="bg-white py-16 px-6 border-t border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
              <div className="flex flex-col gap-4">
                <div className="flex items-center cursor-pointer h-12" onClick={() => navigate('/')}>
                  <img src={state.siteContent.logoUrl} alt="Logo" className="h-full w-auto object-contain" />
                </div>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed mt-2">
                  A premier private investment firm dedicated to long-term value creation through operational excellence and strategic capital deployment.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                <div className="flex flex-col gap-4">
                  <h4 className="text-[#1a3a32] text-xs font-bold uppercase tracking-widest">Firm</h4>
                  <button onClick={() => navigate('/')} className="text-slate-500 text-sm hover:text-[#00B36E] text-left">Overview</button>
                  <button onClick={() => navigate('/strategy')} className="text-slate-500 text-sm hover:text-[#00B36E] text-left">Our Strategy</button>
                  <button onClick={() => navigate('/portfolio')} className="text-slate-500 text-sm hover:text-[#00B36E] text-left">Portfolio</button>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-[#1a3a32] text-xs font-bold uppercase tracking-widest">Access</h4>
                  <button onClick={() => navigate('/contact')} className="text-slate-500 text-sm hover:text-[#00B36E] text-left">Contact Us</button>
                  <button onClick={() => navigate('/login')} className="text-[#00B36E] text-sm font-bold hover:underline text-left">Client Portal</button>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-[#1a3a32] text-xs font-bold uppercase tracking-widest">Legal</h4>
                  <a href="#" className="text-slate-500 text-sm hover:text-[#00B36E]">Privacy Policy</a>
                  <a href="#" className="text-slate-500 text-sm hover:text-[#00B36E]">Disclosure</a>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 gap-4">
              <p className="text-xs text-slate-400 font-medium tracking-wide">© 2024 Centralake Capital LLC. All Rights Reserved.</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#00B36E] rounded-full"></div>
                <p className="text-[10px] text-[#00B36E] uppercase tracking-widest font-bold">Secure Global Terminal</p>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
