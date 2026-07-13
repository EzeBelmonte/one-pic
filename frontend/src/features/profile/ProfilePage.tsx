import { useEffect } from "react";

import { useAuth } from "@/app/hooks/useAuth";
import { usePost } from "@/shared/hooks/usePost";

import Header from "./components/Header";
import { PostSection } from "@/components";

const ProfilePage = () => {
  const { user, isLoading } = useAuth();
  const { posts, getMyPosts, loading } = usePost();

  useEffect(() => {
    getMyPosts();
  }, []);

  if (isLoading) {
    return <p>Cargando perfil...</p>;
  }

  if (!user) {
    return <p>No existe el usuario</p>;
  }

  return (
    <div>
      <Header data={user} />

      {loading ? (
        <p>Cargando publicaciones</p>
      ) : (
        <PostSection posts={posts} />
      )}
    </div>
  );
}

export default ProfilePage;