import type { PostDTO } from "./post.dto.js";

export interface UserDTO {
  id: number;
  email: string;
  username: string;
  avatarUrl: string | null;
  nickname: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserDTO {
  avatarUrl: string | null;
  nickname: string | null;
  bio: string | null;
}

export interface ProfileDTO {
  id: number;
  email: string;
  username: string;
  avatarUrl: string | null;
  nickname: string | null;
  bio: string | null;

  posts: PostDTO[];
}

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