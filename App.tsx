
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
    <div className="min-h-screen text-slate-200 bg-[#001226] selection:bg-[#0066CC] selection:text-white">
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
          <Route path="/investment-management" element={<Portfolio content={state.siteContent} />} />
          <Route path="/technology" element={<Portfolio content={state.siteContent} />} />
          <Route path="/real-assets" element={<Portfolio content={state.siteContent} />} />
          <Route path="/starter-growth" element={<Team content={state.siteContent} />} />
          <Route path="/impact" element={<Team content={state.siteContent} />} />
          <Route path="/news" element={<Contact onSubmit={handleContactSubmit} onNavigate={(p) => navigate(p === 'home' ? '/' : `/${p}`)} />} />
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
        <footer className="bg-[#000a1a] py-32 px-12 border-t border-white/5">
          <div className="max-w-[1400px] mx-auto text-center">
            <div className="flex flex-col items-center gap-12 mb-20">
              <span className="text-white text-4xl font-serif-elegant font-light tracking-[0.2em] uppercase">Centralake</span>
              <div className="flex flex-wrap justify-center gap-12">
                <button onClick={() => navigate('/login')} className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00A3FF] hover:text-white transition-colors">Partner Access</button>
                <button onClick={() => navigate('/news')} className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-colors">Inquiries</button>
                <a href="#" className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-colors">Cookie Notice</a>
              </div>
            </div>
            <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.4em]">© 2024 Centralake Capital LLC. High-Performance Capital Strategy.</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
