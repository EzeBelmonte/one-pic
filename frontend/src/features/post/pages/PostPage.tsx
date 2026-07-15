import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { usePost } from "@/hooks/usePost";

import  PostCard  from "../components/PostCard";

const PostPage = () => {
  const { post, getPost, isLoading } = usePost();
  
  const { postId } = useParams();

  useEffect(() => {
    if (postId) {
      getPost(Number(postId));
    }
  }, [postId]);

  if (post === null) {
    return <p className="text-white">La publicación no existe</p>;
  }

  if (isLoading) {
    return <p className="text-white">Cargando la publicación</p>;
  }
  
  return (
    <>
      <PostCard post={post} />
    </>
  );
}

export default PostPage;