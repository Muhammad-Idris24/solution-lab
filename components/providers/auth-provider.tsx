'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useAuthStore } from '@/store/auth-store';

const AuthContext = createContext({ useAuthStore });

export const AuthProvider = ({ children }: { children: ReactNode }) => (
  <AuthContext.Provider value={{ useAuthStore }}>{children}</AuthContext.Provider>
);

export const useAuth = () => useContext(AuthContext).useAuthStore();
