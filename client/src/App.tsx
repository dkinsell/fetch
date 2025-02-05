import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import SearchPage from "./pages/Search/SearchPage";
import FavoritesPage from "./pages/Favorites/FavoritesPage";
import AdoptionPage from "./pages/Adoption/AdoptionPage";
import Layout from "./components/Layout";
import { useUserContext } from "./context/User/useUserContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Main App component that defines the routes and layout for the application
const App = () => {
  const { isAuthenticated } = useUserContext();

  return (
    // Layout component wraps the main content of the app with common layout elements (e.g. header, footer, container styling)
    <Layout>
      <Routes>
        {/* Login page route */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to="/search" replace />
          }
        />
        {/* Search page route */}
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />
        {/* Favorites page route */}
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          }
        />
        {/* Adoption page route */}
        <Route
          path="/adopt"
          element={
            <ProtectedRoute>
              <AdoptionPage />
            </ProtectedRoute>
          }
        />
        {/* Catch-all route for invalid paths */}
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
