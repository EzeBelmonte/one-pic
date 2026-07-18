import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserLock } from "lucide-react";

import { useVisitProfile } from "@/hooks/visitUser/useVisitProfile";
import { useFollows } from "@/hooks/visitUser/useFollows";

import { Button } from "@/components";
import ProfileHeaderBase from "./ProfileHeaderBase";

const VisitorProfileHeader = () => {
  const { selectedProfile, getUserProfile } = useVisitProfile();
  const { status, getStatus, follow, unfollow } = useFollows();
  
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
      await getStatus(username);
    };

    loadUsers();
  }, [username]);

  if (!selectedProfile) {
    return <p>No existe el usuario</p>;
  }

  const action = status === null ? () => follow : () => unfollow;

  // Estilo de botón seguir
  const followButton = "border border-white/20 px-3 rounded bg-[rgba(34,34,34,0.8)] text-white cursor-pointer";

  return (
    <div className="mb-10">
      <ProfileHeaderBase 
        data={selectedProfile}
        Icon={UserLock}
      />
      {/* Botón de seguir y bloquear */}

      <div className="flex gap-3">
        <Button
          className={followButton}
          onClick={() => action}
        >
          {status === "accepted"
            ? "Siguiendo"
            : status === "pending"
              ? "Cancelar"
              : "Seguir"
          }
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