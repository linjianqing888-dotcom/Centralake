
import React, { useState } from 'react';
import { ContactSubmission } from '../types';

interface Props {
  onSubmit: (submission: ContactSubmission) => Promise<void>;
  onNavigate: (page: string) => void;
}

const Contact: React.FC<Props> = ({ onSubmit, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation check though 'required' attribute handles most cases
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all mandatory fields (Name, Email, Message).");
      return;
    }

    setIsSubmitting(true);
    
    const submission: ContactSubmission = {
      ...formData,
      id: Date.now().toString(),
      date: new Date().toLocaleString()
    };
    
    try {
      await onSubmit(submission);
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      alert("Transmission error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-48 pb-24 px-6 max-w-xl mx-auto text-center min-h-screen">
        <div className="w-20 h-20 bg-emerald-600/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="text-4xl font-serif text-white mb-4">Inquiry Securely Transmitted</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">Your message has been encrypted and saved to our secure cloud database. A member of our relations team will reach out to <strong>{formData.email}</strong> shortly.</p>
        <button 
          onClick={() => onNavigate('home')} 
          className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest text-sm transition-all rounded shadow-lg shadow-emerald-900/40"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="grid lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-emerald-500 text-sm font-bold uppercase tracking-widest mb-4">Connect With Us</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">Institutional Inquiries</h3>
          <p className="text-slate-400 text-lg mb-12 leading-relaxed font-light">
            We partner with sovereign wealth funds, university endowments, and pension funds. All communications are strictly confidential and stored on our encrypted partner cloud.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-emerald-900/5 border border-emerald-500/10">
              <div className="w-10 h-10 bg-emerald-900/20 flex items-center justify-center rounded text-emerald-500 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1 uppercase text-[10px] tracking-widest">End-to-End Security</h4>
                <p className="text-slate-500 text-xs">All contact data, including your email and message, is stored indefinitely in our high-redundancy database cluster.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
          {isSubmitting && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-emerald-500 text-[10px] uppercase tracking-[0.3em] font-bold">Encrypting & Syncing...</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase text-emerald-500 mb-2 tracking-widest font-bold">
                  Name <span className="text-red-500">*</span>
                </label>
                <input 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 p-4 rounded text-white focus:border-emerald-600 outline-none transition-colors"
                  placeholder="Investor Name"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase text-emerald-500 mb-2 tracking-widest font-bold">
                  Email <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 p-4 rounded text-white focus:border-emerald-600 outline-none transition-colors"
                  placeholder="name@organization.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase text-emerald-500 mb-2 tracking-widest font-bold">Organization (Optional)</label>
              <input 
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
                className="w-full bg-black/50 border border-white/10 p-4 rounded text-white focus:border-emerald-600 outline-none transition-colors"
                placeholder="Institutional Name"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-emerald-500 mb-2 tracking-widest font-bold">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea 
                required
                rows={5}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full bg-black/50 border border-white/10 p-4 rounded text-white focus:border-emerald-600 outline-none resize-none transition-colors"
                placeholder="Please describe your inquiry details..."
              />
            </div>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest transition-all rounded shadow-lg shadow-emerald-900/20 disabled:opacity-50"
            >
              Submit to Secure Portal
            </button>
            <p className="text-[9px] text-slate-600 text-center uppercase tracking-widest">
              * Required fields for institutional verification
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
