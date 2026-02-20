'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Kanban, Users, FileText, Settings, LogOut, ArrowLeft, Smartphone } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/pipeline', label: 'Pipeline', icon: Kanban },
    { href: '/dashboard/contactos', label: 'Contactos', icon: Users },
    { href: '/dashboard/propuestas', label: 'Propuestas', icon: FileText },
  ];

  return (
    <aside className="w-20 lg:w-64 bg-slate-950 text-slate-300 flex flex-col h-screen fixed left-0 top-0 transition-all z-50 border-r border-slate-800">
      <div className="p-4 flex items-center gap-3 justify-center lg:justify-start border-b border-slate-800 h-16">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
          Z
        </div>
        <div className="hidden lg:block">
           <span className="font-semibold text-white block leading-tight">Zona Sur Tech</span>
           <span className="text-[10px] text-slate-500 font-medium">CRM Services</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map(link => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-900/20' 
                  : 'hover:bg-slate-900 hover:text-white'
              }`}
            >
              <link.icon className="shrink-0" size={20} />
              <span className="hidden lg:block text-sm font-medium">{link.label}</span>
              
              {/* Tooltip for mobile/collapsed state */}
              <div className="absolute left-16 bg-slate-900 text-white text-xs px-2 py-1 rounded hidden group-hover:block lg:group-hover:hidden whitespace-nowrap z-50 border border-slate-800">
                {link.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-3">
        <a 
          href="https://zonasurtech.online"
          className="flex items-center gap-3 px-3 py-2 text-emerald-400 hover:text-emerald-300 hover:bg-slate-900 rounded-lg transition-colors text-sm font-medium"
        >
          <ArrowLeft size={18} />
          <span className="hidden lg:block">Volver al Sitio</span>
        </a>

        <button className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-red-400 w-full rounded-lg hover:bg-slate-900 transition-colors">
          <LogOut size={20} />
          <span className="hidden lg:block text-sm">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
