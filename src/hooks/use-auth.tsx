'use client';

import { createContext, useContext, useMemo, useState } from 'react';

type AuthCtx = {
  token: string | null;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(typeof window !== 'undefined' ? localStorage.getItem('token') : null);

  const value = useMemo(
    () => ({
      token,
      login: (user: string, pass: string) => {
        if (!user || !pass) return false;
        const t = `mock-jwt-${Date.now()}`;
        localStorage.setItem('token', t);
        setToken(t);
        return true;
      },
      logout: () => {
        localStorage.removeItem('token');
        setToken(null);
      }
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve estar dentro do AuthProvider');
  return ctx;
}
