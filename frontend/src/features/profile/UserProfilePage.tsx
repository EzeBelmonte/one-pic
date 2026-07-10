import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useUser } from "@/shared/hooks/useUser";

const UserProfilePage = () => {
  const { selectedUser, getUserByUsername, isLoading } = useUser();
  const { username } = useParams();

  useEffect(() => {
    if (username) {
      getUserByUsername(username);
    }
  }, [username]);

  if (!username) {
    return <p>No existe el usuario</p>;
  }

  if (isLoading) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div>
      <header>
        <p className="text-amber-200">Hola</p>
        <h2 className="text-green-400">Perfil de {selectedUser?.username}</h2>
      </header>
    </div>
  );
}

export default UserProfilePage;