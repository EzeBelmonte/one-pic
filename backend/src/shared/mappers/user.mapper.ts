import type { InferSelectModel } from "drizzle-orm";
import { users } from "../../infrastructure/database/schemas/users.js";
import { posts } from "../../infrastructure/database/schemas/posts.js";

import type { UserDTO, ProfileDTO } from "../types/user.dto.js";
import { toPostDTO } from "./post.mapper.js";

type User = InferSelectModel<typeof users>;
type Post = InferSelectModel<typeof posts>;

type UserWithPosts = User & {
  posts: Post[];
};

export function toUserDTO(
  user: User
): UserDTO {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    avatarUrl: user.avatarUrl,
    nickname: user.nickname,
    bio: user.bio,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }
}

export function toProfileDTO(
  user: UserWithPosts 
): ProfileDTO {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    avatarUrl: user.avatarUrl,
    nickname: user.nickname,
    bio: user.bio,

    posts: user.posts.map(toPostDTO),
  };
}