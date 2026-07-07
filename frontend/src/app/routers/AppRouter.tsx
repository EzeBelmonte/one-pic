import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { MainLayout, AuthLayout, HomePage, LoginPage, RegisterPage, ProfilePage } from "@/features";

import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export function AppRouter() {

  return (
    <BrowserRouter>
      <Routes>

        {/* MAINLAYOUT */}
        <Route element={<MainLayout />} >
          
          <Route path="/" element={<HomePage />} />

          {/* Rutas privadas */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

        </Route>

        {/* AUTHLAYOUT */}
        <Route element={<AuthLayout />}>

          {/* Rutas públicas */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />

          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            } 
          />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}