
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

export default function Layout() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Toaster />
      <Outlet />
    </main>
  );
}
