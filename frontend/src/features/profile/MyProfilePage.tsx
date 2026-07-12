import { useAuth } from "@/app/hooks/useAuth";
import { usePost } from "@/shared/hooks/usePost";

import Header from "./components/Header";
import { PostView } from "@/components";

const MyProfile = () => {
  const { user, isLoading } = useAuth();
  const { myPosts } = usePost();

  if (isLoading) {
    return <p>Cargando perfil...</p>;
  }

  if (!user) {
    return <p>No existe el usuario</p>;
  }

  if (!myPosts) {
    return <p className="text-white text-center mt-5">No existen publicaciones</p>;
  }

  return (
    <div>
      <Header data={user} />
      
      <PostView posts={myPosts} />
    </div>
  );
}

export default MyProfile;