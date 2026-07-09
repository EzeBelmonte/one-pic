import type { User } from "@shared/index.js";

export interface CreateUserDTO {
  email: string;
  username: string;
  password: string;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}