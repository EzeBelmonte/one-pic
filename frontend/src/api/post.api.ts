import api from "axios";

import type { Post } from "@shared/index";

// ========================================
// CREAR POST
// ========================================
export async function createPost() {
  const response =
    await api.post("/post/create");

  return response.data;
}

// ========================================
// OBTENER POST
// ========================================
export async function getPost() {
  const response =
    await api.get<Post>("/post/create");

  return response.data;
}

// ========================================
// EDITAR POST
// ========================================
export async function editPost() {
  const response =
    await api.patch("/post/:postId");

  return response.data;
}

// ========================================
// ELIMINAR POST
// ========================================
export async function deletePost() {
  const response = 
    await api.delete("/post/postId");

  return response.data;
}