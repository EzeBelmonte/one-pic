import { useAuth } from "@/app/hooks/useAuth";
import { useScroll } from "@/shared/hooks/useScroll";

import { NavMenu } from "./";

const MobileMenu = () => {
  const { logout } = useAuth();

  const { scrollingUp } = useScroll();

  return (
    <div className="sm:hidden">
      <div className="fixed top-0 right-0 z-50 p-2">
        {/* Menú */}
        <nav
          id="mobile-menu"
          aria-hidden={!scrollingUp}
          className={`
            fixed bottom-0 left-0 w-full
            bg-[rgb(50,51,53)] text-white
            z-50 shadow-xl

            transform transition-all duration-200 ease-in

            ${scrollingUp
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
            }
          `}
        >
          <NavMenu 
            logout={logout}
            className="flex justify-between"
            linkClassName="px-6 py-3 text-sm"
            mobile={true}
          />
        </nav>
      </div>
    </div>
  );
}

export default MobileMenu;