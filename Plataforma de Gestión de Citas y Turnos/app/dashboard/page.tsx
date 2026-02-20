'use client';
import { useApp } from '@/lib/store';
import { format, isToday, isFuture, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarDays, Clock, DollarSign, TrendingUp, Users, CheckCircle, AlertCircle, Link } from 'lucide-react';
import Badge from '@/components/Badge';
import NextLink from 'next/link';

export default function DashboardPage() {
  const { state } = useApp();
  const { appointments, employees, clients } = state;

  const todayAppts = appointments.filter(a => isToday(parseISO(a.date)) && a.status !== 'cancelada');
  const upcomingAppts = appointments
    .filter(a => isFuture(parseISO(a.date + 'T' + a.time)) && (a.status === 'confirmada' || a.status === 'pendiente'))
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .slice(0, 8);

  const monthRevenue = appointments
    .filter(a => a.paymentStatus === 'pagado' && a.date.startsWith(format(new Date(), 'yyyy-MM')))
    .reduce((sum, a) => sum + a.servicePrice, 0);

  const confirmedToday = todayAppts.filter(a => a.status === 'confirmada').length;
  const totalSlots = employees.length * 10; // ~10 slots per employee per day
  const occupancy = totalSlots > 0 ? Math.round((todayAppts.length / totalSlots) * 100) : 0;

  const stats = [
    {
      label: 'Citas hoy',
      value: todayAppts.length,
      icon: CalendarDays,
      sub: `${confirmedToday} confirmadas`,
      color: 'stat-card-purple',
      iconBg: 'rgba(96, 80, 248, 0.15)',
      iconColor: '#a998ff',
    },
    {
      label: 'Próximas citas',
      value: upcomingAppts.length,
      icon: Clock,
      sub: 'próximos 7 días',
      color: 'stat-card-cyan',
      iconBg: 'rgba(6, 182, 212, 0.15)',
      iconColor: '#22d3ee',
    },
    {
      label: 'Ingresos del mes',
      value: `$${monthRevenue.toLocaleString('es-MX')}`,
      icon: DollarSign,
      sub: 'pagos recibidos',
      color: 'stat-card-green',
      iconBg: 'rgba(34, 197, 94, 0.15)',
      iconColor: '#4ade80',
    },
    {
      label: 'Ocupación hoy',
      value: `${Math.min(occupancy, 100)}%`,
      icon: TrendingUp,
      sub: `${todayAppts.length} / ${totalSlots} turnos`,
      color: 'stat-card-amber',
      iconBg: 'rgba(245, 158, 11, 0.15)',
      iconColor: '#fbbf24',
    },
  ];

  const business = state.businesses.find(b => b.id === state.currentUser?.businessId);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1 capitalize">
            {format(new Date(), "EEEE, d 'de' MMMM yyyy", { locale: es })}
          </p>
        </div>
        <div className="flex gap-3">
          {business && (
            <NextLink
              href={`/${business.slug}`}
              target="_blank"
              className="btn-secondary text-sm"
            >
              <Link size={15} />
              Ver página pública
            </NextLink>
          )}
          <NextLink href="/dashboard/citas" className="btn-primary text-sm">
            <CalendarDays size={15} />
            Nueva cita
          </NextLink>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className={`card p-5 ${stat.color}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-1.5">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>
              </div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: stat.iconBg }}>
                <stat.icon size={20} style={{ color: stat.iconColor }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's appointments */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              Citas de hoy
            </h2>
            <NextLink href="/dashboard/citas" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">
              Ver todas →
            </NextLink>
          </div>

          {todayAppts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CalendarDays size={40} className="text-gray-600 mb-3" />
              <p className="text-gray-400 font-medium">Sin citas para hoy</p>
              <p className="text-gray-600 text-sm mt-1">Disfruta el día libre 🎉</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayAppts.map(appt => {
                const emp = employees.find(e => e.id === appt.employeeId);
                return (
                  <div key={appt.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/2 transition-colors group">
                    <div className="text-center w-14 flex-shrink-0">
                      <div className="text-lg font-bold text-white leading-none">{appt.time}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{appt.serviceDuration}min</div>
                    </div>
                    <div
                      className="w-0.5 h-10 rounded-full flex-shrink-0"
                      style={{ background: emp?.color || '#6050f8' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm truncate">{appt.clientName}</p>
                      <p className="text-xs text-gray-400 truncate">{appt.serviceName} · {appt.employeeName}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-sm font-semibold text-white">${appt.servicePrice}</span>
                      <Badge status={appt.status} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick stats column */}
        <div className="space-y-4">
          {/* Upcoming summary */}
          <div className="card p-5">
            <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <Clock size={16} className="text-cyan-400" />
              Próximas citas
            </h2>
            {upcomingAppts.slice(0, 5).length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">Sin próximas citas</p>
            ) : (
              <div className="space-y-3">
                {upcomingAppts.slice(0, 5).map(appt => (
                  <div key={appt.id} className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-white truncate">{appt.clientName}</p>
                      <p className="text-xs text-gray-500">{format(parseISO(appt.date), 'd MMM', { locale: es })} a las {appt.time}</p>
                    </div>
                    <Badge status={appt.status} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Team status */}
          <div className="card p-5">
            <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <Users size={16} className="text-purple-400" />
              Equipo disponible
            </h2>
            <div className="space-y-3">
              {employees.map(emp => {
                const empTodayCount = todayAppts.filter(a => a.employeeId === emp.id).length;
                return (
                  <div key={emp.id} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: emp.color }}
                    >
                      {emp.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{emp.name}</p>
                      <p className="text-xs text-gray-500">{empTodayCount} citas hoy</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {emp.active
                        ? <><CheckCircle size={14} className="text-green-400" /><span className="text-xs text-green-400">Activo</span></>
                        : <><AlertCircle size={14} className="text-gray-500" /><span className="text-xs text-gray-500">Inactivo</span></>
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats summary */}
          <div className="card p-5">
            <h2 className="text-base font-semibold text-white mb-4">Resumen rápido</h2>
            <div className="space-y-2">
              {[
                { label: 'Clientes totales', value: clients.length },
                { label: 'Servicios activos', value: state.services.filter(s => s.active).length },
                { label: 'Empleados activos', value: employees.filter(e => e.active).length },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-1">
                  <span className="text-sm text-gray-400">{item.label}</span>
                  <span className="text-sm font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
