import { useState } from "react";

import { useAuth } from "@/app/hooks/useAuth";

import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import * as authApi from "@/api/user.api";
import type { User, UpdateUser } from "@shared/index";

export function useUser() {
  const { updateUser } = useAuth();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ========================================
  // ACTUALIZAR MI PERFIL
  // ========================================
  async function updateProfile(
    data: UpdateUser
  ) {
    try {
      setIsLoading(true);
      setError(null);

      const updatedUser  = await authApi.updateUser(data);
      
      // Actualizamos el usuario del contexto
      updateUser(updatedUser );
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  // ========================================
  // OBTENER USUARIO POR USERNAME
  // ========================================
  async function getUserByUsername(
    username: string
  ) {
    try {
      setIsLoading(true);
      setError(null);

      const user = await authApi.getUser(username);

      setSelectedUser(user);

      return user;
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return {
    selectedUser,

    updateProfile,
    getUserByUsername,

    isLoading,
    error,
  }
}