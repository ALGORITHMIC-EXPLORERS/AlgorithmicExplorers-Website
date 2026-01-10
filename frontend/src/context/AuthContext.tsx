import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthUser = { 
  id: number; 
  first_name: string; 
  last_name: string; 
  email: string;
  is_verified_guru: boolean;
  is_staff: boolean;
  is_superuser: boolean;
} | null;

type AuthContextType = {
  user: AuthUser;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: Record<string, string>) => Promise<void>;
  socialLogin: (provider: "google" | "facebook" | "microsoft", accessToken: string) => Promise<void>;
  updateUser: (newUser: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

type StoredAuth = { user: AuthUser; tokens?: { access?: string; refresh?: string } };

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(false);

  const setAuthHeader = (token?: string) => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  };

  useEffect(() => {
    const cached = localStorage.getItem("ae-auth");
    if (cached) {
      const parsed: StoredAuth = JSON.parse(cached);
      setUser(parsed.user);
      setAuthHeader(parsed.tokens?.access);
    }
  }, []);

  const persist = (nextUser: AuthUser, tokens?: { access?: string; refresh?: string }) => {
    if (!nextUser || !tokens) {
      localStorage.removeItem("ae-auth");
      setAuthHeader(undefined);
      return;
    }
    localStorage.setItem("ae-auth", JSON.stringify({ user: nextUser, tokens }));
    setAuthHeader(tokens.access);
  };

  const extractTokens = (data: any) =>
    data?.tokens ?? ({ access: data?.access, refresh: data?.refresh } as { access?: string; refresh?: string });

  const handleAuthSuccess = (data: any) => {
    if (!data?.user) return;
    const tokens = extractTokens(data);
    setUser(data.user);
    persist(data.user, tokens);
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/login/", { email, password });
      handleAuthSuccess(data);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: Record<string, string>) => {
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/register/", payload);
      handleAuthSuccess(data);
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = async (
    provider: "google" | "facebook" | "microsoft",
    accessToken: string,
  ) => {
    setLoading(true);
    try {
      const { data } = await api.post(`/api/auth/oauth/${provider}/`, {
        access_token: accessToken,
      });
      handleAuthSuccess(data);
    } catch (error) {
      console.error(`${provider} login failed`, error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (newUser: AuthUser) => {
    setUser(newUser);
    const cached = localStorage.getItem("ae-auth");
    if (cached) {
      const parsed = JSON.parse(cached);
      parsed.user = newUser;
      localStorage.setItem("ae-auth", JSON.stringify(parsed));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ae-auth");
    setAuthHeader(undefined);
  };

  const value = useMemo(
    () => ({ user, loading, login, register, socialLogin, logout, updateUser }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};