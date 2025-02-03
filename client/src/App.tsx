import { Route, Routes } from "react-router-dom";
import { FC } from "react";
import LoginPage from "./pages/Login/LoginPage";
import SearchPage from "./pages/Search/SearchPage";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
};

export default App;
