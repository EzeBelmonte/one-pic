import { useAuth } from "@/app/hooks/useAuth";

import LogoutNav from "./components/LogoutMenu";
import MobileMenu from "./components/MobileMenu";
import DesktopMenu from "./components/DesktopMenu";

const Navbar = () => {

  const { isAuthenticated } = useAuth();

  return (
    <>

      {!isAuthenticated ? (
        <LogoutNav />
      ) : (
        <>
          <MobileMenu />
          <DesktopMenu />
        </>
      )}

    </>
  );
}

export default Navbar;