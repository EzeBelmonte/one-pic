import { useNavigate } from "react-router-dom";

import { useFollows } from "@/app/hooks/useFollows";

import type { Follow } from "@shared/index";

import { Button, Image } from "@/components";

type Props = {
  data: Follow;
}

const PendingCard = ({ data }: Props) => {
  const { acceptRequest, rejectRequest } = useFollows();
  const navigate = useNavigate();

  const handleGoProfile = (
    username: string
  ) => {
    navigate(`/profile/${username}`);
  }

  return (
    <div className="
      w-full
      flex items-center
      border border-[rgb(63,91,102)]
      bg-[rgb(29,49,56)]
      rounded
      px-3 py-2 gap-2
      text-white
    ">
  
      <div className="w-full flex flex-col gap-2">
        {/* Datos del usuario */}
        <div 
          onClick={() => handleGoProfile(data.username)}
          className="flex gap-2 items-center"
        >
          <Image 
            src={data.profileImageUrl}
            alt="Foto perfil"
            className="w-10 h-10 rounded-full"
          />

          <div>
            <p className="text-white text-[1.05rem]">{data.username ?? data.username}</p>
            <p className="text-gray-400 text-[.8rem]">@{data.username}</p>
          </div>
        </div>

        {/* Botones */}
        <div className="w-full flex text-[.8rem] justify-between">
          <Button
            onClick={() => acceptRequest(data.username)}
          >
            Aceptar
          </Button>

          <Button
            onClick={() => rejectRequest(data.username)}
          >
            Rechazar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PendingCard