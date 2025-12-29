
import React, { useState } from 'react';
import { User, ContentData } from '../types';

interface Props {
  onLogin: (user: User) => void;
  content: ContentData;
}

const LoginForm: React.FC<Props> = ({ onLogin, content }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email === 'admin@centralake.com' && password === 'admin') {
      onLogin({ id: 'admin_1', email, name: 'Managing Partner', role: 'admin' });
    } else if (email === 'client@example.com' && password === 'client') {
      onLogin({ 
        id: 'client_1', 
        email, 
        name: 'Sarah Jenkins', 
        role: 'client', 
        firmName: 'Global Endowment Fund' 
      });
    } else {
      setError('Access Denied. Please verify credentials or contact firm support.');
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 flex justify-center bg-[#050505]">
      <div className="max-w-md w-full">
        <div className="bg-slate-900/30 p-10 rounded-2xl border border-emerald-500/10 backdrop-blur-xl shadow-2xl">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <img src={content.logoUrl} alt="Centralake Logo" className="h-20 w-auto object-contain" />
            </div>
            {/* Header text removed */}
            <p className="text-slate-500 text-sm tracking-wide uppercase font-medium mt-4">Investor Terminal Access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase text-[#00B36E] mb-2 tracking-[0.2em] font-bold">Authorized Email</label>
              <input 
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-white/5 p-4 rounded text-white focus:border-[#00B36E] outline-none transition-all placeholder:text-slate-700 font-medium"
                placeholder="partner@institution.com"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-[#00B36E] mb-2 tracking-[0.2em] font-bold">Secure Key</label>
              <input 
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/5 p-4 rounded text-white focus:border-[#00B36E] outline-none transition-all placeholder:text-slate-700"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-400 text-xs bg-red-400/5 p-3 rounded border border-red-400/10 font-medium">{error}</p>}

            <button 
              type="submit"
              className="w-full py-4 bg-[#00B36E] hover:bg-[#008f58] text-white font-bold uppercase tracking-widest transition-all rounded shadow-lg shadow-emerald-900/20"
            >
              Sign In to Secure Portal
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] text-slate-600 leading-relaxed uppercase tracking-wider font-bold">
              Protected by TLS 1.3 Encryption<br/>Identity Verified
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
