import { useEffect } from "react";

import { useProfile } from "@/app/hooks/useProfile";
import OwnProfileHeader from "../components/own/OwnProfileHeader";
import OwnProfileSection from "../components/own/OwnProfileSection";

const ProfilePage = () => {
  const { isLoading, getProfile } = useProfile();

  useEffect(() => {
    getProfile();
  }, []);

  if (isLoading) {
    return <p className="text-white">Cargando perfil...</p>;
  }

  return (
    <div className="flex flex-col px-1 sm:px-2 md:px-3 lg:px-10">
      <OwnProfileHeader />

      <OwnProfileSection />
    </div>
  );
}

export default ProfilePage;