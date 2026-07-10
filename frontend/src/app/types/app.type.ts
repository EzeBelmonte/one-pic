import type { MyUser } from "@shared/index";

export interface AuthContextType {
  user: MyUser | null;
  token: string | null;

  isAuthenticated: boolean;
  isLoading: boolean;

  login: (token: string) => void;
  logout: () => void;
}
