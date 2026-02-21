import { ReactNode } from 'react';

export const DashboardSection = ({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) => (
  <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      {action}
    </div>
    {children}
  </section>
);
