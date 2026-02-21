'use client';

import { ProtectedRoute } from '@/components/ui/protected-route';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute allowedRole="ADMIN">{children}</ProtectedRoute>;
}
