'use client';
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Quote, QuoteItem } from '@/lib/types';
import { Plus, Trash2, Save, Send } from 'lucide-react';
import { format, addDays } from 'date-fns';

export default function CrearPropuestaPage() {
  const { state, dispatch } = useApp();
  const router = useRouter();

  const [dealId, setDealId] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [validUntil, setValidUntil] = useState(format(addDays(new Date(), 15), 'yyyy-MM-dd'));
  const [items, setItems] = useState<QuoteItem[]>([
    { id: '1', description: 'Servicios Profesionales', quantity: 1, unitPrice: 0, total: 0 }
  ]);

  const handleItemChange = (id: string, field: keyof QuoteItem, value: any) => {
    setItems(items.map(item => {
      if (item.id !== id) return item;
      const updates = { [field]: value };
      if (field === 'quantity' || field === 'unitPrice') {
        const qty = field === 'quantity' ? Number(value) : item.quantity;
        const price = field === 'unitPrice' ? Number(value) : item.unitPrice;
        updates.total = qty * price;
      }
      return { ...item, ...updates };
    }));
  };

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), description: '', quantity: 1, unitPrice: 0, total: 0 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  const subtotal = items.reduce((acc, item) => acc + item.total, 0);
  const tax = subtotal * 0.16; // 16% IVA default
  const total = subtotal + tax;

  const handleSave = () => {
    if (!dealId) return alert('Selecciona un Deal');
    
    const newQuote: Quote = {
      id: `q-${Date.now()}`,
      dealId,
      number: `COT-${String(state.quotes.length + 1).padStart(4, '0')}`,
      date,
      validUntil,
      items,
      subtotal,
      tax,
      total,
      status: 'draft',
    };

    dispatch({ type: 'ADD_QUOTE', payload: newQuote });
    router.push('/dashboard/propuestas');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Nueva Propuesta</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
        {/* Header Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Oportunidad / Deal</label>
            <select 
              value={dealId}
              onChange={e => setDealId(e.target.value)}
              className="input-field h-10"
            >
              <option value="">Seleccionar Deal...</option>
              {state.deals.map(deal => (
                <option key={deal.id} value={deal.id}>
                  {deal.title} - {state.contacts.find(c => c.id === deal.contactId)?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Fecha Emisión</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input-field h-10" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Válida hasta</label>
              <input type="date" value={validUntil} onChange={e => setValidUntil(e.target.value)} className="input-field h-10" />
            </div>
          </div>
        </div>

        {/* Items */}
        <div>
          <h3 className="font-semibold text-slate-700 mb-3 text-sm border-b pb-2">Conceptos</h3>
          <div className="space-y-3">
            {items.map((item, idx) => (
              <div key={item.id} className="flex gap-3 items-start">
                <div className="flex-1">
                  <input 
                    type="text" 
                    placeholder="Descripción del servicio..." 
                    value={item.description}
                    onChange={e => handleItemChange(item.id, 'description', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="w-20">
                  <input 
                    type="number" 
                    min="1"
                    value={item.quantity}
                    onChange={e => handleItemChange(item.id, 'quantity', e.target.value)}
                    className="input-field text-right"
                    placeholder="Cant."
                  />
                </div>
                <div className="w-32">
                  <input 
                    type="number" 
                    min="0"
                    value={item.unitPrice}
                    onChange={e => handleItemChange(item.id, 'unitPrice', e.target.value)}
                    className="input-field text-right"
                    placeholder="Precio"
                  />
                </div>
                <div className="w-32 pt-2 text-right font-medium text-slate-700 text-sm">
                  ${item.total.toLocaleString()}
                </div>
                <button onClick={() => removeItem(item.id)} className="pt-2 text-slate-400 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={addItem} className="mt-4 text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1">
            <Plus size={14} /> Agregar item
          </button>
        </div>

        {/* Totals */}
        <div className="flex justify-end pt-6 border-t border-slate-100">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-sm text-slate-500">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-500">
              <span>IVA (16%)</span>
              <span>${tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-slate-800 pt-2 border-t border-slate-100">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6">
          <button 
            onClick={() => router.back()}
            className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center gap-2"
          >
            <Save size={18} />
            Guardar Propuesta
          </button>
        </div>
      </div>
    </div>
  );
}
