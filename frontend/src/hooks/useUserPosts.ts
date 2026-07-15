import { useState } from "react";

import * as postApi from "@/api/post.api";
import { getErrorMessage } from "../utils/getErrorMessage";

import type { Post } from "@shared/index";

export function useUserPosts() {
  // ========================================
  // ESTADO
  // ========================================
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return {
    // Estado
    posts,
    isLoading,
    error,

    getUserPosts,
  };
}