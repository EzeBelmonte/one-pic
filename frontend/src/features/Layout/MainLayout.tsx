import { Outlet } from "react-router-dom";

import { Sidebar, Movilbar } from "@/components";

const MainLayout = () => {
  
  return (
    <div>
      {/* Cuando el ancho llega a 640px se oculta */}
      <Movilbar />

      {/* Cuando el ancho llega a 640px se hace visible */}
      <Sidebar />
      
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;