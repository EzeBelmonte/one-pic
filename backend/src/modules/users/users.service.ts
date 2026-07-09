import * as userRepository from "./users.repository.js";
import type { UpdateUser, MyProfile, Profile } from "@shared/index.js";
import { toMyProfileDTO, toProfileDTO, toUserDTO, toMyUserDTO } from "../../shared/mappers/user.mapper.js";

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
export async function getUser(userId: number) {
  // Obtenemos el usuario
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  return toUserDTO(user);
}

// ========================================
// OBTENER PERFIL MEDIANTE ID
// ========================================
export async function getProfile(
  userId: number
): Promise<MyProfile> {
  // Obtenemos el usuario
  const user = await userRepository.findProfileById(userId);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  return toMyProfileDTO(user);
}

// ========================================
// OBTENER PERFIL MEDIANTE USERNAME
// ========================================
export async function getProfileByUsername(
  username: string
): Promise<Profile> {
  const profile = await userRepository.findProfileByUsername(username);

  if (!profile) {
    throw new Error("El usuario no existe");
  }

  return toProfileDTO(profile);
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