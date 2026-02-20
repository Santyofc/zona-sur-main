'use client';
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Client } from '@/lib/types';
import { Plus, Search, MapPin, Building2, Mail } from 'lucide-react';

export default function ClientesPage() {
  const { state, dispatch, getCountryConfig } = useApp();
  const config = getCountryConfig();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // New Client Form State
  const [newClient, setNewClient] = useState({
    name: '',
    taxId: '',
    email: '',
    address: '',
  });

  const filteredClients = state.clients.filter(c => 
    c.country === state.currentCountry &&
    (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     c.taxId.includes(searchTerm))
  );

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    const client: Client = {
      id: `c-${Date.now()}`,
      ...newClient,
      country: state.currentCountry,
    };
    dispatch({ type: 'ADD_CLIENT', payload: client });
    setIsModalOpen(false);
    setNewClient({ name: '', taxId: '', email: '', address: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestión de Clientes</h1>
          <p className="text-slate-500 text-sm">Directorio de {config.name}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
        >
          <Plus size={18} />
          Nuevo Cliente
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 mb-6">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder={`Buscar por nombre o ${config.documentName}...`}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Nombre / Razón Social</th>
                <th className="px-6 py-3">{config.documentName}</th>
                <th className="px-6 py-3">Contacto</th>
                <th className="px-6 py-3">Ubicación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map(client => (
                <tr key={client.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{client.name}</td>
                  <td className="px-6 py-4 text-slate-600 font-mono">{client.taxId}</td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-2">
                       <Mail size={14} className="text-slate-400" />
                       {client.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-2">
                       <MapPin size={14} className="text-slate-400" />
                       <span className="truncate max-w-[200px]">{client.address}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                    No se encontraron clientes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Basic Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Registrar Nuevo Cliente</h2>
            <form onSubmit={handleAddClient} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Nombre / Razón Social</label>
                <input required type="text" value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">{config.documentName}</label>
                <input required type="text" value={newClient.taxId} onChange={e => setNewClient({...newClient, taxId: e.target.value})} className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                <input required type="email" value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Dirección</label>
                <input required type="text" value={newClient.address} onChange={e => setNewClient({...newClient, address: e.target.value})} className="input-field" />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
