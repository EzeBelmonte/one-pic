import { eq } from "drizzle-orm";
import type { InferInsertModel } from "drizzle-orm";

import { posts } from "../../infrastructure/database/schemas/posts.js";
import { db } from "../../infrastructure/database/db.js";

import type { CreatePostDTO, UpdatePostDTO } from "../../shared/types/post.dto.js";

type NewPost = InferInsertModel<typeof posts>;

// ========================================
// OBTENER POST
// ========================================
export async function findById(id: number) {
  return await db.query.posts.findFirst({
    where: (posts, { eq }) => eq(posts.id, id),
    with: {
      user: true, // De manera adicional obtenemos el usuario del post
    },
  });
}

// ========================================
// CREAR POST
// ========================================
export async function createPost(
  data: NewPost
) {
  const [post] = await db
    .insert(posts)
    .values(data)
    .returning();
  
  return post;
}

// ========================================
// EDITAR DESCRIPCIÓN
// ========================================
export async function updateDescription(
  postId: number,
  data: UpdatePostDTO
) {
  const [post] = await db
    .update(posts)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, postId))
    .returning();

  return post;
}

// ========================================
// ELIMINAR POST
// ========================================
export async function deletePost(
  postId: number
) {
  const [post] = await db
    .delete(posts)
    .where(eq(posts.id, postId))
    .returning()

  return post;
}