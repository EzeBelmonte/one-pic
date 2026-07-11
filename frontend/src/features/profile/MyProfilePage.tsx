import { useAuth } from "@/app/hooks/useAuth";

import Header from "./components/Header";
import CreatePosts from "@/shared/components/CreatePosts";

const MyProfile = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>Cargando perfil...</p>;
  }

  if (!user) {
    return <p>No existe el usuario</p>;
  }

  return (
    <div>
      <Header data={user} />

    </div>
  );
}

export default MyProfile;