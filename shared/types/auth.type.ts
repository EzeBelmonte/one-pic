import type { MyUser } from "./user.type";

export interface LoginResponse {
  user: MyUser;
  token: string;
}