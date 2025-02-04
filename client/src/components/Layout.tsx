import { FC, ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-100 border-t border-gray-300 text-center py-4">
        © {new Date().getFullYear()} Fetch Dogs
      </footer>
    </div>
  );
};

export default Layout;
