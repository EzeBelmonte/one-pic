import { useNavigate } from "react-router-dom";

import type { Post } from "@shared/index";

import { PostPreview } from "@/components";

type PostViewProps = {
  posts: Post[] | null;
}

const PostSection = ({ posts }: PostViewProps) => {
  const navigate = useNavigate();

  if (posts === null || posts.length === 0) {
    return <p>Sin pubicaciones</p>
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
          <PostPreview 
            imageUrl={post.imageUrl}
          />
        </div>
      ))}
    </div>
  );
}

export default PostSection;