import { useState } from "react";

import * as postApi from "@/api/post.api";
import { getErrorMessage } from "../../../utils/getErrorMessage";

import type { Post } from "@shared/index";

export function usePost() {
  // ========================================
  // ESTADO
  // ========================================
  const [post, setPost] = useState<Post | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    post,
    isLoading,
    error,

    getPost,
  };
}