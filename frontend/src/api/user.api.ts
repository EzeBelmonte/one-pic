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
  image: File | null,
  data: UpdateUser
) {
  const formData = new FormData();

  if (image) {
    formData.append("image", image);
  }
  // Obtenemos todos los datos recibidos
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const response = 
    await api.patch<MyUser>("/users/me", formData);

  return response.data;
}