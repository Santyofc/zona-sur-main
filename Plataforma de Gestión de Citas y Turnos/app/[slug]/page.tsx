'use client';
import { useApp } from '@/lib/store';
import { BUSINESSES } from '@/lib/mockData';
import { CalendarDays, Clock, Star, MapPin, Phone, ArrowRight, Scissors } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function BusinessPage({ params }: { params: { slug: string } }) {
  const { state } = useApp();
  const business = (state.businesses.length > 0 ? state.businesses : BUSINESSES).find(b => b.slug === params.slug);

  if (!business) return notFound();

  const services = state.services.filter(s => s.businessId === business.id && s.active);
  const employees = state.employees.filter(e => e.businessId === business.id && e.active);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${business.coverColor}40 0%, rgba(10,10,18,0.95) 60%, var(--bg-primary) 100%)`, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(ellipse at 20% 50%, ${business.coverColor} 0%, transparent 60%)` }} />
        <div className="relative max-w-5xl mx-auto px-6 py-16">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center text-white text-2xl font-black flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${business.coverColor}, ${business.coverColor}cc)`, boxShadow: `0 0 40px ${business.coverColor}50` }}
            >
              {business.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: `${business.coverColor}20`, color: business.coverColor, border: `1px solid ${business.coverColor}30` }}>
                  {business.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-400 text-xs">
                  <Star size={12} className="fill-current" />
                  <span>4.9</span>
                  <span className="text-gray-500">(143 reseñas)</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white">{business.name}</h1>
              <p className="text-gray-300 mt-1">{business.tagline}</p>
              <div className="flex flex-wrap gap-4 mt-3">
                <span className="flex items-center gap-1.5 text-sm text-gray-400"><MapPin size={14} />{business.address}</span>
                <span className="flex items-center gap-1.5 text-sm text-gray-400"><Phone size={14} />{business.phone}</span>
              </div>
            </div>
            <div className="sm:ml-auto flex-shrink-0">
              <Link href={`/${params.slug}/reservar`} className="btn-primary px-6 py-3.5 text-base">
                Reservar cita <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-5">Nuestros servicios</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map(svc => (
                <div key={svc.id} className="card p-5 glass-hover">
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${business.coverColor}20` }}>
                      <Scissors size={16} style={{ color: business.coverColor }} />
                    </div>
                    <span className="text-sm font-bold text-white">${svc.price}</span>
                  </div>
                  <h3 className="font-semibold text-white">{svc.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 mb-3">{svc.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12} />{svc.duration} min</span>
                    <Link href={`/${params.slug}/reservar?service=${svc.id}`}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                      style={{ background: `${business.coverColor}20`, color: business.coverColor }}>
                      Reservar →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="card p-5">
              <h3 className="font-semibold text-white mb-4">Nuestro equipo</h3>
              <div className="space-y-3">
                {employees.map(emp => (
                  <div key={emp.id} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: emp.color }}>
                      {emp.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{emp.name}</p>
                      <p className="text-xs text-gray-500">{emp.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="font-semibold text-white mb-4">Horario</h3>
              <div className="space-y-1.5">
                {[['Lunes - Viernes', '9:00 - 19:00'], ['Sábado', '10:00 - 20:00'], ['Domingo', 'Cerrado']].map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="text-gray-400">{day}</span>
                    <span className={hours === 'Cerrado' ? 'text-red-400' : 'text-white font-medium'}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link href={`/${params.slug}/reservar`} className="btn-primary w-full justify-center py-3.5 text-base">
              <CalendarDays size={18} />
              Reservar ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
