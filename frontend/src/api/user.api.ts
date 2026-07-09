import api from "axios";

import type { Profile } from "@/shared/types/user.type";
import type { User } from "@shared/index";

// ========================================
// MI PERFIL
// ========================================
export async function getMe() {
  const response =
    await api.get<User>("/me");

  return response.data;
}

// ========================================
// PERFIL
// ========================================
export async function getProfile() {
  const response =
    await api.get<Profile>("/profile");

  return response.data;
}

// ========================================
// EDITAR PERFIL
// ========================================
export async function editProfile() {
  const response = 
    await api.patch("/edit");

  return response.data;
}