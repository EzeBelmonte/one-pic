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
// DATOS EDITABLES
// ========================================
export interface UpdateUser {
  nickname?: string | null;
  bio?: string | null;
  isPrivate?: boolean;
}