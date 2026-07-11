import { useAuth } from "@/app/hooks/useAuth";

import { 
  DesktopMenu,
  MobileMenu,
  LogoutMenu,
} from "../navbar/components";

const Navbar = () => {

  const { isAuthenticated } = useAuth();

  return (
    <>

      {!isAuthenticated ? (
        <LogoutMenu />
      ) : (
        <>
          {/* Menú */}
          <MobileMenu />
          <DesktopMenu />
        </>
      )}

    </>
  );
}

export default Navbar;