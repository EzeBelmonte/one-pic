import { useState } from "react";
import { Link } from "react-router-dom";

import { cn } from "@/shared/utils/cn";
import { navItems } from "../constants/navItems";

import { Modal, CreatePosts } from "@/components";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const baseStyle = "flex gap-2 font-semibold";

  // Abrir el modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <ul className={className}>
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.href}>
              {item.href === "post" ? (
                <div 
                  onClick={handleOpenModal}
                  className={cn(
                    baseStyle,
                    linkClassName
                  )}
                >
                  <Icon size={18} />
                  {!mobile &&
                    item.label
                  }
                </div>
              ) : (
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
              )}
            </li>
          );
        })}
      </ul>

      {/* Modal que abre la creación de la publicación */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Crear publicación"
      >
        <CreatePosts
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}

export default NavMenu;