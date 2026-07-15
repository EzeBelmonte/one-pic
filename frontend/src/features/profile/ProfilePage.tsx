import { useEffect } from "react";

import { useAuth } from "@/app/hooks/useAuth";

import { usePost } from "@/app/hooks/usePost";

import Header from "./components/Header";
import ProfileSection from "./components/ProfileSection";

const ProfilePage = () => {
  const { user } = useAuth();
  const { posts, getMyPosts, isLoading } = usePost();

  if (!user) {
    return <p className="text-white">No existe el usuario</p>;
  }

  useEffect(() => {
    getMyPosts()
  }, []);

  return (
    <div>
      <Header data={user} />

      {isLoading ? (
        <p>Cargando publicaciones</p>
      ) : (
        <ProfileSection posts={posts}/>
      )}
    </div>
  );
}

export default ProfilePage;