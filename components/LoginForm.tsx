
import React, { useState } from 'react';
import { User, ContentData } from '../types.ts';
import { ApiService } from '../services/api.ts';

interface Props {
  onLogin: (user: User) => void;
  content: ContentData;
}

const LoginForm: React.FC<Props> = ({ onLogin, content }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    try {
      const user = await ApiService.login(email, password);
      if (user) {
        onLogin(user);
      } else {
        setError('Access Denied. Identity could not be verified.');
      }
    } catch (err) {
      setError('System Error. Please check your cloud connection.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 flex justify-center bg-[#050505]">
      <div className="max-w-md w-full">
        <div className="bg-slate-900/30 p-10 rounded-2xl border border-emerald-500/10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {isLoggingIn && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-emerald-500 text-[9px] uppercase tracking-widest font-bold">Verifying Credentials...</p>
            </div>
          )}

          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <img src={content.logoUrl} alt="Logo" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-slate-500 text-xs tracking-widest uppercase font-bold">Authorized Terminal Access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase text-[#00B36E] mb-2 tracking-widest font-bold">Email</label>
              <input 
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-white/5 p-4 rounded text-white focus:border-[#00B36E] outline-none transition-all placeholder:text-slate-800"
                placeholder="partner@centralake.com"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-[#00B36E] mb-2 tracking-widest font-bold">Secure Key</label>
              <input 
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/5 p-4 rounded text-white focus:border-[#00B36E] outline-none transition-all placeholder:text-slate-800"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-400 text-[10px] bg-red-400/5 p-3 rounded border border-red-400/10 font-bold uppercase tracking-tight">{error}</p>}

            <button 
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-4 bg-[#00B36E] hover:bg-[#008f58] text-white font-bold uppercase tracking-widest transition-all rounded shadow-lg shadow-emerald-900/20 disabled:opacity-50"
            >
              Sign In
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-[9px] text-slate-700 uppercase tracking-widest font-bold">
              Secure Session Layer 1.3 Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
