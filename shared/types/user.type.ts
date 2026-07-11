// ========================================
// DATOS EN COMUN
// ========================================
export interface User {
  id: number;
  username: string;
  avatarUrl: string | null;
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
  avatarUrl: string | null;
  nickname: string | null;
  bio: string | null;
}