import type { MyProfile, UpdateProfile, User } from "@shared/index";
import type { Post } from "@shared/index";
import type { PostSchema } from "../schemas/post.schema";

// ========================================
// AUTH
// ========================================
export interface AuthContextType {
  user: User | null;
  token: string | null;

  isAuthenticated: boolean;
  isLoading: boolean;

  login: (token: string) => Promise<void>;
  logout: () => void;

}

// ========================================
// PROFILE
// ========================================
export interface ProfileContextType {
  // Estado
  profile: MyProfile | null;
  isLoading: boolean;
  error: string | null;

  getProfile: (force?: boolean) => Promise<void>;
  updateProfile: (
    image: File | null,
    data: UpdateProfile
  ) => Promise<void>;
}

// ========================================
// POST
// ========================================
export interface PostContextType {
  // Estado
  posts: Post[];
  isLoading: boolean;
  error: string | null;

  // Acciones
  getPosts: (force?: boolean) => Promise<void>;
  createPost: (
    image: File,
    data: PostSchema
  ) => Promise<Post>;

  deletePost: (postId: number) => Promise<void>;
  clearPosts: () => void;
}