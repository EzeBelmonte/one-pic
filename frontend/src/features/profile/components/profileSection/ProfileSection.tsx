import { useNavigate } from "react-router-dom";

import type { Post } from "@shared/index";

import { Image } from "@/components";

type Props = {
  data: Post[];
}

const ProfileSection = ({ data }: Props) => {
  const navigate = useNavigate();

  // Función para ir a una publicación en específico
  const handleGoPost = (postId: number) => {
    navigate(`/posts/${postId}`);
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3">
      {data.map((post) => (
        <div
          onClick={() => handleGoPost(post.id)}
          className="cursor-pointer"
          key={post.id} 
        >
          <Image
            src={post.imageUrl}
            alt="Previsualización de la imagen de la publicación"
          />
        </div>
      ))}
    </div>
  );
}

export default ProfileSection;