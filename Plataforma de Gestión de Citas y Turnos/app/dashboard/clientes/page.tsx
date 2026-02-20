'use client';
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Search, Plus, User, Phone, Mail, Clock, DollarSign, FileText, Edit2 } from 'lucide-react';
import Modal from '@/components/Modal';
import Badge from '@/components/Badge';
import { Client } from '@/lib/types';

export default function ClientesPage() {
  const { state, dispatch, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });

  const businessId = state.currentUser?.businessId || 'b1';
  const clients = state.clients.filter(c => c.businessId === businessId);
  const filtered = clients.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const clientAppts = selectedClient
    ? state.appointments.filter(a => a.clientId === selectedClient.id).sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time))
    : [];

  const openClient = (c: Client) => {
    setSelectedClient(c);
    setEditMode(false);
  };

  const handleSaveEdit = () => {
    if (!selectedClient) return;
    dispatch({ type: 'UPDATE_CLIENT', payload: { ...selectedClient, name: form.name, email: form.email, phone: form.phone, notes: form.notes } });
    showToast('Cliente actualizado', 'success');
    setEditMode(false);
    setSelectedClient({ ...selectedClient, ...form });
  };

  const handleCreate = () => {
    if (!form.name.trim()) { showToast('El nombre es requerido', 'error'); return; }
    const client: Client = {
      id: `c${Date.now()}`,
      businessId,
      name: form.name,
      email: form.email,
      phone: form.phone,
      notes: form.notes,
      totalVisits: 0,
      totalSpent: 0,
      createdAt: format(new Date(), 'yyyy-MM-dd'),
    };
    dispatch({ type: 'ADD_CLIENT', payload: client });
    showToast('Cliente registrado exitosamente', 'success');
    setShowNewModal(false);
    setForm({ name: '', email: '', phone: '', notes: '' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Clientes</h1>
          <p className="text-gray-400 text-sm mt-1">{clients.length} clientes registrados</p>
        </div>
        <button onClick={() => { setShowNewModal(true); setForm({ name: '', email: '', phone: '', notes: '' }); }} className="btn-primary">
          <Plus size={16} />
          Nuevo cliente
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-1 space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-dark pl-9 text-sm"
            />
          </div>
          <div className="space-y-2">
            {filtered.map(client => (
              <div
                key={client.id}
                onClick={() => openClient(client)}
                className={`card p-4 cursor-pointer transition-all glass-hover ${selectedClient?.id === client.id ? 'border-brand-500/40 bg-brand-500/5' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400 font-bold text-sm flex-shrink-0">
                    {client.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm truncate">{client.name}</p>
                    <p className="text-xs text-gray-500 truncate">{client.email}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-semibold text-white">{client.totalVisits} visitas</p>
                    <p className="text-xs text-gray-500">${client.totalSpent.toLocaleString('es-MX')}</p>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-gray-500 py-8 text-sm">No se encontraron clientes</p>
            )}
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-2">
          {selectedClient ? (
            <div className="space-y-5">
              {/* Profile card */}
              <div className="card p-6">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400 font-bold text-xl flex-shrink-0">
                    {selectedClient.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white">{selectedClient.name}</h2>
                    <p className="text-gray-400 text-sm">Cliente desde {format(parseISO(selectedClient.createdAt), "MMMM yyyy", { locale: es })}</p>
                  </div>
                  <button
                    onClick={() => { setEditMode(!editMode); setForm({ name: selectedClient.name, email: selectedClient.email, phone: selectedClient.phone, notes: selectedClient.notes }); }}
                    className="btn-secondary text-xs"
                  >
                    <Edit2 size={13} />
                    Editar
                  </button>
                </div>

                {editMode ? (
                  <div className="space-y-3">
                    <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-dark text-sm" placeholder="Nombre" />
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-dark text-sm" placeholder="Email" />
                    <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input-dark text-sm" placeholder="Teléfono" />
                    <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="input-dark resize-none text-sm" rows={2} placeholder="Notas..." />
                    <div className="flex gap-2">
                      <button onClick={() => setEditMode(false)} className="btn-secondary text-sm flex-1">Cancelar</button>
                      <button onClick={handleSaveEdit} className="btn-primary text-sm flex-1">Guardar</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-3 gap-4 mb-5">
                      <div className="text-center p-3 rounded-xl bg-white/4">
                        <p className="text-2xl font-bold text-white">{selectedClient.totalVisits}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Visitas</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-white/4">
                        <p className="text-2xl font-bold text-white">${(selectedClient.totalSpent).toLocaleString('es-MX')}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Total gastado</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-white/4">
                        <p className="text-sm font-bold text-white">{selectedClient.lastVisit ? format(parseISO(selectedClient.lastVisit), 'd MMM', { locale: es }) : '—'}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Última visita</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {[
                        { icon: Mail, value: selectedClient.email },
                        { icon: Phone, value: selectedClient.phone },
                      ].map(({ icon: Icon, value }) => (
                        <div key={value} className="flex items-center gap-2 text-sm text-gray-400">
                          <Icon size={14} className="flex-shrink-0" />
                          {value}
                        </div>
                      ))}
                    </div>

                    {selectedClient.notes && (
                      <div className="p-3 rounded-xl bg-white/4 border border-white/8">
                        <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><FileText size={12} /> Notas</p>
                        <p className="text-sm text-gray-300">{selectedClient.notes}</p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Visit history */}
              <div className="card p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Historial de visitas</h3>
                {clientAppts.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-6">Sin visitas registradas</p>
                ) : (
                  <div className="space-y-3">
                    {clientAppts.map(appt => (
                      <div key={appt.id} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-white">{appt.serviceName}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <Clock size={11} />
                            {format(parseISO(appt.date), "d 'de' MMMM yyyy", { locale: es })} a las {appt.time}
                            · {appt.employeeName}
                          </p>
                        </div>
                        <div className="ml-auto flex items-center gap-3 flex-shrink-0">
                          <span className="text-sm font-semibold text-white">${appt.servicePrice}</span>
                          <Badge status={appt.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="card p-12 flex flex-col items-center justify-center text-center h-full min-h-64">
              <User size={40} className="text-gray-600 mb-3" />
              <p className="text-gray-400 font-medium">Selecciona un cliente</p>
              <p className="text-gray-600 text-sm mt-1">para ver su perfil e historial de visitas</p>
            </div>
          )}
        </div>
      </div>

      {/* New client modal */}
      {showNewModal && (
        <Modal title="Nuevo Cliente" onClose={() => setShowNewModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Nombre completo *</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-dark" placeholder="Nombre y apellido" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-dark" placeholder="email@ejemplo.com" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Teléfono</label>
                <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input-dark" placeholder="+52 55 1234 5678" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Notas</label>
              <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="input-dark resize-none" rows={2} placeholder="Preferencias, alergias, observaciones..." />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowNewModal(false)} className="btn-secondary flex-1">Cancelar</button>
              <button onClick={handleCreate} className="btn-primary flex-1">Registrar cliente</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
