import { Outlet } from "react-router-dom";

import { useAuth } from "@/app/hooks/useAuth";
import { usePosts } from "@/app/hooks/usePosts";

import { Navbar, Topbar, Logoutbar } from "@/components";
import { useEffect } from "react";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const { clearPosts } = usePosts();

  useEffect(() => {
    if (!isAuthenticated) {
      clearPosts();
    }
  }, [isAuthenticated, clearPosts]);

  return (
    <div className="min-h-screen">ç
      {isAuthenticated ? (
        <Topbar />
      ): (
        <Logoutbar />
      )}

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