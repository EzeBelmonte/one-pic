import { useAuth } from "@/app/hooks/useAuth";

import Header from "./components/Header";
import CreatePost from "@/shared/components/CreatePost";

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

      <CreatePost />
    </div>
  );
}

export default MyProfile;