
import React, { useState, useEffect, useRef } from 'react';
import { ContentData, AppState } from '../types.ts';
import { ApiService } from '../services/api.ts';

interface Props {
  state: AppState;
  onUpdate: (content: ContentData) => void;
}

const AdminDashboard: React.FC<Props> = ({ state, onUpdate }) => {
  const [content, setContent] = useState<ContentData>(state.siteContent);
  const [activeTab, setActiveTab] = useState<'content' | 'media' | 'inquiries' | 'sync'>('content');
  const [isSaving, setIsSaving] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [cloudConnected, setCloudConnected] = useState(false);
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const check = () => ApiService.isCloudConnected().then(setCloudConnected);
    check();
    const inv = setInterval(check, 5000);
    return () => clearInterval(inv);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await ApiService.updateSiteContent(content);
      onUpdate(content);
      alert('Global Cloud Sync Complete.');
    } catch (e) {
      alert('Local save successful, but cloud sync failed.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInitDb = async () => {
    if (!confirm("This will attempt to create the necessary tables in your Vercel Postgres database. Proceed?")) return;
    setIsInitializing(true);
    const success = await ApiService.initDatabase();
    setIsInitializing(false);
    if (success) {
      alert("Database initialized successfully! You can now use cloud sync.");
      window.location.reload();
    } else {
      alert("Initialization failed. Make sure your /api files are deployed and Vercel Environment Variables are set.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'logoUrl' | 'heroImageUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setContent(prev => ({ ...prev, [field]: base64String }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#050505] pt-16">
      <aside className="w-full md:w-72 bg-slate-950 border-r border-white/5 flex flex-col shrink-0">
        <div className="p-8 border-b border-white/5 text-center">
          <img src={content.logoUrl} className="h-6 w-auto mx-auto mb-4 grayscale" alt="Logo" />
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black rounded-full border border-white/5">
            <div className={`w-1.5 h-1.5 rounded-full ${cloudConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></div>
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400">
              {cloudConnected ? 'Cloud Active' : 'Sandbox Mode'}
            </span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {[
            { id: 'content', label: 'Content' },
            { id: 'media', label: 'Media Library' },
            { id: 'inquiries', label: 'Inquiries' },
            { id: 'sync', label: 'System' }
          ].map((t) => (
            <button 
              key={t.id}
              onClick={() => setActiveTab(t.id as any)} 
              className={`w-full text-left px-6 py-4 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === t.id ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8 md:p-16 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-serif text-white capitalize">{activeTab === 'sync' ? 'System' : activeTab === 'media' ? 'Media Library' : activeTab}</h1>
            <p className="text-slate-500 text-xs mt-2 uppercase tracking-widest">Centralake Administrative Console</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#00B36E] hover:bg-[#008f58] text-white px-10 py-4 rounded text-[10px] font-bold uppercase tracking-[0.2em] transition-all disabled:opacity-50 shadow-xl shadow-emerald-900/20"
          >
            {isSaving ? 'Synchronizing...' : 'Deploy Changes'}
          </button>
        </header>

        <div className="max-w-4xl">
          {activeTab === 'media' && (
            <div className="space-y-12">
              {/* Logo Section */}
              <div className="bg-slate-900/40 border border-white/5 p-10 rounded-3xl">
                <h2 className="text-emerald-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-6">Corporate Branding</h2>
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="w-full md:w-64 aspect-video bg-black/40 rounded-xl border border-white/10 flex items-center justify-center p-4 overflow-hidden">
                    <img src={content.logoUrl} alt="Logo Preview" className="max-h-full object-contain" />
                  </div>
                  <div className="flex-1 space-y-6">
                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Logo URL</label>
                      <input 
                        value={content.logoUrl} 
                        onChange={e => setContent({...content, logoUrl: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-xs outline-none focus:border-emerald-600"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <input 
                        type="file" 
                        ref={logoInputRef}
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'logoUrl')}
                      />
                      <button 
                        onClick={() => logoInputRef.current?.click()}
                        className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded text-[10px] font-bold uppercase tracking-widest border border-white/10 transition-all"
                      >
                        Upload Local Logo
                      </button>
                      <p className="text-[10px] text-slate-600">Recommended: PNG with transparency, 400x100px</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Background Section */}
              <div className="bg-slate-900/40 border border-white/5 p-10 rounded-3xl">
                <h2 className="text-emerald-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-6">Hero Visuals</h2>
                <div className="space-y-8">
                  <div className="w-full aspect-video bg-black/40 rounded-2xl border border-white/10 overflow-hidden relative group">
                    <img src={content.heroImageUrl} alt="Hero Preview" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Background Image URL</label>
                      <input 
                        value={content.heroImageUrl} 
                        onChange={e => setContent({...content, heroImageUrl: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-xs outline-none focus:border-emerald-600"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="flex flex-col justify-end">
                      <input 
                        type="file" 
                        ref={heroInputRef}
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'heroImageUrl')}
                      />
                      <button 
                        onClick={() => heroInputRef.current?.click()}
                        className="w-full bg-white/5 hover:bg-white/10 text-white px-6 py-4 rounded text-[10px] font-bold uppercase tracking-widest border border-white/10 transition-all"
                      >
                        Upload New Background
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sync' && (
            <div className="bg-slate-900/40 border border-white/5 p-10 rounded-3xl">
              <h2 className="text-white font-serif text-2xl mb-6">Database Management</h2>
              
              <div className="p-6 bg-slate-950/50 border border-white/5 rounded-2xl mb-10">
                <h3 className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest mb-4">Cloud Infrastructure</h3>
                <p className="text-slate-400 text-sm mb-6">If this is your first time setting up, you need to initialize the table structure in your Vercel Postgres database.</p>
                <button 
                  onClick={handleInitDb}
                  disabled={isInitializing}
                  className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-emerald-600 hover:text-white text-emerald-500 rounded text-[10px] font-bold uppercase tracking-widest transition-all"
                >
                  {isInitializing ? "Initializing..." : "Initialize Database Table"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(ApiService.exportData());
                    alert('Data copied to clipboard.');
                  }}
                  className="p-6 bg-black/40 border border-white/5 rounded-2xl hover:border-emerald-500/40 transition-all text-left"
                >
                  <div className="text-emerald-500 text-[10px] font-bold uppercase mb-2">Export Local State</div>
                  <div className="text-slate-500 text-xs">Copy current config to manually move to another computer.</div>
                </button>
                <div className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                  <div className="text-emerald-500 text-[10px] font-bold uppercase mb-2">Manual Import</div>
                  <input 
                    placeholder="Paste data here..."
                    className="w-full bg-slate-900/50 border border-white/10 p-2 rounded text-white text-[10px] font-mono"
                    onChange={(e) => e.target.value.length > 50 && ApiService.importData(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="bg-slate-900/40 p-10 rounded-3xl border border-white/5">
                <label className="block text-[10px] uppercase text-slate-500 mb-4 font-bold tracking-widest">Hero Narrative</label>
                <input 
                  value={content.heroTitle} 
                  onChange={e => setContent({...content, heroTitle: e.target.value})} 
                  className="w-full bg-black/40 border border-white/10 p-6 rounded-xl text-white mb-8 outline-none focus:border-emerald-600 text-xl font-serif" 
                />
                
                <label className="block text-[10px] uppercase text-slate-500 mb-4 font-bold tracking-widest">Sub-Headline Text</label>
                <textarea 
                  rows={4} 
                  value={content.heroSubtitle} 
                  onChange={e => setContent({...content, heroSubtitle: e.target.value})} 
                  className="w-full bg-black/40 border border-white/10 p-6 rounded-xl text-white outline-none focus:border-emerald-600 resize-none leading-relaxed" 
                />
              </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="bg-slate-900/20 rounded-3xl border border-white/5 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-black/40 text-[10px] uppercase text-slate-500 tracking-widest">
                    <th className="px-10 py-6">Origin</th>
                    <th className="px-10 py-6">Message Excerpt</th>
                    <th className="px-10 py-6">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {state.contactSubmissions.length === 0 ? (
                    <tr><td colSpan={3} className="px-10 py-16 text-center text-slate-600 italic">No communication logs found.</td></tr>
                  ) : (
                    state.contactSubmissions.map(sub => (
                      <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-10 py-8">
                          <div className="text-white font-medium">{sub.name}</div>
                          <div className="text-[10px] text-slate-500 uppercase">{sub.company || 'Private Individual'}</div>
                        </td>
                        <td className="px-10 py-8 text-slate-400 text-sm max-w-xs truncate">{sub.message}</td>
                        <td className="px-10 py-8 text-[10px] text-slate-600 font-mono">{sub.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
