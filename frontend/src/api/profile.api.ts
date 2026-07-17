import api from "./axios";

import type {  
  MyProfile,
  UserProfile,
  UpdateProfile 
} from "@shared/index";

// ========================================
// OBTENER PERFIL
// ========================================
export async function getMyProfile() {
  const response =
    await api.get<MyProfile>("/profile");

  return response.data;
}

// ========================================
// OBTENER OTRO PERFIL
// ========================================
export async function getUserProfile(
  username: string
) {
  const response =
    await api.get<UserProfile>(`/profile/${username}`);

  return response.data;
}

// ========================================
// ACTUALIZAR PERFIL
// ========================================
export async function updateProfile(
  image: File | null,
  data: UpdateProfile
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
    await api.patch<MyProfile>("/profile/config", formData);

  return response.data;
}