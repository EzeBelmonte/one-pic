import { useNavigate } from "react-router-dom";

import type { Follow } from "@shared/index";

import { cn } from "@/utils/cn";
import { Image, Button } from "@/components";

type Props = {
  data: Follow;
  label: string;
  onClick: (username: string) => void;
}

const FollowCard = ({ 
  data,
  label,
  onClick,
}: Props) => {
  const navigate = useNavigate();

  const handleGoProfile = (
    username: string
  ) => {
    navigate(`/profile/${username}`);
  }

  return (
    <div className="
      w-full max-w-[320px]
      flex items-center
      border border-[rgb(63,91,102)]
      bg-[rgb(18,27,31)]
      rounded
      px-3 py-2 gap-2
      text-white
    ">
      <div 
        className="w-full flex justify-between items-center gap-2"
      >
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

        <Button
          onClick={() => onClick(data.username)}
          className={cn(`
              h-[26px] px-2
              "text-[.8rem] cursor-pointer
              rounded
            `,
            label === "Mensaje" 
              ? "bg-[#244870]"
              : "bg-[#472525] "
          )}
        >
          {label}
        </Button>
      </div>
    </div>
  );
}

export default FollowCard;