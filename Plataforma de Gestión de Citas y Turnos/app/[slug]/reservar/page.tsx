'use client';
import { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { BUSINESSES } from '@/lib/mockData';
import { format, addDays, isSameDay, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Check, CreditCard, Lock, Mail, Star } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Appointment, Service } from '@/lib/types';

const HOURS = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30'];

export default function ReservarPage({ params }: { params: { slug: string } }) {
  const { state, dispatch, showToast } = useApp();
  const searchParams = useSearchParams();
  const business = (state.businesses.length > 0 ? state.businesses : BUSINESSES).find(b => b.slug === params.slug);

  const services = state.services.filter(s => s.businessId === business?.id && s.active);
  const employees = state.employees.filter(e => e.businessId === business?.id && e.active);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    serviceId: searchParams.get('service') || '',
    employeeId: '',
    date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    time: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    notes: '',
    cardNumber: '',
    cardName: '',
    cardExp: '',
    cardCvv: '',
  });
  const [calendarBase, setCalendarBase] = useState(new Date());
  const [payLoading, setPayLoading] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const [createdAppt, setCreatedAppt] = useState<Appointment | null>(null);

  const selectedService = services.find(s => s.id === form.serviceId);
  const selectedEmployee = employees.find(e => e.id === form.employeeId);

  // Generate dates (next 14 days)
  const dates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i + 1));

  // Get booked times for selected date + employee
  const bookedTimes = state.appointments
    .filter(a => a.employeeId === form.employeeId && a.date === form.date && a.status !== 'cancelada')
    .map(a => a.time);

  const availableHours = HOURS.filter(h => !bookedTimes.includes(h));

  const handlePay = async () => {
    if (!form.cardNumber || !form.cardName || !form.cardExp || !form.cardCvv) {
      showToast('Por favor completa los datos de pago', 'error');
      return;
    }
    setPayLoading(true);
    await new Promise(r => setTimeout(r, 1800));

    const service = services.find(s => s.id === form.serviceId)!;
    const employee = employees.find(e => e.id === form.employeeId)!;

    const appt: Appointment = {
      id: `a${Date.now()}`,
      businessId: business!.id,
      clientId: `guest-${Date.now()}`,
      clientName: form.clientName,
      clientEmail: form.clientEmail,
      clientPhone: form.clientPhone,
      employeeId: employee.id,
      employeeName: employee.name,
      serviceId: service.id,
      serviceName: service.name,
      servicePrice: service.price,
      serviceDuration: service.duration,
      date: form.date,
      time: form.time,
      status: 'confirmada',
      notes: form.notes,
      paymentStatus: 'pagado',
      paymentMethod: 'tarjeta',
      createdAt: format(new Date(), 'yyyy-MM-dd'),
    };
    dispatch({ type: 'ADD_APPOINTMENT', payload: appt });
    setCreatedAppt(appt);
    setBookingDone(true);
    setPayLoading(false);
  };

  if (!business) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400">
      Negocio no encontrado. <Link href="/" className="text-brand-400 ml-2">Volver al inicio</Link>
    </div>
  );

  if (bookingDone && createdAppt) return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="text-center max-w-md animate-slide-up">
        <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center mx-auto mb-6">
          <Check size={36} className="text-green-400" />
        </div>
        <h1 className="text-3xl font-black text-white mb-2">¡Cita confirmada!</h1>
        <p className="text-gray-400 mb-8">Recibirás un recordatorio por email antes de tu cita.</p>
        <div className="card p-6 text-left mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Star size={16} className="text-yellow-400 fill-current" />
            <span className="text-sm font-semibold text-white">Resumen de tu reserva</span>
          </div>
          {[
            ['Negocio', business.name],
            ['Servicio', createdAppt.serviceName],
            ['Profesional', createdAppt.employeeName],
            ['Fecha', format(parseISO(createdAppt.date), "EEEE d 'de' MMMM yyyy", { locale: es })],
            ['Hora', createdAppt.time],
            ['Total pagado', `$${createdAppt.servicePrice}`],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between py-2 border-b border-white/5 last:border-0">
              <span className="text-sm text-gray-400">{label}</span>
              <span className="text-sm font-medium text-white capitalize">{value}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-xs text-gray-500 bg-white/4 rounded-xl p-3 flex items-start gap-2">
            <Mail size={14} className="text-brand-400 flex-shrink-0 mt-0.5" />
            Hemos enviado un recordatorio a <strong className="text-white">{createdAppt.clientEmail}</strong>
          </div>
          <Link href={`/${params.slug}`} className="btn-secondary justify-center">← Volver al negocio</Link>
        </div>
      </div>
    </div>
  );

  const steps = [
    { n: 1, label: 'Servicio & Horario' },
    { n: 2, label: 'Tus datos' },
    { n: 3, label: 'Pago' },
  ];

  const canNext1 = form.serviceId && form.employeeId && form.date && form.time;
  const canNext2 = form.clientName && form.clientEmail && form.clientPhone;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="border-b border-white/6 px-6 py-4 flex items-center gap-3" style={{ background: 'rgba(10,10,18,0.95)', backdropFilter: 'blur(16px)' }}>
        <Link href={`/${params.slug}`} className="text-gray-400 hover:text-white transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{ background: business.coverColor }}>
            {business.name.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-semibold text-white">{business.name}</div>
            <div className="text-xs text-gray-500">Reservar cita</div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center gap-2">
              {i > 0 && <div className="w-8 h-0.5 bg-white/10" />}
              <div className="flex items-center gap-2">
                <div className={`step-dot ${step > s.n ? 'completed' : step === s.n ? 'active' : 'inactive'}`}>
                  {step > s.n ? <Check size={14} /> : s.n}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${step === s.n ? 'text-white' : 'text-gray-500'}`}>{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Step 1: Service + Schedule */}
        {step === 1 && (
          <div className="animate-slide-up space-y-5">
            <div className="card p-6">
              <h2 className="text-lg font-bold text-white mb-4">Elige tu servicio</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map(svc => (
                  <button
                    key={svc.id}
                    onClick={() => setForm({ ...form, serviceId: svc.id })}
                    className="p-4 rounded-xl text-left transition-all"
                    style={{
                      border: `1px solid ${form.serviceId === svc.id ? business.coverColor + '60' : 'rgba(255,255,255,0.08)'}`,
                      background: form.serviceId === svc.id ? business.coverColor + '12' : 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-white text-sm">{svc.name}</span>
                      <span className="font-bold text-white text-sm">${svc.price}</span>
                    </div>
                    <p className="text-xs text-gray-500">{svc.duration} min · {svc.category}</p>
                  </button>
                ))}
              </div>
            </div>

            {form.serviceId && (
              <div className="card p-6">
                <h2 className="text-lg font-bold text-white mb-4">Elige tu profesional</h2>
                <div className="flex gap-3 flex-wrap">
                  {employees.map(emp => (
                    <button
                      key={emp.id}
                      onClick={() => setForm({ ...form, employeeId: emp.id, time: '' })}
                      className="flex items-center gap-3 p-3 rounded-xl transition-all"
                      style={{
                        border: `1px solid ${form.employeeId === emp.id ? emp.color + '60' : 'rgba(255,255,255,0.08)'}`,
                        background: form.employeeId === emp.id ? emp.color + '12' : 'rgba(255,255,255,0.02)',
                      }}
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{ background: emp.color }}>
                        {emp.avatar}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-white">{emp.name}</p>
                        <p className="text-xs text-gray-500">{emp.specialty}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {form.employeeId && (
              <>
                <div className="card p-6">
                  <h2 className="text-lg font-bold text-white mb-4">Selecciona la fecha</h2>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {dates.map(d => {
                      const key = format(d, 'yyyy-MM-dd');
                      const isSelected = form.date === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setForm({ ...form, date: key, time: '' })}
                          className="flex-shrink-0 flex flex-col items-center p-3 rounded-xl w-14 transition-all"
                          style={{
                            border: `1px solid ${isSelected ? business.coverColor + '60' : 'rgba(255,255,255,0.08)'}`,
                            background: isSelected ? business.coverColor + '15' : 'rgba(255,255,255,0.02)',
                          }}
                        >
                          <span className="text-xs text-gray-500 uppercase">{format(d, 'EEE', { locale: es }).slice(0, 3)}</span>
                          <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-300'}`}>{format(d, 'd')}</span>
                          <span className="text-xs text-gray-500">{format(d, 'MMM', { locale: es })}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="card p-6">
                  <h2 className="text-lg font-bold text-white mb-4">Horarios disponibles</h2>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {HOURS.map(h => {
                      const isBooked = bookedTimes.includes(h);
                      return (
                        <button
                          key={h}
                          disabled={isBooked}
                          onClick={() => setForm({ ...form, time: h })}
                          className="py-2.5 rounded-xl text-sm font-medium transition-all"
                          style={{
                            background: isBooked ? 'rgba(255,255,255,0.03)' : form.time === h ? business.coverColor : 'rgba(255,255,255,0.05)',
                            color: isBooked ? '#374151' : form.time === h ? 'white' : '#D1D5DB',
                            cursor: isBooked ? 'not-allowed' : 'pointer',
                            border: `1px solid ${form.time === h ? business.coverColor : 'transparent'}`,
                            textDecoration: isBooked ? 'line-through' : 'none',
                          }}
                        >
                          {h}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {selectedService && selectedEmployee && form.date && form.time && (
              <div className="card p-4 flex items-center justify-between" style={{ borderColor: `${business.coverColor}30`, background: `${business.coverColor}08` }}>
                <div>
                  <p className="text-sm font-semibold text-white">{selectedService.name} con {selectedEmployee.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {format(parseISO(form.date), "d 'de' MMMM", { locale: es })} a las {form.time} · {selectedService.duration}min
                  </p>
                </div>
                <span className="text-xl font-black text-white">${selectedService.price}</span>
              </div>
            )}

            <button
              disabled={!canNext1}
              onClick={() => setStep(2)}
              className="btn-primary w-full justify-center py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continuar <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Step 2: Client info */}
        {step === 2 && (
          <div className="animate-slide-up space-y-5">
            <div className="card p-6">
              <h2 className="text-lg font-bold text-white mb-4">Tus datos de contacto</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Nombre completo *</label>
                  <input type="text" value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })} className="input-dark" placeholder="Tu nombre y apellido" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">Email *</label>
                    <input type="email" value={form.clientEmail} onChange={e => setForm({ ...form, clientEmail: e.target.value })} className="input-dark" placeholder="tu@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">Teléfono *</label>
                    <input type="tel" value={form.clientPhone} onChange={e => setForm({ ...form, clientPhone: e.target.value })} className="input-dark" placeholder="+52 55 1234 5678" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Notas adicionales</label>
                  <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="input-dark resize-none" rows={2} placeholder="¿Algo que debamos saber? Alergias, preferencias..." />
                </div>
              </div>
            </div>

            {/* Booking summary */}
            <div className="card p-4" style={{ borderColor: `${business.coverColor}30`, background: `${business.coverColor}08` }}>
              <p className="text-xs text-gray-400 mb-2">Resumen de tu reserva</p>
              {selectedService && selectedEmployee && (
                <div className="space-y-1">
                  {[
                    [selectedService.name, `$${selectedService.price}`],
                    [selectedEmployee.name, `${selectedService.duration} min`],
                    [format(parseISO(form.date), "EEEE d 'de' MMMM", { locale: es }), form.time],
                  ].map(([l, v]) => (
                    <div key={l} className="flex justify-between text-sm">
                      <span className="text-gray-400 capitalize">{l}</span>
                      <span className="text-white font-medium capitalize">{v}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center">← Atrás</button>
              <button disabled={!canNext2} onClick={() => setStep(3)} className="btn-primary flex-1 justify-center disabled:opacity-40">
                Continuar <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="animate-slide-up space-y-5">
            <div className="card p-6">
              <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                <CreditCard size={20} className="text-brand-400" />
                Datos de pago
              </h2>
              <p className="text-xs text-gray-500 mb-5 flex items-center gap-1">
                <Lock size={12} /> Transacción segura y encriptada
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Número de tarjeta</label>
                  <input
                    type="text"
                    value={form.cardNumber}
                    onChange={e => setForm({ ...form, cardNumber: e.target.value.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim() })}
                    className="input-dark font-mono tracking-widest"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Nombre en la tarjeta</label>
                  <input type="text" value={form.cardName} onChange={e => setForm({ ...form, cardName: e.target.value.toUpperCase() })} className="input-dark uppercase" placeholder="NOMBRE APELLIDO" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">Vencimiento</label>
                    <input
                      type="text"
                      value={form.cardExp}
                      onChange={e => {
                        const v = e.target.value.replace(/\D/g,'').slice(0,4);
                        setForm({ ...form, cardExp: v.length > 2 ? v.slice(0,2)+'/'+v.slice(2) : v });
                      }}
                      className="input-dark font-mono"
                      placeholder="MM/AA"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">CVV</label>
                    <input type="text" value={form.cardCvv} onChange={e => setForm({ ...form, cardCvv: e.target.value.replace(/\D/g,'').slice(0,4) })} className="input-dark font-mono" placeholder="123" maxLength={4} />
                  </div>
                </div>
              </div>
            </div>

            {/* Final summary */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-white mb-3">Resumen final</h3>
              {selectedService && (
                <>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">{selectedService.name} x1</span>
                    <span className="text-white">${selectedService.price}</span>
                  </div>
                  <div className="border-t border-white/8 pt-3 flex justify-between">
                    <span className="font-bold text-white">Total a pagar</span>
                    <span className="text-xl font-black text-white">${selectedService.price}</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn-secondary justify-center px-6">← Atrás</button>
              <button onClick={handlePay} disabled={payLoading} className="btn-primary flex-1 justify-center py-3.5">
                {payLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><Lock size={16} /> Pagar ${selectedService?.price}</>
                )}
              </button>
            </div>

            <p className="text-xs text-center text-gray-600">
              Al pagar aceptas los términos y condiciones de {business.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
