import { useEffect } from "react";

import { useFollows } from "@/app/hooks/useFollows";

import FollowCard from "./FollowCard";

const FollowersList = () => {
  const { followers, getFollowers, isLoading } = useFollows();

  useEffect(() => {
    getFollowers();
  }, []);

  if (isLoading) {
    return <p className="text-white">Cargando seguidores</p>
  }

  if (!followers) {
    return <p className="text-white">Sin seguidores</p>
  }

  const items = [];
  for (let i = 0; i < 10; i++) {
    const data = {
      id: i + 1,
      username: "Hola",
      profileImageUrl: "",
      nickname: "Chau",
    }
    items.push(data);
  }

  return (
    <>
      {followers.map((item) => (
        <div 
          key={item.id} 
          className="w-full mb-2 flex flex-col items-center"
        >
          <FollowCard 
            data={item}
            onClick={() => alert("hola")}
            label="Mensaje"
          />
        </div>
      ))}
    </>
  );
}

export default FollowersList;