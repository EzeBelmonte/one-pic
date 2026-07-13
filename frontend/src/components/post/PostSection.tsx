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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3">
      {posts.map((post) => (
        <PostPreview key={post.id} imageUrl={post.imageUrl} />
      ))}
    </div>
  );
}

export default PostSection;