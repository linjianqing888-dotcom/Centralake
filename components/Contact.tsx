
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContactSubmission } from '../types.ts';

interface Props {
  onSubmit: (submission: ContactSubmission) => Promise<void>;
  onNavigate: (page: string) => void;
}

const Contact: React.FC<Props> = ({ onSubmit }) => {
  const navigate = useNavigate();
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
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all mandatory fields.");
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
      alert("Transmission error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-64 pb-24 px-6 max-w-xl mx-auto text-center min-h-screen">
        <div className="w-20 h-20 bg-[#0066CC]/20 text-[#0066CC] rounded-full flex items-center justify-center mx-auto mb-10 animate-bounce border border-[#0066CC]/30">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="text-4xl font-sans font-medium text-white mb-6">Inquiry Securely Transmitted</h2>
        <p className="text-slate-400 mb-10 leading-relaxed text-lg font-light">Your message has been encrypted and saved to our secure cloud database. A member of our relations team will reach out to <strong>{formData.email}</strong> shortly.</p>
        <button 
          onClick={() => navigate('/')} 
          className="px-10 py-4 bg-[#0066CC] hover:bg-[#004e9a] text-white font-bold uppercase tracking-widest text-xs transition-all rounded shadow-xl"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="pt-48 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="grid lg:grid-cols-2 gap-24">
        <div>
          <h2 className="text-[#00A3FF] text-sm font-bold uppercase tracking-[0.3em] mb-4">// Connect With Us</h2>
          <h3 className="text-5xl lg:text-6xl font-sans font-medium text-white mb-10 leading-tight">Institutional Inquiries</h3>
          <p className="text-slate-400 text-lg mb-12 leading-relaxed font-light">
            We partner with sovereign wealth funds, university endowments, and pension funds. All communications are strictly confidential and stored on our encrypted partner cloud.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-6 p-8 rounded-sm bg-[#002147]/20 border border-white/5">
              <div className="w-12 h-12 bg-[#0066CC]/20 flex items-center justify-center rounded text-[#00A3FF] shrink-0 border border-[#00A3FF]/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <div>
                <h4 className="text-white font-bold mb-2 uppercase text-[10px] tracking-[0.2em]">End-to-End Security</h4>
                <p className="text-slate-500 text-xs leading-relaxed font-light">All contact data is stored indefinitely in our high-redundancy, encrypted database cluster.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#002147]/10 p-10 md:p-16 rounded-sm border border-white/5 shadow-2xl relative overflow-hidden">
          {isSubmitting && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-2 border-[#00A3FF] border-t-transparent rounded-full animate-spin mb-6"></div>
              <p className="text-[#00A3FF] text-[10px] uppercase tracking-[0.4em] font-bold">Encrypting & Syncing...</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] uppercase text-[#00A3FF] mb-3 tracking-widest font-bold">Name *</label>
                <input 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/30 border border-white/10 p-4 rounded-sm text-white focus:border-[#0066CC] outline-none transition-all"
                  placeholder="Investor Name"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase text-[#00A3FF] mb-3 tracking-widest font-bold">Email *</label>
                <input 
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/30 border border-white/10 p-4 rounded-sm text-white focus:border-[#0066CC] outline-none transition-all"
                  placeholder="name@organization.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase text-[#00A3FF] mb-3 tracking-widest font-bold">Organization</label>
              <input 
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
                className="w-full bg-black/30 border border-white/10 p-4 rounded-sm text-white focus:border-[#0066CC] outline-none transition-all"
                placeholder="Institutional Name"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-[#00A3FF] mb-3 tracking-widest font-bold">Message *</label>
              <textarea 
                required
                rows={5}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full bg-black/30 border border-white/10 p-4 rounded-sm text-white focus:border-[#0066CC] outline-none resize-none transition-all"
                placeholder="Inquiry details..."
              />
            </div>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-[#0066CC] hover:bg-[#004e9a] text-white font-bold uppercase tracking-widest text-[11px] transition-all rounded shadow-lg"
            >
              Submit to Secure Portal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
