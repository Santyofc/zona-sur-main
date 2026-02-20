'use client';
import Link from 'next/link';
import { CalendarDays, Clock, Users, BarChart3, Bell, CreditCard, Star, ArrowRight, Check, ArrowLeft } from 'lucide-react';
import { useApp } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { state } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (state.currentUser) {
      router.push(state.currentUser.role === 'business' ? '/dashboard' : '/cliente');
    }
  }, [state.currentUser, router]);

  const features = [
    { icon: CalendarDays, title: 'Calendario interactivo', desc: 'Gestiona tu agenda con una vista completa por profesional y día.' },
    { icon: Bell,         title: 'Recordatorios automáticos', desc: 'Tus clientes reciben confirmaciones y recordatorios por email.' },
    { icon: Users,        title: 'Gestión de clientes', desc: 'Historial completo de visitas, notas y preferencias de cada cliente.' },
    { icon: CreditCard,   title: 'Pagos integrados', desc: 'Cobra al reservar con tarjeta. Control total de tus ingresos.' },
    { icon: BarChart3,    title: 'Reportes detallados', desc: 'Analiza ocupación, facturación y servicios más populares.' },
    { icon: Clock,        title: 'Página pública', desc: 'Tus clientes reservan 24/7 desde tu página personalizada.' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl" style={{ background: 'rgba(10,10,18,0.9)' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-emerald-600">
            <CalendarDays size={16} className="text-white" />
          </div>
          <div>
             <span className="text-lg font-bold text-white leading-none block">Zona Sur Tech</span>
             <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Gestión de Citas</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://zonasurtech.online" className="text-sm text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
            <ArrowLeft size={14} /> Volver al sitio
          </a>
          <div className="flex items-center gap-3">
             <Link href="/login" className="btn-secondary text-sm py-2">Iniciar sesión</Link>
             <Link href="/registro" className="btn-primary text-sm py-2 bg-emerald-600 border-emerald-600 hover:bg-emerald-700">Empezar gratis</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 py-24" style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(16, 185, 129,0.15) 0%,transparent 65%)' }}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8" style={{ background: 'rgba(16, 185, 129,0.1)', border: '1px solid rgba(16, 185, 129,0.2)', color: '#34d399' }}>
          <Star size={14} className="text-yellow-400" />
          Gratis para los primeros 100 negocios en Pérez Zeledón
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white mb-5 leading-tight">
          Tu agenda y citas,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            perfectamente organizadas.
          </span>
        </h1>
        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
          Plataforma especializada para barberías, consultorios, dentistas y spas en Costa Rica. 
          Reduce el ausentismo con recordatorios automáticos de WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login" className="btn-primary text-base px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 border-none">
            Ver demo en vivo <ArrowRight size={18} />
          </Link>
          <a href="https://wa.me/50687623229" target="_blank" className="btn-secondary text-base px-8 py-3.5">
            Contactar Ventas
          </a>
        </div>
        <p className="text-xs text-gray-600 mt-5">Sin tarjeta de crédito · Soporte local en Costa Rica</p>
      </section>

      {/* Features */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-3">Todo lo que necesitas</h2>
        <p className="text-gray-400 text-center mb-12">Una plataforma completa diseñada para negocios de servicios</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="card p-6 glass-hover transition-all">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(16, 185, 129,0.1)', border: '1px solid rgba(16, 185, 129,0.2)' }}>
                <f.icon size={20} className="text-emerald-400" />
              </div>
              <h3 className="font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-8 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
           <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center">
                  <CalendarDays size={13} className="text-white" />
                </div>
                <span className="font-bold text-white">Zona Sur Tech</span>
             </div>
             <p className="text-gray-500 text-sm max-w-sm">
                San Isidro de El General, Costa Rica.<br/>
                Desarrollamos soluciones tecnológicas para potenciar tu negocio.
             </p>
           </div>
           
           <div>
              <h4 className="text-white font-bold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                 <li><Link href="#" className="hover:text-emerald-400">Términos de servicio</Link></li>
                 <li><Link href="#" className="hover:text-emerald-400">Privacidad de datos</Link></li>
              </ul>
           </div>

           <div>
              <h4 className="text-white font-bold mb-4 text-sm">Contacto</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                 <li><a href="mailto:soporte@zonasurtech.online" className="hover:text-emerald-400">Soporte Técnico</a></li>
                 <li><a href="https://wa.me/50687623229" className="hover:text-emerald-400">WhatsApp Comercial</a></li>
              </ul>
           </div>
        </div>
        <div className="border-t border-white/5 pt-8 text-center">
           <p className="text-gray-600 text-xs">© {new Date().getFullYear()} Zona Sur Tech. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
