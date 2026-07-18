import { useState } from "react";

import * as followApi from "@/api/follow.api";
import { getErrorMessage } from "@/utils/getErrorMessage";

import type { FollowStatus } from "@shared/index";

export function useFollows() {
  // ========================================
  // ESTADO
  // ========================================
  const [status, setStatus] = useState<FollowStatus | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ========================================
  // OBTENER RELACIÓN
  // ========================================
  async function getStatus(
    username: string
  ) {
    try {
      setIsLoading(true);
      setError(null);

      const response = await followApi.getStatus(username);

      setStatus(response);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  // ========================================
  // SEGUIR
  // ========================================
  async function follow(
    username: string
  ) {
    try {
      setIsLoading(true);
      setError(null);

      const response = await followApi.createRelation(username);

      setStatus(response);
      return response;
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  // ========================================
  // DEJAR SEGUIR
  // ========================================
  async function unfollow(
    username: string
  ) {
    try {
      setIsLoading(true);
      setError(null);

      await followApi.rejectRequest(username);
      const response = await followApi.deleteRelation(username);

      return response;
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return {
    // Estado
    status,
    isLoading,
    error,

    // Acciones
    follow,
    unfollow,
    getStatus,
  };
}