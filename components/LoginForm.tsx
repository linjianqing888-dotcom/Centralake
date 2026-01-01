
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
      setError('System Error. Please check your connection.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen pt-48 px-6 flex justify-center bg-slate-50">
      <div className="max-w-md w-full">
        <div className="bg-white p-12 rounded-sm border border-slate-200 shadow-2xl relative overflow-hidden">
          {isLoggingIn && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#0066CC] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-[#0066CC] text-[10px] uppercase tracking-widest font-bold">Authenticating...</p>
            </div>
          )}

          <div className="text-center mb-12">
            <div className="flex flex-col items-center mb-8">
              <span className="text-[#001226] text-3xl font-serif-elegant font-light uppercase tracking-widest">Centralake</span>
              <span className="text-[#0066CC] text-[10px] font-bold uppercase tracking-[0.4em] mt-2">Capital</span>
            </div>
            <p className="text-slate-400 text-[10px] tracking-[0.2em] uppercase font-bold">Authorized Investor Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-[10px] uppercase text-[#0066CC] mb-3 tracking-widest font-bold">Email Address</label>
              <input 
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-sm text-slate-800 focus:border-[#0066CC] outline-none transition-all placeholder:text-slate-300"
                placeholder="partner@centralake.com"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-[#0066CC] mb-3 tracking-widest font-bold">Secure Access Key</label>
              <input 
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-sm text-slate-800 focus:border-[#0066CC] outline-none transition-all placeholder:text-slate-300"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-600 text-[10px] bg-red-50 p-4 rounded-sm border border-red-100 font-bold uppercase tracking-tight">{error}</p>}

            <button 
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-5 bg-[#001226] hover:bg-[#002244] text-white font-bold uppercase tracking-widest text-[11px] transition-all rounded-sm shadow-xl disabled:opacity-50"
            >
              Access Portal
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">
              Secure 256-bit AES Encryption Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
