import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { UserProvider } from "./context/User/UserProvider.tsx";
import { FavoritesProvider } from "./context/Favorites/FavoritesProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
