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
          key={post.id} 
          className="aspect-auto overflow-hidden cursor-pointer"
        >
          <Image
            src={post.imageUrl}
            alt="Previsualización"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export default ProfileSection;