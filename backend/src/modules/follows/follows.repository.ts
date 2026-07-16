import { and, eq, count } from "drizzle-orm";
import type { InferInsertModel } from "drizzle-orm";

import { db } from "../../infrastructure/database/db.js";
import { follows } from "../../infrastructure/database/schemas/follows.js";

type NewFollow = InferInsertModel<typeof follows>;

// ========================================
// CREAR RELACIÓN
// ========================================
export async function create(
  data: NewFollow
) {
  const [follow] = await db
    .insert(follows)
    .values(data)
    .returning();

  return follow;
}

// ========================================
// OBTENER RELACIÓN
// ========================================
export async function findRelation(
  followerId: number,
  followingId: number
) {
  return await db.query.follows.findFirst({
    where: (follows, { and, eq }) =>
      and(
        eq(follows.followerId, followerId),
        eq(follows.followingId, followingId)
      ),
  });
}

// ========================================
// ACTULIZAR ESTADO
// ========================================
export async function updateStatus(
  followerId: number,
  followingId: number,
  status: "pending" | "accepted"
) {
  const [follow] = await db
    .update(follows)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(follows.followerId, followerId),
        eq(follows.followingId, followingId)
      )
    )
    .returning();

  return follow;
}

// ========================================
// OBTENER SEGUIDORES
// ========================================
export async function findFollowers(
  userId: number
) {
  return await db.query.follows.findMany({
    where: (follows, { eq }) => 
      eq(follows.followingId, userId),
  
    with: {
      follower: true,
    },
  });
}

// ========================================
// OBTENER SEGUIDOS
// ========================================
export async function findFollowing(
  userId: number
) {
  return await db.query.follows.findMany({
    where: (follows, { eq }) =>
      eq(follows.followerId, userId),

    with: {
      following: true,
    },
  });
}

// ========================================
// ELIMINAR RELACIÓN
// ========================================
export async function deleteRelation(
  followerId: number,
  followingId: number
) {
  const [follow] = await db
    .delete(follows)
    .where(
      and(
        eq(follows.followerId, followerId),
        eq(follows.followingId, followingId)
      )
    )
  .returning();

  return follow;
}

// ========================================
// CONTAR SEGUIDORES
// ========================================
export async function countFollowers(
  userId: number
) {
  const [result] = await db
    .select({
      count: count(),
    })
    .from(follows)
    .where(
      and(
        eq(follows.followingId, userId),
        eq(follows.status, "accepted")
      )
    );

  return result?.count;
}

// ========================================
// CONTAR SEGUIDOS
// ========================================
export async function countFollowing(
  userId: number
) {
  const [result] = await db
    .select({
      count: count(),
    })
    .from(follows)
    .where(
      and(
        eq(follows.followerId, userId),
        eq(follows.status, "accepted")
      )
    );

  return result?.count;
}