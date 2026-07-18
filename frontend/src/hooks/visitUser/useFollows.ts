import { useState } from "react";

import * as followApi from "@/api/follow.api";
import { getErrorMessage } from "@/utils/getErrorMessage";

type FollowState = {
  isFollowing: boolean;
  isPending: boolean;
}

export function useFollows() {
  // ========================================
  // ESTADOS
  // ========================================
  const [status, setStatus] = useState<FollowState | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ========================================
  // COMPROBAR RELACIÓN
  // ========================================
  async function getRelation(
    username: string
  ) {
    try {
      setIsLoading(true);
      setError(null);

      const response = await followApi.getRelation(username);

      setStatus(response);
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
    getRelation,
  };
}