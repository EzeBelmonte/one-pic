import api from "./axios";

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
// STATUS DE LA SOLICITUD
// ========================================
export async function getStatus(
  username: string
) {
  const response =
    await api.get(`/users/${username}/follow-status`);

  console.log(response.data)
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
// ELIMINAR RELACIÓN
// ========================================
export async function deleteRelation(
  username: string
) {
  await api.delete(`/users/${username}/follow`);

}