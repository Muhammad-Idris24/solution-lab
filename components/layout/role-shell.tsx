'use client';

import Link from 'next/link';
import { useAuth } from '@/components/providers/auth-provider';

export const RoleShell = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <header className="border-b border-slate-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#157b86]">{user?.role} Portal</p>
            <h1 className="text-xl font-bold text-slate-900">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-semibold text-slate-600">Public Site</Link>
            <button onClick={logout} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Logout</button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-6">{children}</main>
    </div>
  );
};
