import * as userRepository from "../users/users.repository.js";
import * as followRepository from "../follows/follows.repository.js";
import * as profileRepository from "./profile.repository.js";
import * as postsRepository from "../posts/posts.repository.js";

import type { UpdateProfile } from "@shared/index.js";

import type { ImageItem } from "../../shared/types/uploadedImage.type.js";
import { toMyProfileDTO, toUserProfileDTO } from "../../shared/mappers/profile.mapper.js";
import * as cloudinaryService from "../../infrastructure/cloudinary/cloudinary.service.js";

import { 
  getExistingUserByUsername 
} from "../../shared/helpers/getExistingUser.js";


// ========================================
// OBTENER MI PERFIL
// ========================================
export async function getMyProfile(userId: number) {

  // Obtenemos el usuario
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  // Obtener cantidad de seguidores y seguidos
  const followersCount = await followRepository.countFollowers(user.id);
  const followingCount = await followRepository.countFollowing(user.id);

  // Obtener cantidad de fotos
  const postsCount = await postsRepository.countPost(user.id);

  return toMyProfileDTO(
      user,
      followersCount ?? 0,
      followingCount ?? 0,
      postsCount ?? 0,
  );
  
}

// ========================================
// OBTENER PERFIL DE USUARIO
// ========================================
export async function getUserProfile(username: string) {
  // Obtenemos el usuario
  const user = await userRepository.findUserByUsername(username);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  const targetUser = await getExistingUserByUsername(username);
  
    if (!targetUser) {
      throw new Error("El usuario no existe");
    }
  
  const followingId = targetUser.id;
  
  const followersCount = await followRepository.countFollowers(user.id);
  const followingCount = await followRepository.countFollowing(user.id);

  /*const relation = await followRepository.findRelation(
    followingId,
    user.id
  );

  if (relation?.status === undefined) {
    throw new Error("Relación indefinida");
  }*/

  // Obtener cantidad de fotos
  const postsCount = await postsRepository.countPost(user.id);

  return toUserProfileDTO(
      user,
      followersCount ?? 0,
      followingCount ?? 0,
      //relation?.status,
      postsCount ?? 0,
  );
  
}

// ========================================
// ACTUALIZAR PERFIL
// ========================================
export async function updateProfile(
  userId: number,
  imageBuffer: Buffer | undefined,
  data: UpdateProfile
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

  const updateProfile = await profileRepository.update(userId, data, image);

  return updateProfile;
}