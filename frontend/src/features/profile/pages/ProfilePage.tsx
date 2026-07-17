import OwnProfileHeader from "../components/profileHeader/OwnProfileHeader";
import OwnProfileSection from "../components/profileSection/OwnProfileSection";

const ProfilePage = () => {
  
  return (
    <div className="px-1 sm:px-2 md:px-3 lg:px-10">
      <OwnProfileHeader />

      <OwnProfileSection />
    </div>
  );
}

export default ProfilePage;