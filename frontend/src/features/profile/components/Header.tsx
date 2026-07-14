import { LockKeyhole, UserLock } from "lucide-react";

import type { User } from "@shared/index";

import { Image, Button } from "@/components";

type HeaderUser = User & {
  email?: string;
}

type HeaderProps = {
  data: HeaderUser;
  featured?: boolean;
}

const Header = ({ data, featured = false }: HeaderProps) => {
  // Estilo de botón seguir
  const followButton = "border border-white/20 px-3 rounded bg-[rgba(34,34,34,0.8)] text-white";

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
          <div>
            <p className="text-[1.1rem] font-semibold text-white">{data.nickname ?? data.username+data.id}</p>
            <div className="flex gap-1 items-center">
              {!featured ? (
                <LockKeyhole 
                  size={13}
                  className="text-white"
                />
              ): (
                <UserLock
                  size={13}
                  className="text-white"
                />
              )}
              <p className="text-[.85rem] text-gray-500">@{data.username}</p>
            </div>
          </div>

          {/* Botón de seguir y bloquear */}
          {featured &&
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
          }
        </div>
      </div>

      {/* Biografía */}
      <div className="mt-3 px-2 text-[.9rem] text-[rgba(255,255,255,0.9)] sm:w-[400px] md:w-[600px]">
        <p>{data.bio}</p>
      </div>

    </div>
  );
}

export default Header;