import { createContext, useCallback, useMemo, useState, useEffect, type ReactNode } from "react";

import * as followsApi from "@/api/follow.api";

import type { FollowsContextType } from "../types/app.type";
import type { Follow } from "@shared/index";

import { getErrorMessage } from "@/utils/getErrorMessage";

export const FollowsContext =
  createContext<FollowsContextType | null>(null);

type Props = {
  children: ReactNode;
}

export function FollowsProvider({ children }: Props) {
  // ========================================
  // ESTADOS
  // ========================================
  const [pending, setPending] = useState<Follow[]>([]);
  const [followers, setFollowers] = useState<Follow[]>([]);
  const [following, setFollowing] =  useState<Follow[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pendingLoaded, setPendingLoaded] = useState(false);
  const [followersLoaded, setFollowersLoaded] = useState(false);
  const [followingLoaded, setFollowingLoaded] = useState(false);

  // ========================================
  // OBTENER PENDIENTES
  // ========================================
  const getPending = useCallback(async (force = false) => {
    if (pendingLoaded && !force) return;

    try {
      setIsLoading(true);
      setError(null);

      const result = await followsApi.getPending();

      setPending(result);
      setPendingLoaded(true);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [pendingLoaded]);

  useEffect(() => {
    getPending();
  }, [getPending]);

  // ========================================
  // ACEPTAR SOLICITUD
  // ========================================
  async function acceptRequest(
    username: string
  ) {
    try {
      setIsLoading(true);
      setError(null);

      await followsApi.acceptRequest(username);
      await getPending(true);
      
      setPendingLoaded(true);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  // ========================================
  // RECHAZAR SOLICITUD
  // ========================================
  async function rejectRequest(
    username: string
  ) {
    try {
      setIsLoading(true);
      setError(null);

      await followsApi.rejectRequest(username);
      await getPending(true);

      setPendingLoaded(true);
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

      await followsApi.deleteRelation(username);

      setFollowing(prev =>
        prev.filter(user => user.username !== username)
      );
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  // ========================================
  // OBTENER SEGUIDORES
  // ========================================
  const getFollowers = useCallback(async (force = false) => {
    if (followersLoaded && !force) return;

    try {
      setIsLoading(true);
      setError(null);

      const result = await followsApi.getFollowers();

      setFollowers(result);
      setFollowersLoaded(true);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [followersLoaded]);

  useEffect(() => {
    getFollowers();
  }, [getFollowers]);

  // ========================================
  // OBTENER SEGUIDOS
  // ========================================
  const getFollowing = useCallback(async (force = false) => {
    if (followingLoaded && !force) return;

    try {
      setIsLoading(true);
      setError(null);

      const result = await followsApi.getFollowing();

      setFollowing(result);
      setFollowingLoaded(true);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [followingLoaded]);

  useEffect(() => {
    getFollowing();
  }, [getFollowing]);

  // ========================================
  // LIMPIAR ESTADOS
  // ========================================
  const clearFollows = useCallback(() => {
    setPending([]);
    setFollowers([]);
    setFollowing([]);
    setPendingLoaded(false);
    setFollowersLoaded(false);
    setFollowingLoaded(false);
    setError(null);
  }, []);

  const value = useMemo(
    () => ({
      // Estado
      pending,
      followers,
      following,
      isLoading,
      error,

      //Acciones
      getPending,
      getFollowers,
      getFollowing,
      acceptRequest,
      rejectRequest,
      deleteRelation,
      clearFollows,
    }),
    [
      pending, isLoading, error, 
      getPending, getFollowers, getFollowing,
      acceptRequest, rejectRequest, deleteRelation,
      clearFollows,
    ]
  );

  return (
    <FollowsContext.Provider value={value}>
      {children}
    </FollowsContext.Provider>
  );
}