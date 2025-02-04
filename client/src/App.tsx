import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import SearchPage from "./pages/Search/SearchPage";
import FavoritesPage from "./pages/Favorites/FavoritesPage";
import AdoptionPage from "./pages/Adoption/AdoptionPage";
import Layout from "./components/Layout";
import { useUserContext } from "./context/User/useUserContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const { isAuthenticated } = useUserContext();

  return (
    <Layout>
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to="/search" replace />
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adopt"
          element={
            <ProtectedRoute>
              <AdoptionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/search" : "/login"} replace />
          }
        />
      </Routes>
    </Layout>
  );
};

export default App;
