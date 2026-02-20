import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Política de Privacidad - Zona Sur Tech',
  description: 'Política de privacidad, protección de datos (GDPR/CCPA) y cookies de Zona Sur Tech. Líderes globales en ingeniería de software.'
};

export default function PrivacyPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden bg-slate-950 min-h-screen">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[150px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px]" />
      </div>
      
      <div className="glass p-8 md:p-12 rounded-3xl max-w-4xl w-full text-left relative z-10 shadow-2xl border border-white/10 backdrop-blur-2xl bg-white/5 my-10">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60 tracking-tight">
            Política de Privacidad
            </h1>
        </div>
        
        <div className="space-y-6 text-slate-300 font-light leading-relaxed">
            <p><strong>Ultima actualización:</strong> Febrero 2026</p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Recopilación de Datos y Login Pro Max</h2>
            <p>En Zona Sur Tech, recopilamos la cantidad mínima indispensable de información para operar eficientemente nuestro ecosistema. Todo acceso mediante nuestro sistema Login Pro Max es cifrado y almacenado en servidores Phoenix de máxima seguridad.</p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Cookies y Google AdSense</h2>
            <p>Utilizamos cookies propias y de terceros (Google AdSense) para personalizar el contenido y los anuncios, ofrecer funciones de redes sociales y analizar nuestro tráfico. AdSense utiliza cookies para mostrar anuncios basados en sus visitas previas a este y otros sitios web en Internet.</p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Cumplimiento (GDPR/CCPA)</h2>
            <p>Reafirmamos nuestro compromiso como líderes globales en ingeniería de software garantizando total cumplimiento de las normativas de protección de datos. Sus datos no son vendidos a terceros.</p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Contacto de Soporte y Ventas</h2>
            <p>Para solicitudes de GDPR, eliminación de datos o cuestiones comerciales:</p>
            <ul className="list-disc pl-6 space-y-2 text-primary font-medium">
                <li>WhatsApp Comercial: +506 87623229</li>
                <li>Email Soporte: soporte@zonasurtech.online</li>
            </ul>
        </div>

        <div className="mt-12 flex justify-start">
            <Link href="/" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Volver
            </Link>
        </div>
      </div>
    </div>
  );
}
