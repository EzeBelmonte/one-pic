import { useState } from "react";

import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import * as authApi from "@/api/user.api";
import type { MyProfile } from "@shared/index";

export function useProfile() {
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadProfile() {
    try {
      setIsLoading(true);
      setError(null);

      const data = await authApi.getMyProfile();

      setProfile(data);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }


  return {
    profile,
    loadProfile,
    isLoading,
    error,
  }
}