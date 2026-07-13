import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useUser } from "@/shared/hooks/useUser";
import { usePost } from "@/shared/hooks/usePost";

import { PostSection } from "@/components";
import Header from "./components/Header";


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
    <div>
      <Header 
        data={selectedUser} 
        featured={true}
      />

      {loading ? (
        <p>Cargando publicaciones</p>
      ) : (
        <PostSection posts={posts} />
      )}
    </div>
  );
}

export default UserProfilePage;