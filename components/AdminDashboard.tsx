
import React, { useState, useRef, useEffect } from 'react';
import { ContentData, AppState } from '../types.ts';
import { generateFirmCopy } from '../services/gemini.ts';
import { ApiService } from '../services/api.ts';

interface Props {
  state: AppState;
  onUpdate: (content: ContentData) => void;
}

const AdminDashboard: React.FC<Props> = ({ state, onUpdate }) => {
  const [content, setContent] = useState<ContentData>(state.siteContent);
  const [activeTab, setActiveTab] = useState<'content' | 'media' | 'inquiries' | 'sync'>('content');
  const [isSaving, setIsSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [cloudConnected, setCloudConnected] = useState(false);
  const [importJson, setImportJson] = useState('');
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ApiService.isCloudConnected().then(setCloudConnected);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdate(content);
      setIsSaving(false);
      alert('Global State Synchronized.');
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'logoUrl' | 'faviconUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard.');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#050505] pt-16">
      <aside className="w-full md:w-72 bg-slate-950 border-r border-white/5 flex flex-col shrink-0">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
             <img src={content.logoUrl} className="h-6 w-auto grayscale" alt="Admin Logo" />
             <h2 className="text-xl font-serif text-white">Console</h2>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className={`w-1.5 h-1.5 rounded-full ${cloudConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></div>
            <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">
              {cloudConnected ? 'Cloud Active' : 'Local Sandbox Mode'}
            </p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button onClick={() => setActiveTab('content')} className={`w-full flex items-center gap-3 px-6 py-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'content' ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-white/5'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            Content
          </button>
          <button onClick={() => setActiveTab('media')} className={`w-full flex items-center gap-3 px-6 py-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'media' ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-white/5'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Assets
          </button>
          <button onClick={() => setActiveTab('inquiries')} className={`w-full flex items-center gap-3 px-6 py-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'inquiries' ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-white/5'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            Inquiries
          </button>
          <button onClick={() => setActiveTab('sync')} className={`w-full flex items-center gap-3 px-6 py-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'sync' ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-white/5'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            Infrastructure
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-serif text-white">
              {activeTab === 'content' && 'Edit Content'}
              {activeTab === 'media' && 'Media Library'}
              {activeTab === 'inquiries' && 'Form Submissions'}
              {activeTab === 'sync' && 'System Infrastructure'}
            </h1>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#00B36E] hover:bg-[#008f58] text-white px-8 py-3 rounded font-bold uppercase tracking-widest text-[10px] transition-all disabled:opacity-50"
          >
            {isSaving ? 'Synchronizing...' : 'Deploy Updates'}
          </button>
        </header>

        {activeTab === 'sync' && (
          <div className="animate-fadeIn space-y-8">
            <section className="bg-slate-900/40 p-10 rounded-2xl border border-white/5">
              <h3 className="text-emerald-500 font-serif text-lg mb-6">Cross-Device Synchronization</h3>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h4 className="text-white font-medium">Manual Sync (Temporary)</h4>
                  <p className="text-slate-500 text-sm">Use these functions to manually move your data between devices without a database.</p>
                  
                  <div className="space-y-4">
                    <button 
                      onClick={() => copyToClipboard(ApiService.exportData())}
                      className="w-full py-3 bg-white/5 text-white border border-white/10 rounded text-xs font-bold uppercase tracking-widest hover:bg-white/10"
                    >
                      Export Data to Clipboard
                    </button>
                    
                    <div className="space-y-2">
                      <textarea 
                        value={importJson}
                        onChange={e => setImportJson(e.target.value)}
                        placeholder="Paste JSON data here..."
                        className="w-full bg-black/40 border border-white/10 p-4 rounded text-white text-xs font-mono h-24 outline-none"
                      />
                      <button 
                        onClick={() => ApiService.importData(importJson)}
                        className="w-full py-3 bg-emerald-600/20 text-emerald-500 border border-emerald-500/20 rounded text-xs font-bold uppercase tracking-widest hover:bg-emerald-600 hover:text-white"
                      >
                        Import & Overwrite Local Data
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-white font-medium">Vercel Database Integration</h4>
                  <div className="bg-black/50 p-6 rounded-lg border border-white/5">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      To enable true global sync, you must:
                      <br/><br/>
                      1. Go to your <span className="text-emerald-500">Vercel Dashboard</span>.
                      <br/>
                      2. Select <span className="text-emerald-500">Storage</span> -&gt; <span className="text-emerald-500">Postgres</span>.
                      <br/>
                      3. Create a database and connect it to this project.
                      <br/>
                      4. Create a folder <span className="text-emerald-500">/api</span> in your root.
                      <br/>
                      5. Add a file <span className="text-emerald-500">state.ts</span> to handle GET/POST.
                    </p>
                    <button className="mt-4 text-[10px] text-emerald-500 underline font-bold uppercase">View API Code Snippets</button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Media & Content Tabs remain functional as before */}
        {activeTab === 'media' && (
          <div className="animate-fadeIn space-y-12">
             <section className="bg-slate-900/40 p-10 rounded-2xl border border-white/5 space-y-12">
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="w-full md:w-64">
                   <div className="aspect-video bg-black/50 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden mb-4 p-4">
                      <img src={content.logoUrl} alt="Logo" className="max-h-full w-auto object-contain" />
                   </div>
                   <button onClick={() => logoInputRef.current?.click()} className="w-full py-3 bg-emerald-600/10 text-emerald-500 border border-emerald-500/20 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all">Local Upload</button>
                   <input type="file" accept="image/*" className="hidden" ref={logoInputRef} onChange={(e) => handleFileUpload(e, 'logoUrl')} />
                </div>
                <div className="flex-1 space-y-6">
                   <label className="block text-[10px] uppercase text-slate-500 mb-2 font-bold tracking-widest">Global Logo URL</label>
                   <input value={content.logoUrl} onChange={e => setContent({...content, logoUrl: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 rounded text-white text-sm outline-none" />
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="animate-fadeIn">
            <div className="bg-slate-950 rounded-2xl border border-white/5 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-black/40 text-[10px] uppercase text-slate-500">
                  <tr>
                    <th className="px-8 py-4">Date</th>
                    <th className="px-8 py-4">Sender</th>
                    <th className="px-8 py-4">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {state.contactSubmissions.length === 0 ? (
                    <tr><td colSpan={3} className="px-8 py-12 text-center text-slate-500 italic">No communication logs found.</td></tr>
                  ) : (
                    state.contactSubmissions.map(sub => (
                      <tr key={sub.id} className="hover:bg-white/5">
                        <td className="px-8 py-6 text-slate-500">{sub.date}</td>
                        <td className="px-8 py-6">
                          <div className="text-white font-medium">{sub.name}</div>
                          <div className="text-[10px] text-slate-500">{sub.email}</div>
                        </td>
                        <td className="px-8 py-6 text-slate-400 max-w-xs truncate">{sub.message}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="animate-fadeIn space-y-8">
            <section className="bg-slate-900/40 p-10 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                <h3 className="text-emerald-500 font-serif text-lg">Main Page Headlines</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase text-slate-500 mb-2 font-bold tracking-widest">Hero Title</label>
                  <input value={content.heroTitle} onChange={e => setContent({...content, heroTitle: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 rounded text-white outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-slate-500 mb-2 font-bold tracking-widest">Hero Subtitle</label>
                  <textarea rows={3} value={content.heroSubtitle} onChange={e => setContent({...content, heroSubtitle: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 rounded text-white outline-none focus:border-emerald-600 resize-none" />
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
