import { useEffect } from "react";

import { useUserPosts } from "@/hooks/useUserPosts";

import ProfileSection from "./ProfileSection";

type Props = {
  username: string;
}

const VisitorProfileSection = ({ username }: Props) => {
  const { posts, getUserPosts, isLoading } = useUserPosts();

  useEffect(() => {
    getUserPosts(username);
  }, [username]);

  if (!posts) {
    return (
      <div
        className="
          w-[200px]
          flex flex-col 
          mx-auto items-center
          py-2
          rounded-2xl
          border border-white/20
          bg-[rgba(34,34,34,0.5)]
        "
      >
        <p
          className="text-white"
        >
          Sin pubicaciones
        </p>
      </div>
    );  
  }

  return (
    <>
      {isLoading ? (
        <p>Cargando publicaciones</p>
      ) : (
        <ProfileSection data={posts} />
      )}
    </>
  );
}

export default VisitorProfileSection;