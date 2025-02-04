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
    <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      {isAuthenticated && (
        <div>
          <span>Welcome, {userName}</span>
          <nav style={{ marginLeft: "1rem" }}>
            <Link to="/search" style={{ marginRight: "1rem" }}>
              Search
            </Link>
            <Link to="/favorites" style={{ marginRight: "1rem" }}>
              Favorites
            </Link>
          </nav>
          <button onClick={handleLogout} style={{ marginLeft: "1rem" }}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
