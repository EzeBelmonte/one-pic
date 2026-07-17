import { createContext, useCallback, useMemo, useState, useEffect, type ReactNode } from "react";

import * as profileApi from "@/api/profile.api";

import type { ProfileContextType } from "../types/app.type";
import type { MyProfile, UpdateProfile } from "@shared/index";

import { getErrorMessage } from "@/utils/getErrorMessage";

export const ProfileContext =
  createContext<ProfileContextType | null>(null);

type Props = {
  children: ReactNode;
}

export function ProfileProvider({ children }: Props) {
  // ========================================
  // ESTADOS
  // ========================================
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  // ========================================
  // OBTENER PERFIL
  // ========================================
  const getProfile = useCallback(async (force = false) => {
    // Así la primera vez carga, y las siguientes reutiliza los datos, salvo que se pase force = true
    if (loaded && !force) return;

    try {
      setIsLoading(true);
      setError(null);

      const profile = await profileApi.getMyProfile();

      setProfile(profile);
      setLoaded(true);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [loaded]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

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
      setLoaded(true);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
      setLoaded(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      // Estado
      profile,
      isLoading,
      error,
      
      // Acciones
      getProfile,
      updateProfile,
    }),
    [profile, isLoading, error, getProfile, updateProfile]
  );

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}