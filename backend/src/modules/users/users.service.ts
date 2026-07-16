import * as userRepository from "./users.repository.js";
import * as followRepository from "../follows/follows.repository.js";

import type { UpdateUser } from "@shared/index.js";
import type { ImageItem } from "../../shared/types/uploadedImage.type.js";
import { toUserDTO, toMyUserDTO } from "../../shared/mappers/user.mapper.js";
import * as cloudinaryService from "../../infrastructure/cloudinary/cloudinary.service.js";

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
  /*
  const followersCount = await followRepository.countFollowers(user.id);

  const followingCount = await followRepository.countFollowing(user.id);

  const relation = await followRepository.findRelation(
    currentUserId,
    user.id
  );

  return toProfileUserDTO(
      user,
      followersCount,
      followingCount,
      relation?.status ?? null
  );
  */

  return toUserDTO(user);
}

// ========================================
// ACTUALIZAR PERFIL
// ========================================
export async function updateUser(
  userId: number,
  imageBuffer: Buffer | undefined,
  data: UpdateUser
) {

  // Obtenemos el usuario
  const profile = await userRepository.findById(userId);

  if (!profile) {
    throw new Error("El usuario no existe");
  }

  let image: ImageItem | undefined;

  if (imageBuffer) {
    // Si el ID es igual a "", significa que tiene la imagen de perfil por defecto
    // Si no, va a tener el id de la imagen que subio la vez anterior
    if (profile.profileImagePublicId !== "") {
      await cloudinaryService.deleteImage(profile.profileImagePublicId);
    }

    // Subimos la nueva imagen de perfil
    image = await cloudinaryService.uploadImage(imageBuffer);
  }

  const updateUser = await userRepository.update(userId, data, image);

  return updateUser;
}