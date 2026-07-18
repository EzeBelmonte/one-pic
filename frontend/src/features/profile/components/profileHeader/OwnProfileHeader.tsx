import { LockKeyhole, LockOpen } from "lucide-react";

import { useProfile } from "@/app/hooks/useProfile";

import ProfileHeaderBase from "./ProfileHeaderBase";

const OwnProfileHeader = () => {
  const { profile } = useProfile();

  if (!profile) {
    return <p className="text-white">Cargando perfil...</p>;
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