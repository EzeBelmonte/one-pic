import { useEffect } from "react";

import { useProfile } from "@/app/hooks/useProfile";
import OwnProfileHeader from "../components/profileHeader/OwnProfileHeader";
import OwnProfileSection from "../components/profileSection/OwnProfileSection";

const ProfilePage = () => {
  const { isLoading, getProfile } = useProfile();

  useEffect(() => {
    getProfile();
  }, []);

  if (isLoading) {
    return <p className="text-white">Cargando perfil...</p>;
  }

  return (
    <div className="px-1 sm:px-2 md:px-3 lg:px-10">
      <OwnProfileHeader />

      <OwnProfileSection />
    </div>
  );
}

export default ProfilePage;