import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Rocket, Server, Activity, ShieldCheck } from 'lucide-react';

export default function Page() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden bg-slate-950">
      {/* Background glow effects - High Fidelity Glassmorphism */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[150px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] left-[60%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>
      
      <div className="glass p-12 rounded-3xl max-w-6xl w-full text-center relative z-10 shadow-2xl border border-white/10 backdrop-blur-2xl bg-white/5">
        
        {/* Local Image integration */}
        <div className="mx-auto mb-8 flex justify-center items-center p-4 bg-white/5 rounded-2xl border border-white/10 w-fit backdrop-blur-md">
          <div className="relative w-16 h-16 flex items-center justify-center">
             <Rocket className="w-10 h-10 text-primary absolute z-10" />
             <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-white via-white/80 to-white/40 mb-6 tracking-tight">
          Módulo REVIEWS
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed font-light max-w-2xl mx-auto">
          Análisis profundo de software e IA con métricas reales para AdSense. Líderes globales en ingeniería de software de alto rendimiento.
        </p>

        {/* Featured Assets Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
          
          {/* Software Review Card */}
          <div className="glass p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex flex-col h-full">
            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 border border-white/10">
               {/* Update path when the CDN is configured or the image is accessible from this app's public/images */}
               <Image 
                 src="/images/ia_software_review.webp" 
                 alt="Interfaz de usuario futurista estilo Glassmorphism con gráficas de datos brillantes para análisis de IA"
                 fill
                 className="object-cover hover:scale-105 transition-transform duration-500"
               />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-bold text-white">Zona Sur AI Analytics</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
              Plataforma de análisis predictivo con interfaz neuro-gráfica. Rendimiento optimizado para monitoreo en tiempo real con latencia sub-milisegundo.
            </p>
            <div className="flex items-center justify-between mt-auto">
               <span className="text-xs font-mono px-3 py-1 bg-primary/20 text-primary rounded-full border border-primary/30">SCORE: 9.8/10</span>
               <span className="text-xs text-slate-500">AdSense Verified</span>
            </div>
          </div>

           {/* Hardware Review Card */}
           <div className="glass p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex flex-col h-full">
            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 border border-white/10">
               {/* Update path when the CDN is configured or the image is accessible from this app's public/images */}
               <Image 
                 src="/images/premium_hardware_node.webp" 
                 alt="Fotografía realista de un servidor tipo rack de alto rendimiento con luces LED azules y acabado de cristal"
                 fill
                 className="object-cover hover:scale-105 transition-transform duration-500"
               />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Server className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold text-white">Nodo PHX-1 Enterprise</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
              Arquitectura bare-metal con refrigeración líquida cuántica. Diseñado para soportar cargas de IA LLM con un uptime del 99.999%.
            </p>
            <div className="flex items-center justify-between mt-auto">
               <span className="text-xs font-mono px-3 py-1 bg-accent/20 text-accent rounded-full border border-accent/30">CERTIFIED NODE</span>
               <ShieldCheck className="w-4 h-4 text-slate-500" />
            </div>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-4">
          <Link href="https://zonasurtech.online" className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 font-medium text-slate-200">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Volver al Hub
          </Link>
          <a href="https://wa.me/50687623229" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] transform hover:-translate-y-0.5">
            Contactar Ventas
          </a>
        </div>
      </div>
      
      <div className="mt-16 text-sm text-slate-500 font-mono text-center relative z-10 glass px-6 py-2 rounded-full flex items-center gap-3">
         <Image src="/images/zonasur_glass_logo.webp" alt="Zona Sur Tech Glass Logo" width={24} height={24} className="rounded-full" />
        <span>Despliegue: <span className="text-accent font-semibold">Coolify (209.74.83.205)</span> | Puerto: <span className="text-primary">22022</span> | {new Date().getFullYear()} Zona Sur Tech</span>
      </div>
    </div>
  );
}
