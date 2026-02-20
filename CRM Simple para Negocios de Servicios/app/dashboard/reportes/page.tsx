'use client';
import { useApp } from '@/lib/store';
import { BarChart, TrendingUp, Users } from 'lucide-react';

export default function ReportesPage() {
  const { state } = useApp();

  const closedDeals = state.deals.filter(d => d.stage === 'closed');
  const totalClosed = closedDeals.reduce((acc, d) => acc + d.value, 0);
  const conversionRate = state.deals.length > 0 ? (closedDeals.length / state.deals.length) * 100 : 0;

  // Mock monthly data
  const monthlyData = [
    { month: 'Ene', value: 1200 },
    { month: 'Feb', value: 2100 },
    { month: 'Mar', value: 800 },
    { month: 'Abr', value: 1600 },
    { month: 'May', value: 2400 },
    { month: 'Jun', value: totalClosed },
  ];

  const maxVal = Math.max(...monthlyData.map(d => d.value));

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Reportes y Métricas</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-emerald-100 rounded text-emerald-600"><TrendingUp size={20}/></div>
             <span className="text-slate-500 text-sm font-medium">Ventas Totales</span>
          </div>
          <div className="text-2xl font-bold text-slate-800">${totalClosed.toLocaleString()}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-blue-100 rounded text-blue-600"><Users size={20}/></div>
             <span className="text-slate-500 text-sm font-medium">Nuevos Clientes</span>
          </div>
          <div className="text-2xl font-bold text-slate-800">{state.contacts.length}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
           <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-purple-100 rounded text-purple-600"><BarChart size={20}/></div>
             <span className="text-slate-500 text-sm font-medium">Tasa de Cierre</span>
          </div>
          <div className="text-2xl font-bold text-slate-800">{conversionRate.toFixed(1)}%</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-6">Rendimiento de Ventas (Semestral)</h3>
        
        <div className="h-64 flex items-end justify-between gap-4 px-4">
          {monthlyData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full relative h-full flex items-end justify-center">
                 <div 
                   className="w-full max-w-[60px] bg-indigo-600 rounded-t-md opacity-80 group-hover:opacity-100 transition-all hover:shadow-lg"
                   style={{ height: `${(d.value / maxVal) * 100}%` }}
                 />
                 <div className="absolute -top-8 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ${d.value.toLocaleString()}
                 </div>
              </div>
              <span className="text-xs text-slate-500 font-medium">{d.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
