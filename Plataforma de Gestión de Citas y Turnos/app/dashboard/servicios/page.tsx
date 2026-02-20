'use client';
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Plus, Edit2, Trash2, Clock, DollarSign, Check, X } from 'lucide-react';
import Modal from '@/components/Modal';
import { Service } from '@/lib/types';

const COLORS = ['#6050f8', '#06b6d4', '#22c55e', '#f59e0b', '#f43f5e', '#8b5cf6'];

export default function ServiciosPage() {
  const { state, dispatch, showToast } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editService, setEditService] = useState<Service | null>(null);
  const [form, setForm] = useState({ name: '', description: '', duration: 30, price: 0, category: '' });

  const businessId = state.currentUser?.businessId || 'b1';
  const services = state.services.filter(s => s.businessId === businessId);

  const openCreate = () => {
    setEditService(null);
    setForm({ name: '', description: '', duration: 30, price: 0, category: '' });
    setShowModal(true);
  };

  const openEdit = (s: Service) => {
    setEditService(s);
    setForm({ name: s.name, description: s.description, duration: s.duration, price: s.price, category: s.category });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || form.price <= 0) {
      showToast('Por favor completa nombre y precio', 'error');
      return;
    }
    if (editService) {
      dispatch({ type: 'UPDATE_SERVICE', payload: { ...editService, ...form } });
      showToast('Servicio actualizado', 'success');
    } else {
      const svc: Service = {
        id: `s${Date.now()}`,
        businessId,
        ...form,
        active: true,
      };
      dispatch({ type: 'ADD_SERVICE', payload: svc });
      showToast('Servicio creado exitosamente', 'success');
    }
    setShowModal(false);
  };

  const toggleActive = (s: Service) => {
    dispatch({ type: 'UPDATE_SERVICE', payload: { ...s, active: !s.active } });
    showToast(s.active ? 'Servicio desactivado' : 'Servicio activado', 'info');
  };

  const handleDelete = (s: Service) => {
    dispatch({ type: 'DELETE_SERVICE', payload: s.id });
    showToast('Servicio eliminado', 'info');
  };

  const categories = [...new Set(services.map(s => s.category))];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Servicios</h1>
          <p className="text-gray-400 text-sm mt-1">{services.filter(s => s.active).length} activos / {services.length} totales</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus size={16} />
          Nuevo servicio
        </button>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((svc, i) => (
          <div key={svc.id} className={`card p-5 transition-all ${!svc.active ? 'opacity-50' : ''}`}>
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ background: COLORS[i % COLORS.length] + '25', border: `1px solid ${COLORS[i % COLORS.length]}40` }}
              >
                <span style={{ color: COLORS[i % COLORS.length] }}>{svc.name.charAt(0)}</span>
              </div>
              <div className="flex items-center gap-1 ml-auto">
                <button
                  onClick={() => toggleActive(svc)}
                  className={`p-1.5 rounded-lg transition-colors ${svc.active ? 'text-green-400 hover:bg-green-400/10' : 'text-gray-500 hover:bg-white/5'}`}
                  title={svc.active ? 'Desactivar' : 'Activar'}
                >
                  {svc.active ? <Check size={14} /> : <X size={14} />}
                </button>
                <button onClick={() => openEdit(svc)} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => handleDelete(svc)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <h3 className="font-semibold text-white mb-1">{svc.name}</h3>
            <p className="text-xs text-gray-500 mb-3 line-clamp-2">{svc.description}</p>

            <div className="flex items-center gap-3 pt-3 border-t border-white/6">
              <div className="flex items-center gap-1 text-gray-400">
                <Clock size={13} />
                <span className="text-xs">{svc.duration} min</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <DollarSign size={13} />
                <span className="text-xs">{svc.price.toLocaleString('es-MX')}</span>
              </div>
              {svc.category && (
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-white/6 text-gray-400 border border-white/10">
                  {svc.category}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <Modal title={editService ? 'Editar Servicio' : 'Nuevo Servicio'} onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Nombre del servicio *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="input-dark"
                placeholder="Ej: Corte clásico"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Descripción</label>
              <textarea
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className="input-dark resize-none"
                rows={2}
                placeholder="Breve descripción del servicio..."
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Duración (min) *</label>
                <input
                  type="number"
                  value={form.duration}
                  onChange={e => setForm({ ...form, duration: Number(e.target.value) })}
                  className="input-dark"
                  min={5}
                  step={5}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Precio ($) *</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                  className="input-dark"
                  min={0}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Categoría</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="input-dark"
                  placeholder="Ej: Corte"
                  list="categories-list"
                />
                <datalist id="categories-list">
                  {categories.map(c => <option key={c} value={c} />)}
                </datalist>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancelar</button>
              <button onClick={handleSave} className="btn-primary flex-1">
                {editService ? 'Guardar cambios' : 'Crear servicio'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
