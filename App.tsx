import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  const observerRef = useRef<MutationObserver | null>(null);

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
   * ATOMIC FAVICON OBSERVER
   * Uses MutationObserver to detect and instantly kill any third-party icon injections.
   */
  useEffect(() => {
    const targetUrl = state.siteContent.faviconUrl || INITIAL_CONTENT.faviconUrl;
    if (!targetUrl) return;

    // Use a high-entropy version key to bypass browser and platform caches
    const versionedUrl = targetUrl.startsWith('data:') 
      ? targetUrl 
      : `${targetUrl}${targetUrl.includes('?') ? '&' : '?'}v-lock=${Date.now()}`;

    const enforceIcon = () => {
      const head = document.head;
      let needsUpdate = false;

      // 1. Find all potential icon links
      const allLinks = head.querySelectorAll('link[rel*="icon"]');
      
      allLinks.forEach(link => {
        const l = link as HTMLLinkElement;
        // If it's not one of our locked IDs, it's an intruder (like the green Vercel icon)
        if (l.id !== 'centralake-lock-primary' && l.id !== 'centralake-lock-alt') {
          l.remove();
          needsUpdate = true;
        } else if (l.href !== versionedUrl) {
          l.href = versionedUrl;
        }
      });

      // 2. Ensure our tags exist
      let primary = document.getElementById('centralake-lock-primary') as HTMLLinkElement;
      if (!primary) {
        primary = document.createElement('link');
        primary.id = 'centralake-lock-primary';
        primary.rel = 'icon';
        primary.type = 'image/png';
        primary.href = versionedUrl;
        head.appendChild(primary);
      }

      let alt = document.getElementById('centralake-lock-alt') as HTMLLinkElement;
      if (!alt) {
        alt = document.createElement('link');
        alt.id = 'centralake-lock-alt';
        alt.rel = 'shortcut icon';
        alt.href = versionedUrl;
        head.appendChild(alt);
      }
    };

    // Initial enforcement
    enforceIcon();

    // Set up MutationObserver to watch for head changes (platform injections)
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          // Check if any link tags were added
          const addedNodes = Array.from(mutation.addedNodes);
          const hasIconChange = addedNodes.some(node => 
            node.nodeName === 'LINK' && (node as HTMLLinkElement).rel.includes('icon')
          );
          if (hasIconChange) {
            enforceIcon();
          }
        }
      }
    });

    observerRef.current.observe(document.head, { childList: true, subtree: true });

    // Fallback: Check every 500ms for the first 5 seconds just in case the observer misses a direct attribute update
    const interval = setInterval(enforceIcon, 500);
    const timeout = setTimeout(() => clearInterval(interval), 5000);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [state.siteContent.faviconUrl]);

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