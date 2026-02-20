'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from './Input';
import { Button } from './Button';
import { Mail, Lock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from './Card';

export const GlassLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setStatus('success');
  };

  return (
    <Card className="max-w-md w-full mx-auto overflow-visible p-1" gradientColor="#60a5fa">
      <div className="bg-slate-950/80 backdrop-blur-xl rounded-2xl p-8 border border-white/5 relative overflow-hidden">
        
        {/* Confetti/Burst Animation on Success */}
        <AnimatePresence>
          {status === 'success' && (
            <motion.div 
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1.5 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/90"
            >
               <motion.div 
                 initial={{ scale: 0 }}
                 animate={{ scale: 1, rotate: 360 }}
                 transition={{ type: "spring", stiffness: 200, damping: 10 }}
                 className="flex flex-col items-center gap-4"
               >
                 <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center border-2 border-emerald-500 text-emerald-500">
                    <CheckCircle size={40} />
                 </div>
                 <div className="text-center">
                    <h3 className="text-xl font-bold text-white">¡Bienvenido!</h3>
                    <p className="text-slate-400">Redirigiendo al dashboard...</p>
                 </div>
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center mb-8">
           <motion.div 
             initial={{ y: -20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white mx-auto mb-4 shadow-lg shadow-blue-500/30"
           >
             Z
           </motion.div>
           <h2 className="text-2xl font-bold text-white mb-2">Iniciar Sesión</h2>
           <p className="text-slate-400 text-sm">Accede a tu cuenta de Zona Sur Tech</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
             label="Correo Electrónico" 
             type="email" 
             icon={<Mail size={18} />}
             placeholder="nombre@empresa.com"
          />
          
          <Input 
             label="Contraseña" 
             type="password" 
             icon={<Lock size={18} />}
             placeholder="••••••••"
          />

          <div className="flex justify-between items-center text-xs text-slate-400">
             <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                <input type="checkbox" className="rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500/20" />
                Recordarme
             </label>
             <a href="#" className="hover:text-emerald-400 transition-colors">¿Olvidaste tu contraseña?</a>
          </div>

          <Button 
            variant="primary" 
            className="w-full" 
            size="lg" 
            glow 
            isLoading={loading}
          >
            Ingresar al Sistema <ArrowRight className="ml-2" size={18} />
          </Button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-500">
           ¿No tienes cuenta? <a href="#" className="text-emerald-400 font-bold hover:underline">Solicitar Acceso</a>
        </div>
      </div>
    </Card>
  );
};
