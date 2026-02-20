'use client';
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Save, User } from 'lucide-react';

export default function ClientePerfilPage() {
  const { state, showToast } = useApp();
  const [form, setForm] = useState({
    name: state.currentUser?.name || '',
    email: state.currentUser?.email || '',
    phone: '+52 55 9876 5432',
  });

  return (
    <div className="max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Mi Perfil</h1>
        <p className="text-gray-400 text-sm mt-1">Gestiona tu información personal</p>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400 text-2xl font-bold">
            {state.currentUser?.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{state.currentUser?.name}</h2>
            <p className="text-sm text-gray-400">Cliente</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Nombre completo</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-dark" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Email</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-dark" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Teléfono</label>
            <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input-dark" />
          </div>
          <button onClick={() => showToast('Perfil actualizado exitosamente', 'success')} className="btn-primary w-full justify-center mt-2">
            <Save size={16} />
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
