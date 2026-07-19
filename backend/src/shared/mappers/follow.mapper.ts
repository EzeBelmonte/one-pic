import type { InferSelectModel } from "drizzle-orm";

import type { Follow, PendingFollowers } from "@shared/index.js";

import { users } from "../../infrastructure/database/schemas/users.js"

type Users = InferSelectModel<typeof users>;

// Obtener listado de seguidores o seguidos
export function toFollowDTO(user: Users): Follow  {
  return {
    id: user.id,
    username: user.username,
    nickname: user.nickname ?? "",
    profileImageUrl: user.profileImageUrl,
  }
}

export function toPendingFollowDTO(user: Users): PendingFollowers {
  return {
    id: user.id,
    username: user.username,
    nickname: user.nickname ?? "",
    profileImageUrl: user.profileImageUrl,
    status: "pending",
  }
}