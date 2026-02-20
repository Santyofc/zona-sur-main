'use client';
import { useApp } from '@/lib/store';
import { COUNTRY_CONFIGS } from '@/lib/config';
import { DollarSign, FileText, TrendingUp, Users } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function DashboardPage() {
  const { state } = useApp();
  const config = COUNTRY_CONFIGS[state.currentCountry];

  // Filter invoices for current country
  const countryInvoices = state.invoices.filter(inv => inv.country === state.currentCountry);

  // KPIs
  const totalSales = countryInvoices.reduce((acc, inv) => acc + inv.total, 0);
  const issuedCount = countryInvoices.length;
  const pendingCount = countryInvoices.filter(inv => inv.status === 'issued').length; // Assuming 'issued' means unpaid/pending in this context for simplicity

  const kpis = [
    { label: 'Ventas Totales', value: `${config.currencySymbol} ${totalSales.toLocaleString()}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Comprobantes Emitidos', value: issuedCount, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Pendientes de Pago', value: pendingCount, icon: Users, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Crecimiento Mensual', value: '+12.5%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Panel de Control - {config.name}</h1>
        <p className="text-slate-500">Resumen de actividad y facturación reciente.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg ${kpi.bg} flex items-center justify-center ${kpi.color}`}>
              <kpi.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{kpi.label}</p>
              <h3 className="text-xl font-bold text-slate-800">{kpi.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Invoices */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="font-semibold text-slate-800">Comprobantes Recientes</h2>
          <button className="text-sm text-blue-600 font-medium hover:underline">Ver todos</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Número</th>
                <th className="px-6 py-3">Cliente</th>
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3">Total ({config.currency})</th>
                <th className="px-6 py-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {countryInvoices.slice(0, 5).map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{inv.number}</td>
                  <td className="px-6 py-4 text-slate-600">{inv.clientName}</td>
                  <td className="px-6 py-4 text-slate-500 capitalize">
                    {format(new Date(inv.date), 'dd MMM yyyy', { locale: es })}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    {config.currencySymbol} {inv.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      inv.status === 'paid' ? 'bg-green-100 text-green-700 border-green-200' :
                      inv.status === 'issued' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                      inv.status === 'draft' ? 'bg-gray-100 text-gray-700 border-gray-200' :
                      'bg-red-100 text-red-700 border-red-200'
                    }`}>
                      {inv.status === 'paid' ? 'Pagado' :
                       inv.status === 'issued' ? 'Emitido' :
                       inv.status === 'draft' ? 'Borrador' : 'Cancelado'}
                    </span>
                  </td>
                </tr>
              ))}
              {countryInvoices.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No hay comprobantes registrados en {config.name}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
