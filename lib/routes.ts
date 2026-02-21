import { UserRole } from '@/types/index';

export const ROLE_HOME_ROUTE: Record<Exclude<UserRole, 'PUBLIC'>, string> = {
  STUDENT: '/student',
  INSTRUCTOR: '/instructor',
  ADMIN: '/admin',
};
