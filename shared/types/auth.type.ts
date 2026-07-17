import type { User } from "./user.type";

export interface LoginResponse {
  user: User;
  token: string;
}