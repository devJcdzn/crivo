"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import type { IAuthContext, IUser, LoginRequest } from "./auth-context-types";
import { useLoginUser } from "@/features/auth/api/use-login-user";
import { api } from "@/lib/api";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const useLoginMutation = useLoginUser();
  const isLoading = useLoginMutation.isPending;
  const router = useRouter();

  useEffect(() => {
    const authCookies = parseCookies(null);
    const token = authCookies["crivo@authToken"];

    if (!token) {
      return router.replace("/auth/login");
    }

    requestUserData();
  }, []);

  const login = async (loginRequest: LoginRequest) => {
    useLoginMutation.mutate(loginRequest, {
      onSuccess: (data) => {
        const { user, token } = data;
        console.log({ user, token });
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        setUser(user);
      },
      onError: (error) => {
        console.error("Login failed:", error);
      },
    });
  };

  const requestUserData = async (userId?: string) => {
    const { data } = await api.get<{ user: IUser }>(`/users/${userId ?? ""}`);

    setUser(data.user);
  };

  return (
    <AuthContext.Provider value={{ user, login, requestUserData, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
