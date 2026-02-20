'use client';
import { Hero } from '@/components/ui/Hero';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Monitor, 
  Code, 
  Server, 
  Smartphone, 
  CheckCircle, 
  ArrowRight,
  Linkedin,
  Instagram,
  Mail,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

export default function Home() {
  return (
    <main className="bg-slate-950 min-h-screen">
      
      <Hero />

      {/* Services Grid (Using Card Component) */}
      <section id="servicios" className="py-24 bg-slate-900/20 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Soluciones Integrales</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Hardware potente y software inteligente. Ingeniería de precisión para tu empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card gradientColor="#10b981" className="p-8">
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/10 transition-colors">
                <Monitor className="text-emerald-500" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Workstations & Gaming</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Ensambles de alto rendimiento con certificación de estrés. Componentes seleccionados manualmente para máxima durabilidad.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle size={16} className="text-emerald-500 shrink-0" /> Benchmarking Profesional
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle size={16} className="text-emerald-500 shrink-0" /> Gestión de Cables Premium
                </li>
              </ul>
            </Card>

            <Card gradientColor="#3b82f6" className="p-8">
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/10 transition-colors">
                <Code className="text-blue-500" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Software Factory</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Desarrollo web a la medida con tecnologías modernas (Next.js, Node.js). Sistemas escalables y seguros desde el día uno.
              </p>
               <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle size={16} className="text-blue-500 shrink-0" /> Arquitectura Cloud
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle size={16} className="text-blue-500 shrink-0" /> UI/UX de Alto Impacto
                </li>
              </ul>
            </Card>

            <Card gradientColor="#a855f7" className="p-8">
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/10 transition-colors">
                <Server className="text-purple-500" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Infraestructura IT</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Soporte técnico especializado para empresas. Redes, servidores y seguridad perimetral para proteger tus datos.
              </p>
               <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle size={16} className="text-purple-500 shrink-0" /> Mantenimiento Preventivo
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle size={16} className="text-purple-500 shrink-0" /> Soporte On-Site 24/7
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Software Ecosystem */}
      <section id="software" className="py-32 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
             <span className="text-emerald-500 font-bold tracking-widest uppercase text-xs mb-2 block">Zona Sur Tech SaaS</span>
             <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Plataformas Empresariales</h2>
             <p className="text-slate-400 max-w-2xl mx-auto text-lg">
               Software potente pero simple, diseñado para acelerar el crecimiento de los negocios en Costa Rica.
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Facturación */}
            <Card gradientColor="#3b82f6" className="flex flex-col h-full bg-slate-900/40 border-slate-800/60 p-0">
               <div className="p-8 flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 text-blue-400">
                        <Code size={24} />
                    </div>
                    <span className="bg-blue-500/10 text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/20">HACIENDA</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Facturación Electrónica</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Sistema completo de facturación validado por Hacienda. Facturas, notas de crédito y reportes fiscales automáticos.
                  </p>
               </div>
               <div className="p-8 pt-0 mt-auto">
                  <a href="http://facturacion.zonasurtech.online" target="_blank" className="flex items-center justify-between text-white font-medium group/link">
                    <span className="group-hover/link:text-blue-400 transition-colors">Iniciar Sistema</span>
                    <ExternalLink size={18} className="text-slate-500 group-hover/link:text-blue-400 transition-colors" />
                  </a>
               </div>
            </Card>

            {/* CRM */}
            <Card gradientColor="#a855f7" className="flex flex-col h-full bg-slate-900/40 border-slate-800/60 p-0">
               <div className="p-8 flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20 text-purple-400">
                        <Smartphone size={24} />
                    </div>
                    <span className="bg-purple-500/10 text-purple-400 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/20">VENTAS</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">CRM Simple</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Gestiona tu pipeline de ventas, cotizaciones y base de datos de clientes. Diseñado para freelancers y agencias.
                  </p>
               </div>
               <div className="p-8 pt-0 mt-auto">
                  <a href="http://crm.zonasurtech.online" target="_blank" className="flex items-center justify-between text-white font-medium group/link">
                    <span className="group-hover/link:text-purple-400 transition-colors">Ver Dashboard</span>
                    <ExternalLink size={18} className="text-slate-500 group-hover/link:text-purple-400 transition-colors" />
                  </a>
               </div>
            </Card>

             {/* Citas */}
            <Card gradientColor="#10b981" className="flex flex-col h-full bg-slate-900/40 border-slate-800/60 p-0">
               <div className="p-8 flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                        <Server size={24} />
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20">AGENDA</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Gestión de Citas</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Agenda virtual 24/7 con recordatorios por WhatsApp. Ideal para clínicas, consultorios y salones de belleza.
                  </p>
               </div>
               <div className="p-8 pt-0 mt-auto">
                  <a href="http://citas.zonasurtech.online" target="_blank" className="flex items-center justify-between text-white font-medium group/link">
                    <span className="group-hover/link:text-emerald-400 transition-colors">Agendar Cita</span>
                    <ExternalLink size={18} className="text-slate-500 group-hover/link:text-emerald-400 transition-colors" />
                  </a>
               </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="fundador" className="py-24 bg-slate-950 border-t border-white/5 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card gradientColor="#10b981" className="p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center bg-slate-900/30 border-slate-800">
             <div className="shrink-0 relative">
                <div className="w-48 h-48 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center border-4 border-slate-950 shadow-2xl relative overflow-hidden group">
                   <div className="absolute inset-0 bg-emerald-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <div className="text-6xl font-bold text-slate-500 relative z-10">JS</div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full border-4 border-slate-900 flex items-center gap-1 shadow-lg">
                  <CheckCircle size={10} /> FUNDADOR
                </div>
             </div>
             
             <div className="flex-1 text-center md:text-left">
               <h2 className="text-3xl font-bold text-white mb-2">Jose Santiago Delgado</h2>
               <p className="text-emerald-400 font-medium mb-6 text-sm tracking-wide uppercase">Lead Developer & Tech Enthusiast</p>
               <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                 "En Zona Sur Tech no solo vendemos tecnología, construimos relaciones de confianza. 
                 Mi compromiso es ofrecer soluciones que realmente funcionen para tu negocio, con el respaldo y la garantía que mereces."
               </p>
               
               <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <Button variant="outline" size="sm" onClick={() => window.open('https://www.linkedin.com/in/santi-delgados/', '_blank')}>
                    <Linkedin size={16} className="mr-2" /> LinkedIn
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.open('https://www.instagram.com/santidelgados_', '_blank')}>
                    <Instagram size={16} className="mr-2" /> Instagram
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.open('mailto:santidelgados@zonasurtech.online', '_blank')}>
                    <Mail size={16} className="mr-2" /> Email
                  </Button>
               </div>
             </div>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
         
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-black text-white mb-8 tracking-tight">¿Tienes un proyecto en mente?</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Desde armar tu próxima PC Gamer hasta digitalizar toda tu empresa. Estamos listos para ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" glow onClick={() => window.open('https://wa.me/50687623229', '_blank')}>
              <MessageCircle className="mr-2" size={20} />
              WhatsApp Directo
            </Button>
            <Button variant="secondary" size="lg" onClick={() => window.open('mailto:contacto@zonasurtech.online')}>
              <Mail className="mr-2" size={20} />
              Enviar Correo
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
