import api from "axios";

import type { CreatePost, Post, UpdatePost } from "@shared/index";

// ========================================
// CREAR POST
// ========================================
export async function createPost(
  image: File,
  data: CreatePost
) {
  const formData = new FormData();

  formData.append("image", image);

  if (data.description) {
    formData.append("description", data.description);
  }

  const response =
    await api.post("/posts", formData);

  return response.data;
}

// ========================================
// OBTENER POST
// ========================================
export async function getMyPost() {
  const response =
    await api.get<Post>("/posts/me");

  return response.data;
}

// ========================================
// EDITAR POST
// ========================================
export async function editPost(
  postId: number
) {
  const response =
    await api.patch<UpdatePost>(`/posts/${postId}`);

  return response.data;
}

// ========================================
// ELIMINAR POST
// ========================================
export async function deletePost(
  postId: number
) {
  const response = 
    await api.delete(`/posts/${postId}`);

  return response.data;
}

// ========================================
// OBTENER POST DE USUARIO
// ========================================
export async function getPost(
  postId: number
) {
  const response =
    await api.get<Post>(`/posts/${postId}`);

  return response.data;
}

// ========================================
// OBTENER TODOS LOS POSTS DE USUARIO
// ========================================
export async function getUserPosts(
  username: string
) {
  const response =
    await api.get<Post[]>(`/posts/${username}`);

  return response.data;
}