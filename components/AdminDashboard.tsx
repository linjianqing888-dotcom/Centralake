
import React, { useState, useRef } from 'react';
import { ContentData, AppState } from '../types.ts';
import { generateFirmCopy } from '../services/gemini.ts';

interface Props {
  state: AppState;
  onUpdate: (content: ContentData) => void;
}

const AdminDashboard: React.FC<Props> = ({ state, onUpdate }) => {
  const [content, setContent] = useState<ContentData>(state.siteContent);
  const [activeTab, setActiveTab] = useState<'content' | 'media' | 'inquiries'>('content');
  const [isSaving, setIsSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [showCopyUrl, setShowCopyUrl] = useState<string | null>(null);
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setIsSaving(true);
    // In a real app, this would be a POST request to your Vercel/Supabase DB
    setTimeout(() => {
      onUpdate(content);
      setIsSaving(false);
      alert('Changes synchronized. Note: In this demo, data persists in your browser. For global access, use a public URL in the field below.');
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
    alert('Address copied to clipboard.');
  };

  const improveWithAI = async (field: keyof ContentData) => {
    setAiLoading(true);
    const currentValue = typeof content[field] === 'string' ? content[field] as string : "";
    const improved = await generateFirmCopy(currentValue);
    setContent(prev => ({ ...prev, [field]: improved }));
    setAiLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#050505] pt-16">
      <aside className="w-full md:w-72 bg-slate-950 border-r border-white/5 flex flex-col shrink-0">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
             <img src={content.logoUrl} className="h-6 w-auto grayscale" alt="Admin Logo" />
             <h2 className="text-xl font-serif text-white">Console</h2>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-2 font-bold">Infrastructure Control</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button onClick={() => setActiveTab('content')} className={`w-full flex items-center justify-between px-6 py-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'content' ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-white/5'}`}>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              Site Content
            </div>
          </button>

          <button onClick={() => setActiveTab('media')} className={`w-full flex items-center justify-between px-6 py-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'media' ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-white/5'}`}>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              Media Assets
            </div>
          </button>

          <button onClick={() => setActiveTab('inquiries')} className={`w-full flex items-center justify-between px-6 py-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'inquiries' ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-white/5'}`}>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              Communications
            </div>
          </button>
        </nav>

        <div className="p-6 border-t border-white/5 bg-black/20">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold text-center">Cloud Terminal v1.0.4</p>
        </div>
      </aside>

      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-serif text-white">
              {activeTab === 'content' && 'Content Management'}
              {activeTab === 'media' && 'Media Library'}
              {activeTab === 'inquiries' && 'Communications'}
            </h1>
            <p className="text-slate-500 text-sm mt-1 italic">Configure global brand visibility and assets.</p>
          </div>
          
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#00B36E] hover:bg-[#008f58] text-white px-8 py-3 rounded font-bold uppercase tracking-widest text-[10px] transition-all disabled:opacity-50 shadow-lg shadow-emerald-900/20"
          >
            {isSaving ? 'Syncing...' : 'Push Global Updates'}
          </button>
        </header>

        {activeTab === 'media' && (
          <div className="animate-fadeIn space-y-12">
            {/* Global Warning */}
            <div className="bg-amber-900/20 border border-amber-600/30 p-4 rounded-lg flex gap-4 items-center">
              <svg className="w-6 h-6 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              <p className="text-amber-200/80 text-xs leading-relaxed">
                <strong className="text-amber-400 uppercase">Persistence Note:</strong> Uploading files locally stores them in your browser. To make assets visible to all users globally, upload your images to a provider (like Imgur, Cloudinary, or Vercel Blob) and paste the <strong>Public URL</strong> in the fields below.
              </p>
            </div>

            <section className="bg-slate-900/40 p-10 rounded-2xl border border-white/5 space-y-12">
              {/* Logo Section */}
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="w-full md:w-64">
                   <div className="aspect-video bg-black/50 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden mb-4 p-4">
                      <img src={content.logoUrl} alt="Logo" className="max-h-full w-auto object-contain" />
                   </div>
                   <button 
                    onClick={() => logoInputRef.current?.click()}
                    className="w-full py-3 bg-emerald-600/10 text-emerald-500 border border-emerald-500/20 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all"
                   >
                     Local Upload
                   </button>
                   <input type="file" accept="image/*" className="hidden" ref={logoInputRef} onChange={(e) => handleFileUpload(e, 'logoUrl')} />
                </div>
                
                <div className="flex-1 space-y-6">
                  <div>
                    <label className="block text-[10px] uppercase text-slate-500 mb-2 font-bold tracking-widest">Global Logo URL (Public Link)</label>
                    <div className="flex gap-2">
                      <input 
                        value={content.logoUrl} 
                        onChange={e => setContent({...content, logoUrl: e.target.value})} 
                        placeholder="https://your-host.com/logo.png"
                        className="flex-1 bg-black/40 border border-white/10 p-4 rounded text-white text-sm outline-none focus:border-emerald-600 transition-colors"
                      />
                      <button 
                        onClick={() => copyToClipboard(content.logoUrl)}
                        className="px-4 bg-white/5 hover:bg-white/10 text-slate-400 rounded transition-colors"
                        title="Copy Current Address"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-600 mt-2">Paste a public URL here to override local uploads.</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-12"></div>

              {/* Favicon Section */}
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="w-full md:w-64">
                   <div className="w-24 h-24 mx-auto bg-black/50 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden mb-4 p-4">
                      <img src={content.faviconUrl} alt="Favicon" className="w-12 h-12 object-contain" />
                   </div>
                   <button 
                    onClick={() => faviconInputRef.current?.click()}
                    className="w-full py-3 bg-emerald-600/10 text-emerald-500 border border-emerald-500/20 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all"
                   >
                     Local Upload
                   </button>
                   <input type="file" accept="image/*" className="hidden" ref={faviconInputRef} onChange={(e) => handleFileUpload(e, 'faviconUrl')} />
                </div>
                
                <div className="flex-1 space-y-6">
                  <div>
                    <label className="block text-[10px] uppercase text-slate-500 mb-2 font-bold tracking-widest">Global Favicon URL (Public Link)</label>
                    <div className="flex gap-2">
                      <input 
                        value={content.faviconUrl} 
                        onChange={e => setContent({...content, faviconUrl: e.target.value})} 
                        placeholder="https://your-host.com/favicon.ico"
                        className="flex-1 bg-black/40 border border-white/10 p-4 rounded text-white text-sm outline-none focus:border-emerald-600 transition-colors"
                      />
                      <button 
                        onClick={() => copyToClipboard(content.faviconUrl)}
                        className="px-4 bg-white/5 hover:bg-white/10 text-slate-400 rounded transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Other tabs remain the same but use the updated styling... */}
        {activeTab === 'content' && (
           <div className="space-y-8 animate-fadeIn">
            <section className="bg-slate-900/40 p-10 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                <h3 className="text-emerald-500 font-serif text-lg">Identity & Hero</h3>
                <button onClick={() => improveWithAI('heroTitle')} className="text-[10px] uppercase font-bold text-slate-500 hover:text-emerald-400 transition-colors">✨ Improve Headlines</button>
              </div>
              <div className="grid gap-6">
                <div>
                  <label className="block text-[10px] uppercase text-slate-500 mb-2 font-bold tracking-widest">Main Headline</label>
                  <input value={content.heroTitle} onChange={e => setContent({...content, heroTitle: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 rounded text-white outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-slate-500 mb-2 font-bold tracking-widest">Sub Headline</label>
                  <textarea rows={3} value={content.heroSubtitle} onChange={e => setContent({...content, heroSubtitle: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 rounded text-white outline-none focus:border-emerald-600 resize-none" />
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="animate-fadeIn">
            <div className="bg-slate-950 rounded-2xl border border-white/5 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-black/40">
                  <tr>
                    <th className="px-8 py-4 text-[10px] uppercase text-slate-500">Date</th>
                    <th className="px-8 py-4 text-[10px] uppercase text-slate-500">Sender</th>
                    <th className="px-8 py-4 text-[10px] uppercase text-slate-500">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {state.contactSubmissions.length === 0 ? (
                    <tr><td colSpan={3} className="px-8 py-12 text-center text-slate-500">No communication logs found.</td></tr>
                  ) : (
                    state.contactSubmissions.map(sub => (
                      <tr key={sub.id} className="hover:bg-white/5">
                        <td className="px-8 py-6 text-xs text-slate-500">{sub.date}</td>
                        <td className="px-8 py-6">
                          <div className="text-sm text-white font-medium">{sub.name}</div>
                          <div className="text-[10px] text-slate-500">{sub.email}</div>
                        </td>
                        <td className="px-8 py-6 text-sm text-slate-400 max-w-xs truncate">{sub.message}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {aiLoading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100]">
          <div className="text-center">
             <div className="w-12 h-12 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
             <p className="text-emerald-500 font-brand uppercase tracking-widest text-[10px]">Gemini Intelligence Syncing...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
