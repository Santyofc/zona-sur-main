'use client';
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Contact } from '@/lib/types';
import { Plus, Search, Mail, Phone, Building2, User } from 'lucide-react';

export default function ContactosPage() {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '', company: '', role: '' });

  const filteredContacts = state.contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const contact: Contact = {
      id: `c-${Date.now()}`,
      ...newContact,
      interactions: [],
    };
    dispatch({ type: 'ADD_CONTACT', payload: contact });
    setIsModalOpen(false);
    setNewContact({ name: '', email: '', phone: '', company: '', role: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Contactos</h1>
          <p className="text-slate-500 text-sm">Base de datos de clientes</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
        >
          <Plus size={18} />
          Nuevo Contacto
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
           <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre o empresa..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>
        
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Empresa / Rol</th>
              <th className="px-6 py-3">Contacto</th>
              <th className="px-6 py-3">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredContacts.map(contact => (
              <tr key={contact.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                      {contact.name.charAt(0)}
                    </div>
                    <span className="font-medium text-slate-900">{contact.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-slate-900 font-medium">{contact.company}</div>
                  <div className="text-slate-500 text-xs">{contact.role}</div>
                </td>
                <td className="px-6 py-4 text-slate-500">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail size={14} /> {contact.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} /> {contact.phone}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Activo
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

       {/* Modal */}
       {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Nuevo Contacto</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Nombre Completo</label>
                <input required type="text" value={newContact.name} onChange={e => setNewContact({...newContact, name: e.target.value})} className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Empresa</label>
                  <input required type="text" value={newContact.company} onChange={e => setNewContact({...newContact, company: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Cargo/Rol</label>
                  <input type="text" value={newContact.role} onChange={e => setNewContact({...newContact, role: e.target.value})} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                <input required type="email" value={newContact.email} onChange={e => setNewContact({...newContact, email: e.target.value})} className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Teléfono</label>
                <input type="tel" value={newContact.phone} onChange={e => setNewContact({...newContact, phone: e.target.value})} className="input-field" />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
