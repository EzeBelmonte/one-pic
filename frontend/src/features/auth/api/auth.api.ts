import api from "@/api/axios";

import type {
  LoginRequest,
  LoginResponse,
} from "@/shared/types/auth.type";

import type { RegisterSchema } from "../schemas/auth.schema";

// ========================================
// REGISTRO
// ========================================
export async function register(
  data: RegisterSchema
) {
  const response =
    await api.post("/auth/register", data);

  return response.data;
}

// ========================================
// INICIO SESIÓN
// ========================================
export async function login(
  data: LoginRequest
) {
  const response =
    await api.post<LoginResponse>(
      "/auth/login",
      data
    );

  return response.data;
}