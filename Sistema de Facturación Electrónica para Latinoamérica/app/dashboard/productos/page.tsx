'use client';
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Product } from '@/lib/types';
import { Plus, Search, Tag, DollarSign } from 'lucide-react';

export default function ProductosPage() {
  const { state, dispatch, getCountryConfig } = useApp();
  const config = getCountryConfig();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    taxIncluded: false,
  });

  const filteredProducts = state.products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: `p-${Date.now()}`,
      name: newProduct.name,
      price: Number(newProduct.price),
      taxIncluded: newProduct.taxIncluded,
    };
    dispatch({ type: 'ADD_PRODUCT', payload: product });
    setIsModalOpen(false);
    setNewProduct({ name: '', price: '', taxIncluded: false });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Catálogo de Productos</h1>
          <p className="text-slate-500 text-sm">Gestiona tus items de venta</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
        >
          <Plus size={18} />
          Nuevo Producto
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 mb-6">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Tag size={20} />
                </div>
                <span className="text-sm font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded">
                  {config.currencySymbol} {product.price.toFixed(2)}
                </span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">{product.name}</h3>
              <p className="text-xs text-slate-500">
                {product.taxIncluded ? 'Impuestos Incluidos' : 'Más Impuestos'}
              </p>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-8 text-center text-slate-400">
              No se encontraron productos
            </div>
          )}
        </div>
      </div>

      {/* Basic Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Registrar Nuevo Producto</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Nombre del Producto / Servicio</label>
                <input required type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Precio Unitario ({config.currency})</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input required type="number" min="0" step="0.01" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="input-field pl-9" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="taxIncluded"
                  checked={newProduct.taxIncluded} 
                  onChange={e => setNewProduct({...newProduct, taxIncluded: e.target.checked})} 
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="taxIncluded" className="text-sm text-slate-700">El precio incluye impuestos ({config.tax.name})</label>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
