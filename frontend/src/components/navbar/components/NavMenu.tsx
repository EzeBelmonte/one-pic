import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

import { cn } from "@/shared/utils/cn";
import { navItems } from "../constants/navItems";

type NavMenuProps = {
  onItemClick?: () => void;
  logout: () => void;
  className?: string;
  linkClassName?: string;
}

const NavMenu = ({ 
  onItemClick, 
  logout,
  className, 
  linkClassName, 
}: NavMenuProps 
) => {
  const baseStyle = "flex gap-2 font-semibold";

  return (
    <>
      <ul className={className}>
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link
                to={item.href}
                onClick={onItemClick}
                className={cn(
                  baseStyle,
                  linkClassName
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        to={"/"}
        onClick={logout}
        className={cn(
          `${baseStyle} text-red-400`,
          linkClassName
        )}
      >
        <LogOut size={18} />
        Cerrar sesión
      </Link>
    </>
  );
}

export default NavMenu;