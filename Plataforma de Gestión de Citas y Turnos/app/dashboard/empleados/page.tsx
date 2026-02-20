'use client';
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Plus, Edit2, X, Check } from 'lucide-react';
import Modal from '@/components/Modal';
import { Employee } from '@/lib/types';

const COLORS = ['#6050f8', '#06b6d4', '#22c55e', '#f59e0b', '#f43f5e', '#8b5cf6', '#ec4899'];
const DAYS_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export default function EmpleadosPage() {
  const { state, dispatch, showToast } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editEmp, setEditEmp] = useState<Employee | null>(null);
  const [form, setForm] = useState({ name: '', specialty: '', color: COLORS[0], workDays: [1,2,3,4,5,6] as number[], startHour: 9, endHour: 19 });

  const businessId = state.currentUser?.businessId || 'b1';
  const employees = state.employees.filter(e => e.businessId === businessId);

  const openCreate = () => {
    setEditEmp(null);
    setForm({ name: '', specialty: '', color: COLORS[0], workDays: [1,2,3,4,5,6], startHour: 9, endHour: 19 });
    setShowModal(true);
  };

  const openEdit = (e: Employee) => {
    setEditEmp(e);
    setForm({ name: e.name, specialty: e.specialty, color: e.color, workDays: e.workDays, startHour: e.startHour, endHour: e.endHour });
    setShowModal(true);
  };

  const toggleDay = (day: number) => {
    setForm(prev => ({
      ...prev,
      workDays: prev.workDays.includes(day) ? prev.workDays.filter(d => d !== day) : [...prev.workDays, day].sort(),
    }));
  };

  const handleSave = () => {
    if (!form.name.trim()) { showToast('El nombre es requerido', 'error'); return; }
    const initials = form.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
    if (editEmp) {
      dispatch({ type: 'UPDATE_EMPLOYEE', payload: { ...editEmp, ...form, avatar: initials } });
      showToast('Empleado actualizado', 'success');
    } else {
      const emp: Employee = {
        id: `e${Date.now()}`,
        businessId,
        ...form,
        avatar: initials,
        active: true,
      };
      dispatch({ type: 'ADD_EMPLOYEE', payload: emp });
      showToast('Empleado agregado', 'success');
    }
    setShowModal(false);
  };

  const toggleActive = (emp: Employee) => {
    dispatch({ type: 'UPDATE_EMPLOYEE', payload: { ...emp, active: !emp.active } });
    showToast(emp.active ? 'Empleado desactivado' : 'Empleado activado', 'info');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Empleados</h1>
          <p className="text-gray-400 text-sm mt-1">{employees.filter(e => e.active).length} activos</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus size={16} />
          Agregar empleado
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map(emp => {
          const empAppts = state.appointments.filter(a => a.employeeId === emp.id && a.status !== 'cancelada').length;
          return (
            <div key={emp.id} className={`card p-6 transition-all ${!emp.active ? 'opacity-50' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
                  style={{ background: emp.color }}
                >
                  {emp.avatar}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => toggleActive(emp)} className={`p-1.5 rounded-lg transition-colors ${emp.active ? 'text-green-400 hover:bg-green-400/10' : 'text-gray-500 hover:bg-white/5'}`}>
                    {emp.active ? <Check size={14} /> : <X size={14} />}
                  </button>
                  <button onClick={() => openEdit(emp)} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                    <Edit2 size={14} />
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-white text-lg">{emp.name}</h3>
              <p className="text-sm text-gray-400 mt-0.5">{emp.specialty}</p>

              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1.5">Días de trabajo</p>
                  <div className="flex gap-1">
                    {DAYS_LABELS.map((d, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium"
                        style={{
                          background: emp.workDays.includes(i) ? emp.color + '25' : 'rgba(255,255,255,0.05)',
                          color: emp.workDays.includes(i) ? emp.color : '#4B5563',
                          border: `1px solid ${emp.workDays.includes(i) ? emp.color + '40' : 'transparent'}`,
                        }}
                      >
                        {d[0]}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Horario</span>
                  <span className="text-white font-medium">{emp.startHour}:00 — {emp.endHour}:00</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Total citas</span>
                  <span className="text-white font-medium">{empAppts}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <Modal title={editEmp ? 'Editar Empleado' : 'Nuevo Empleado'} onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Nombre completo *</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-dark" placeholder="Nombre del profesional" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Especialidad</label>
              <input type="text" value={form.specialty} onChange={e => setForm({ ...form, specialty: e.target.value })} className="input-dark" placeholder="Ej: Cortes y coloración" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Color</label>
              <div className="flex gap-2">
                {COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => setForm({ ...form, color: c })}
                    className="w-8 h-8 rounded-full transition-transform"
                    style={{
                      background: c,
                      transform: form.color === c ? 'scale(1.25)' : 'scale(1)',
                      border: form.color === c ? `3px solid white` : '3px solid transparent',
                    }}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Días de trabajo</label>
              <div className="flex gap-1.5">
                {DAYS_LABELS.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => toggleDay(i)}
                    className="flex-1 py-2 rounded-lg text-xs font-medium transition-all"
                    style={{
                      background: form.workDays.includes(i) ? form.color + '25' : 'rgba(255,255,255,0.05)',
                      color: form.workDays.includes(i) ? form.color : '#6B7280',
                      border: `1px solid ${form.workDays.includes(i) ? form.color + '40' : 'transparent'}`,
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Hora inicio</label>
                <input type="number" value={form.startHour} onChange={e => setForm({ ...form, startHour: Number(e.target.value) })} className="input-dark" min={0} max={23} />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Hora fin</label>
                <input type="number" value={form.endHour} onChange={e => setForm({ ...form, endHour: Number(e.target.value) })} className="input-dark" min={0} max={23} />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancelar</button>
              <button onClick={handleSave} className="btn-primary flex-1">{editEmp ? 'Guardar cambios' : 'Agregar'}</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
