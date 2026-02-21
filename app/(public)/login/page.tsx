'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ROLE_HOME_ROUTE } from '@/lib/routes';
import { useAuth } from '@/components/providers/auth-provider';
import { UserRole } from '@/types/index';

const roles: Exclude<UserRole, 'PUBLIC'>[] = ['STUDENT', 'INSTRUCTOR', 'ADMIN'];

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('student@yandytech.org');
  const [password, setPassword] = useState('Passw0rd!');
  const [role, setRole] = useState<Exclude<UserRole, 'PUBLIC'>>('STUDENT');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await login(email, password, role);
    toast.success('Authenticated successfully');
    router.push(ROLE_HOME_ROUTE[role]);
  };

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-4 py-10">
      <form onSubmit={handleSubmit} className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Sign in</h1>
        <p className="mt-1 text-sm text-slate-500">Access your role-specific dashboard.</p>
        <div className="mt-6 space-y-4">
          <input className="w-full rounded-lg border border-slate-200 p-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input className="w-full rounded-lg border border-slate-200 p-3" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
          <select className="w-full rounded-lg border border-slate-200 p-3" value={role} onChange={(e) => setRole(e.target.value as Exclude<UserRole, 'PUBLIC'>)} title="Select your role">
            {roles.map((entry) => <option key={entry}>{entry}</option>)}
          </select>
        </div>
        <button disabled={isLoading} className="mt-6 w-full rounded-lg bg-[#1fb6b6] p-3 font-semibold text-white disabled:opacity-70">
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
