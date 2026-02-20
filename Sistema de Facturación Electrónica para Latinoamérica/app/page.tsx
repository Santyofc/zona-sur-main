'use client';
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, ArrowLeft, Globe } from 'lucide-react';

export default function LoginPage() {
  const { dispatch } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'LOGIN',
      payload: { id: 'u1', name: 'Admin Zona Sur', email: email || 'demo@empresa.com' },
    });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        {/* Left Side - Branding */}
        <div className="md:w-1/2 bg-slate-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">Z</div>
              <span className="font-bold text-xl">Zona Sur Tech</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">Facturación Electrónica Profesional</h1>
            <p className="text-slate-400 text-lg">
              Emite comprobantes válidos para SUNAT, SAT y DIAN desde una sola plataforma.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 text-slate-300">
              <ShieldCheck className="text-blue-500" />
              <span>Certificado por Hacienda</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
               <Globe className="text-blue-500" />
               <span>Multi-moneda y Multi-país</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center bg-white relative">
          <a href="https://zonasurtech.online" className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 flex items-center gap-1 text-sm font-medium">
            <ArrowLeft size={16} /> Volver al sitio
          </a>

          <h2 className="text-2xl font-bold text-slate-800 mb-2">Iniciar Sesión</h2>
          <p className="text-slate-500 mb-8 font-light">Accede a tu panel de facturación.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10 h-11" 
                  placeholder="admin@zonasurtech.online"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 h-11" 
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20">
              Ingresar al Sistema <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              Desarrollado por <a href="https://zonasurtech.online" target="_blank" className="text-blue-600 font-medium hover:underline">Zona Sur Tech</a>
            </p>
            <p className="text-xs text-slate-400 mt-1">San Isidro de El General, Costa Rica</p>
          </div>
        </div>
      </div>
    </div>
  );
}
