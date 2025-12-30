
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
    <div className="min-h-screen text-slate-200 bg-[#050505]">
      <Navbar 
        user={state.currentUser} 
        content={state.siteContent}
        onRefresh={silentRefresh}
        onNavigate={(page) => navigate(page === 'home' ? '/' : `/${page}`)} 
        onLogout={handleLogout} 
      />
      
      {/* Remove pt-[84px] because Navbar is now overlaying on Hero */}
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
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {!isSpecialPage && (
        <footer className="bg-white py-20 px-12 border-t border-slate-200">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-20">
              <div className="flex flex-col gap-8 max-w-sm">
                <span className="text-[#002147] text-3xl font-bold uppercase tracking-tighter font-serif">Centralake</span>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Leading the global technology investment landscape through innovative capital solutions and deep operational partnership.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
                <div className="flex flex-col gap-5">
                  <h4 className="text-[#002147] text-[10px] font-bold uppercase tracking-[0.3em]">Insights</h4>
                  <button onClick={() => navigate('/strategy')} className="text-slate-400 text-sm hover:text-[#0066CC] text-left transition-colors">Strategy</button>
                  <button onClick={() => navigate('/portfolio')} className="text-slate-400 text-sm hover:text-[#0066CC] text-left transition-colors">Portfolio</button>
                </div>
                <div className="flex flex-col gap-5">
                  <h4 className="text-[#002147] text-[10px] font-bold uppercase tracking-[0.3em]">Firm</h4>
                  <button onClick={() => navigate('/team')} className="text-slate-400 text-sm hover:text-[#0066CC] text-left transition-colors">People</button>
                  <button onClick={() => navigate('/contact')} className="text-slate-400 text-sm hover:text-[#0066CC] text-left transition-colors">Contact</button>
                </div>
                <div className="flex flex-col gap-5">
                  <h4 className="text-[#002147] text-[10px] font-bold uppercase tracking-[0.3em]">Portals</h4>
                  <button onClick={() => navigate('/login')} className="text-[#0066CC] text-sm font-bold hover:underline text-left">Investor Login</button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-slate-100 gap-6">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2024 Centralake Capital LLC.</p>
              <div className="flex gap-8">
                <a href="#" className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hover:text-[#0066CC]">Terms</a>
                <a href="#" className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hover:text-[#0066CC]">Privacy</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
