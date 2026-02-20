import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/Header";
import { Cpu, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Zona Sur Tech | Soluciones Tecnológicas en Pérez Zeledón",
  description: "Venta de equipos, ensambles a medida y software empresarial en San Isidro de El General, Costa Rica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-slate-950 text-slate-200 selection:bg-emerald-500/30 selection:text-emerald-200`}>
        <Header />

        {children}

        {/* Footer */}
        <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              
              {/* Brand Info */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                    <Cpu className="text-emerald-500 w-5 h-5" />
                  </div>
                  <span className="font-bold text-xl text-white">Zona Sur Tech</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Innovación tecnológica desde Pérez Zeledón para toda Costa Rica. 
                  Expertos en hardware de alto rendimiento y soluciones digitales que transforman negocios.
                </p>
                <div className="flex gap-4">
                  <a href="https://www.facebook.com/zonasurtech/" target="_blank" className="bg-slate-900 p-2 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 transition-colors">
                    <Facebook size={20} />
                  </a>
                  <a href="https://www.instagram.com/santidelgados_" target="_blank" className="bg-slate-900 p-2 rounded-lg text-slate-400 hover:text-pink-500 hover:bg-pink-500/10 transition-colors">
                    <Instagram size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/santi-delgados/" target="_blank" className="bg-slate-900 p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 transition-colors">
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
              
              {/* Solutions Links */}
              <div>
                <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Ecosistema Software</h3>
                <ul className="space-y-3 text-sm text-slate-400">
                  <li>
                    <a href="http://facturacion.zonasurtech.online" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-emerald-500 transition-colors"></span>
                      Facturación Electrónica
                    </a>
                  </li>
                  <li>
                    <a href="http://crm.zonasurtech.online" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                       <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-emerald-500 transition-colors"></span>
                      CRM para Pymes
                    </a>
                  </li>
                  <li>
                    <a href="http://citas.zonasurtech.online" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                       <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-emerald-500 transition-colors"></span>
                      Gestión de Citas
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Contacto</h3>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li className="flex items-start gap-3">
                    <MapPin className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                    <span>San Isidro de El General,<br/>San José, Costa Rica.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="text-emerald-500 shrink-0" size={18} />
                    <a href="https://wa.me/50687623229" className="hover:text-white transition-colors">+506 8762 3229</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="text-emerald-500 shrink-0" size={18} />
                    <a href="mailto:contacto@zonasurtech.online" className="hover:text-white transition-colors">contacto@zonasurtech.online</a>
                  </li>
                </ul>
              </div>

              {/* Internal / Admin */}
              <div>
                <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Accesos</h3>
                <ul className="space-y-3 text-sm text-slate-400">
                  <li><a href="mailto:soporte@zonasurtech.online" className="hover:text-white">Soporte Técnico</a></li>
                  <li><a href="mailto:admin@zonasurtech.online" className="hover:text-white">Administración</a></li>
                  <li><a href="/politica-privacidad" className="hover:text-white">Política de Privacidad</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
              <p>&copy; {new Date().getFullYear()} Zona Sur Tech. Todos los derechos reservados.</p>
              <p>Desarrollado con ❤️ en Costa Rica.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
