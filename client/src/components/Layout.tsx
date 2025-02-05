import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

// Component wraps the main content of the app with common layout elements (e.g. header, footer, container styling).
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Render the site header */}
      <Header />
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-white shadow-sm text-center py-4">
        © {new Date().getFullYear()} Fetch Dogs
      </footer>
    </div>
  );
};

export default Layout;
