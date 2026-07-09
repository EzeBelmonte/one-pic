import type { Post } from "./post.type";

export interface User {
  id: number;
  email: string;
  username: string;
  avatarUrl: string;
  nickname: string | null;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

export interface Profile extends User {
  posts: Post[];
}