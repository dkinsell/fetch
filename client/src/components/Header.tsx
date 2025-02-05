import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/User/useUserContext";
import { logout } from "../api";

// This component renders the site's header, including the logo/title and navigation links.

const Header = () => {
  const { isAuthenticated, userName, clearUserInfo } = useUserContext();
  const navigate = useNavigate();
  const navLinks = [
    { to: "/search", text: "Search" },
    { to: "/favorites", text: "Favorites" },
    { to: "/adopt", text: "Adopt" },
  ];

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
    <header className="bg-white shadow-sm rounded-b-xl px-6 py-4 flex items-center justify-between">
      {/* Left side: Branding and navigation */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">Fetch Dogs</h1>
        {isAuthenticated && (
          <nav className="space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-teal-600"
              >
                {link.text}
              </Link>
            ))}
          </nav>
        )}
      </div>
      {/* Right side: User greeting and logout */}
      {isAuthenticated && (
        <div className="flex items-center gap-4">
          <span className="text-gray-800">Welcome, {userName}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
