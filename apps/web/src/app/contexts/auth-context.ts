import { createContext } from 'react';

import type { LoginData, RegisterData } from '@/types/auth-data';

import type { UserWithoutPassword } from '@challenge/shared';

export interface AuthContextValue {
  isAuthenticated: boolean;
  user: UserWithoutPassword | null;
  handleLogin: (data: LoginData) => Promise<void>;
  handleRegister: (data: RegisterData) => Promise<void>;
  handleLogout: () => Promise<void>;
  isSessionLoading: boolean;
  isLoginLoading: boolean;
  isRegisterLoading: boolean;
  isLogoutLoading: boolean;
}

export const AuthContext = createContext({} as AuthContextValue);
