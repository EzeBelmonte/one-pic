import * as userRepository from "./users.repository.js";
import type { UpdateUser } from "@shared/index.js";
import { toUserDTO, toMyUserDTO } from "../../shared/mappers/user.mapper.js";

// ========================================
// OBTENER DATOS PROPIOS
// ========================================
export async function getMe(userId: number) {
  // Obtenemos el usuario
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  return toMyUserDTO(user);
}

// ========================================
// OBTENER DATOS DE USUARIO
// ========================================
export async function getUser(username: string) {
  // Obtenemos el usuario
  const user = await userRepository.findUserByUsername(username);
  
  if (!user) {
    throw new Error("El usuario no existe");
  }

  return toUserDTO(user);
}

// ========================================
// ACTUALIZAR PERFIL
// ========================================
export async function updateProfile(
  userId: number,
  data: UpdateUser
) {
  // Obtenemos el usuario
  const profile = await userRepository.findById(userId);

  if (!profile) {
    throw new Error("El usuario no existe");
  }

  const updateUser = await userRepository.update(userId, data);

  return updateUser;
}