import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserLock, User } from "lucide-react";

import { useVisitProfile } from "@/hooks/visitUser/useVisitProfile";
import { useVisitFollows } from "@/hooks/visitUser/useVisitFollows";

import { Button, Image } from "@/components";
import { useFollows } from "@/app/hooks/useFollows";

const VisitorProfileHeader = () => {
  const { selectedProfile, getUserProfile } = useVisitProfile();
  const { deleteRelation } = useFollows();
  const { 
    relation, getRelation, isFollowingToo, getIsFollowingToo,
    createRelation,
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
      await getIsFollowingToo(username);
    };

    loadUsers();
  }, [username]);

  if (!selectedProfile) {
    return <p>No existe el usuario</p>;
  }

  console.log(isFollowingToo, typeof isFollowingToo);
  const status = 
    relation?.isFollowing
      ? "Siguiendo"
      : relation?.isPending
        ? "Pendiente"
        : isFollowingToo
          ? "Seguir también"
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

  // Estilo de botón seguir
  const followButton = "border border-white/20 px-3 rounded bg-[rgba(34,34,34,0.8)] text-white cursor-pointer";

  const Icon = selectedProfile.isPrivate ? UserLock : User
  const nickname = 
    selectedProfile.nickname === "" || selectedProfile.nickname === null
      ? selectedProfile.username
      : selectedProfile.nickname

  return (
    <div className="mb-10 px-2">

      <div className="
        w-full max-w-[550px]
        flex flex-col 
        gap-7
        text-white
      ">

        <div className="flex gap-3 md:gap-5 items-center">
          {/* Imagen de perfil */}
          <Image 
            src={selectedProfile.profileImageUrl}
            alt="Foto de perfil"
            className="
              w-25 h-25
              lg:w-30 lg:h-30
              rounded-full
            "
          />

          <div className="flex flex-col gap-3">
            {/* Usuario y nickname */}
            <div>
              <div className="flex gap-1 items-center text-[.7rem] md:text-[.9rem]">
                <Icon 
                  size={13}
                  className="text-white"
                />

                <p className="text-gray-400">@{selectedProfile.username}</p>
              </div>

              <p className="text-[.85rem] sm:text-[1rem] md:text-[1.1rem] text-white">{nickname}</p>
            </div>

            {/* Contadores */}
            <div className="flex gap-7 md:gap-13 text-[.7rem] sm:text-[.8rem]">
              <div className="md:flex gap-1">
                <p>Fotos</p>
                {selectedProfile.postsCount}
              </div>

              <div className="md:flex gap-1">
                <p>Seguidores</p>
                {selectedProfile.followersCount}
              </div>

              <div className="md:flex gap-1">
                <p>Seguidos</p>
                {selectedProfile.followingCount}
              </div>
            </div>
          </div>
        </div>

        {/* Biografía */}
        <div className="text-[.8rem] lg:text-[.95rem]">
          <p>{selectedProfile.bio}</p>
        </div>
      </div>

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