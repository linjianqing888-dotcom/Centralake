
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AppState, User, ContentData, ContactSubmission } from './types.ts';
import { ApiService } from './services/api.ts';
import { INITIAL_CONTENT, MOCK_CLIENT_DATA } from './constants.tsx';
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
  const [state, setState] = useState<AppState>({
    currentUser: null,
    siteContent: INITIAL_CONTENT,
    clients: MOCK_CLIENT_DATA,
    contactSubmissions: [],
  });
  
  const navigate = useNavigate();
  const location = useLocation();

  const silentRefresh = useCallback(async () => {
    try {
      const data = await ApiService.getAppState();
      setState(prev => ({
        ...data,
        currentUser: prev.currentUser
      }));
    } catch (error) {
      console.warn("Background sync failed.");
    }
  }, []);

  useEffect(() => {
    silentRefresh();
  }, [silentRefresh]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (state.siteContent.faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = state.siteContent.faviconUrl;
    }
  }, [state.siteContent.faviconUrl]);

  const handleLogin = async (user: User) => {
    setState(prev => ({ ...prev, currentUser: user }));
    navigate(user.role === 'admin' ? '/admin' : '/portal');
  };

  const handleLogout = () => {
    setState(prev => ({ ...prev, currentUser: null }));
    navigate('/');
  };

  const handleUpdateContent = async (content: ContentData) => {
    await ApiService.updateSiteContent(content);
    setState(prev => ({ ...prev, siteContent: content }));
  };

  const handleContactSubmit = async (submission: ContactSubmission) => {
    const newState = await ApiService.saveContactSubmission(submission);
    setState(newState);
  };

  const isAdmin = state.currentUser?.role === 'admin';
  const isClient = state.currentUser?.role === 'client';
  const isSpecialPage = location.pathname === '/admin' || location.pathname === '/portal';

  return (
    <div className="min-h-screen text-slate-200 bg-[#0a0a0a]">
      <Navbar 
        user={state.currentUser} 
        content={state.siteContent}
        onRefresh={silentRefresh}
        onNavigate={(page) => navigate(page === 'home' ? '/' : `/${page}`)} 
        onLogout={handleLogout} 
      />
      
      {/* Increased padding-top to accommodate taller navbar (Top Bar + Main Nav) */}
      <main className="animate-fadeIn pt-[84px]">
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
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {!isSpecialPage && (
        <footer className="bg-white py-16 px-6 border-t border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
              <div className="flex flex-col gap-4">
                <div className="flex items-center cursor-pointer h-12" onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  <img src={state.siteContent.logoUrl} alt="Logo" className="h-full w-auto object-contain" />
                </div>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed mt-2">
                  A premier private investment firm dedicated to long-term value creation through operational excellence and strategic capital deployment.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                <div className="flex flex-col gap-4">
                  <h4 className="text-[#1a3a32] text-xs font-bold uppercase tracking-widest">Firm</h4>
                  <button onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-slate-500 text-sm hover:text-[#00B36E] text-left">Overview</button>
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
