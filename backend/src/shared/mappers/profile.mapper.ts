import type { InferSelectModel } from "drizzle-orm";
import type { FollowStatus } from "@shared/index.js";

import { users } from "../../infrastructure/database/schemas/users.js";

import type { MyProfile, UserProfile } from "@shared/index.js";

type Users = InferSelectModel<typeof users>;

// ========================================
// OBTENER MI PERFIL
// ========================================
export function toMyProfileDTO(
  user: Users,
  followersCount: number,
  followingCount: number
): MyProfile {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
    nickname: user.nickname,
    bio: user.bio,
    isPrivate: user.isPrivate,

    followersCount,
    followingCount,

    createdAt: user.createdAt.toISOString(),
  }
}

// ========================================
// OBTENER UN PERFIL
// ========================================
export function toUserProfileDTO(
  user: Users,
  followersCount: number,
  followingCount: number,
  //followStatus: FollowStatus
): UserProfile {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
    nickname: user.nickname,
    bio: user.bio,
    isPrivate: user.isPrivate,

    followersCount,
    followingCount,
    //followStatus,
  }
}