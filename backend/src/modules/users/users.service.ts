import * as userRepository from "./users.repository.js";
import type { UpdateUserDTO, ProfileDTO } from "../../shared/types/user.dto.js";
import { toProfileDTO, toUserDTO } from "../../shared/mappers/user.mapper.js";

// ========================================
// OBTENER DATOS DEL USUARIO
// ========================================
export async function getMe(userId: number) {
  // Obtenemos el usuario
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  return toUserDTO(user);
}

// ========================================
// OBTENER USUARIO MEDIANTE POST
// ========================================
export async function getProfile(
  userId: number
): Promise<ProfileDTO> {
  // Obtenemos el usuario
  const user = await userRepository.findProfileById(userId);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  return toProfileDTO(user);
}

// ========================================
// ACTUALIZAR PERFIL
// ========================================
export async function updateProfile(
  userId: number,
  data: UpdateUserDTO
) {
  // Obtenemos el usuario
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  const updateUser = await userRepository.update(userId, data);

  return updateUser;
}