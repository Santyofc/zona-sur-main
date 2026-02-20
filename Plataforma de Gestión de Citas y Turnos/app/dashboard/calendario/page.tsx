'use client';
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday, parseISO, isSameDay, addMonths, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Badge from '@/components/Badge';
import Modal from '@/components/Modal';
import { Appointment } from '@/lib/types';

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export default function CalendarioPage() {
  const { state, dispatch, showToast } = useApp();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState('todos');
  const [viewMode, setViewMode] = useState<'month' | 'list'>('month');
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);

  const { appointments, employees } = state;
  const businessId = state.currentUser?.businessId || 'b1';

  const filteredAppts = appointments.filter(a => {
    const matchBusiness = a.businessId === businessId;
    const matchEmp = selectedEmployee === 'todos' || a.employeeId === selectedEmployee;
    return matchBusiness && matchEmp;
  });

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startOffset = getDay(monthStart);

  const getApptsByDay = (date: Date) =>
    filteredAppts.filter(a => isSameDay(parseISO(a.date), date) && a.status !== 'cancelada');

  const selectedDayAppts = selectedDate
    ? filteredAppts
        .filter(a => isSameDay(parseISO(a.date), selectedDate))
        .sort((a, b) => a.time.localeCompare(b.time))
    : [];

  const confirmAppointment = (appt: Appointment) => {
    dispatch({ type: 'UPDATE_APPOINTMENT', payload: { ...appt, status: 'confirmada' } });
    showToast('Cita confirmada correctamente', 'success');
    setSelectedAppt(null);
  };

  const cancelAppointment = (appt: Appointment) => {
    dispatch({ type: 'UPDATE_APPOINTMENT', payload: { ...appt, status: 'cancelada' } });
    showToast('Cita cancelada', 'info');
    setSelectedAppt(null);
  };

  const completeAppointment = (appt: Appointment) => {
    dispatch({ type: 'UPDATE_APPOINTMENT', payload: { ...appt, status: 'completada' } });
    showToast('Cita marcada como completada', 'success');
    setSelectedAppt(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Calendario de Citas</h1>
          <p className="text-gray-400 text-sm mt-1">Gestiona la agenda de tu equipo</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedEmployee}
            onChange={e => setSelectedEmployee(e.target.value)}
            className="input-dark text-sm"
            style={{ width: 'auto', paddingRight: '32px' }}
          >
            <option value="todos">Todos los empleados</option>
            {employees.map(e => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>
          <div className="flex rounded-xl border border-white/10 overflow-hidden">
            {(['month', 'list'] as const).map(m => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${viewMode === m ? 'bg-brand-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {m === 'month' ? 'Mes' : 'Lista'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 card p-5">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-white capitalize">
              {format(currentMonth, "MMMM yyyy", { locale: es })}
            </h2>
            <div className="flex gap-2">
              <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-2 rounded-lg hover:bg-white/8 text-gray-400 hover:text-white transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => setCurrentMonth(new Date())}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/6 text-gray-300 hover:bg-white/10 transition-colors">
                Hoy
              </button>
              <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-2 rounded-lg hover:bg-white/8 text-gray-400 hover:text-white transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-gray-500 py-2">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startOffset }).map((_, i) => <div key={`empty-${i}`} />)}
            {days.map(day => {
              const dayAppts = getApptsByDay(day);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isTodayDay = isToday(day);
              return (
                <div
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className="rounded-xl p-1.5 cursor-pointer transition-all min-h-[70px]"
                  style={{
                    background: isSelected
                      ? 'rgba(96, 80, 248, 0.15)'
                      : isTodayDay
                        ? 'rgba(96, 80, 248, 0.06)'
                        : 'transparent',
                    border: isSelected
                      ? '1px solid rgba(96, 80, 248, 0.4)'
                      : isTodayDay
                        ? '1px solid rgba(96, 80, 248, 0.2)'
                        : '1px solid transparent',
                  }}
                >
                  <div className={`text-xs font-semibold mb-1 text-right ${isTodayDay ? 'text-brand-400' : 'text-gray-400'}`}>
                    {format(day, 'd')}
                  </div>
                  <div className="space-y-0.5">
                    {dayAppts.slice(0, 3).map(a => {
                      const emp = employees.find(e => e.id === a.employeeId);
                      return (
                        <div
                          key={a.id}
                          className="text-xs px-1.5 py-0.5 rounded truncate font-medium"
                          style={{
                            background: (emp?.color || '#6050f8') + '25',
                            color: emp?.color || '#a998ff',
                          }}
                        >
                          {a.time} {a.clientName.split(' ')[0]}
                        </div>
                      );
                    })}
                    {dayAppts.length > 3 && (
                      <div className="text-xs text-gray-500 px-1.5">+{dayAppts.length - 3} más</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected day detail */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">
              {selectedDate
                ? format(selectedDate, "d 'de' MMMM", { locale: es })
                : 'Selecciona un día'}
            </h2>
            <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-lg">
              {selectedDayAppts.length} citas
            </span>
          </div>

          {selectedDayAppts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Plus size={32} className="text-gray-600 mb-2" />
              <p className="text-gray-500 text-sm">Sin citas este día</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDayAppts.map(appt => {
                const emp = employees.find(e => e.id === appt.employeeId);
                return (
                  <div
                    key={appt.id}
                    onClick={() => setSelectedAppt(appt)}
                    className="p-3 rounded-xl cursor-pointer hover:bg-white/4 transition-all"
                    style={{ border: `1px solid ${emp?.color || '#6050f8'}30` }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-white">{appt.time}</span>
                      <Badge status={appt.status} />
                    </div>
                    <p className="text-sm font-medium text-gray-200">{appt.clientName}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{appt.serviceName} · {appt.serviceDuration}min</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div
                        className="w-4 h-4 rounded flex items-center justify-center text-white"
                        style={{ background: emp?.color, fontSize: '9px', fontWeight: '700' }}
                      >
                        {emp?.avatar}
                      </div>
                      <span className="text-xs text-gray-400">{appt.employeeName}</span>
                      <span className="ml-auto text-xs font-semibold text-white">${appt.servicePrice}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Appointment detail modal */}
      {selectedAppt && (
        <Modal title="Detalle de Cita" onClose={() => setSelectedAppt(null)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Cliente', value: selectedAppt.clientName },
                { label: 'Servicio', value: selectedAppt.serviceName },
                { label: 'Profesional', value: selectedAppt.employeeName },
                { label: 'Duración', value: `${selectedAppt.serviceDuration} min` },
                { label: 'Fecha', value: format(parseISO(selectedAppt.date), "d 'de' MMMM yyyy", { locale: es }) },
                { label: 'Hora', value: selectedAppt.time },
                { label: 'Precio', value: `$${selectedAppt.servicePrice}` },
                { label: 'Pago', value: selectedAppt.paymentStatus === 'pagado' ? '✅ Pagado' : '⏳ Pendiente' },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{item.label}</p>
                  <p className="text-sm font-medium text-white mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-white/8 pt-4 flex items-center justify-between">
              <Badge status={selectedAppt.status} />
              <div className="flex gap-2">
                {selectedAppt.status === 'pendiente' && (
                  <button onClick={() => confirmAppointment(selectedAppt)} className="btn-primary text-xs py-2 px-3">
                    Confirmar
                  </button>
                )}
                {(selectedAppt.status === 'confirmada') && (
                  <button onClick={() => completeAppointment(selectedAppt)} className="btn-primary text-xs py-2 px-3">
                    Completar
                  </button>
                )}
                {selectedAppt.status !== 'cancelada' && selectedAppt.status !== 'completada' && (
                  <button onClick={() => cancelAppointment(selectedAppt)} className="btn-danger text-xs py-2 px-3">
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
