import { useState, useCallback } from "react";

import { getErrorMessage } from "@/utils/getErrorMessage";
import * as profileApi from "@/api/profile.api";
import type { UpdateProfile, MyProfile } from "@shared/index";

export function useProfile_backup() {
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ========================================
  // OBTENER PERFIL
  // ========================================
  const getProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const profile = await profileApi.getMyProfile();

      setProfile(profile);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ========================================
  // ACTUALIZAR PERFIL
  // ========================================
  const updateProfile = useCallback(
    async (
      image: File | null,
      data: UpdateProfile
    ) => {
      try {
        setIsLoading(true);
        setError(null);

        const updatedProfile =
          await profileApi.updateProfile(image, data);

        // Actualizamos el perfil local con la respuesta
        setProfile(updatedProfile);

      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    profile,
    isLoading,
    error,

    getProfile,
    updateProfile,
  };
}