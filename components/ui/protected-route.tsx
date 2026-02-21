'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from './loading-spiner';
import { useAuth } from '@/components/providers/auth-provider';
import { UserRole } from '@/types/index';

export const ProtectedRoute = ({
  children,
  allowedRole,
}: {
  children: React.ReactNode;
  allowedRole: Exclude<UserRole, 'PUBLIC'>;
}) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
      return;
    }

    if (user.role !== allowedRole) {
      router.replace('/');
    }
  }, [allowedRole, router, user]);

  if (!user || user.role !== allowedRole) {
    return <LoadingSpinner label="Checking access..." />;
  }

  return <>{children}</>;
};
