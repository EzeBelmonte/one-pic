import type { UserDTO } from "../../shared/types/user.dto.js";

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
  user: UserDTO;
  token: string;
}