"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Activity, Server, Cpu, Globe, ArrowLeft, TerminalSquare } from 'lucide-react';

const subdomains = [
  'admin', 'api', 'app', 'auth', 'cdn', 'citas', 'crm', 
  'facturacion', 'logs', 'monitor', 'registro', 'reviews', 'stack', 'status'
];

export default function MonitorPage() {
  const [cpuUsage, setCpuUsage] = useState([24, 32, 18, 45]);
  
  useEffect(() => {
    // Simulate live CPU monitoring
    const interval = setInterval(() => {
      setCpuUsage(prev => prev.map(() => Math.floor(Math.random() * 60) + 10)); // Ranges 10% to 70% to seem realistic
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col p-8 md:p-12 relative overflow-hidden bg-slate-950 min-h-screen font-sans">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] left-[50%] w-[30%] h-[30%] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col h-full gap-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
           <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white flex items-center gap-3 tracking-tight">
                 <TerminalSquare className="w-8 h-8 text-accent" />
                 PHX-1 Command Center
              </h1>
              <p className="text-slate-400 mt-2 flex items-center gap-2">
                 <Globe className="w-4 h-4" /> Ecosistema Global Zona Sur Tech
              </p>
           </div>
           
           <div className="flex gap-4">
              <div className="glass px-4 py-2 rounded-lg flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-sm font-medium text-emerald-400">All Systems Operational</span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CPU Monitoring */}
            <div className="lg:col-span-1 glass p-6 rounded-2xl border border-white/10 bg-white/5 flex flex-col">
               <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                  <Cpu className="w-5 h-5 text-primary" />
                  Cluster vCPU (4 Cores)
               </h2>
               <div className="space-y-6 flex-1">
                  {cpuUsage.map((usage, i) => (
                      <div key={i}>
                         <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-400 font-mono">Core {i}</span>
                            <span className="text-white font-mono">{usage}%</span>
                         </div>
                         <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                            <div 
                               className={\`h-full rounded-full transition-all duration-1000 \${usage > 50 ? 'bg-orange-500' : 'bg-primary'}\`} 
                               style={{ width: \`\${usage}%\` }}
                            />
                         </div>
                      </div>
                  ))}
               </div>
               
               <div className="mt-8 p-4 bg-black/20 rounded-xl border border-white/5">
                   <div className="flex items-center justify-between text-sm text-slate-400 font-mono">
                      <span>Server IP:</span>
                      <span className="text-accent">209.74.83.205</span>
                   </div>
                   <div className="flex items-center justify-between text-sm text-slate-400 font-mono mt-2">
                      <span>Gateway Port:</span>
                      <span className="text-primary">22022</span>
                   </div>
                   <div className="flex items-center justify-between text-sm text-slate-400 font-mono mt-2">
                      <span>Environment:</span>
                      <span className="text-emerald-400">Production</span>
                   </div>
               </div>
            </div>

            {/* Network Nodes map */}
            <div className="lg:col-span-2 glass p-6 rounded-2xl border border-white/10 bg-white/5">
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Server className="w-5 h-5 text-accent" />
                        Infrastructure Grid (14 Nodes)
                    </h2>
                    <Activity className="w-5 h-5 text-slate-500 animate-pulse" />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {subdomains.map(sub => (
                        <div key={sub} className="p-4 bg-black/20 rounded-xl border border-white/5 hover:bg-white/5 transition-colors group cursor-default">
                           <div className="flex items-center justify-between mb-2">
                               <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                               <span className="text-xs text-slate-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">OK</span>
                           </div>
                           <span className="text-sm font-medium text-slate-200">{sub}.zonasurtech.online</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="mt-auto pt-8 flex justify-between items-center text-sm text-slate-500">
           <Link href="https://zonasurtech.online" className="group flex items-center justify-center gap-2 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Main Hub
           </Link>
           <span className="font-mono">Pinging internal network... 0.05ms</span>
        </div>
      </div>
    </div>
  );
}
