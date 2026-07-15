import { Trash, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { usePost } from "@/app/hooks/usePost";

import type { Post } from "@shared/index";

import { formatNormalDate } from "@/helpers/formatterDate.helper";
import { Image, Button } from "@/components";

type Props = {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const { deletePost } = usePost();

  const navigate = useNavigate();

  // Función para eliminar la publicación
  const handleDelete = async(postId: number) => {
    await deletePost(postId);
    navigate("/profile");
  }

  return (
    <div className="
      max-w-[750px]
      flex flex-col 
      justify-center items-center 
      bg-[rgba(44,44,44,0.2)] rounded
      mx-auto mt-10 p-4
    ">
      <Image 
        src={post.imageUrl}
        alt="Imagen publicada"
        className="rounded"
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
          onClick={() => handleDelete(post.id)}
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