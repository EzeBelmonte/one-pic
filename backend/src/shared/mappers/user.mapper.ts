import type { InferSelectModel } from "drizzle-orm";
import { users } from "../../infrastructure/database/schemas/users.js";

import type { User } from "@shared/index.js";

type Users = InferSelectModel<typeof users>;

// ========================================
// OBTENER UN USUARIO
// ========================================
export function toUserDTO(
  user: Users,
): User {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  }
}

// ========================================
// OBTENER MI USUARIO
// ========================================
export function toMyUserDTO(
  user: Users,
): User {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  }
}