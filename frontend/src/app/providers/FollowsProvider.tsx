import { createContext, useCallback, useMemo, useState, useEffect, type ReactNode } from "react";

import * as followsApi from "@/api/follow.api";

import type { FollowsContextType } from "../types/app.type";
import type { PendingFollowers } from "@shared/index";

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
  const [pending, setPending] = useState<PendingFollowers[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  // ========================================
  // OBTENER PENDIENTES
  // ========================================
  const getPending = useCallback(async (force = false) => {
    if (loaded && !force) return;

    try {
      setIsLoading(true);
      setError(null);

      const result = await followsApi.getPending();

      setPending(result);
      setLoaded(true);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [loaded]);

  useEffect(() => {
    getPending();
  }, []);

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
      
      setLoaded(true);
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

      setLoaded(true);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  // ========================================
  // LIMPIAR ESTADOS
  // ========================================
  const clearFollows = useCallback(() => {
    setPending([]);
    setLoaded(false);
    setError(null);
  }, []);

  const value = useMemo(
    () => ({
      // Estado
      pending,
      isLoading,
      error,

      //Acciones
      getPending,
      clearFollows,
      acceptRequest,
      rejectRequest,
    }),
    [pending, isLoading, error, getPending, clearFollows, acceptRequest, rejectRequest]
  );

  return (
    <FollowsContext.Provider value={value}>
      {children}
    </FollowsContext.Provider>
  );
}