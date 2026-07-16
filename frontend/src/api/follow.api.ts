import api from "./axios";

import type { Follow } from "@shared/index";

// ========================================
// CREAR RELACIÓN
// ========================================
export async function createRelation(
  username: string
) {
  const response = 
    await api.post(`/users/${username}/follow`);

  return response.data;
}

// ========================================
// ACEPTAR SOLICITUD
// ========================================
export async function acceptRequest(
  username: string
) {
  const response = await api.patch(`/users/${username}/follow/accept`);

  return response.data;
}

// ========================================
// RECHAZAR SOLICITUD
// ========================================
export async function rejectRequest(
  username: string
) {
  await api.delete(`/users/${username}/follow/reject`);
}

// ========================================
// OBTENER SEGUIDORES
// ========================================
export async function getFollowers(
  username: string
) {
  const response = await api.get<Follow[]>(`/users/${username}/followers`);

  return response.data;
}

// ========================================
// OBTENER SEGUIDOS
// ========================================
export async function getFollowing(
  username: string
) {
  const response = await api.get<Follow[]>(`/users/${username}/following`);

  return response.data;
}

// ========================================
// ELIMINAR RELACIÓN
// ========================================
export async function deleteRelation(
  username: string
) {
  await api.delete(`/users/${username}/follow`);

}