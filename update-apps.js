const fs = require('fs');
const path = require('path');

const apps = [
  'admin', 'api', 'auth', 'citas', 'crm', 'facturacion', 
  'reviews', 'cdn', 'stack', 'status', 'monitor', 'registro', 'app', 'logs'
];

const appsDir = path.join(__dirname, 'apps');

const descriptions = {
  stack: 'Nuestra base tecnológica: Next.js 15, Docker y Phoenix Infra. Líderes globales en ingeniería de software de alto rendimiento.',
  auth: 'Acceso seguro vía Login Pro Max para el ecosistema global. Líderes globales en ingeniería de software de alto rendimiento.',
  reviews: 'Análisis profundo de software e IA con métricas reales para AdSense. Líderes globales en ingeniería de software de alto rendimiento.',
  status: 'Transparencia total: Uptime en tiempo real de nuestros nodos PHX-1. Líderes globales en ingeniería de software de alto rendimiento.'
};

const defaultDescription = 'Líderes globales en ingeniería de software de alto rendimiento.';

apps.forEach(app => {
  const appDir = path.join(appsDir, app);
  const appSrcDir = path.join(appDir, 'app');
  const publicDir = path.join(appDir, 'public');
  const imagesDir = path.join(publicDir, 'images');

  // Create public/images for all apps
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

  // specific for cdn
  if (app === 'cdn') {
    const logosDir = path.join(imagesDir, 'logos');
    const productsDir = path.join(imagesDir, 'products');
    if (!fs.existsSync(logosDir)) fs.mkdirSync(logosDir, { recursive: true });
    if (!fs.existsSync(productsDir)) fs.mkdirSync(productsDir, { recursive: true });
  }

  // Generate a placeholder logo image for demonstration since we can't create real images here yet, 
  // but we can create an empty file just to satisfy the path check in Next.js build or we can just reference it.
  
  // Update layout.tsx
  const description = descriptions[app] || defaultDescription;
  const layoutTsx = `import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zona Sur Tech - ${app.charAt(0).toUpperCase() + app.slice(1)}",
  description: "${description}",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-background text-foreground min-h-screen selection:bg-primary/30">
        <main className="flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
`;
  fs.writeFileSync(path.join(appSrcDir, 'layout.tsx'), layoutTsx);

  // Update page.tsx with Glassmorphism and Next/Image
  const pageTsx = `import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Rocket } from 'lucide-react';

export default function Page() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden bg-slate-950">
      {/* Background glow effects - High Fidelity Glassmorphism */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[150px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] left-[60%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>
      
      <div className="glass p-12 rounded-3xl max-w-4xl w-full text-center relative z-10 shadow-2xl border border-white/10 backdrop-blur-2xl bg-white/5">
        
        {/* Local Image integration */}
        <div className="mx-auto mb-8 flex justify-center items-center p-4 bg-white/5 rounded-2xl border border-white/10 w-fit backdrop-blur-md">
          <div className="relative w-16 h-16 flex items-center justify-center">
             <Rocket className="w-10 h-10 text-primary absolute z-10" />
             <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-white via-white/80 to-white/40 mb-6 tracking-tight">
          Módulo ${app.toUpperCase()}
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed font-light max-w-2xl mx-auto">
          {` + "`" + `${description}` + "`" + `}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
          <Link href="https://zonasurtech.online" className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 font-medium text-slate-200">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Volver al Hub
          </Link>
          <a href="https://wa.me/50687623229" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] transform hover:-translate-y-0.5">
            Contactar Ventas
          </a>
        </div>
      </div>
      
      <div className="mt-16 text-sm text-slate-500 font-mono text-center relative z-10 glass px-6 py-2 rounded-full">
        Despliegue: <span className="text-accent font-semibold">Coolify (209.74.83.205)</span> | Puerto: <span className="text-primary">22022</span> | {new Date().getFullYear()} Zona Sur Tech
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(appSrcDir, 'page.tsx'), pageTsx);

  console.log("✅ " + app + " updated with premium copy and UI.");
});
console.log('🎉 All 14 applications updated.');
