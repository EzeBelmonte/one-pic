import { useAuth } from "@/app/hooks/useAuth";

import LogoutNav from "./components/movil/Logoutnav";
import LoginNav from "./components/movil/Loginnav";

const Topbar = () => {

  const { isAuthenticated } = useAuth();

  return (
    <>

      {!isAuthenticated ? (
        <LogoutNav />
      ) : (
        <LoginNav />
      )}

    </>
  );
}

export default Topbar;