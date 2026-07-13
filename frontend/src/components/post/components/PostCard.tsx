import { Trash, Heart } from "lucide-react";

import { usePost } from "@/shared/hooks/usePost";

import type { Post } from "@shared/index";

import { formatNormalDate } from "@/helpers/formatterDate.helper";
import { Image, Button } from "@/components";

type PostCardProps = {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const { deletePost } = usePost();

  return (
    <div className="
      flex flex-col 
      justify-center items-center 
      bg-[rgba(255,255,255,0.1)] rounded
    ">
      <Image 
        src={post.imageUrl}
        alt="Imagen publicada"
        className="rounded w-full"
      />

      {/* Descripción */}
      <p className="text-white mt-3 mb-5">{post.description}</p>

      {/* Botones */}
      <div className="flex mb-3">
        {/* Me gusta y listado de gente que dio "me gustas" */}
        <div className="flex gap-1.5">
          <Button>
            <Heart 
              size={20} 
              className="text-red-400 cursor-pointer"
            />
          </Button>
          <Button
            className="text-white cursor-pointer"
          >
            9999
          </Button>
        </div>

        {/* Eliminar publicación */}
        <Button 
          className="ms-auto cursor-pointer"
          onClick={() => deletePost}
        >
          <Trash 
            size={20} 
            className="text-red-500"
          />
        </Button>
      </div>

      {/* Fecha */}
      <p className="text-white/50 text-[.75rem] ms-auto">{formatNormalDate(post.createdAt)}</p>
  </div>
  );
}

export default PostCard;