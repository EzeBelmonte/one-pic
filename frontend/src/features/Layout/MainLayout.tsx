import { Outlet } from "react-router-dom";

import { Navbar } from "@/components";

const MainLayout = () => {
  
  return (
    <div className="sm:grid sm:grid-cols-[220px_1fr]">
      {/* Cuando el ancho llega a 640px se oculta */}
      <Navbar />
      
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;