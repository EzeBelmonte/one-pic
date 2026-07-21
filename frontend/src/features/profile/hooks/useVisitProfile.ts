import { useState } from "react";

import { getErrorMessage } from "@/utils/getErrorMessage";
import * as profileApi from "@/api/profile.api";
import type { UserProfile } from "@shared/index";

export function useVisitProfile() {

  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ========================================
  // OBTENER USUARIO POR USERNAME
  // ========================================
  async function getUserProfile(
    username: string
  ) {
    try {
      setIsLoading(true);
      setError(null);

      const profile = await profileApi.getUserProfile(username);

      setSelectedProfile(profile);

      return profile;
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return {
    selectedProfile,
    isLoading,
    error,

    getUserProfile,
  }
}