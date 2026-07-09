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
// PERFIL OTROS
// ========================================
export interface Profile extends User {
  posts: Post[];
}

// ========================================
// PERFIL PROPIO
// ========================================
export interface MyProfile extends MyUser {
  posts: Post[];
}

// ========================================
// DATOS EDITABLES
// ========================================
export interface UpdateUser {
  avatarUrl: string | null;
  nickname: string | null;
  bio: string | null;
}







// Luego pensar donde ubicarlos
export interface PostAuthorDTO {
  id: number;
  username: string;
  avatarUrl: string | null;
  nickname: string | null;
}

export interface FeedPostDTO {
  id: number;
  imageUrl: string;
  description: string | null;
  createdAt: string;

  user: PostAuthorDTO;
}