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
   * EXTREME FAVICON GUARDIAN
   * This logic aggressively fights off environment-default "green" icons.
   */
  useEffect(() => {
    const rawFaviconUrl = state.siteContent.faviconUrl || INITIAL_CONTENT.faviconUrl;
    // 使用时间戳彻底击穿任何潜在的缓存
    const faviconUrl = `${rawFaviconUrl}${rawFaviconUrl.includes('?') ? '&' : '?'}v=${Date.now()}`;
    
    const enforceBlueFavicon = () => {
      // 1. 彻底移除所有非我们主动创建的图标标签（防止环境注入）
      const suspiciousIcons = document.querySelectorAll('link[rel*="icon"]');
      suspiciousIcons.forEach(tag => {
        if (tag.id !== 'favicon-primary' && tag.id !== 'favicon-backup') {
          tag.remove();
        }
      });

      // 2. 强制同步我们的主图标
      let primary = document.getElementById('favicon-primary') as HTMLLinkElement;
      if (!primary) {
        primary = document.createElement('link');
        primary.id = 'favicon-primary';
        primary.rel = 'icon';
        document.head.appendChild(primary);
      }
      if (primary.href !== faviconUrl) {
        primary.href = faviconUrl;
      }

      // 3. 额外添加一个 shortcut icon 标签增加兼容性
      let backup = document.getElementById('favicon-backup') as HTMLLinkElement;
      if (!backup) {
        backup = document.createElement('link');
        backup.id = 'favicon-backup';
        backup.rel = 'shortcut icon';
        document.head.appendChild(backup);
      }
      if (backup.href !== faviconUrl) {
        backup.href = faviconUrl;
      }
    };

    // 执行初始锁定
    enforceBlueFavicon();

    // 关键：在最初的 5 秒内，每 500ms 强制锁定一次。
    // 很多平台会在页面加载后动态注入自己的脚本或 manifest，这能确保我们赢下这场“控制权博弈”。
    const interval = setInterval(enforceBlueFavicon, 500);
    const timeout = setTimeout(() => clearInterval(interval), 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [state.siteContent.faviconUrl, location.pathname]);

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