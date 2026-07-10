import api from "./axios";

import type {  
  MyUser, 
  Profile, 
  MyProfile, 
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
// MI PERFIL
// ========================================
export async function getMyProfile() {

  const response =
    await api.get<MyProfile>("/users/me/profile");

  return response.data;
}

// ========================================
// PERFIL PÚBLICO
// ========================================
export async function getProfile(
  username: string
) {
  const response =
    await api.get<Profile>(`/users/${username}`);

  return response.data;
}

// ========================================
// ACTUALIZAR PERFIL
// ========================================
export async function updateProfile(
  data: UpdateUser
) {
  const response = 
    await api.patch<MyUser>("/users/me", data);

  return response.data;
}