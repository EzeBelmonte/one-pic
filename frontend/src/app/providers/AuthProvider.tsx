import { createContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "@/shared/types/user.type";
import type { AuthContextType } from "@/shared/types/auth.type";
import { getMe } from "@/api/user.api";

export const AuthContext =
  createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!user;

  function login(user: User, token: string) {
    localStorage.setItem("token", token);

    setUser(user);
    setToken(token);
  }

  function logout() {
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
  }

  useEffect(() => {
    async function restoreSession() {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const user = await getMe();

        setUser(user);
      } catch (error) {
        logout();
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,

      isAuthenticated,
      isLoading,

      login,
      logout,
    }),
    [user, token, isAuthenticated, isLoading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}