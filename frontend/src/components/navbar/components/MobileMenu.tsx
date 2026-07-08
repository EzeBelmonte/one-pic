import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

import { useAuth } from "@/app/hooks/useAuth";
import { Button } from "@/components";

import NavMenu from "./NavMenu";

const MobileMenu = () => {
  const { logout } = useAuth();

  // Abir y cerrar el menu
  const [openMenu, setOpenMenu] = useState(false);

  // Función para abrir y cerrar el menu
  const toggleMenu = () => {
    setOpenMenu(prev => !prev);
  }

  // Función para cerrar el menu
  const closeMenu = () => {
    setOpenMenu(false);
  }

  // Bloquear el scroll cuando el menu está abierto
  useEffect(() => {
    document.body.style.overflow = openMenu ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    }
  }, [openMenu]);

  // Cerrar el menú al cambiar a escritorio
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        closeMenu();
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className="sm:hidden">
      {/* Overlay */}
      {openMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
  
      <div className="fixed top-0 left-0 z-50 p-2">
        {/* Botón abrir */}
        {!openMenu && (
          <Button
            onClick={toggleMenu}
            aria-label="Abrir menú"
            aria-expanded={openMenu}
            aria-controls="mobile-menu"
          >
            <Menu
              className="bg-[#3d3a3a] rounded-[7px] w-7.5 h-7.5 p-1 opacity-90 border border-white/30"
              color="white"
            />
          </Button>
        )}

        {/* Menú */}
        <nav
          id="mobile-menu"
          aria-hidden={!openMenu}
          className={`
            fixed bottom-0 left-0 w-full
            bg-[rgb(50,51,53)] text-white
            z-50 shadow-xl

            transform transition-transform duration-300 ease-in-out

            ${openMenu
              ? "translate-y-0"
              : "translate-y-full"
            }
          `}
        >
          <NavMenu 
            onItemClick={closeMenu}
            logout={logout}
            className="flex flex-col py-4"
            linkClassName="px-6 py-3 text-sm"
          />
        </nav>
      </div>
    </div>
  );
}

export default MobileMenu;