import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Zona Sur Tech - App",
  description: "Líderes globales en ingeniería de software de alto rendimiento.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Google AdSense Verification */}
        <meta name="google-adsense-account" content="ca-pub-8338467922774671" />
        <Script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8338467922774671" 
          crossOrigin="anonymous" 
          strategy="afterInteractive" 
        />
      </head>
      <body className="antialiased bg-background text-foreground min-h-screen selection:bg-primary/30">
        <main className="flex flex-col min-h-screen">
          {children}
        </main>
          {/* Global Footer Integration */}
          <footer className="w-full border-t border-white/5 bg-slate-950/50 backdrop-blur-lg py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-400 font-light">
                © 2026 Zona Sur Tech. Líderes globales en ingeniería de software de alto rendimiento.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <a href="https://zonasurtech.online" className="text-sm text-slate-400 hover:text-primary transition-colors">Main Hub</a>
                <a href="https://app.zonasurtech.online/privacy" className="text-sm text-slate-400 hover:text-primary transition-colors">Privacidad</a>
                <a href="https://app.zonasurtech.online/terms" className="text-sm text-slate-400 hover:text-primary transition-colors">Términos</a>
              </div>
            </div>
          </footer>
      </body>
    </html>
  );
}
