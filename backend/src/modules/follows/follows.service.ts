import * as followRepository from "../follows/follows.repository.js";

import { 
  getExistingUserById,
  getExistingUserByUsername 
} from "../../shared/helpers/getExistingUser.js";

import type { 
  Follow,
  FollowBase,
} from "@shared/index.js";

import { FOLLOW_STATUS, type FollowStatus } from "../../constants/follow.js";

import { toFollowDTO, toPendingFollowDTO } from "../../shared/mappers/follow.mapper.js";

// ========================================
// COMPROBAR RELACIÓN
// ========================================
export async function findRelation(
  followerId: number,
  username: string
) {
  const userExisting= getExistingUserById(followerId);

  if (!userExisting) {
    throw new Error("El usuario no existe")
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
  const userExisting = getExistingUserById(followerId);

  if (!userExisting) {
    throw new Error("El usuario no existe")
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

  await followRepository.createRelation({
    followerId,
    followingId,
    status,
  });

  return {
    isFollowing: status === FOLLOW_STATUS.ACCEPTED,
    isPending: status === FOLLOW_STATUS.PENDING,
  };
}

// ========================================
// ACEPTAR SOLICITUD
// ========================================
export async function acceptRequest(
  userId: number,
  username: string
) {
  const userExisting = getExistingUserById(userId);

  if (!userExisting) {
    throw new Error("El usuario no existe")
  }

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
  const userExisting = getExistingUserById(userId);

  if (!userExisting) {
    throw new Error("El usuario no existe")
  }

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
// OBTENER PENDIENTES
// ========================================
export async function findPendingRequest(
  userId: number
): Promise<FollowBase[]> {
  const userExisting = getExistingUserById(userId);

  if (!userExisting) {
    throw new Error("El usuario no existe")
  }

  const pending = await followRepository.findPendingRequest(
    userId
  );
  
  return pending.map((relation) =>
    toPendingFollowDTO(relation.follower)
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
  const userExisting = getExistingUserById(followerId);

  if (!userExisting) {
    throw new Error("El usuario no existe")
  }
  
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