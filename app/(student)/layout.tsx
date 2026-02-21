'use client';

import { ProtectedRoute } from '@/components/ui/protected-route';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute allowedRole="STUDENT">{children}</ProtectedRoute>;
}
