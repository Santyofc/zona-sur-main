'use client';
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { Button } from './Button';
import { Cpu, Menu, X, Home, Briefcase, Code, User, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BottomSheet } from './BottomSheet';

export const Header = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  const navLinks = [
    { name: 'Inicio', href: '/#inicio', icon: Home },
    { name: 'Servicios', href: '/#servicios', icon: Briefcase },
    { name: 'Software', href: '/#software', icon: Code },
    { name: 'Reseñas', href: '/reviews', icon: Star },
    { name: 'Nosotros', href: '/#fundador', icon: User },
  ];

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-300",
          scrolled ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent py-6"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group z-50">
            <div className="relative w-10 h-10 flex items-center justify-center bg-slate-900 rounded-xl border border-slate-800 overflow-hidden group-hover:border-emerald-500/50 transition-colors">
               <div className="absolute inset-0 bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
               <Cpu className="text-emerald-500 relative z-10" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-tight text-lg leading-none">Zona Sur Tech</span>
              <span className="text-[10px] text-emerald-500 font-medium tracking-widest uppercase">Costa Rica</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-1 bg-slate-900/50 p-1 rounded-full border border-white/5 backdrop-blur-sm">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <Button 
              variant="primary" 
              glow 
              onClick={() => window.open('https://wa.me/50687623229', '_blank')}
            >
              Cotizar
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-slate-300 p-2 z-50 bg-slate-800/50 rounded-lg backdrop-blur-md"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Bottom Sheet */}
      <BottomSheet 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
        title="Menú Principal"
      >
        <div className="flex flex-col gap-2">
           {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center gap-4 text-base font-medium text-slate-300 p-4 rounded-xl hover:bg-slate-800 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-500">
                <link.icon size={20} />
              </div>
              {link.name}
            </a>
          ))}
          
          <div className="mt-6 pt-6 border-t border-slate-800">
             <Button className="w-full flex items-center justify-center gap-2" size="lg" glow onClick={() => window.open('https://wa.me/50687623229', '_blank')}>
                <MessageCircle size={20} />
                WhatsApp Directo
             </Button>
          </div>
        </div>
      </BottomSheet>
    </>
  );
};
