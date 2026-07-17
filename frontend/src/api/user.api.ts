import api from "./axios";

import type {  
  User,
} from "@shared/index";

// ========================================
// MI USUARIO
// ========================================
export async function getMe() {
  const response =
    await api.get<User>("/users/me");

  return response.data;
}

