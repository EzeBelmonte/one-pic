import type { MyUser } from "@shared/index";
import type { Post } from "@shared/index";
import type { PostSchema } from "../schemas/post.schema";

// ========================================
// AUTH
// ========================================
export interface AuthContextType {
  user: MyUser | null;
  token: string | null;

  isAuthenticated: boolean;
  isLoading: boolean;

  login: (token: string) => Promise<void>;
  logout: () => void;

  updateUser: (data: Partial<MyUser>) => void;
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