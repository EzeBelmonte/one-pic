import { useScroll } from "@/hooks/useScroll";

import { NavMenu } from "./";

const MobileMenu = () => {

  const { scrollingUp } = useScroll();

  return (
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
          : "translate-y-12 opacity-100"
        }
      `}
    >
      <NavMenu 
        className="w-full flex justify-between"
        linkClassName="px-6 p-2 text-sm"
        mobile={true}
      />
    </nav>
  );
}

export default MobileMenu;