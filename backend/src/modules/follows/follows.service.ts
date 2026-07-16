import * as followRepository from "../follows/follows.repository.js";

import { 
  getExistingUserByUsername 
} from "../../shared/helpers/getExistingUser.js";

import type { 
  Follow,
} from "@shared/index.js";

import { FOLLOW_STATUS, type FollowStatus } from "../../constants/follow.js";

import { toFollowDTO } from "../../shared/mappers/follow.mapper.js";

// ========================================
// CREAR RELACIÓN
// ========================================
export async function createRelation(
  followerId: number,
  username: string,
) {

  const targetUser = await getExistingUserByUsername(username);

  if (!targetUser) {
    throw new Error("El usuario no existe");
  }

  const followingId = targetUser.id;

  // No puedo seguirme a mí mismo
  if (followerId === followingId) {
    throw new Error("No puedes seguirte a ti mismo");
  }

  // Verificar que no exista ya la relación
  const existingRelation =
    await followRepository.findRelation(
      followerId,
      followingId
    );
  
  if (existingRelation) {
    throw new Error("La relación ya existe");
  }

  // Decidir automáticamente el estado
  const status: FollowStatus = targetUser.isPrivate
    ? FOLLOW_STATUS.PENDING
    : FOLLOW_STATUS.ACCEPTED;

  return await followRepository.create({
    followerId,
    followingId,
    status,
  });
}

// ========================================
// OBTENER RELACIÓN
// ========================================
export async function findRelation(
  followerId: number,
  followingId: number,
) {
  
  return await followRepository.findRelation(
    followerId,
    followingId
  );
}

// ========================================
// ACTULIZAR ESTADO
// ========================================
export async function updateStatus(
  followerId: number,
  followingId: number,
  status: FollowStatus
) {

  const relation =
    await followRepository.findRelation(
      followerId,
      followingId
    );
  
  if (!relation) {
    throw new Error("La relación no existe");
  }

  return await followRepository.updateStatus(
    followerId,
    followingId,
    status
  );
}

// ========================================
// OBTENER SEGUIDORES
// ========================================
export async function findFollowers(
  username: string
): Promise<Follow[]> {

  const targetUser = await getExistingUserByUsername(username);

  const followers =
    await followRepository.findFollowers(targetUser.id);

  return followers.map((relation) =>
    toFollowDTO(relation.follower)
  );
}

// ========================================
// OBTENER SEGUIDOS
// ========================================
export async function findFollowing(
  username: string
): Promise<Follow[]> {

  const targetUser = await getExistingUserByUsername(username);

  const following 
    = await followRepository.findFollowing(targetUser.id);

  return following.map((relation) => 
    toFollowDTO(relation.following)
  );
}

// ========================================
// ELIMINAR RELACIÓN
// ========================================
export async function deleteRelation(
  followerId: number,
  username: string
) {

  const targetUser = await getExistingUserByUsername(username);

  if (!targetUser) {
    throw new Error("El usuario no existe");
  }

  const followingId = targetUser.id;

  const relation = 
    await followRepository.findRelation(
      followerId,
      followingId
    );
  
  if (!relation) {
    throw new Error("La relación no existe");
  }

  return await followRepository.deleteRelation(
    followerId,
    followingId
  );
}