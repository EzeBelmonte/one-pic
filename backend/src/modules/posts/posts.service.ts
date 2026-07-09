import  * as postRepository from "./posts.repository.js";
import { toPostDTO } from "../../shared/mappers/post.mapper.js";

import type { PostDTO, CreatePostDTO, UpdatePostDTO } from "../../shared/types/post.dto.js";

// ========================================
// CREAR POST
// ========================================
export async function createPost(
  userId: number,
  data: CreatePostDTO
): Promise<PostDTO> {

  if (!data.imageUrl) {
    throw new Error("La imagen es obligatoria");
  }

  const post = await postRepository.createPost({
    userId,
    imageUrl: data.imageUrl,
    description: data.description ? data.description : "",
  });

  if (!post) {
    throw new Error("Error al crear la publicación");
  }

  return toPostDTO(post);
}

// ========================================
// OBTENER POST
// ========================================
export async function getPost(
  postId: number
) {
  const post = await postRepository.findById(postId);

  if (!post) {
    throw new Error("Error al obtener la publicación");
  }

  return toPostDTO(post);
}

// ========================================
// ACTUALIZAR POST
// ========================================
export async function updatePost(
  userId: number,
  postId: number,
  data: UpdatePostDTO
) {
  // Obtenemos el post
  const post = await postRepository.findById(postId);

  if (!post) {
    throw new Error("El post no existe");
  }

  if (post.userId !== userId) {
    throw new Error("No tienes permiso para editar este post");
  }

  const updatePost = await postRepository.updateDescription(postId, data);

  return updatePost;
}

// ========================================
// ELIMINAR POST
// ========================================
export async function deletePost(
  userId: number,
  postId: number
) {
  // Buscamos el post a eliminar
  const post = await postRepository.findById(postId);

  if (!post) {
    throw new Error("El post no existe");
  }

  if (post.userId !== userId) {
    throw new Error("No tienes permiso para eliminar este post");
  }

  await postRepository.deletePost(postId);
}