import Link from 'next/link';
import { Scale, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Términos y Condiciones - Zona Sur Tech',
  description: 'Términos de servicio, propiedad intelectual y uso de los servicios web de Zona Sur Tech.'
};

export default function TermsPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden bg-slate-950 min-h-screen">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="glass p-8 md:p-12 rounded-3xl max-w-4xl w-full text-left relative z-10 shadow-2xl border border-white/10 backdrop-blur-2xl bg-white/5 my-10">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-white/10 rounded-xl border border-white/20">
                <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60 tracking-tight">
            Términos y Condiciones
            </h1>
        </div>
        
        <div className="space-y-6 text-slate-300 font-light leading-relaxed">
            <p><strong>Ultima actualización:</strong> Febrero 2026</p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Aceptación de los Términos</h2>
            <p>Al acceder o utilizar los servicios y el ecosistema web de Zona Sur Tech, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo, por favor no utilice nuestros servicios.</p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Propiedad Intelectual e IA</h2>
            <p>Todas las aplicaciones SaaS, el componente Login Pro Max, diseños en Glassmorphism, y algoritmos de inteligencia artificial desarrollados bajo el dominio zonasurtech.online, son propiedad intelectual exclusiva de Zona Sur Tech y están protegidos por las leyes internacionales de derechos de autor.</p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Limitación de Responsabilidad</h2>
            <p>Como líderes globales en ingeniería de software de alto rendimiento, nos esforzamos por ofrecer un uptime del 99.9% en nuestros servidores Phoenix. Sin embargo, los servicios se brindan "tal cual" y no garantizamos resultados ininterrumpidos en entornos de conectividad de terceros.</p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Legislación Aplicable</h2>
            <p>La operación de esta infraestructura se rige bajo el marco legal comercial internacional aplicable a servicios de computación en la nube (Cloud Computing).</p>
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
