import api from "./axios";

import type { LoginRequest, LoginResponse } from "@/shared/types/auth.type";

export async function login(data: LoginRequest) {
  const response = 
    await api.post<LoginResponse>(
      "/auth/login",
      data
    );
  return response.data;
}