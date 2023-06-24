import { Route, Routes } from "react-router-dom";
import { HeroesRoutes } from "../heroes";
import { LoginPage } from "../auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { RegisterPage } from "../auth/pages/RegisterPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login/*" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/*"
        element={
          // Ruta privada si está logeado
          <PrivateRoute>
            <HeroesRoutes />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};