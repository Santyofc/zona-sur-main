"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Mail, ShieldAlert } from 'lucide-react';

export default function RegistroPage() {
  const [email, setEmail] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accepted || !email) return;

    setStatus('loading');
    
    // Simulating API Call to Newsletter Prisma insertion
    setTimeout(() => {
        setStatus('success');
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden bg-slate-950 min-h-[90vh]">
      {/* Background glow effects - High Fidelity Glassmorphism */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[20%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      </div>
      
      <div className="glass p-10 md:p-14 rounded-3xl max-w-2xl w-full text-center relative z-10 shadow-2xl border border-white/10 backdrop-blur-2xl bg-white/5">
        
        <div className="mx-auto mb-6 flex justify-center items-center p-4 bg-primary/10 rounded-2xl border border-primary/20 w-fit backdrop-blur-md">
           <Mail className="w-10 h-10 text-primary" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-white via-white/80 to-primary/60 mb-6 tracking-tight">
          Unirse a la Red Global de Software
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light">
          Sé el primero en recibir acceso exclusivo a nuestras herramientas de IA y actualizaciones del nodo PHX-1.
        </p>

        {status === 'success' ? (
          <div className="glass p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 animate-in fade-in zoom-in duration-500">
             <h3 className="text-2xl font-bold text-emerald-400 mb-4">¡Suscripción Confirmada!</h3>
             <p className="text-slate-300 mb-6 font-light">Bienvenido a la red élite de Zona Sur Tech. Tu acceso prioritario ha sido registrado en nuestra base de datos centralizada.</p>
             <a href="https://wa.me/50687623229" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-all shadow-lg hover:shadow-emerald-500/30">
                Contactar Soporte VIP por WhatsApp
             </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full space-y-6">
             <div className="relative group">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@empresa.com"
                  disabled={status === 'loading'}
                  className="w-full bg-black/20 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-5 py-4 text-white placeholder:text-slate-500 outline-none transition-all disabled:opacity-50"
                />
             </div>
             
             <div className="flex justify-start text-left items-start gap-3 px-2">
                <input 
                    type="checkbox" 
                    id="legal" 
                    required
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-white/20 bg-black/20 text-primary focus:ring-primary focus:ring-offset-slate-950"
                />
                <label htmlFor="legal" className="text-sm text-slate-400 font-light leading-snug">
                    Acepto la <a href="https://app.zonasurtech.online/privacy" target="_blank" className="text-primary hover:underline">Política de Privacidad</a> y los <a href="https://app.zonasurtech.online/terms" target="_blank" className="text-primary hover:underline">Términos y Condiciones</a> de Zona Sur Tech.
                </label>
             </div>

             <button 
                type="submit" 
                disabled={status === 'loading' || !accepted || !email}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] disabled:opacity-50 disabled:cursor-not-allowed group"
             >
                {status === 'loading' ? (
                   <span className="animate-pulse">Cifrando y guardando credenciales...</span>
                ) : (
                   <>Acceder a la Infraestructura <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                )}
             </button>
          </form>
        )}

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
          <Link href="https://zonasurtech.online" className="group flex items-center justify-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al Hub
          </Link>
        </div>
      </div>
      
      <div className="mt-12 text-xs text-slate-500 font-mono text-center flex items-center gap-2 glass px-4 py-2 rounded-full">
         <ShieldAlert className="w-4 h-4 text-emerald-500" />
         Conexión Segura de Extremo a Extremo. Protected by Phoenix Server.
      </div>
    </div>
  );
}
