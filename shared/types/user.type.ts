import type { Post } from "./post.type";


// ========================================
// DATOS EN COMUN
// ========================================
export interface User {
  username: string;
  avatarUrl: string | null;
  nickname: string | null;
  bio: string | null;
}

// ========================================
// DATOS PROPIO
// ========================================
export interface MyUser extends User {
  id: number;
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