'use client';
import { useApp } from '@/lib/store';
import { format, parseISO, subMonths, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { es } from 'date-fns/locale';
import { BarChart3, Download, TrendingUp, Users, DollarSign, Clock } from 'lucide-react';

function downloadCSV(data: Record<string, unknown>[], filename: string) {
  if (data.length === 0) return;
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(h => `"${String(row[h]).replace(/"/g, '""')}"`).join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ReportesPage() {
  const { state, showToast } = useApp();
  const businessId = state.currentUser?.businessId || 'b1';

  const appts = state.appointments.filter(a => a.businessId === businessId);
  const paid = appts.filter(a => a.paymentStatus === 'pagado');

  // Last 6 months revenue
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = subMonths(new Date(), 5 - i);
    const key = format(d, 'yyyy-MM');
    const label = format(d, 'MMM', { locale: es });
    const revenue = paid.filter(a => a.date.startsWith(key)).reduce((s, a) => s + a.servicePrice, 0);
    const count = appts.filter(a => a.date.startsWith(key)).length;
    return { key, label, revenue, count };
  });
  const maxRevenue = Math.max(...months.map(m => m.revenue), 1);

  // Service breakdown
  const serviceMap: Record<string, { name: string; count: number; revenue: number }> = {};
  paid.forEach(a => {
    if (!serviceMap[a.serviceId]) serviceMap[a.serviceId] = { name: a.serviceName, count: 0, revenue: 0 };
    serviceMap[a.serviceId].count++;
    serviceMap[a.serviceId].revenue += a.servicePrice;
  });
  const topServices = Object.values(serviceMap).sort((a, b) => b.revenue - a.revenue);

  // Employee breakdown
  const empMap: Record<string, { name: string; count: number; revenue: number }> = {};
  appts.filter(a => a.status !== 'cancelada').forEach(a => {
    if (!empMap[a.employeeId]) empMap[a.employeeId] = { name: a.employeeName, count: 0, revenue: 0 };
    empMap[a.employeeId].count++;
    empMap[a.employeeId].revenue += a.paymentStatus === 'pagado' ? a.servicePrice : 0;
  });
  const empStats = Object.values(empMap).sort((a, b) => b.count - a.count);

  // KPIs
  const totalRevenue = paid.reduce((s, a) => s + a.servicePrice, 0);
  const completedAppts = appts.filter(a => a.status === 'completada').length;
  const cancelRate = appts.length > 0 ? Math.round((appts.filter(a => a.status === 'cancelada').length / appts.length) * 100) : 0;
  const avgTicket = paid.length > 0 ? Math.round(totalRevenue / paid.length) : 0;

  const handleExportCitas = () => {
    const data = appts.map(a => ({
      Fecha: a.date,
      Hora: a.time,
      Cliente: a.clientName,
      Email: a.clientEmail,
      Telefono: a.clientPhone,
      Servicio: a.serviceName,
      Profesional: a.employeeName,
      Precio: a.servicePrice,
      Estado: a.status,
      Pago: a.paymentStatus,
      MetodoPago: a.paymentMethod || '',
    }));
    downloadCSV(data, `citas-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    showToast('Reporte de citas exportado', 'success');
  };

  const handleExportIngresos = () => {
    const data = paid.map(a => ({
      Fecha: a.date,
      Cliente: a.clientName,
      Servicio: a.serviceName,
      Profesional: a.employeeName,
      Monto: a.servicePrice,
      MetodoPago: a.paymentMethod || '',
    }));
    downloadCSV(data, `ingresos-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    showToast('Reporte de ingresos exportado', 'success');
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Reportes</h1>
          <p className="text-gray-400 text-sm mt-1">Análisis de ocupación y facturación</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExportCitas} className="btn-secondary text-sm">
            <Download size={15} />
            Exportar citas CSV
          </button>
          <button onClick={handleExportIngresos} className="btn-primary text-sm">
            <Download size={15} />
            Exportar ingresos CSV
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Ingresos totales', value: `$${totalRevenue.toLocaleString('es-MX')}`, icon: DollarSign, color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
          { label: 'Citas completadas', value: completedAppts, icon: Clock, color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
          { label: 'Ticket promedio', value: `$${avgTicket.toLocaleString('es-MX')}`, icon: TrendingUp, color: '#6050f8', bg: 'rgba(96,80,248,0.1)' },
          { label: 'Tasa de cancelación', value: `${cancelRate}%`, icon: Users, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
        ].map(kpi => (
          <div key={kpi.label} className="card p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: kpi.bg }}>
                <kpi.icon size={18} style={{ color: kpi.color }} />
              </div>
              <p className="text-xs text-gray-400 leading-tight">{kpi.label}</p>
            </div>
            <p className="text-2xl font-bold text-white">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue chart */}
        <div className="card p-6">
          <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
            <BarChart3 size={18} className="text-brand-400" />
            Ingresos últimos 6 meses
          </h2>
          <div className="flex items-end justify-between gap-2 h-40">
            {months.map(m => (
              <div key={m.key} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full flex items-end justify-center" style={{ height: '120px' }}>
                  <div
                    className="chart-bar w-full"
                    style={{ height: `${(m.revenue / maxRevenue) * 100}%`, minHeight: m.revenue > 0 ? '8px' : '0' }}
                    title={`$${m.revenue.toLocaleString('es-MX')}`}
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 capitalize">{m.label}</p>
                  <p className="text-xs font-semibold text-white">${(m.revenue / 1000).toFixed(1)}k</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment count chart */}
        <div className="card p-6">
          <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
            <TrendingUp size={18} className="text-cyan-400" />
            Citas por mes
          </h2>
          <div className="flex items-end justify-between gap-2 h-40">
            {months.map(m => {
              const maxCount = Math.max(...months.map(x => x.count), 1);
              return (
                <div key={m.key} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full flex items-end justify-center" style={{ height: '120px' }}>
                    <div
                      className="w-full rounded-t-md transition-all"
                      style={{
                        height: `${(m.count / maxCount) * 100}%`,
                        minHeight: m.count > 0 ? '8px' : '0',
                        background: 'linear-gradient(to top, #0891b2, #22d3ee)',
                        borderRadius: '4px 4px 0 0',
                      }}
                      title={`${m.count} citas`}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 capitalize">{m.label}</p>
                    <p className="text-xs font-semibold text-white">{m.count}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top services */}
        <div className="card p-6">
          <h2 className="text-base font-semibold text-white mb-4">Servicios más populares</h2>
          <table className="table-dark">
            <thead>
              <tr>
                <th>Servicio</th>
                <th>Citas</th>
                <th>Ingresos</th>
              </tr>
            </thead>
            <tbody>
              {topServices.map((s, i) => (
                <tr key={s.name}>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-500 w-4">#{i + 1}</span>
                      <span className="text-white text-sm">{s.name}</span>
                    </div>
                  </td>
                  <td className="text-gray-300 text-sm">{s.count}</td>
                  <td className="text-white font-semibold text-sm">${s.revenue.toLocaleString('es-MX')}</td>
                </tr>
              ))}
              {topServices.length === 0 && (
                <tr><td colSpan={3} className="text-center text-gray-500 text-sm py-8">Sin datos</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Employee performance */}
        <div className="card p-6">
          <h2 className="text-base font-semibold text-white mb-4">Rendimiento por profesional</h2>
          <div className="space-y-4">
            {empStats.map(emp => {
              const maxCount = Math.max(...empStats.map(e => e.count), 1);
              return (
                <div key={emp.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-white font-medium">{emp.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">{emp.count} citas</span>
                      <span className="text-sm font-semibold text-white">${emp.revenue.toLocaleString('es-MX')}</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${(emp.count / maxCount) * 100}%`, background: 'linear-gradient(to right, #6050f8, #22d3ee)' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
