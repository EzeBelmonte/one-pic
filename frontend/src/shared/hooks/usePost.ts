import { useState } from "react";

import * as postApi from "@/api/post.api";
import { getErrorMessage } from "../utils/getErrorMessage";

import type { PostSchema } from "../schemas/post.schema";
import type { Post } from "@shared/index";

export function usePost() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[] | null>([]);

  // ========================================
  // CREAR POST
  // ========================================
  async function createPost(
    image: File,
    data: PostSchema
  ) {
    try {
      setLoading(true);
      setError(null);
      await postApi.createPost(image, data);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  // ========================================
  // OBTENER MIS POST
  // ========================================
  async function getMyPosts() {
    try {
      setLoading(true);
      setError(null);
      const posts = await postApi.getMyPosts();
      setPosts(posts);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  // ========================================
  // OBTENER POST DE USUARIO
  // ========================================
  async function getUserPosts(
    username: string
  ) {
    try {
      setLoading(true);
      setError(null);
      const posts = await postApi.getUserPosts(username);
      setPosts(posts);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  // ========================================
  // ELIMINAR POST
  // ========================================
  async function deletePost(
    postId: number
  ) {
    try {
      setLoading(true);
      setError(null);
      await postApi.deletePost(postId);
      setPosts((currentPosts) =>
        currentPosts
          ? currentPosts.filter((post) => post.id !== postId)
          : null
      );
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return {
    createPost,
    posts,
    deletePost,

    getMyPosts,
    getUserPosts,

    loading,
    setLoading,
    error,
  };
}