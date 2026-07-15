import type { LucideIcon } from "lucide-react";

import type { User } from "@shared/index";

import { Image } from "@/components";


type Props = {
  data: User;
  Icon: LucideIcon;
}

const ProfileHeaderBase = ({ data, Icon }: Props) => {

  return (
    <div className="w-full p-3">

      <div className="flex gap-5 items-center">
        {/* Imagen de perfil */}
        <Image 
          src={data.profileImageUrl}
          alt="Foto de perfil"
          className="
            w-25 h-25
            rounded-full
          "
        />

        <div className="flex flex-col gap-5">
          {/* Usuario y nickname */}
          <p className="text-[1.1rem] font-semibold text-white">{data.nickname ?? data.username+data.id}</p>
          
          <div className="flex gap-1 items-center">
            <Icon 
              size={13}
              className="text-white"
            />

            <p className="text-[.85rem] text-gray-500">@{data.username}</p>
          </div>

        </div>
      </div>

      {/* Biografía */}
      <div className="mt-3 px-2 text-[.9rem] text-[rgba(255,255,255,0.9)] sm:w-[400px] md:w-[600px]">
        <p>{data.bio}</p>
      </div>

    </div>
  );
}

export default ProfileHeaderBase;