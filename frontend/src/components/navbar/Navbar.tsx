import { useAuth } from "@/app/hooks/useAuth";

import { 
  DesktopMenu,
  MobileMenu,
  LogoutMenu,
} from "../navbar/components";

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LogoutMenu />;
  }

  return (
    <div>
      <div className="sm:hidden">
        <MobileMenu />
      </div>

      <div className="hidden sm:block">
        <DesktopMenu />
      </div>
    </div>
  );
};

export default Navbar;