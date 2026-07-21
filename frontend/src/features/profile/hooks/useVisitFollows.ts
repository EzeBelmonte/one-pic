import { useState } from "react";

import * as followsApi from "@/api/follow.api";
import { getErrorMessage } from "@/utils/getErrorMessage";

import type { FollowState } from "@shared/index";

export function useVisitFollows() {
  // ========================================
  // ESTADOS
  // ========================================
  const [isFollowingToo, setIsFollowingToo] = useState(false);
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

      const response = await followsApi.getRelation(username);

      setRelation(response);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  // ========================================
  // VERIFICAR SI ME SIGUE TAMBIÉN
  // ========================================
  async function getIsFollowingToo(
    username: string
  ) {
    try {
      setIsLoading(true);
      setError(null);

      const response = await followsApi.getRelationToo(username);
      
      setIsFollowingToo(response);
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
      const response = await followsApi.createRelation(username);

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
      await followsApi.deleteRelation(username);

      // Obtener el nuevo estado de la relacón
      const response = await followsApi.getRelation(username);
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
    isFollowingToo,
    isLoading,
    error,

    // Acciones
    getRelation,
    getIsFollowingToo,
    createRelation,
    deleteRelation,
  };
}