import { useNavigate } from "react-router-dom";

import type { Post } from "@shared/index";

import { Image } from "@/components";

type PostViewProps = {
  posts: Post[] | null;
}

const ProfileSection = ({ posts }: PostViewProps) => {
  const navigate = useNavigate();

  if (posts === null || posts.length === 0) {
    return (
      <div
        className="
          w-[200px]
          flex flex-col 
          mx-auto items-center
          py-2
          rounded-2xl
          border border-white/20
          bg-[rgba(34,34,34,0.5)]
        "
      >
        <p
          className="text-white"
        >
          Sin pubicaciones
        </p>
      </div>
    );  
  }

  // Función para ir a una publicación en específico
  const handleGoPost = (postId: number) => {
    navigate(`/posts/${postId}`);
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3">
      {posts.map((post) => (
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