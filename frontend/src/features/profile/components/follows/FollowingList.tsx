import { useEffect } from "react";

import { useFollows } from "@/app/hooks/useFollows";

import FollowCard from "./FollowCard";

const FollowingList = () => {

  const { following, getFollowing, isLoading, deleteRelation } = useFollows();

  useEffect(() => {
    getFollowing();
  }, []);

  if (isLoading) {
    return <p className="text-white">Cargando seguidos</p>
  }

  if (following.length === 0) {
    return <p className="text-white">Sin seguidos</p>
  }

  return (
    <>
      {following.map((item) => (
        <div 
          key={item.id}
          className="w-full mb-2 flex flex-col items-center"
        >
          <FollowCard 
            data={item}
            onClick={deleteRelation}
            label="Dejar de seguir"
          />
        </div>
      ))}
    </>
  );
}

export default FollowingList;