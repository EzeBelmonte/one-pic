import { useState } from "react";

import * as postApi from "@/api/post.api";
import { getErrorMessage } from "../../../utils/getErrorMessage";

import type { Post } from "@shared/index";

export function usePost() {
  // ========================================
  // ESTADO
  // ========================================
  const [post, setPost] = useState<Post | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState(false);

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

      const response = await postApi.getPost(postId);

      setPost(response);

      return post;
    } catch (error) {
      setError(getErrorMessage(error)); 
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  // ========================================
  // CONTAR LIKES
  // ========================================
  async function getLikes(
    postId: number
  ) {
    try {
      setIsLoading(true);
      setError(null);

      const response = await postApi.getLikes(postId);

      setLikes(response);
    } catch (error) {
      setError(getErrorMessage(error)); 
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  // ========================================
  // DAR LIKE
  // ========================================
  async function addLike(
    postId: number
  ) {
    try {
      setIsLoading(true);
      setError(null);

      await postApi.addLike(postId);

      setLiked(true);
      setLikes(prev => prev + 1);
    } catch (error) {
      setError(getErrorMessage(error)); 
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  // ========================================
  // QUITAR LIKE
  // ========================================
  async function removeLike(
    postId: number
  ) {
    try {
      setIsLoading(true);
      setError(null);

      await postApi.removeLike(postId);

      setLiked(false);
      setLikes(prev => prev - 1);
    } catch (error) {
      setError(getErrorMessage(error)); 
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  // ========================================
  // YA DIO LIKE
  // ========================================
  async function hasLiked(
    postId: number
  ) {
    try {
      setIsLoading(true);
      setError(null);

      const response = await postApi.hasLiked(postId);
      setLiked(response);
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
    likes,
    liked,
    isLoading,
    error,

    // Acciones
    getPost,
    getLikes,
    addLike,
    removeLike,
    hasLiked,
  };
}