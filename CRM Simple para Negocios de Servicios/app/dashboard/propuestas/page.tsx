'use client';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { Plus, FileText, Download, Eye } from 'lucide-react';
import { format } from 'date-fns';

export default function PropuestasPage() {
  const { state } = useApp();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Propuestas y Cotizaciones</h1>
          <p className="text-slate-500 text-sm">Gestiona tus documentos comerciales</p>
        </div>
        <Link 
          href="/dashboard/propuestas/crear"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
        >
          <Plus size={18} />
          Nueva Propuesta
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Número</th>
              <th className="px-6 py-3">Cliente / Deal</th>
              <th className="px-6 py-3">Fecha</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {state.quotes.map(quote => {
              const deal = state.deals.find(d => d.id === quote.dealId);
              const contact = state.contacts.find(c => c.id === deal?.contactId);

              return (
                <tr key={quote.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{quote.number}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{contact?.name || 'Desconocido'}</div>
                    <div className="text-slate-500 text-xs">{deal?.title}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {format(new Date(quote.date), 'dd MMM yyyy')}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">
                    ${quote.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                      quote.status === 'accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      quote.status === 'sent' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      quote.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-100' :
                      'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {quote.status === 'draft' ? 'Borrador' :
                       quote.status === 'sent' ? 'Enviada' :
                       quote.status === 'accepted' ? 'Aceptada' : 'Rechazada'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors" title="Ver">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-emerald-600 transition-colors" title="Descargar PDF">
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {state.quotes.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <FileText size={32} className="opacity-20" />
                    <p>No hay propuestas generadas</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
