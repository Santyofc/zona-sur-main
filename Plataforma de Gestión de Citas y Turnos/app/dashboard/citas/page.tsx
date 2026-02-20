'use client';
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { format, parseISO, isToday, isFuture } from 'date-fns';
import { es } from 'date-fns/locale';
import { Search, Plus, Filter, Clock, DollarSign } from 'lucide-react';
import Badge from '@/components/Badge';
import Modal from '@/components/Modal';
import { Appointment, AppointmentStatus } from '@/lib/types';

export default function CitasPage() {
  const { state, dispatch, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'todas'>('todas');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newAppt, setNewAppt] = useState({
    clientId: '', employeeId: '', serviceId: '', date: format(new Date(), 'yyyy-MM-dd'), time: '10:00', notes: '',
  });

  const { appointments, employees, services, clients } = state;
  const businessId = state.currentUser?.businessId || 'b1';

  const filtered = appointments
    .filter(a => a.businessId === businessId)
    .filter(a => statusFilter === 'todas' || a.status === statusFilter)
    .filter(a => !dateFilter || a.date === dateFilter)
    .filter(a =>
      !search ||
      a.clientName.toLowerCase().includes(search.toLowerCase()) ||
      a.serviceName.toLowerCase().includes(search.toLowerCase()) ||
      a.employeeName.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));

  const updateStatus = (appt: Appointment, status: AppointmentStatus) => {
    dispatch({ type: 'UPDATE_APPOINTMENT', payload: { ...appt, status } });
    showToast(`Cita ${status === 'confirmada' ? 'confirmada' : status === 'cancelada' ? 'cancelada' : 'completada'}`, 'success');
    setSelectedAppt(null);
  };

  const handleCreate = () => {
    const client = clients.find(c => c.id === newAppt.clientId);
    const employee = employees.find(e => e.id === newAppt.employeeId);
    const service = services.find(s => s.id === newAppt.serviceId);

    if (!client || !employee || !service) {
      showToast('Por favor completa todos los campos', 'error');
      return;
    }

    const appt: Appointment = {
      id: `a${Date.now()}`,
      businessId,
      clientId: client.id,
      clientName: client.name,
      clientEmail: client.email,
      clientPhone: client.phone,
      employeeId: employee.id,
      employeeName: employee.name,
      serviceId: service.id,
      serviceName: service.name,
      servicePrice: service.price,
      serviceDuration: service.duration,
      date: newAppt.date,
      time: newAppt.time,
      status: 'confirmada',
      notes: newAppt.notes,
      paymentStatus: 'pendiente',
      createdAt: format(new Date(), 'yyyy-MM-dd'),
    };
    dispatch({ type: 'ADD_APPOINTMENT', payload: appt });
    showToast('Cita creada exitosamente', 'success');
    setShowNewModal(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestión de Citas</h1>
          <p className="text-gray-400 text-sm mt-1">{filtered.length} citas encontradas</p>
        </div>
        <button onClick={() => setShowNewModal(true)} className="btn-primary">
          <Plus size={16} />
          Nueva cita
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar cliente, servicio..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-dark pl-9 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as AppointmentStatus | 'todas')}
          className="input-dark text-sm"
          style={{ width: 'auto' }}
        >
          <option value="todas">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="confirmada">Confirmada</option>
          <option value="completada">Completada</option>
          <option value="cancelada">Cancelada</option>
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
          className="input-dark text-sm"
          style={{ width: 'auto' }}
        />
        {(search || statusFilter !== 'todas' || dateFilter) && (
          <button
            onClick={() => { setSearch(''); setStatusFilter('todas'); setDateFilter(''); }}
            className="btn-secondary text-sm"
          >
            <Filter size={14} />
            Limpiar
          </button>
        )}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-dark">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Profesional</th>
                <th>Fecha y hora</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Pago</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-gray-500">
                    No se encontraron citas con los filtros actuales
                  </td>
                </tr>
              ) : (
                filtered.map(appt => (
                  <tr key={appt.id}>
                    <td>
                      <div className="font-medium text-white">{appt.clientName}</div>
                      <div className="text-xs text-gray-500">{appt.clientPhone}</div>
                    </td>
                    <td>
                      <div className="text-white">{appt.serviceName}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={11} /> {appt.serviceDuration}min
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded text-white flex items-center justify-center flex-shrink-0"
                          style={{ background: employees.find(e => e.id === appt.employeeId)?.color || '#6050f8', fontSize: '9px', fontWeight: '700' }}
                        >
                          {employees.find(e => e.id === appt.employeeId)?.avatar}
                        </div>
                        <span className="text-sm text-gray-300">{appt.employeeName}</span>
                      </div>
                    </td>
                    <td>
                      <div className="text-white text-sm">{format(parseISO(appt.date), "d MMM yyyy", { locale: es })}</div>
                      <div className="text-xs text-gray-500">{appt.time}</div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 font-semibold text-white">
                        <DollarSign size={12} className="text-gray-500" />
                        {appt.servicePrice}
                      </div>
                    </td>
                    <td><Badge status={appt.status} /></td>
                    <td>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${appt.paymentStatus === 'pagado' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                        {appt.paymentStatus === 'pagado' ? 'Pagado' : 'Pendiente'}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => setSelectedAppt(appt)}
                        className="text-xs text-brand-400 hover:text-brand-300 font-medium transition-colors"
                      >
                        Ver →
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appointment detail modal */}
      {selectedAppt && (
        <Modal title="Detalle de Cita" onClose={() => setSelectedAppt(null)}>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Cliente', value: selectedAppt.clientName },
                { label: 'Email', value: selectedAppt.clientEmail },
                { label: 'Teléfono', value: selectedAppt.clientPhone },
                { label: 'Servicio', value: selectedAppt.serviceName },
                { label: 'Profesional', value: selectedAppt.employeeName },
                { label: 'Duración', value: `${selectedAppt.serviceDuration} min` },
                { label: 'Fecha', value: format(parseISO(selectedAppt.date), "d 'de' MMMM yyyy", { locale: es }) },
                { label: 'Hora', value: selectedAppt.time },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">{item.label}</p>
                  <p className="text-sm text-white font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/4 border border-white/8">
              <div>
                <p className="text-xs text-gray-500">Monto total</p>
                <p className="text-2xl font-bold text-white">${selectedAppt.servicePrice}</p>
              </div>
              <div className="text-right">
                <Badge status={selectedAppt.status} />
                <p className="text-xs text-gray-500 mt-1">
                  {selectedAppt.paymentStatus === 'pagado' ? `✅ Pagado (${selectedAppt.paymentMethod})` : '⏳ Pago pendiente'}
                </p>
              </div>
            </div>

            {selectedAppt.notes && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Notas</p>
                <p className="text-sm text-gray-300 bg-white/3 rounded-xl p-3">{selectedAppt.notes}</p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              {selectedAppt.status === 'pendiente' && (
                <button onClick={() => updateStatus(selectedAppt, 'confirmada')} className="btn-primary flex-1">
                  Confirmar
                </button>
              )}
              {selectedAppt.status === 'confirmada' && (
                <button onClick={() => updateStatus(selectedAppt, 'completada')} className="btn-primary flex-1">
                  Marcar completada
                </button>
              )}
              {selectedAppt.status !== 'cancelada' && selectedAppt.status !== 'completada' && (
                <button onClick={() => updateStatus(selectedAppt, 'cancelada')} className="btn-danger">
                  Cancelar cita
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* New appointment modal */}
      {showNewModal && (
        <Modal title="Nueva Cita" onClose={() => setShowNewModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Cliente *</label>
              <select
                value={newAppt.clientId}
                onChange={e => setNewAppt({ ...newAppt, clientId: e.target.value })}
                className="input-dark"
              >
                <option value="">Seleccionar cliente</option>
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Servicio *</label>
                <select
                  value={newAppt.serviceId}
                  onChange={e => setNewAppt({ ...newAppt, serviceId: e.target.value })}
                  className="input-dark"
                >
                  <option value="">Seleccionar servicio</option>
                  {services.filter(s => s.active).map(s => (
                    <option key={s.id} value={s.id}>{s.name} — ${s.price}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Profesional *</label>
                <select
                  value={newAppt.employeeId}
                  onChange={e => setNewAppt({ ...newAppt, employeeId: e.target.value })}
                  className="input-dark"
                >
                  <option value="">Seleccionar</option>
                  {employees.filter(e => e.active).map(e => (
                    <option key={e.id} value={e.id}>{e.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Fecha *</label>
                <input
                  type="date"
                  value={newAppt.date}
                  onChange={e => setNewAppt({ ...newAppt, date: e.target.value })}
                  className="input-dark"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Hora *</label>
                <input
                  type="time"
                  value={newAppt.time}
                  onChange={e => setNewAppt({ ...newAppt, time: e.target.value })}
                  className="input-dark"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Notas (opcional)</label>
              <textarea
                value={newAppt.notes}
                onChange={e => setNewAppt({ ...newAppt, notes: e.target.value })}
                className="input-dark resize-none"
                rows={3}
                placeholder="Notas adicionales para esta cita..."
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowNewModal(false)} className="btn-secondary flex-1">Cancelar</button>
              <button onClick={handleCreate} className="btn-primary flex-1">Crear cita</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
