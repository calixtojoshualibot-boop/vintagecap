import { useState } from 'react';
import { api } from '../services/api';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import { NBALogo } from './TeamLogos';

interface Props { onSuccess: () => void; onBack: () => void; }

export default function AdminLogin({ onSuccess, onBack }: Props) {
  const [email, setEmail] = useState('admin@caps.ph');
  const [password, setPassword] = useState('admin123');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (api.login(email, password)) onSuccess();
    else setError('Invalid email or password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 text-sm transition-colors">
          <ArrowLeft size={16}/> Back to Showcase
        </button>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <NBALogo size={64}/>
          </div>
          <h1 className="text-2xl font-black text-white uppercase">Admin Login</h1>
          <p className="text-slate-500 text-sm mt-1">Access the management panel</p>
        </div>
        <form onSubmit={submit} className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 space-y-5">
          {error && <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"><AlertCircle size={16}/>{error}</div>}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500" required/>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/>
              <input type={show?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)}
                className="w-full pl-9 pr-11 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500" required/>
              <button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                {show ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-bold uppercase tracking-wider hover:from-red-700 hover:to-red-600 transition-all shadow-lg shadow-red-600/25">
            Sign In
          </button>
          <p className="text-xs text-slate-600 text-center">Demo: admin@caps.ph / admin123</p>
        </form>
      </div>
    </div>
  );
}
