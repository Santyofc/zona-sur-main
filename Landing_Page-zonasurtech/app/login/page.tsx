'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Mail, Lock, ArrowRight, CheckCircle, Shield, Globe, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setSuccess(true);
  };

  // Burst particles for MoJS emulation
  const Burst = () => (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
       {[...Array(12)].map((_, i) => (
         <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-emerald-400"
            initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
            animate={{ 
              scale: 0, 
              opacity: 0, 
              x: Math.cos(i * 30 * (Math.PI / 180)) * 150, 
              y: Math.sin(i * 30 * (Math.PI / 180)) * 150 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
         />
       ))}
        <motion.div 
           initial={{ scale: 0, opacity: 0.5 }}
           animate={{ scale: 2, opacity: 0 }}
           transition={{ duration: 0.8 }}
           className="absolute w-32 h-32 rounded-full border-2 border-emerald-500"
        />
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden selection:bg-blue-500/30">
      
      {/* Ambient Background - Deep Tech */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse duration-[10s]"></div>
         <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-emerald-500/5 blur-[150px] rounded-full animate-pulse duration-[8s] delay-1000"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="absolute top-8 left-8 z-20">
         <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
              <ArrowRight className="rotate-180" size={16} />
            </div>
            <span className="text-sm font-medium">Volver a Zona Sur Tech</span>
         </Link>
      </div>

      {/* Main Login Card - ScrollReveal Entrance */}
      <motion.div 
        initial={{ opacity: 0, y: 100, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className="w-full max-w-lg z-10 perspective-1000"
      >
        <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/50 overflow-hidden group">
          
          {/* Top accent line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500"></div>
          
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
              className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 mx-auto flex items-center justify-center mb-6 shadow-xl relative overflow-hidden"
            >
               <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-50"></div>
               <Cpu className="text-blue-400 relative z-10" size={32} />
            </motion.div>
            
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Acceso Privado</h1>
            <p className="text-slate-400">Plataforma de servicios Zona Sur Tech</p>
          </div>

          {!success ? (
            <motion.form 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              <div className="space-y-4">
                <Input 
                  label="Correo Corporativo" 
                  type="email" 
                  icon={<Mail size={18} />}
                  placeholder="usuario@zonasurtech.online"
                  required
                />
                
                <div className="relative">
                  <Input 
                    label="Contraseña" 
                    type="password" 
                    icon={<Lock size={18} />}
                    placeholder="••••••••••••"
                    required
                  />
                  <div className="flex justify-end mt-2">
                    <a href="mailto:soporte@zonasurtech.online?subject=Recuperar%20Contraseña" className="text-xs text-slate-500 hover:text-blue-400 transition-colors cursor-pointer">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                    type="submit" 
                    variant="accent" 
                    className="w-full h-12 text-base" 
                    glow
                    isLoading={loading}
                >
                    Ingresar al Sistema <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                 <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                    <Shield size={14} className="text-emerald-500" /> End-to-End Encrypted
                 </div>
                 <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                    <Globe size={14} className="text-blue-500" /> San Isidro, CR
                 </div>
              </div>

            </motion.form>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center relative">
               <Burst />
               <motion.div
                 initial={{ scale: 0.5, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ type: "spring" }}
                 className="flex flex-col items-center"
               >
                 <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 text-emerald-400 border border-emerald-500/50 shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)]">
                    <CheckCircle size={48} />
                 </div>
                 <h2 className="text-2xl font-bold text-white mb-2">¡Bienvenido!</h2>
                 <p className="text-slate-400 mb-8">Redirigiendo a tu dashboard...</p>
                 <Button variant="ghost" onClick={() => setSuccess(false)}>Volver (Demo)</Button>
               </motion.div>
            </div>
          )}
        </div>
        
        <p className="text-center text-slate-600 text-xs mt-8">
           &copy; {new Date().getFullYear()} Zona Sur Tech. Todos los derechos reservados.
        </p>
      </motion.div>

    </main>
  );
}
