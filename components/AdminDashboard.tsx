
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
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [cloudConnected, setCloudConnected] = useState(false);
  
  const faviconInputRef = useRef<HTMLInputElement>(null);
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
      alert('Global Cloud Sync Complete. Favicon and content updated.');
    } catch (e) {
      alert('Local save successful, but cloud sync failed.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInitDb = async () => {
    if (!confirm("Initialize the cloud database table?")) return;
    setIsInitializing(true);
    const success = await ApiService.initDatabase();
    setIsInitializing(false);
    if (success) {
      alert("Database initialized!");
      window.location.reload();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'faviconUrl' | 'heroImageUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(field);
    try {
      const permanentUrl = await ApiService.uploadImage(file);
      setContent(prev => ({ ...prev, [field]: permanentUrl }));
    } catch (err: any) {
      alert(`Upload Error: ${err.message}`);
    } finally {
      setUploadingField(null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#050505] pt-16">
      <aside className="w-full md:w-72 bg-slate-950 border-r border-white/5 flex flex-col shrink-0">
        <div className="p-8 border-b border-white/5 text-center">
          <div className="flex flex-col items-center mb-6">
            <span className="text-white text-lg font-bold uppercase tracking-tighter">Centralake</span>
            <span className="text-[#00A3FF] text-[6px] font-bold uppercase tracking-[0.4em]">Capital</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black rounded-full border border-white/5">
            <div className={`w-1.5 h-1.5 rounded-full ${cloudConnected ? 'bg-[#00A3FF] animate-pulse' : 'bg-amber-500'}`}></div>
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400">
              {cloudConnected ? 'Cloud Active' : 'Sandbox'}
            </span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {[
            { id: 'content', label: 'Content' },
            { id: 'media', label: 'Media' },
            { id: 'inquiries', label: 'Inquiries' },
            { id: 'sync', label: 'System' }
          ].map((t) => (
            <button 
              key={t.id}
              onClick={() => setActiveTab(t.id as any)} 
              className={`w-full text-left px-6 py-4 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === t.id ? 'bg-[#0066CC]/10 text-[#00A3FF] border border-[#0066CC]/20' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8 md:p-16 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-sans font-medium text-white capitalize">{activeTab}</h1>
            <p className="text-slate-500 text-[10px] mt-2 uppercase tracking-[0.3em]">Administrative Terminal</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#0066CC] hover:bg-[#004e9a] text-white px-10 py-4 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] transition-all disabled:opacity-50"
          >
            {isSaving ? 'Syncing...' : 'Deploy Changes'}
          </button>
        </header>

        <div className="max-w-5xl">
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="bg-slate-900/40 p-10 rounded-sm border border-white/5">
                <label className="block text-[10px] uppercase text-slate-500 mb-4 font-bold tracking-[0.2em]">Hero Title</label>
                <input 
                  value={content.heroTitle} 
                  onChange={e => setContent({...content, heroTitle: e.target.value})} 
                  className="w-full bg-black/40 border border-white/10 p-6 rounded-sm text-white mb-8 outline-none focus:border-[#0066CC] text-xl font-sans" 
                />
                
                <label className="block text-[10px] uppercase text-slate-500 mb-4 font-bold tracking-[0.2em]">Hero Label</label>
                <input 
                  value={content.heroSubtitle} 
                  onChange={e => setContent({...content, heroSubtitle: e.target.value})} 
                  className="w-full bg-black/40 border border-white/10 p-6 rounded-sm text-white outline-none focus:border-[#0066CC]" 
                />
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-12">
               {/* Favicon Upload Section */}
               <div className="bg-slate-900/40 border border-white/5 p-10 rounded-sm">
                <h2 className="text-[#00A3FF] text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Brand Identity (Favicon)</h2>
                <div className="flex items-center gap-10 mb-8">
                  <div className="w-16 h-16 bg-black/40 rounded-sm border border-white/10 flex items-center justify-center overflow-hidden relative">
                    <img src={content.faviconUrl} alt="Favicon Preview" className="w-8 h-8 object-contain" />
                    {uploadingField === 'faviconUrl' && (
                      <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-[#00A3FF] border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-4">Upload a high-resolution PNG or ICO file for the browser tab icon.</p>
                    <input 
                      type="file" 
                      ref={faviconInputRef}
                      accept=".png,.ico,.jpg,.svg"
                      className="hidden" 
                      onChange={(e) => handleFileUpload(e, 'faviconUrl')}
                    />
                    <button 
                      onClick={() => faviconInputRef.current?.click()}
                      className="bg-[#0066CC]/10 hover:bg-[#0066CC]/20 text-[#00A3FF] px-6 py-3 border border-[#0066CC]/20 text-[10px] font-bold uppercase tracking-widest transition-all"
                    >
                      Update Icon
                    </button>
                  </div>
                </div>
              </div>

               {/* Hero Background Section */}
               <div className="bg-slate-900/40 border border-white/5 p-10 rounded-sm">
                <h2 className="text-[#00A3FF] text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Hero Background</h2>
                <div className="w-full aspect-[21/9] bg-black/40 rounded-sm border border-white/10 overflow-hidden relative mb-8">
                  <img src={content.heroImageUrl} alt="Preview" className="w-full h-full object-cover opacity-80" />
                  {uploadingField === 'heroImageUrl' && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-[#00A3FF] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={heroInputRef}
                  className="hidden" 
                  onChange={(e) => handleFileUpload(e, 'heroImageUrl')}
                />
                <button 
                  onClick={() => heroInputRef.current?.click()}
                  className="bg-[#0066CC]/10 hover:bg-[#0066CC]/20 text-[#00A3FF] px-8 py-4 border border-[#0066CC]/20 text-[10px] font-bold uppercase tracking-widest transition-all"
                >
                  Upload New Visual
                </button>
              </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="bg-slate-900/20 rounded-sm border border-white/5 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-black/40 text-[9px] uppercase text-slate-500 tracking-[0.2em]">
                    <th className="px-8 py-6">Identity</th>
                    <th className="px-8 py-6">Firm</th>
                    <th className="px-8 py-6 w-1/3">Message</th>
                    <th className="px-8 py-6 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {state.contactSubmissions.length === 0 ? (
                    <tr><td colSpan={4} className="px-10 py-20 text-center text-slate-600 italic">Logs Empty</td></tr>
                  ) : (
                    state.contactSubmissions.map(sub => (
                      <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-8 py-8">
                          <div className="text-white text-sm font-medium">{sub.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{sub.email}</div>
                        </td>
                        <td className="px-8 py-8 text-slate-400 text-xs uppercase tracking-wider">{sub.company || '--'}</td>
                        <td className="px-8 py-8 text-slate-400 text-xs leading-relaxed">{sub.message}</td>
                        <td className="px-8 py-8 text-right text-[10px] text-slate-600 font-mono">{sub.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'sync' && (
            <div className="bg-slate-900/40 border border-white/5 p-10 rounded-sm">
              <h2 className="text-white font-sans text-2xl mb-8">System Infrastructure</h2>
              <button 
                onClick={handleInitDb}
                disabled={isInitializing}
                className="bg-[#00A3FF]/10 hover:bg-[#00A3FF]/20 text-[#00A3FF] px-8 py-4 border border-[#00A3FF]/20 text-[10px] font-bold uppercase tracking-widest transition-all"
              >
                {isInitializing ? "Processing..." : "Sync Database Schema"}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
