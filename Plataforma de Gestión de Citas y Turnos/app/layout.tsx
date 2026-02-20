import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/store';
import Toast from '@/components/Toast';

export const metadata: Metadata = {
  title: 'CitaFácil — Plataforma de Gestión de Citas',
  description: 'La plataforma más completa para gestionar citas y turnos para tu negocio de servicios.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AppProvider>
          {children}
          <Toast />
        </AppProvider>
      </body>
    </html>
  );
}
