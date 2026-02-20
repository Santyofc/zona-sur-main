'use client';
import Link from 'next/link';
import { CalendarDays, ArrowRight } from 'lucide-react';

export default function RegistroPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(96,80,248,0.2) 0%,transparent 60%), var(--bg-primary)' }}>
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#6050f8,#4228d9)', boxShadow: '0 0 32px rgba(96,80,248,0.4)' }}>
            <CalendarDays size={26} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Crear cuenta</h1>
          <p className="text-gray-400 mt-1 text-sm">Empieza gratis, sin tarjeta de crédito</p>
        </div>

        <div className="card p-7">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Nombre</label>
                <input type="text" className="input-dark" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Apellido</label>
                <input type="text" className="input-dark" placeholder="Tu apellido" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Nombre del negocio</label>
              <input type="text" className="input-dark" placeholder="Mi Barbería / Mi Consultorio..." />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Email</label>
              <input type="email" className="input-dark" placeholder="tu@email.com" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Contraseña</label>
              <input type="password" className="input-dark" placeholder="Mínimo 6 caracteres" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Tipo de cuenta</label>
              <select className="input-dark">
                <option value="business">Negocio / Profesional</option>
                <option value="client">Cliente</option>
              </select>
            </div>
            <Link href="/login" className="btn-primary w-full justify-center py-3 mt-2">
              Crear cuenta <ArrowRight size={16} />
            </Link>
          </div>
          <p className="text-center text-sm text-gray-500 mt-5">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-brand-400 hover:text-brand-300 font-medium">Iniciar sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
