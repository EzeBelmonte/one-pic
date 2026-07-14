import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useUser } from "@/shared/hooks/useUser";
import { usePost } from "@/shared/hooks/usePost";

import Header from "./components/Header";
import ProfileSection from "./components/ProfileSection";

const UserProfilePage = () => {
  const { selectedUser, getUserByUsername, isLoading } = useUser();
  const { posts, getUserPosts, loading } = usePost();

  const { username } = useParams();

  useEffect(() => {
    if (username) {
      getUserByUsername(username);
      getUserPosts(username);
    }
  }, [username]);

  if (!username) {
    return <p>No existe el usuario</p>;
  }

  if (isLoading) {
    return <p>Cargando perfil...</p>;
  }

  if (!selectedUser) {
    return <p>No existe el usuario</p>;
  }

  return (
    <div className="flex flex-col">
      <Header 
        data={selectedUser} 
        featured={true}
      />

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

export default UserProfilePage;