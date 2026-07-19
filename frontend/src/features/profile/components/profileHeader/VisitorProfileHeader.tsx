import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserLock, User } from "lucide-react";

import { useVisitProfile } from "@/hooks/visitUser/useVisitProfile";
import { useVisitFollows } from "@/hooks/visitUser/useVisitFollows";

import { Button } from "@/components";
import ProfileHeaderBase from "./ProfileHeaderBase";

const VisitorProfileHeader = () => {
  const { selectedProfile, getUserProfile } = useVisitProfile();
  const { 
    relation, getRelation, 
    createRelation, deleteRelation,
  } = useVisitFollows();
  
  const { username } = useParams();

  if (!username) {
    return <p>No existe el usuario</p>;
  }

  useEffect(() => {
    if (username) {
      getUserProfile(username);
    }
  }, [username]);

  useEffect(() => {
    const loadUsers = async () => {
      await getRelation(username);
    };

    loadUsers();
  }, [username]);

  if (!selectedProfile) {
    return <p>No existe el usuario</p>;
  }

  const status = 
    relation?.isFollowing
      ? "Siguiendo"
      : relation?.isPending
        ? "Pendiente"
        : "Seguir"

  // Función para seguir, dejar de seguir o cancelar la solicitud
  const handleRelation = async () => {
    if (relation?.isFollowing) {
      await deleteRelation(username);
      return;
    }

    if (relation?.isPending) {
      await deleteRelation(username);
      return;
    }

    await createRelation(username);
  };

  console.log("following: " + relation?.isFollowing);
  console.log("pending: " + relation?.isPending)

  // Estilo de botón seguir
  const followButton = "border border-white/20 px-3 rounded bg-[rgba(34,34,34,0.8)] text-white cursor-pointer";

  return (
    <div className="mb-10">
      <ProfileHeaderBase 
        data={selectedProfile}
        Icon={
          selectedProfile.isPrivate 
            ? UserLock
            : User
        }
      />
      {/* Botón de seguir y bloquear */}

      <div className="flex gap-3">
        <Button
          onClick={handleRelation}
          className={followButton}
        >
          {status}
        </Button>

        <Button
          className={followButton}
        >
          Bloquear
        </Button>
      </div>
    </div>
  );
}

export default VisitorProfileHeader;