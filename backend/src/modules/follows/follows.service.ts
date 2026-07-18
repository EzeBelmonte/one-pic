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
// COMPROBAR RELACIÓN
// ========================================
export async function findRelation(
  followerId: number,
  username: string
) {
  if (!username) {
    throw new Error("El usuario no existe");
  }

  const targetUser = await getExistingUserByUsername(username);

  if (!targetUser) {
    throw new Error("El usuario no existe");
  }

  const followingId = targetUser.id;

  const relation = await followRepository.findRelation(
    followerId,
    followingId
  );

  return {
    isFollowing: relation?.status === "accepted",
    isPending: relation?.status === "pending",
  };
}

// ========================================
// CREAR RELACIÓN
// ========================================
export async function createRelation(
  followerId: number,
  username: string,
) {
  if (!username) {
    throw new Error("El usuario no existe");
  }

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

  return await followRepository.createRelation({
    followerId,
    followingId,
    status,
  });
}

// ========================================
// ACEPTAR SOLICITUD
// ========================================
export async function acceptRequest(
  userId: number,
  username: string
) {

  // Usuario que envió la solicitud
  const follower =
    await getExistingUserByUsername(username);

  // Verificamos que exista la relación
  const relation =
    await followRepository.findRelation(
      follower.id,
      userId
    );

  if (!relation) {
    throw new Error("La solicitud no existe");
  }

  if (relation.status === FOLLOW_STATUS.ACCEPTED) {
    throw new Error("La solicitud ya fue aceptada");
  }

  return await followRepository.updateStatus(
    follower.id,
    userId,
    FOLLOW_STATUS.ACCEPTED
  );
}

// ========================================
// RECHAZAR SOLICITUD
// ========================================
export async function rejectRequest(
  userId: number,
  username: string
) {
  // Usuario que envio la solicitud
  const follower =
    await getExistingUserByUsername(username);

  // Verificamos que exista la relación
  const relation = 
    await followRepository.findRelation(
      follower.id,
      userId
    );
  
  if (!relation) {
    throw new Error("La solicitud no existe");
  }

  return await followRepository.deleteRelation(
    follower.id,
    userId
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