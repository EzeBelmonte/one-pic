import { Link } from "react-router-dom";

import { cn } from "@/utils/cn";
import { navItems } from "../constants/navItems";

import CreatePosts from "@/features/post/components/CreatePosts";

type NavMenuProps = {
  className?: string;
  linkClassName?: string;
  mobile?: boolean;
}

const NavMenu = ({ 
  className, 
  linkClassName, 
  mobile = false
}: NavMenuProps 
) => {
  const baseStyle = "flex gap-2 font-semibold cursor-pointer";

  return (
    <>
      <ul className={className}>

        <CreatePosts 
          linkClassName={linkClassName}
          mobile={mobile}
        />

        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  baseStyle,
                  linkClassName
                )}
              >
                <Icon size={18} />
                {!mobile &&
                  item.label
                }
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default NavMenu;