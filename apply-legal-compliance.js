const fs = require('fs');
const path = require('path');

const apps = [
  'admin', 'api', 'auth', 'citas', 'crm', 'facturacion', 
  'reviews', 'cdn', 'stack', 'status', 'monitor', 'registro', 'app', 'logs'
];

const appsDir = path.join(__dirname, 'apps');
const adsenseId = 'ca-pub-8338467922774671';
const adsTxtId = 'pub-8338467922774671';

// 1 & 4. AdSense Script and Global Footer Injection
apps.forEach(app => {
  const appSrcDir = path.join(appsDir, app, 'app');
  const layoutFilePath = path.join(appSrcDir, 'layout.tsx');

  if (fs.existsSync(layoutFilePath)) {
    let layoutContent = fs.readFileSync(layoutFilePath, 'utf8');

    // Add import for Script if it doesn't exist
    if (!layoutContent.includes('import Script from "next/script";')) {
      layoutContent = layoutContent.replace('import type { Metadata } from "next";', 
        'import type { Metadata } from "next";\nimport Script from "next/script";');
    }

    // Add Script, Meta tag and Footer
    let updated = false;

    if (!layoutContent.includes('Google AdSense Verification')) {
      layoutContent = layoutContent.replace(
        '<html lang="es">',
        '<html lang="es">\n' +
      '      <head>\n' +
      '        {/* Google AdSense Verification */}\n' +
      '        <meta name="google-adsense-account" content="' + adsenseId + '" />\n' +
      '        <Script \n' +
      '          async \n' +
      '          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + adsenseId + '" \n' +
      '          crossOrigin="anonymous" \n' +
      '          strategy="afterInteractive" \n' +
      '        />\n' +
      '      </head>'
      );
      updated = true;
    }

    if (!layoutContent.includes('Global Footer Integration')) {
        layoutContent = layoutContent.replace(
        '        </main>',
        '        </main>\n' +
      '          {/* Global Footer Integration */}\n' +
      '          <footer className="w-full border-t border-white/5 bg-slate-950/50 backdrop-blur-lg py-6 mt-auto">\n' +
      '            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">\n' +
      '              <p className="text-sm text-slate-400 font-light">\n' +
      '                © ' + new Date().getFullYear() + ' Zona Sur Tech. Líderes globales en ingeniería de software de alto rendimiento.\n' +
      '              </p>\n' +
      '              <div className="flex flex-wrap items-center justify-center gap-6">\n' +
      '                <a href="https://zonasurtech.online" className="text-sm text-slate-400 hover:text-primary transition-colors">Main Hub</a>\n' +
      '                <a href="https://app.zonasurtech.online/privacy" className="text-sm text-slate-400 hover:text-primary transition-colors">Privacidad</a>\n' +
      '                <a href="https://app.zonasurtech.online/terms" className="text-sm text-slate-400 hover:text-primary transition-colors">Términos</a>\n' +
      '              </div>\n' +
      '            </div>\n' +
      '          </footer>'
        );
        updated = true;
    }

    if(updated){
        fs.writeFileSync(layoutFilePath, layoutContent);
        console.log("✅ Layout updated for " + app);
    } else {
        console.log("⚠️ Layout already up to date for " + app);
    }
  }
});

// 2. Create ads.txt
const adsTxtContent = "google.com, " + adsTxtId + ", DIRECT, f08c47fec0942fa0\n";
['app', 'reviews'].forEach(targetApp => {
  const publicDir = path.join(appsDir, targetApp, 'public');
  if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
  }
  const adsTxtPath = path.join(publicDir, 'ads.txt');
  fs.writeFileSync(adsTxtPath, adsTxtContent);
  console.log("✅ ads.txt created in " + targetApp + "/public/ads.txt");
});

// 3. Privacy and Terms pages for app and reviews
const privacyContent = `import Link from 'next/link';
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
`;

const termsContent = `import Link from 'next/link';
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
`;

['app', 'reviews'].forEach(targetApp => {
  const privacyDir = path.join(appsDir, targetApp, 'app', 'privacy');
  const termsDir = path.join(appsDir, targetApp, 'app', 'terms');
  
  if (!fs.existsSync(privacyDir)) fs.mkdirSync(privacyDir, { recursive: true });
  if (!fs.existsSync(termsDir)) fs.mkdirSync(termsDir, { recursive: true });

  fs.writeFileSync(path.join(privacyDir, 'page.tsx'), privacyContent);
  fs.writeFileSync(path.join(termsDir, 'page.tsx'), termsContent);
  
  console.log("✅ Legal pages generated for " + targetApp);
});

console.log('🎉 AdSense, Legal and GDPR Compliance Applied successfully.');
