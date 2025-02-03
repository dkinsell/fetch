import { Route, Routes } from "react-router-dom";
import { FC } from "react";
import LoginPage from "./pages/Login/LoginPage";

const SearchPagePlaceholder: FC = () => {
  return <h1>Search Page Placeholder</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/search" element={<SearchPagePlaceholder />} />
    </Routes>
  );
};

export default App;
