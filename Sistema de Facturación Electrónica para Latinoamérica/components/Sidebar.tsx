'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Users, Package, Settings, LogOut, Globe, ArrowLeft, ExternalLink } from 'lucide-react';
import { useApp } from '@/lib/store';
import { COUNTRY_CONFIGS } from '@/lib/config';

export default function Sidebar() {
  const pathname = usePathname();
  const { state, dispatch, getCountryConfig } = useApp();
  const config = COUNTRY_CONFIGS[state.currentCountry];

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/emitir', label: 'Emitir Factura', icon: FileText },
    { href: '/dashboard/clientes', label: 'Clientes', icon: Users },
    { href: '/dashboard/productos', label: 'Productos', icon: Package },
    { href: '/dashboard/reportes', label: 'Reportes', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-white flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shrink-0">
          Z
        </div>
        <div>
          <h1 className="font-bold text-sm leading-tight">Zona Sur Tech</h1>
          <p className="text-[10px] text-slate-400">Facturación {config.name}</p>
        </div>
      </div>

      {/* Country Selector */}
      <div className="px-4 py-4">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">País de Emisión</label>
        <div className="grid grid-cols-3 gap-2 bg-slate-900 p-1 rounded-lg">
          {Object.values(COUNTRY_CONFIGS).map((c) => (
            <button
              key={c.code}
              onClick={() => dispatch({ type: 'SET_COUNTRY', payload: c.code })}
              className={`text-xs py-1.5 rounded-md transition-all font-medium ${
                state.currentCountry === c.code 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {c.code}
            </button>
          ))}
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-2">
        {links.map(link => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <a 
          href="https://zonasurtech.online"
          className="flex items-center gap-3 px-3 py-2 text-emerald-400 hover:text-emerald-300 hover:bg-slate-900 rounded-lg transition-colors text-sm font-medium"
        >
          <ArrowLeft size={18} />
          Volver a Zona Sur Tech
        </a>
        
        <div className="pt-2 border-t border-slate-800">
           {state.user ? (
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold">
                {state.user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{state.user.name}</p>
                <p className="text-xs text-slate-500 truncate">{state.user.email}</p>
              </div>
              <button 
                onClick={() => dispatch({ type: 'LOGOUT' })}
                className="text-slate-400 hover:text-red-400 transition-colors"
                title="Cerrar Sesión"
              >
                <LogOut size={16} />
              </button>
            </div>
           ) : (
            <Link href="/" className="block text-center text-sm text-slate-400 hover:text-white">Iniciar Sesión</Link>
           )}
        </div>
      </div>
    </aside>
  );
}
