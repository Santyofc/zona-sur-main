'use client';
import Sidebar from '@/components/Sidebar';
import { useApp } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { state } = useApp();
  const router = useRouter();

  // Simple auth check - in a real app this would be more robust
  useEffect(() => {
    // For demo purposes we allow access, but normally we'd check state.user here
    // if (!state.user) router.push('/');
  }, [state.user, router]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
