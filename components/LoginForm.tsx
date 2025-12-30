
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
    <div className="min-h-screen pt-48 px-6 flex justify-center bg-[#050505]">
      <div className="max-w-md w-full">
        <div className="bg-[#002147]/20 p-12 rounded-sm border border-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {isLoggingIn && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#00A3FF] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-[#00A3FF] text-[9px] uppercase tracking-widest font-bold">Verifying...</p>
            </div>
          )}

          <div className="text-center mb-12">
            <div className="flex flex-col items-center mb-8">
              <span className="text-white text-3xl font-bold uppercase tracking-tighter">Centralake</span>
              <span className="text-[#00A3FF] text-[10px] font-bold uppercase tracking-[0.5em] mt-2">Capital</span>
            </div>
            <p className="text-slate-500 text-[10px] tracking-[0.2em] uppercase font-bold">Authorized Investor Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-[10px] uppercase text-[#00A3FF] mb-3 tracking-widest font-bold">Email Address</label>
              <input 
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-black/30 border border-white/10 p-4 rounded-sm text-white focus:border-[#0066CC] outline-none transition-all placeholder:text-slate-800"
                placeholder="partner@centralake.com"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-[#00A3FF] mb-3 tracking-widest font-bold">Secure Access Key</label>
              <input 
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-black/30 border border-white/10 p-4 rounded-sm text-white focus:border-[#0066CC] outline-none transition-all placeholder:text-slate-800"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-400 text-[10px] bg-red-400/5 p-4 rounded-sm border border-red-400/10 font-bold uppercase tracking-tight">{error}</p>}

            <button 
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-5 bg-[#0066CC] hover:bg-[#004e9a] text-white font-bold uppercase tracking-widest text-[11px] transition-all rounded-sm shadow-xl disabled:opacity-50"
            >
              Authenticate Session
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-[9px] text-slate-700 uppercase tracking-widest font-bold">
              Secure Socket Layer (SSL) 4096-bit Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
