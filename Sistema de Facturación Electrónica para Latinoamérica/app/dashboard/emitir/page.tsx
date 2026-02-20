'use client';
import { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { COUNTRY_CONFIGS } from '@/lib/config';
import { InvoiceItem, Invoice, InvoiceStatus } from '@/lib/types';
import { Plus, Trash2, Save, FileText, UserPlus, PackagePlus } from 'lucide-react';
import { format, addDays } from 'date-fns';

export default function EmitirPage() {
  const { state, dispatch, getCountryConfig } = useApp();
  const config = getCountryConfig();

  // Form State
  const [clientId, setClientId] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [dueDate, setDueDate] = useState(format(addDays(new Date(), 30), 'yyyy-MM-dd'));
  const [invoiceType, setInvoiceType] = useState(config.invoiceTypes[0].code);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [notes, setNotes] = useState('');

  // Item Input State
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  // Totals Calculation
  const subtotal = items.reduce((acc, item) => acc + item.total, 0);
  const taxAmount = subtotal * config.tax.rate;
  const total = subtotal + taxAmount;

  // Handler: Add Item
  const handleAddItem = () => {
    const product = state.products.find(p => p.id === selectedProduct);
    if (!product) return;

    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      productId: product.id,
      description: product.name,
      quantity: Number(quantity),
      unitPrice: Number(price),
      total: Number(quantity) * Number(price),
    };

    setItems([...items, newItem]);
    // Reset item input
    setSelectedProduct('');
    setQuantity(1);
    setPrice(0);
  };

  // Handler: Remove Item
  const handleRemoveItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  // Handler: Save Invoice
  const handleSave = () => {
    if (!clientId || items.length === 0) {
      alert('Por favor seleccione un cliente y agregue al menos un producto.');
      return;
    }

    const client = state.clients.find(c => c.id === clientId);
    if (!client) return;

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      number: `${config.invoiceTypes.find(t=>t.code === invoiceType)?.code || 'F'}-${String(state.invoices.length + 1).padStart(6, '0')}`,
      type: invoiceType,
      date,
      dueDate,
      clientId: client.id,
      clientName: client.name,
      clientTaxId: client.taxId,
      country: state.currentCountry,
      status: 'issued',
      items,
      subtotal,
      taxAmount,
      total,
      notes,
    };

    dispatch({ type: 'ADD_INVOICE', payload: newInvoice });
    alert('Comprobante emitido correctamente');
    // Reset form
    setItems([]);
    setClientId('');
    setNotes('');
  };

  // Update price when product changes
  useEffect(() => {
    const product = state.products.find(p => p.id === selectedProduct);
    if (product) {
      setPrice(product.price);
    }
  }, [selectedProduct, state.products]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Emitir Comprobante</h1>
          <p className="text-slate-500 text-sm">Configuración actual: {config.name} ({config.currency})</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors"
        >
          <FileText size={18} />
          Emitir Comprobante
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form Info */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* General Info Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Datos Generales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Tipo de Comprobante</label>
                <select 
                  value={invoiceType}
                  onChange={e => setInvoiceType(e.target.value)}
                  className="input-field bg-slate-50"
                >
                  {config.invoiceTypes.map(type => (
                    <option key={type.code} value={type.code}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Cliente</label>
                <div className="flex gap-2">
                  <select 
                    value={clientId}
                    onChange={e => setClientId(e.target.value)}
                    className="input-field flex-1"
                  >
                    <option value="">Seleccionar Cliente...</option>
                    {state.clients.filter(c => c.country === state.currentCountry).map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <button className="p-2 bg-slate-100 rounded-md text-slate-600 hover:bg-slate-200" title="Nuevo Cliente">
                    <UserPlus size={18} />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Fecha de Emisión</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Fecha de Vencimiento</label>
                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="input-field" />
              </div>
            </div>
          </div>

          {/* Items Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Detalle de Productos/Servicios</h2>
            
            {/* Add Item Form */}
            <div className="flex flex-wrap md:flex-nowrap gap-3 mb-4 items-end bg-slate-50 p-4 rounded-lg">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-medium text-slate-500 mb-1">Producto</label>
                <select 
                  value={selectedProduct}
                  onChange={e => setSelectedProduct(e.target.value)}
                  className="input-field"
                >
                  <option value="">Seleccionar...</option>
                  {state.products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="w-24">
                <label className="block text-xs font-medium text-slate-500 mb-1">Cant.</label>
                <input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={e => setQuantity(Number(e.target.value))} 
                  className="input-field text-right" 
                />
              </div>
              <div className="w-32">
                <label className="block text-xs font-medium text-slate-500 mb-1">Precio Unit.</label>
                <input 
                  type="number" 
                  min="0" 
                  value={price} 
                  onChange={e => setPrice(Number(e.target.value))} 
                  className="input-field text-right" 
                />
              </div>
              <button 
                onClick={handleAddItem}
                disabled={!selectedProduct}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-2.5 rounded-lg transition-colors"
                title="Agregar"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-2 text-left">Descripción</th>
                    <th className="px-4 py-2 text-right">Cant.</th>
                    <th className="px-4 py-2 text-right">P. Unit</th>
                    <th className="px-4 py-2 text-right">Total</th>
                    <th className="px-4 py-2 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map(item => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 text-slate-700">{item.description}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{item.quantity}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{config.currencySymbol} {item.unitPrice.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right font-medium text-slate-800">{config.currencySymbol} {item.total.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => handleRemoveItem(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                        No hay items agregados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Totals & Summary */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold mb-4">Resumen</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span>{config.currencySymbol} {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>{config.tax.name} ({config.tax.rate * 100}%)</span>
                <span>{config.currencySymbol} {taxAmount.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-700 pt-3 flex justify-between font-bold text-xl text-white">
                <span>Total</span>
                <span>{config.currencySymbol} {total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <label className="block text-xs font-medium text-slate-500 mb-2">Notas / Observaciones</label>
            <textarea 
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="input-field min-h-[100px] resize-none"
              placeholder="Detalles adicionales..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
