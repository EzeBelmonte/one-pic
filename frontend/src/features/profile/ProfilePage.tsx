import { useEffect } from "react";

import { useAuth } from "@/app/hooks/useAuth";
import { usePost } from "@/shared/hooks/usePost";

import Header from "./components/Header";
import ProfileSection from "./components/ProfileSection";

const ProfilePage = () => {
  const { user, isLoading } = useAuth();
  const { posts, getMyPosts, loading } = usePost();

  useEffect(() => {
    getMyPosts();
  }, []);

  if (isLoading) {
    return <p className="text-white">Cargando perfil...</p>;
  }

  if (!user) {
    return <p className="text-white">No existe el usuario</p>;
  }

  return (
    <div>
      <Header data={user} />

      <div className="mt-10">
        {loading ? (
          <p>Cargando publicaciones</p>
        ) : (
          <ProfileSection posts={posts} />
        )}
      </div>
    </div>
  );
}

export default ProfilePage;