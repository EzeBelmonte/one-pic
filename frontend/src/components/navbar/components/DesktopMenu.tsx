import { useAuth } from "@/app/hooks/useAuth";

import NavMenu from "./NavMenu";

const DesktopMenu = () => {
  const { logout } = useAuth();
  return (
    <div className="
      hidden 
      sm:flex
      flex-col 
      h-screen
      max-w-[220px]">
      <nav className="
        flex 
        flex-col
        h-screen
        px-3
        py-5
      ">
        <NavMenu 
          logout={logout}
          className="
            flex
            flex-col
            gap-2
            text-white
          "
          linkClassName="
            mt-auto 
            text-[1.05rem] 
            items-center
            border
            border-transparent
            hover:border-white
            px-4
            py-2
            rounded-2xl
            hover:bg-white/10
            transition-all
          "
        />
      </nav>
    </div>
  );
}

export default DesktopMenu;