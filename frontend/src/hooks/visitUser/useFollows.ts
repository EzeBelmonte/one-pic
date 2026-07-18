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
  const [relation, setRelation] = useState<FollowState | null>(null);
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

      setRelation(response);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  // ========================================
  // CREAR RELACIÓN
  // ========================================
  async function createRelation(
    username: string
  ) {
    try {
      setIsLoading(true);
      setError(null);
      
      // Crear relación
      const response = await followApi.createRelation(username);

      setRelation(response);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  // ========================================
  // ELIMINAR RELACIÓN
  // ========================================
  async function deleteRelation(
    username: string
  ) {
    try {
      setIsLoading(true);
      setError(null);
      
      // Crear relación
      await followApi.deleteRelation(username);

      // Obtener el nuevo estado de la relacón
      const response = await followApi.getRelation(username);
      setRelation(response);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return {
    // Estado
    relation,
    isLoading,
    error,

    // Acciones
    getRelation,
    createRelation,
    deleteRelation,
  };
}