'use client';
import { useApp } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/components/Sidebar';

export default function ClienteLayout({ children }: { children: React.ReactNode }) {
  const { state } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!state.currentUser) router.push('/login');
    else if (state.currentUser.role === 'business') router.push('/dashboard');
  }, [state.currentUser, router]);

  if (!state.currentUser || state.currentUser.role !== 'client') return null;

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 min-h-screen overflow-auto" style={{ marginLeft: '240px', background: 'var(--bg-primary)' }}>
        <div className="p-6 md:p-8 max-w-5xl mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
