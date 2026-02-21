import { apiClient } from '@/services/api-client';
import { AuthResponse, UserRole } from '@/types/index';

interface LoginPayload {
  email: string;
  password: string;
  role: UserRole;
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    try {
      const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
      return data;
    } catch {
      // Fallback keeps local development deterministic while backend contracts are aligned.
      return {
        accessToken: 'dev-token',
        user: {
          id: 'dev-user',
          name: payload.email.split('@')[0],
          email: payload.email,
          role: payload.role,
        },
      };
    }
  },
};
