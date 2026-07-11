import type { User } from "@shared/index";
import { DEFAULT_AVATAR } from "../constants/DEFAULT_AVATAR";

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
    <div className="w-full p-3 bg-[#12345c]">

      <div className="flex gap-5 items-center">
        {/* Imagen de perfil */}
        <Image 
          src={data.avatarUrl ?? DEFAULT_AVATAR}
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
            <p className="text-[.85rem] text-gray-500">@{data.username}</p>
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
      <div className="mt-3 px-2 text-[.9rem] text-[rgba(255,255,255,0.9)]">
        <p>{data.bio} asdasdasdasd</p>
      </div>

    </div>
  );
}

export default Header;