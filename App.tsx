
import React, { useState, useEffect } from 'react';
import { AppState, User, ContentData, ContactSubmission } from './types';
import { ApiService } from './services/api';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AdminDashboard from './components/AdminDashboard';
import ClientPortal from './components/ClientPortal';
import LoginForm from './components/LoginForm';
import Strategy from './components/Strategy';
import Portfolio from './components/Portfolio';
import Team from './components/Team';
import Contact from './components/Contact';

const App: React.FC = () => {
  const [state, setState] = useState<AppState | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

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

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = async (user: User) => {
    if (!state) return;
    setState({ ...state, currentUser: user });
    navigateTo(user.role === 'admin' ? 'admin' : 'portal');
  };

  const handleLogout = () => {
    if (!state) return;
    setState({ ...state, currentUser: null });
    navigateTo('home');
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

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero content={state.siteContent} />;
      case 'strategy':
        return <Strategy content={state.siteContent} />;
      case 'portfolio':
        return <Portfolio content={state.siteContent} />;
      case 'team':
        return <Team content={state.siteContent} />;
      case 'contact':
        return <Contact onSubmit={handleContactSubmit} onNavigate={navigateTo} />;
      case 'login':
        return <LoginForm onLogin={handleLogin} content={state.siteContent} />;
      case 'admin':
        if (!state.currentUser || state.currentUser.role !== 'admin') {
          return <LoginForm onLogin={handleLogin} content={state.siteContent} />;
        }
        return <AdminDashboard state={state} onUpdate={handleUpdateContent} />;
      case 'portal':
        if (!state.currentUser || state.currentUser.role !== 'client') {
          return <LoginForm onLogin={handleLogin} content={state.siteContent} />;
        }
        const clientData = state.clients[state.currentUser.id];
        return <ClientPortal user={state.currentUser} data={clientData} />;
      default:
        return <Hero content={state.siteContent} />;
    }
  };

  return (
    <div className="min-h-screen text-slate-200 bg-[#0a0a0a]">
      <Navbar 
        user={state.currentUser} 
        content={state.siteContent}
        onNavigate={navigateTo} 
        onLogout={handleLogout} 
      />
      
      <main className="animate-fadeIn">
        {renderPage()}
      </main>

      {(currentPage !== 'portal' && currentPage !== 'admin') && (
        <footer className="bg-white py-16 px-6 border-t border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
              <div className="flex flex-col gap-4">
                <div className="flex items-center cursor-pointer h-12" onClick={() => navigateTo('home')}>
                  <img src={state.siteContent.logoUrl} alt="Logo" className="h-full w-auto object-contain" />
                </div>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed mt-2">
                  A premier private investment firm dedicated to long-term value creation through operational excellence and strategic capital deployment.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                <div className="flex flex-col gap-4">
                  <h4 className="text-[#1a3a32] text-xs font-bold uppercase tracking-widest">Firm</h4>
                  <button onClick={() => navigateTo('home')} className="text-slate-500 text-sm hover:text-[#00B36E] text-left">Overview</button>
                  <button onClick={() => navigateTo('strategy')} className="text-slate-500 text-sm hover:text-[#00B36E] text-left">Our Strategy</button>
                  <button onClick={() => navigateTo('portfolio')} className="text-slate-500 text-sm hover:text-[#00B36E] text-left">Portfolio</button>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-[#1a3a32] text-xs font-bold uppercase tracking-widest">Access</h4>
                  <button onClick={() => navigateTo('contact')} className="text-slate-500 text-sm hover:text-[#00B36E] text-left">Contact Us</button>
                  <button onClick={() => navigateTo('login')} className="text-[#00B36E] text-sm font-bold hover:underline text-left">Client Portal</button>
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
