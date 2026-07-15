import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useUser } from "@/app/hooks/useUser";
import { usePost } from "@/app/hooks/usePost";

import Header from "./components/Header";
import ProfileSection from "./components/ProfileSection";

const UserProfilePage = () => {
  const { selectedUser, getUserByUsername } = useUser();
  const { posts, getUserPosts, isLoading } = usePost();

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

  if (!selectedUser) {
    return <p>No existe el usuario</p>;
  }

  return (
    <div className="flex flex-col">
      <Header 
        data={selectedUser} 
        featured={true}
      />
      {isLoading ? (
        <p>Cargando publicaciones</p>
      ) : (
        <ProfileSection posts={posts} />
      )}
    </div>
  );
}

export default UserProfilePage;