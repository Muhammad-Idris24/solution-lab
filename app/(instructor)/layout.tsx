'use client';

import { ProtectedRoute } from '@/components/ui/protected-route';

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute allowedRole="INSTRUCTOR">{children}</ProtectedRoute>;
}
