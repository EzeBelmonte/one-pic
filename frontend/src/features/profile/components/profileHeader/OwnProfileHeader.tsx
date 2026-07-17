import { useEffect } from "react";

import { LockKeyhole, LockOpen } from "lucide-react";

import { useProfile } from "@/hooks/myUser/useProfile";

import ProfileHeaderBase from "./ProfileHeaderBase";

const OwnProfileHeader = () => {
  const { profile, getProfile } = useProfile();

  useEffect(() => {
    getProfile();
  }, []);
  
  if (!profile) {
    return <p className="text-white">No existe el usuario</p>;
  }

  return (
    <div className="mb-10">
      <ProfileHeaderBase 
        data={profile}
        Icon={profile.isPrivate ? LockKeyhole : LockOpen} 
      />
      
    </div>
  );
}

export default OwnProfileHeader;