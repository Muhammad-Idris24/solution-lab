import { ReactNode } from 'react';

export const AdminSection = ({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) => (
  <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      {action}
    </div>
    {children}
  </section>
);
