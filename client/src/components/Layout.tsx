import { FC, ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-white shadow-sm text-center py-4">
        © {new Date().getFullYear()} Fetch Dogs
      </footer>
    </div>
  );
};

export default Layout;
