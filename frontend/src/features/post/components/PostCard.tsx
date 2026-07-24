import { useEffect } from "react";

import { Trash, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { usePosts } from "@/app/hooks/usePosts";
import { useProfile } from "@/app/hooks/useProfile";
import type { Post } from "@shared/index";

import { formatNormalDate } from "@/helpers/formatterDate.helper";
import { Image, Button } from "@/components";
import { cn } from "@/utils/cn";
import { usePost } from "../hooks/usePost";

type Props = {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const { getLikes, likes, addLike, removeLike, hasLiked, liked } = usePost();
  const { deletePost } = usePosts();
  const { getProfile } = useProfile();

  const navigate = useNavigate();

  useEffect(() => {
    getLikes(post.id);
    hasLiked(post.id);
  }, []);

  // Función para eliminar la publicación
  const handleDelete = async(postId: number) => {
    await deletePost(postId);
    await getProfile(true);
    
    navigate("/profile");
  }

  const handleLike = async(postId: number) => {
    if (!liked) {
      await addLike(postId);
    } else {
      await removeLike(postId);
    }
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
      <div className="w-full max-w-[350px] flex mb-3 justify-between">
        {/* Me gusta y listado de gente que dio "me gustas" */}
        <div className="flex gap-1.5">
          <Button
            onClick={() => handleLike(post.id)}
          >
            <Heart 
              size={20} 
              className={cn(
                "text-red-500 cursor-pointer",
                liked && "fill-red-500"
              )}
            />
          </Button>

          <Button
            className="text-white cursor-pointer"
          >
            {likes}
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