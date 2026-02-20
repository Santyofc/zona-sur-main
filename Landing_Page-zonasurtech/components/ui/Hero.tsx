'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './Button';
import { ArrowRight, MessageCircle } from 'lucide-react';

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[100px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ y: y1, opacity }}
        >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 text-xs font-bold tracking-wider uppercase">Disponible en todo Costa Rica</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-6 leading-none">
              <span className="block text-slate-400 text-3xl md:text-5xl lg:text-6xl font-extrabold mb-2">Futuro Digital</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
                Zona Sur Tech
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Ingeniería de hardware de alto rendimiento y ecosistemas de software empresarial. 
              Elevamos el estándar tecnológico de tu negocio.
            </p>

            <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                <Button size="lg" glow onClick={() => window.open('https://wa.me/50687623229', '_blank')}>
                    <MessageCircle className="mr-2" size={20} />
                    Cotizar Proyecto
                </Button>
                <Button variant="ghost" size="lg" onClick={() => document.getElementById('software')?.scrollIntoView({ behavior: 'smooth'})}>
                    Ver Ecosistema SaaS <ArrowRight className="ml-2" size={18} />
                </Button>
            </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements (Parallax) */}
      <motion.div style={{ y: y2 }} className="absolute -left-20 top-1/3 w-64 h-64 bg-slate-900 border border-slate-800 rounded-3xl rotate-12 opacity-50 z-0 pointer-events-none" />
      <motion.div style={{ y: y2 }} className="absolute -right-20 bottom-1/4 w-40 h-40 bg-slate-900 border border-slate-800 rounded-2xl -rotate-6 opacity-30 z-0 pointer-events-none" />
    </section>
  );
};
