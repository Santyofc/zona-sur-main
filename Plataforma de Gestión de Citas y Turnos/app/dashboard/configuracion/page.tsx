'use client';
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Save, Globe, Copy } from 'lucide-react';

export default function ConfiguracionPage() {
  const { state, showToast } = useApp();
  const business = state.businesses.find(b => b.id === state.currentUser?.businessId);
  const [form, setForm] = useState({
    name: business?.name || '',
    tagline: business?.tagline || '',
    category: business?.category || '',
    address: business?.address || '',
    phone: business?.phone || '',
    email: business?.email || '',
    slug: business?.slug || '',
  });

  const publicUrl = typeof window !== 'undefined' ? `${window.location.origin}/${form.slug}` : `http://localhost:3000/${form.slug}`;

  const handleSave = () => {
    showToast('Configuración guardada exitosamente', 'success');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    showToast('Enlace copiado al portapapeles', 'info');
  };

  const CATEGORIES = ['Barbería', 'Consultorio médico', 'Dentista', 'Spa', 'Salón de belleza', 'Taller mecánico', 'Otro'];

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Configuración</h1>
        <p className="text-gray-400 text-sm mt-1">Personaliza tu negocio y página pública</p>
      </div>

      {/* Public link preview */}
      <div className="card p-5 mb-6 border border-brand-500/30 bg-brand-500/5">
        <div className="flex items-center gap-3 mb-3">
          <Globe size={18} className="text-brand-400" />
          <h2 className="text-sm font-semibold text-white">Tu página pública de reservas</h2>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-3 border border-white/10">
          <span className="text-sm text-brand-400 font-mono truncate flex-1">{publicUrl}</span>
          <button onClick={copyLink} className="text-gray-400 hover:text-white transition-colors flex-shrink-0">
            <Copy size={15} />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">Comparte este enlace con tus clientes para que puedan reservar en línea</p>
      </div>

      <div className="space-y-5">
        {/* Business info */}
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-white mb-4">Información del negocio</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Nombre del negocio *</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-dark" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Categoría</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input-dark">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Slogan / Descripción</label>
              <input type="text" value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} className="input-dark" placeholder="El mejor servicio de tu ciudad..." />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Dirección</label>
              <input type="text" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="input-dark" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Teléfono</label>
                <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input-dark" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Email de contacto</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-dark" />
              </div>
            </div>
          </div>
        </div>

        {/* URL Slug */}
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-white mb-4">URL de tu página pública</h2>
          <div className="flex items-center gap-0">
            <span className="text-sm text-gray-500 bg-white/5 border border-white/10 border-r-0 rounded-l-xl px-3 py-2.5 whitespace-nowrap">
              {typeof window !== 'undefined' ? window.location.origin : 'https://citafacil.com'}/
            </span>
            <input
              type="text"
              value={form.slug}
              onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
              className="input-dark rounded-l-none flex-1"
              placeholder="mi-negocio"
            />
          </div>
          <p className="text-xs text-gray-600 mt-2">Solo letras minúsculas, números y guiones. Sin espacios.</p>
        </div>

        {/* Reminders */}
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-white mb-4">Recordatorios automáticos</h2>
          <div className="space-y-3">
            {[
              { label: 'Recordatorio 24h antes por email', checked: true },
              { label: 'Confirmación inmediata al reservar', checked: true },
              { label: 'Recordatorio 1h antes (WhatsApp)', checked: false },
            ].map(item => (
              <label key={item.label} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                  <div className="w-10 h-5 bg-white/10 rounded-full peer-checked:bg-brand-500 transition-colors" />
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button onClick={handleSave} className="btn-primary w-full justify-center py-3">
          <Save size={16} />
          Guardar configuración
        </button>
      </div>
    </div>
  );
}
