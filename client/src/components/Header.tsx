import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/useUserContext";
import { logout } from "../api";

const Header: FC = () => {
  const { isAuthenticated, userName, clearUserInfo } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      clearUserInfo();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="bg-gray-100 border-b border-gray-300 px-6 py-4 flex items-center justify-between">
      {/* Left side: Branding and navigation */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">Fetch Dogs</h1>
        {isAuthenticated && (
          <nav>
            <Link
              to="/search"
              className="text-gray-700 hover:text-blue-600 mr-4"
            >
              Search
            </Link>
            <Link to="/favorites" className="text-gray-700 hover:text-blue-600">
              Favorites
            </Link>
          </nav>
        )}
      </div>
      {/* Right side: User greeting and logout */}
      {isAuthenticated && (
        <div className="flex items-center gap-4">
          <span className="text-gray-800">Welcome, {userName}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
