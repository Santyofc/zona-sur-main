'use client';
import { useApp } from '@/lib/store';
import { format, parseISO, isFuture, isToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarDays, Clock, ExternalLink } from 'lucide-react';
import Badge from '@/components/Badge';
import Link from 'next/link';
import { Appointment } from '@/lib/types';

export default function ClientePage() {
  const { state, dispatch, showToast } = useApp();
  const clientId = state.currentUser?.clientId;
  const appts = state.appointments
    .filter(a => a.clientId === clientId)
    .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));

  const upcoming = appts.filter(a => (isFuture(parseISO(a.date + 'T' + a.time)) || isToday(parseISO(a.date))) && a.status !== 'cancelada');
  const past = appts.filter(a => !isFuture(parseISO(a.date + 'T' + a.time)) || a.status === 'cancelada' || a.status === 'completada').slice(0, 10);

  const handleCancel = (appt: Appointment) => {
    dispatch({ type: 'UPDATE_APPOINTMENT', payload: { ...appt, status: 'cancelada' } });
    showToast('Cita cancelada', 'info');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Mis Citas</h1>
          <p className="text-gray-400 text-sm mt-1">Bienvenida, {state.currentUser?.name} 👋</p>
        </div>
        <Link href="/demo/reservar" className="btn-primary text-sm">
          <CalendarDays size={15} />
          Nueva reserva
        </Link>
      </div>

      {/* Upcoming */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
          <Clock size={16} className="text-cyan-400" />
          Próximas citas ({upcoming.length})
        </h2>
        {upcoming.length === 0 ? (
          <div className="card p-10 text-center">
            <CalendarDays size={36} className="text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">No tienes citas próximas</p>
            <Link href="/demo/reservar" className="btn-primary mt-4 inline-flex">
              Reservar ahora
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.map(appt => (
              <div key={appt.id} className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">{appt.serviceName}</h3>
                    <Badge status={appt.status} />
                  </div>
                  <p className="text-sm text-gray-400">
                    {format(parseISO(appt.date), "EEEE d 'de' MMMM yyyy", { locale: es })} a las <strong className="text-white">{appt.time}</strong>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Con {appt.employeeName} · {appt.serviceDuration} min · ${appt.servicePrice}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${appt.paymentStatus === 'pagado' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                    {appt.paymentStatus === 'pagado' ? '✅ Pagado' : '⏳ Pago pendiente'}
                  </span>
                  {appt.status !== 'cancelada' && (
                    <button onClick={() => handleCancel(appt)} className="btn-danger text-xs py-1.5 px-3">
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* History */}
      <div>
        <h2 className="text-base font-semibold text-white mb-4">Historial de visitas</h2>
        {past.length === 0 ? (
          <p className="text-gray-500 text-sm">Sin visitas anteriores</p>
        ) : (
          <div className="card overflow-hidden">
            <table className="table-dark">
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Fecha</th>
                  <th>Profesional</th>
                  <th>Precio</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {past.map(appt => (
                  <tr key={appt.id}>
                    <td className="font-medium text-white">{appt.serviceName}</td>
                    <td className="text-gray-400 text-sm">
                      {format(parseISO(appt.date), "d MMM yyyy", { locale: es })}
                    </td>
                    <td className="text-gray-300 text-sm">{appt.employeeName}</td>
                    <td className="font-semibold text-white">${appt.servicePrice}</td>
                    <td><Badge status={appt.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
