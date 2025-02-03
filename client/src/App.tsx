import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import SearchPage from "./pages/Search/SearchPage";
import Header from "./components/Header";
import { useUserContext } from "./context/useUserContext";

const App: FC = () => {
  const { isAuthenticated } = useUserContext();

  return (
    <div>
      <Header />
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
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/search" : "/login"} replace />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
