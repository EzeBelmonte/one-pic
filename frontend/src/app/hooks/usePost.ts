import { useState } from "react";

import * as postApi from "@/api/post.api";
import { getErrorMessage } from "../../utils/getErrorMessage";

import type { PostSchema } from "../../shared/schemas/post.schema";
import type { Post } from "@shared/index";

export function usePost() {
  // ========================================
  // ESTADO
  // ========================================
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ========================================
  // CREAR POST
  // ========================================
  async function createPost(
    image: File,
    data: PostSchema
  ) {
    try {
      setIsLoading(true);
      setError(null);

      const newPost = await postApi.createPost(image, data);

      return newPost;
    } catch (error) {
      setError(getErrorMessage(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  // ========================================
  // OBTENER MIS POST
  // ========================================
  async function getPosts() {
    try {
      setIsLoading(true);
      setError(null);

      const posts = await postApi.getPosts();

      setPosts(posts);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  // ========================================
  // ELIMINAR POST
  // ========================================
  async function deletePost(
    postId: number
  ) {
    try {
      setIsLoading(true);
      setError(null);

      await postApi.deletePost(postId);

      setPosts((currentPosts) =>
        currentPosts.filter((post) => post.id !== postId)
      );
      
    } catch (error) {
      setError(getErrorMessage(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  // ========================================
  // OBTENER POSTS DE USUARIO
  // ========================================
  async function getUserPosts(
    username: string
  ) {
    try {
      setIsLoading(true);
      setError(null);

      const posts = await postApi.getUserPosts(username);

      setPosts(posts);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  // ========================================
  // OBTENER UN POST
  // ========================================
  async function getPost(
    postId: number
  ) {
    try {
      setIsLoading(true);
      setError(null);

      const post = await postApi.getPost(postId);

      setPost(post);

      return post;
    } catch (error) {
      setError(getErrorMessage(error)); 
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    // Estado
    posts,
    post,
    isLoading,
    error,

    // Acciones
    createPost,
    deletePost,

    getPost,
    getPosts,
    getUserPosts,
  };
}