import type { InferSelectModel } from "drizzle-orm";
import { users } from "../../infrastructure/database/schemas/users.js";

import type { User, MyUser } from "@shared/index.js";

type Users = InferSelectModel<typeof users>;


export function toUserDTO(
  user: Users,
): User {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
    profileImagePublicId: user.profileImagePublicId,
    nickname: user.nickname,
    bio: user.bio,
  }
}

export function toMyUserDTO(
  user: Users,
): MyUser {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
    profileImagePublicId: user.profileImagePublicId,
    nickname: user.nickname,
    isPrivate: user.isPrivate,
    bio: user.bio,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }
}
