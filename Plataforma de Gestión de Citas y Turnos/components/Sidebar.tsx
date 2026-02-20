'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';
import {
  LayoutDashboard, CalendarDays, Clock, Users, Scissors,
  BarChart3, Settings, LogOut, User, ChevronLeft, ChevronRight, UserCog,
  ArrowLeft
} from 'lucide-react';
import { useState } from 'react';

const businessLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/calendario', label: 'Calendario', icon: CalendarDays },
  { href: '/dashboard/citas', label: 'Citas', icon: Clock },
  { href: '/dashboard/clientes', label: 'Clientes', icon: Users },
  { href: '/dashboard/servicios', label: 'Servicios', icon: Scissors },
  { href: '/dashboard/empleados', label: 'Empleados', icon: UserCog },
  { href: '/dashboard/reportes', label: 'Reportes', icon: BarChart3 },
  { href: '/dashboard/configuracion', label: 'Configuración', icon: Settings },
];

const clientLinks = [
  { href: '/cliente', label: 'Mis Citas', icon: Clock },
  { href: '/cliente/perfil', label: 'Mi Perfil', icon: User },
];

export default function Sidebar() {
  const { state, logout } = useApp();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const links = state.currentUser?.role === 'business' ? businessLinks : clientLinks;

  const business = state.businesses.find(b => b.id === state.currentUser?.businessId);

  return (
    <aside
      className="fixed left-0 top-0 h-full z-40 flex flex-col transition-all duration-300"
      style={{
        width: collapsed ? '72px' : '240px',
        background: 'rgba(10, 10, 20, 0.95)',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/7">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-600">
          <CalendarDays size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-sm font-bold text-white truncate">Zona Sur Tech</div>
            <div className="text-xs text-gray-500 truncate">Gestión de Citas</div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1.5 rounded-lg hover:bg-white/8 text-gray-500 hover:text-gray-300 transition-colors flex-shrink-0"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Links */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
              title={collapsed ? label : undefined}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-2 py-4 border-t border-white/7 space-y-1">
        
        <a
            href="https://zonasurtech.online"
            className="sidebar-link text-xs text-emerald-400 hover:text-emerald-300"
            title={collapsed ? 'Volver' : undefined}
          >
            <ArrowLeft size={18} className="flex-shrink-0" />
            {!collapsed && <span>Volver a Zona Sur Tech</span>}
          </a>

        {state.currentUser?.role === 'business' && (
          <Link
            href={`/demo`}
            target="_blank"
            className="sidebar-link text-xs"
            title={collapsed ? 'Página Pública' : undefined}
          >
            <User size={18} className="flex-shrink-0" />
            {!collapsed && <span>Ver Página Pública</span>}
          </Link>
        )}
        <button
          onClick={logout}
          className="sidebar-link w-full text-left hover:text-red-400"
          title={collapsed ? 'Salir' : undefined}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span>Salir</span>}
        </button>
        {!collapsed && (
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {state.currentUser?.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-medium text-white truncate">{state.currentUser?.name}</div>
              <div className="text-xs text-gray-500 truncate capitalize">{state.currentUser?.role === 'business' ? 'Negocio' : 'Cliente'}</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
