// ========================================
// DATOS EN COMUN
// ========================================
export interface User {
  id: number;
  username: string;
  profileImageUrl: string;
  profileImagePublicId: string;
  nickname: string | null;
  bio: string | null;
}

// ========================================
// DATOS PROPIO
// ========================================
export interface MyUser extends User {
  email: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

// ========================================
// DATOS EDITABLES
// ========================================
export interface UpdateUser {
  nickname?: string | null;
  bio?: string | null;
  isPrivate?: boolean;
}