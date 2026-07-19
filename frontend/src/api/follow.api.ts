import api from "./axios";

// ========================================
// COMPROBAR RELACIÓN
// ========================================
export async function getRelation(
  username: string
) {

  const response =
    await api.get(`/users/${username}/follow-status`);

  return response.data;
}

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
// ELIMINAR RELACIÓN
// ========================================
export async function deleteRelation(
  username: string
) {
  const response = 
    await api.delete(`/users/${username}/unfollow`);
  
  return response.data;
}

// ========================================
// OBTENER PENDIENTES
// ========================================
export async function getPending() {
  const response = 
    await api.get("/users/followers-pendig");
  
  return response.data;
}

// ========================================
// ACEPTAR SOLICITUD
// ========================================
export async function acceptRequest(
  username: string
) {
  await api.patch(`/users/${username}/follow-accept`);
}

// ========================================
// RECHAZAR SOLICITUD
// ========================================
export async function rejectRequest(
  username: string
) {
  await api.delete(`/users/${username}/follow-reject`);
}