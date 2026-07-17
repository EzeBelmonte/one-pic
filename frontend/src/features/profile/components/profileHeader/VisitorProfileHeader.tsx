import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserLock } from "lucide-react";

import { useVisitProfile } from "@/hooks/visitUser/useVisitProfile";

import { Button } from "@/components";
import ProfileHeaderBase from "./ProfileHeaderBase";

const VisitorProfileHeader = () => {
  const { selectedProfile, getUserProfile } = useVisitProfile();
  
  const { username } = useParams();

  useEffect(() => {
    if (username) {
      getUserProfile(username);
    }
  }, [username]);

  if (!selectedProfile) {
    return <p>No existe el usuario</p>;
  }

  // Estilo de botón seguir
  const followButton = "border border-white/20 px-3 rounded bg-[rgba(34,34,34,0.8)] text-white";

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
        >
          Seguir
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