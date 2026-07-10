import { useEffect } from "react";
import { useProfile } from "../hooks/useMyProfile";

const Profile = () => {
  const { profile, loadProfile, isLoading, error} = useProfile();
  
  useEffect(() => {
    loadProfile();
  }, []);

  if (isLoading) {
    return <p className="text-red-400">Cargando perfil...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <header>
        <p className="text-amber-200">Hola</p>
        <h2 className="text-white">{profile?.username}</h2>
      </header>
    </div>
  );
}

export default Profile;