import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import SearchPage from "./pages/Search/SearchPage";
import FavoritesPage from "./pages/Favorites/FavoritesPage";
import Layout from "./components/Layout";
import { useUserContext } from "./context/useUserContext";

const App: FC = () => {
  const { isAuthenticated } = useUserContext();

  return (
    <Layout>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/search" replace /> : <LoginPage />
          }
        />
        <Route
          path="/search"
          element={
            isAuthenticated ? <SearchPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/favorites"
          element={
            isAuthenticated ? (
              <FavoritesPage />
            ) : (
              <Navigate to="/login" replace />
            )
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
