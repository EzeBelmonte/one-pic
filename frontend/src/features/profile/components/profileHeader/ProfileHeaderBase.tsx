import type { LucideIcon } from "lucide-react";

import type { ProfileBase } from "@shared/index";

import { Image } from "@/components";

type Props = {
  data: ProfileBase;
  Icon: LucideIcon;
}

const ProfileHeaderBase = ({ data, Icon }: Props) => {

  return (
    <div className="
      w-full max-w-[550px]
      flex flex-col 
      gap-7
      text-white
    ">

      <div className="flex gap-3 md:gap-5 items-center">
        {/* Imagen de perfil */}
        <Image 
          src={data.profileImageUrl}
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

              <p className="text-gray-400">@{data.username}</p>
            </div>

            <p className="text-[.85rem] sm:text-[1rem] md:text-[1.1rem]">{data.nickname ?? data.username}</p>
          </div>

          {/* Contadores */}
          <div className="flex gap-7 md:gap-13 text-[.7rem] sm:text-[.8rem]">
            <div className="md:flex gap-1">
              <p>Fotos</p>
              {data.postsCount}
            </div>

            <div className="md:flex gap-1">
              <p>Seguidores</p>
              {data.followersCount}
            </div>

            <div className="md:flex gap-1">
              <p>Seguidos</p>
              {data.followingCount}
            </div>
          </div>
        </div>
      </div>

      {/* Biografía */}
      <div className="text-[.8rem] lg:text-[.95rem]">
        <p>{data.bio}</p>
      </div>

    </div>
  );
}

export default ProfileHeaderBase;