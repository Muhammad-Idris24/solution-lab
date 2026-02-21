'use client';

import Cookies from 'js-cookie';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authService } from '@/services/auth-service';
import { AuthUser, UserRole } from '@/types/index';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      login: async (email, password, role) => {
        set({ isLoading: true });
        const response = await authService.login({ email, password, role });
        Cookies.set('access_token', response.accessToken);
        Cookies.set('user_role', response.user.role);
        set({ user: response.user, token: response.accessToken, isLoading: false });
      },
      logout: () => {
        Cookies.remove('access_token');
        Cookies.remove('user_role');
        set({ user: null, token: null, isLoading: false });
      },
    }),
    {
      name: 'lms-auth',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
