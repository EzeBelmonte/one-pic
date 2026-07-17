import type { User } from "./user.type";
import type { FollowStatus } from "./follow.type";

// ========================================
// DATOS DEL PROFILE BASE
// ========================================
export interface ProfileBase extends User {
  nickname: string | null;
  isPrivate: boolean;
  bio: string | null;
  followersCount: number;
  followingCount: number;
  postsCount: number;
}

// ========================================
// PERFIL PROPIO
// ========================================
export interface MyProfile extends ProfileBase {
  createdAt: string;
}

// ========================================
// PERFIL DEL USUARIO VISITADO
// ========================================
export interface UserProfile extends ProfileBase {
  //followStatus: FollowStatus | null;
}

// ========================================
// DATOS EDITABLES
// ========================================
export interface UpdateProfile {
  //email: string;
  nickname?: string | null;
  bio?: string | null;
  isPrivate?: boolean;
}
