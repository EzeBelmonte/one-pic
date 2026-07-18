import { LogOut } from "lucide-react";

import { useAuth } from "@/app/hooks/useAuth";
import { useProfile } from "@/app/hooks/useProfile";
import { useScroll } from "@/hooks/shared/useScroll";

import { Button } from "@/components";

const Topbar = () => {
  const { scrollingUp } = useScroll();
  const { logout } = useAuth();
  const { clearProfile } = useProfile();

  const handleLogout = () => {
    clearProfile();
    logout();
  }

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full
        bg-[rgb(50,51,53)] text-white
        px-2 py-2
        z-50 shadow-xl

        transform transition-all duration-200 ease-in

        ${scrollingUp
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
        }
      `}
    >
      <Button
        className="ms-auto"
        onClick={handleLogout}
      >
        <LogOut />
      </Button>
    </nav>
  );
}

export default Topbar;