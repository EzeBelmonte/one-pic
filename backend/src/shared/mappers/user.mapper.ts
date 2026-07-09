import type { InferSelectModel } from "drizzle-orm";
import { users } from "../../infrastructure/database/schemas/users.js";
import { posts } from "../../infrastructure/database/schemas/posts.js";

import type { User, MyUser, MyProfile, Profile } from "@shared/index.js";
import { toPostDTO } from "./post.mapper.js";

type Users = InferSelectModel<typeof users>;
type Post = InferSelectModel<typeof posts>;

type UserWithPosts = Users & {
  posts: Post[];
};

export function toUserDTO(
  user: Users
): User {
  return {
    username: user.username,
    avatarUrl: user.avatarUrl,
    nickname: user.nickname,
    bio: user.bio,
  }
}

export function toMyUserDTO(
  user: Users
): MyUser {
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

export function toMyProfileDTO(
  user: UserWithPosts 
): MyProfile {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    avatarUrl: user.avatarUrl,
    nickname: user.nickname,
    bio: user.bio,

    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),

    posts: user.posts.map(toPostDTO),
  };
}

export function toProfileDTO(
  user: UserWithPosts 
): Profile {
  return {
    username: user.username,
    avatarUrl: user.avatarUrl,
    nickname: user.nickname,
    bio: user.bio,

    posts: user.posts.map(toPostDTO),
  };
}