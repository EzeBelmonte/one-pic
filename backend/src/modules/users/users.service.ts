import * as userRepository from "./users.repository.js";
import * as followRepository from "../follows/follows.repository.js";

import { toMyUserDTO } from "../../shared/mappers/user.mapper.js";

// ========================================
// OBTENER DATOS PROPIOS
// ========================================
export async function getMe(userId: number) {
  // Obtenemos el usuario
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  const followersCount = await followRepository.countFollowers(user.id);
  const followingCount = await followRepository.countFollowing(user.id);

  /*const relation = await followRepository.findRelation(
    currentUserId,
    user.id
  );*/

  return toMyUserDTO(user);
}