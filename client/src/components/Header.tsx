import { FC } from "react";
import { useUserContext } from "../context/useUserContext";
import { logout } from "../api";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const { isAuthenticated, clearUserInfo, userName } = useUserContext();
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
          <button onClick={handleLogout} style={{ marginLeft: "1rem" }}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
