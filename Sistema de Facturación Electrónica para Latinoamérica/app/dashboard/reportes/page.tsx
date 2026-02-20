'use client';
import { useApp } from '@/lib/store';
import { format, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import {  Download, PieChart, TrendingUp } from 'lucide-react';

export default function ReportesPage() {
  const { state, getCountryConfig, showToast } = useApp();
  const config = getCountryConfig();

  // Filter invoices for current country
  const countryInvoices = state.invoices.filter(inv => inv.country === state.currentCountry);

  // Generate last 6 months
  const months = eachMonthOfInterval({
    start: subMonths(new Date(), 5),
    end: new Date(),
  });

  const chartData = months.map(date => {
    const monthKey = format(date, 'yyyy-MM');
    const monthlyInvoices = countryInvoices.filter(inv => inv.date.startsWith(monthKey));
    
    return {
      month: format(date, 'MMM', { locale: es }),
      sales: monthlyInvoices.reduce((acc, inv) => acc + inv.subtotal, 0),
      tax: monthlyInvoices.reduce((acc, inv) => acc + inv.taxAmount, 0),
      total: monthlyInvoices.reduce((acc, inv) => acc + inv.total, 0),
    };
  });

  const maxTotal = Math.max(...chartData.map(d => d.total), 100);

  const handleExport = (type: 'pdf' | 'csv') => {
    // In a real app this would generate a file
    alert(`Exportando reporte mensual en formato ${type.toUpperCase()}...`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Reportes Tributarios</h1>
          <p className="text-slate-500 text-sm">Análisis de impuestos ({config.tax.name}) y ventas</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleExport('csv')} className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
            <Download size={16} />
            Exportar CSV
          </button>
          <button onClick={() => handleExport('pdf')} className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
            <Download size={16} />
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Monthly Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-600" />
          Comportamiento Semestral de Facturación
        </h2>
        
        <div className="h-64 flex items-end justify-between gap-4">
          {chartData.map((data, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full relative flex items-end justify-center gap-1 h-full">
                {/* Tax Bar */}
                <div 
                  className="w-1/3 bg-red-400 rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ height: `${(data.tax / maxTotal) * 100}%` }}
                  title={`${config.tax.name}: ${config.currencySymbol}${data.tax.toFixed(0)}`}
                />
                {/* Sales Bar */}
                <div 
                  className="w-1/3 bg-blue-600 rounded-t-sm opacity-90 group-hover:opacity-100 transition-opacity"
                  style={{ height: `${(data.sales / maxTotal) * 100}%` }}
                  title={`Subtotal: ${config.currencySymbol}${data.sales.toFixed(0)}`}
                />
              </div>
              <span className="text-xs text-slate-500 capitalize">{data.month}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 mt-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-sm" />
            <span>Base Imponible (Ventas)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-sm" />
            <span>Impuestos ({config.tax.name})</span>
          </div>
        </div>
      </div>

      {/* Tax Summary Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Detalle de Impuestos por Mes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Período</th>
                <th className="px-6 py-3 text-right">Base Imponible</th>
                <th className="px-6 py-3 text-right">{config.tax.name} ({config.tax.rate * 100}%)</th>
                <th className="px-6 py-3 text-right">Total Facturado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[...chartData].reverse().map((data, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900 capitalize">{data.month} 2026</td>
                  <td className="px-6 py-4 text-slate-600 text-right">{config.currencySymbol} {data.sales.toLocaleString()}</td>
                  <td className="px-6 py-4 text-red-600 font-medium text-right">{config.currencySymbol} {data.tax.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-800 font-bold text-right">{config.currencySymbol} {data.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
