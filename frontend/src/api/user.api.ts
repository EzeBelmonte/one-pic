import api from "./axios";

import type {  
  User,
  MyUser, 
  UpdateUser 
} from "@shared/index";

// ========================================
// MI USUARIO
// ========================================
export async function getMe() {
  const response =
    await api.get<MyUser>("/users/me");

  return response.data;
}

// ========================================
// OTRO USUARIO
// ========================================
export async function getUser(
  username: string
) {
  const response =
    await api.get<User>(`/users/${username}`);

  return response.data;
}

// ========================================
// ACTUALIZAR PERFIL
// ========================================
export async function updateUser(
  data: UpdateUser
) {
  const response = 
    await api.patch<MyUser>("/users/me", data);

  return response.data;
}