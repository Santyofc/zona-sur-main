'use client';
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { CalendarDays, Mail, Lock, Eye, EyeOff, ArrowRight, User, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const { login, showToast } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const success = login(email, password);
    if (success) {
      const role = email === 'negocio@demo.com' ? 'business' : 'client';
      router.push(role === 'business' ? '/dashboard' : '/cliente');
    } else {
      showToast('Email o contraseña incorrectos', 'error');
    }
    setLoading(false);
  };

  const quickLogin = (role: 'business' | 'client') => {
    const creds = {
      business: { email: 'negocio@demo.com', password: '123456' },
      client: { email: 'cliente@demo.com', password: '123456' },
    };
    setEmail(creds[role].email);
    setPassword(creds[role].password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(96,80,248,0.2) 0%, transparent 60%), var(--bg-primary)' }}>
      <div className="w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #6050f8, #4228d9)', boxShadow: '0 0 32px rgba(96,80,248,0.4)' }}>
            <CalendarDays size={26} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">CitaFácil</h1>
          <p className="text-gray-400 mt-1 text-sm">Gestión de citas y turnos</p>
        </div>

        {/* Quick access buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => quickLogin('business')}
            className="flex items-center gap-2 p-3 rounded-xl border border-brand-500/30 bg-brand-500/8 text-brand-400 hover:bg-brand-500/15 transition-all text-sm font-medium"
          >
            <Briefcase size={16} />
            <div className="text-left">
              <div className="font-semibold">Demo Negocio</div>
              <div className="text-xs opacity-70">negocio@demo.com</div>
            </div>
          </button>
          <button
            onClick={() => quickLogin('client')}
            className="flex items-center gap-2 p-3 rounded-xl border border-cyan-500/30 bg-cyan-500/8 text-cyan-400 hover:bg-cyan-500/15 transition-all text-sm font-medium"
          >
            <User size={16} />
            <div className="text-left">
              <div className="font-semibold">Demo Cliente</div>
              <div className="text-xs opacity-70">cliente@demo.com</div>
            </div>
          </button>
        </div>

        {/* Form */}
        <div className="card p-7">
          <h2 className="text-xl font-bold text-white mb-5">Iniciar sesión</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="input-dark pl-9"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-dark pl-9 pr-10"
                  placeholder="••••••"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 mt-2">
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Ingresar <ArrowRight size={16} /></>
              )}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-5">
            ¿No tienes cuenta?{' '}
            <Link href="/registro" className="text-brand-400 hover:text-brand-300 font-medium">Registrarse</Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          Contraseña demo: <span className="text-gray-400 font-mono">123456</span>
        </p>
      </div>
    </div>
  );
}
