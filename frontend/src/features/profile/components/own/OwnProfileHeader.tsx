import { useState } from "react";
import { LockKeyhole, LockOpen } from "lucide-react";

import { useProfile } from "@/app/hooks/useProfile";

import { Image, Button, ModalSection } from "@/components";
import FollowersList from "../../../follows/FollowersList";
import FollowingList from "../../../follows/FollowingList";


const OwnProfileHeader = () => {
  const { profile } = useProfile();

  if (!profile) {
    return <p className="text-white">Cargando perfil...</p>;
  }

  const [isModalFollowersOpen, setIsModalFollowersOpen] = useState(false);
  const [isModalFollowingOpen, setIsModalFollowingOpen] = useState(false);

  // Abrir el modal Seguidores
  const handleOpenFollowersModal = () => {
    setIsModalFollowersOpen(true);
  };

  // Abrir el modal Seguidos
  const handleOpenFollowingModal = () => {
    setIsModalFollowingOpen(true);
  };

  const Icon = profile.isPrivate ? LockKeyhole : LockOpen; 
  const nickname = profile.nickname === "" || profile.nickname === null
    ? profile.username
    : profile.nickname;

  const buttonsCount = "flex flex-col items-start md:block cursor-pointer";

  return (
    <>
      <div className="
        w-full max-w-[550px]
        flex flex-col
        gap-7
        text-white
      ">

        <div className="flex gap-3 md:gap-5 items-center">
          {/* Imagen de perfil */}
          <Image 
            src={profile.profileImageUrl}
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

                <p className="text-gray-400">@{profile.username}</p>
              </div>

              <p className="text-[.85rem] sm:text-[1rem] md:text-[1.1rem]">{nickname}</p>
            </div>

            {/* Contadores */}
            <div className="flex gap-7 md:gap-13 text-[.7rem] sm:text-[.8rem]">
              <div className="md:flex gap-1">
                <p>Fotos</p>
                {profile.postsCount}
              </div>

              <Button 
                onClick={handleOpenFollowersModal}
                className={buttonsCount}
              >
                <span className="me-2">Seguidores</span>
                <span>{profile.followersCount}</span>
              </Button>

              <Button 
                onClick={handleOpenFollowingModal}
                className={buttonsCount}
              >
                <span className="me-2">Seguidos</span>
                <span>{profile.followingCount}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Biografía */}
        <div className="text-[.8rem] lg:text-[.95rem]">
          <p>{profile.bio}</p>
        </div>

      </div>

      {/* Seguidores */}
      <ModalSection
        isOpen={isModalFollowersOpen}
        onClose={() => setIsModalFollowersOpen(false)}
        title={"Seguidores"}
      >
        <FollowersList />
      </ModalSection>

      {/* Seguidos */}
      <ModalSection
        isOpen={isModalFollowingOpen}
        onClose={() => setIsModalFollowingOpen(false)}
        title={"Seguidos"}
      >
        <FollowingList />
      </ModalSection>
    </>
  );
}

export default OwnProfileHeader;