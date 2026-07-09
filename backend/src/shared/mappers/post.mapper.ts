import type { InferSelectModel } from "drizzle-orm";

import { posts } from "../../infrastructure/database/schemas/posts.js";

import type { PostDTO } from "../types/post.dto.js";

type Post = InferSelectModel<typeof posts>;

export function toPostDTO(post: Post): PostDTO {
  return {
    id: post.id,
    imageUrl: post.imageUrl,
    description: post.description,
    createdAt: post.createdAt.toISOString(),
  };
}