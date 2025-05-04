
import { Header } from "@/components/Header";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="bg-shoprite-dark text-white py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          © {new Date().getFullYear()} Shoprite. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
