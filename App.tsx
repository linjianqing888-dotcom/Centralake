
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
import Contact from './components/Contact.tsx';

// New Specialized Pages
import InvestmentManagement from './components/InvestmentManagement.tsx';
import TechnologyConsulting from './components/TechnologyConsulting.tsx';
import RealAssets from './components/RealAssets.tsx';
import StarterGrowth from './components/StarterGrowth.tsx';
import ImpactBlog from './components/ImpactBlog.tsx';
import NewsRoom from './components/NewsRoom.tsx';

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

  /**
   * SUPERIOR FAVICON GUARDIAN
   * Fights off platform defaults and ensures CMS-managed icons take precedence.
   */
  useEffect(() => {
    // Priority: Cloud Content > Initial Constant > Base64 Fallback
    const rawFaviconUrl = state.siteContent.faviconUrl || INITIAL_CONTENT.faviconUrl;
    
    // Add a unique version to the URL to force browser to dump any "green" cache
    const v = rawFaviconUrl.startsWith('data:') ? '' : (rawFaviconUrl.includes('?') ? '&v=' : '?v=') + Date.now();
    const finalUrl = rawFaviconUrl + v;

    const lockIcon = () => {
      // 1. Clear out ANY Link tags that try to set an icon (platform injections)
      const existingIcons = document.querySelectorAll('link[rel*="icon"]');
      existingIcons.forEach(tag => {
        if (tag.id !== 'centralake-favicon-main' && tag.id !== 'centralake-favicon-alt') {
          tag.remove();
        }
      });

      // 2. Set/Update our Primary Link tag
      let main = document.getElementById('centralake-favicon-main') as HTMLLinkElement;
      if (!main) {
        main = document.createElement('link');
        main.id = 'centralake-favicon-main';
        main.rel = 'icon';
        main.type = 'image/png';
        document.head.appendChild(main);
      }
      main.href = finalUrl;

      // 3. Set/Update Alternative Link tag (for older browser compatibility)
      let alt = document.getElementById('centralake-favicon-alt') as HTMLLinkElement;
      if (!alt) {
        alt = document.createElement('link');
        alt.id = 'centralake-favicon-alt';
        alt.rel = 'shortcut icon';
        document.head.appendChild(alt);
      }
      alt.href = finalUrl;
    };

    // Run immediately
    lockIcon();

    // Re-run periodically during the first few seconds to combat late-injecting scripts
    const interval = setInterval(lockIcon, 1000);
    const timeout = setTimeout(() => clearInterval(interval), 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [state.siteContent.faviconUrl]); // Re-run when CMS changes the URL

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
    <div className="min-h-screen text-slate-800 bg-white selection:bg-[#0066CC] selection:text-white">
      <Navbar 
        user={state.currentUser} 
        content={state.siteContent}
        onRefresh={silentRefresh}
        onNavigate={(page) => navigate(page === 'home' ? '/' : `/${page}`)} 
        onLogout={handleLogout} 
      />
      
      <main className="animate-fadeIn">
        <Routes>
          <Route path="/" element={<Hero content={state.siteContent} />} />
          <Route path="/investment-management" element={<InvestmentManagement />} />
          <Route path="/technology" element={<TechnologyConsulting />} />
          <Route path="/real-assets" element={<RealAssets />} />
          <Route path="/starter-growth" element={<StarterGrowth />} />
          <Route path="/impact" element={<ImpactBlog />} />
          <Route path="/news" element={<NewsRoom />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} content={state.siteContent} />} />
          <Route path="/contact" element={<Contact onSubmit={handleContactSubmit} onNavigate={(p) => navigate(p === 'home' ? '/' : `/${p}`)} />} />
          
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
        <footer className="bg-slate-50 py-32 px-12 border-t border-slate-100">
          <div className="max-w-[1400px] mx-auto text-center">
            <div className="flex flex-col items-center gap-12 mb-16">
              <span className="text-[#001226] text-4xl font-serif-elegant font-light tracking-[0.1em] uppercase">Centralake</span>
              <div className="flex flex-wrap justify-center gap-12">
                <button onClick={() => navigate('/login')} className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0066CC] hover:opacity-70 transition-opacity">Investor Login</button>
                <button onClick={() => navigate('/contact')} className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500 hover:text-slate-900 transition-colors">Inquiries</button>
                <a href="#" className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</a>
                <a href="#" className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500 hover:text-slate-900 transition-colors">Legal Notices</a>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em]">© 2024 Centralake Capital LLC. All Rights Reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
