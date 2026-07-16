const FOLLOW_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
} as const;

export type FollowStatus =
  typeof FOLLOW_STATUS[keyof typeof FOLLOW_STATUS];

// ========================================
// DATOS EN COMUN
// ========================================
export interface User {
  id: number;
  username: string;
  profileImageUrl: string;
  profileImagePublicId: string;
  isPrivate: boolean;
  nickname: string | null;
  bio: string | null;
}

// ========================================
// DATOS PROPIO
// ========================================
export interface MyUser extends User {
  email: string;
  createdAt: string;
  updatedAt: string;
}

// ========================================
// DATOS DEL PERFIL DEL USUARIO VISITADO
// ========================================
export interface ProfileUser extends User {
  followersCount: number;
  followingCount: number;
  followStatus: FollowStatus | null;
}

// ========================================
// DATOS PROPIO DEL PERFIL
// ========================================
export interface MyProfile extends MyUser {
  followersCount: number;
  followingCount: number;
}

// ========================================
// DATOS EDITABLES
// ========================================
export interface UpdateUser {
  nickname?: string | null;
  bio?: string | null;
  isPrivate?: boolean;
}

