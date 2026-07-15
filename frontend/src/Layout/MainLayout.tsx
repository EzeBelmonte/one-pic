import { Outlet } from "react-router-dom";

import { Navbar, Topbar } from "@/components";

const MainLayout = () => {
  
  return (
    <div className="min-h-screen">
      <Topbar />

      <div className="mt-10 grid min-h-[calc(100vh-2.5rem)] grid-cols-1 sm:grid-cols-[220px_minmax(0,1fr)]">
        <Navbar />

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;