'use client';
import { useApp } from '@/lib/store';
import { DollarSign, Kanban, FileText, Users, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

export default function DashboardPage() {
  const { state } = useApp();

  // KPIs
  const activeDeals = state.deals.filter(d => d.stage !== 'closed').length;
  const activeValue = state.deals.filter(d => d.stage !== 'closed').reduce((acc, d) => acc + d.value, 0);
  const closedValue = state.deals.filter(d => d.stage === 'closed').reduce((acc, d) => acc + d.value, 0);
  const totalContacts = state.contacts.length;

  const kpis = [
    { label: 'Pipeline Activo', value: `$${activeValue.toLocaleString()}`, sub: `${activeDeals} deals`, icon: Kanban, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Ingresos (Cerrados)', value: `$${closedValue.toLocaleString()}`, sub: 'Total histórico', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Contactos', value: totalContacts, sub: 'Clientes potenciales', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Tasa Conversión', value: '25%', sub: 'Deals cerrados', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Hola, {state.user?.name || 'Usuario'} 👋</h1>
        <p className="text-slate-500">Aquí está el resumen de tu negocio hoy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{kpi.label}</p>
              <h3 className="text-2xl font-bold text-slate-800">{kpi.value}</h3>
              <span className="text-xs text-slate-400">{kpi.sub}</span>
            </div>
            <div className={`p-3 rounded-lg ${kpi.bg}`}>
              <kpi.icon className={kpi.color} size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Deals */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">Deals Recientes</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {state.deals.slice(0, 5).map(deal => (
              <div key={deal.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div>
                  <h4 className="font-medium text-slate-800">{deal.title}</h4>
                  <p className="text-sm text-slate-500">{state.contacts.find(c => c.id === deal.contactId)?.company}</p>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-slate-700">${deal.value.toLocaleString()}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full tag-${deal.stage}`}>
                    {deal.stage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">Últimos Contactos</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {state.contacts.slice(0, 5).map(contact => (
              <div key={contact.id} className="p-4 flex items-center gap-4 hover:bg-slate-50">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-slate-800">{contact.name}</h4>
                  <p className="text-sm text-slate-500">{contact.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
