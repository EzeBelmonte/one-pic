import { Outlet } from "react-router-dom";

import { Navbar, Topbar } from "@/components";

const MainLayout = () => {
  
  return (
    <>
      {/* Este es un submenu donde esta el botón de logout sin importar si es movil o pc */}
      <Topbar />

      <div className="mt-10 sm:grid sm:grid-cols-[220px_1fr]">
        {/* Cuando el ancho llega a 640px se oculta */}
        <Navbar />
      
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default MainLayout;