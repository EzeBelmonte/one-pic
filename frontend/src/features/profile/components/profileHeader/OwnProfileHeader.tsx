import { LockKeyhole } from "lucide-react";

import { useAuth } from "@/app/hooks/useAuth";

import ProfileHeaderBase from "./ProfileHeaderBase";

const OwnProfileHeader = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <p className="text-white">No existe el usuario</p>;
  }

  return (
    <div className="mb-10">
      <ProfileHeaderBase 
        data={user}
        Icon={LockKeyhole} 
      />
    </div>
  );
}

export default OwnProfileHeader;