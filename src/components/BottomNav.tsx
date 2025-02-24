
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Search, Heart, PlusCircle, UserRound, Key } from "lucide-react";

export function BottomNav() {
  const location = useLocation();
  console.log("Navigation - Route actuelle:", location.pathname);

  // Liste des routes où on ne veut pas afficher la barre de navigation
  const hiddenRoutes = ["/login", "/register", "/reset-password"];

  // Si nous sommes sur une route où la barre ne doit pas être affichée
  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-6 h-16">
        <Link
          to="/"
          className="flex flex-col items-center justify-center text-xs transition-colors duration-200"
          style={{
            color: location.pathname === "/" ? "#34D399" : "#6B7280"
          }}
        >
          <Home className="w-6 h-6 mb-1" />
          Accueil
        </Link>
        <Link
          to="/buy"
          className="flex flex-col items-center justify-center text-xs transition-colors duration-200"
          style={{
            color: location.pathname === "/buy" ? "#34D399" : "#6B7280"
          }}
        >
          <Search className="w-6 h-6 mb-1" />
          Acheter
        </Link>
        <Link
          to="/rent"
          className="flex flex-col items-center justify-center text-xs transition-colors duration-200"
          style={{
            color: location.pathname === "/rent" ? "#34D399" : "#6B7280"
          }}
        >
          <Key className="w-6 h-6 mb-1" />
          Louer
        </Link>
        <Link
          to="/sell"
          className="flex flex-col items-center justify-center text-xs transition-colors duration-200"
          style={{
            color: location.pathname === "/sell" ? "#34D399" : "#6B7280"
          }}
        >
          <PlusCircle className="w-6 h-6 mb-1" />
          Vendre
        </Link>
        <Link
          to="/favorites"
          className="flex flex-col items-center justify-center text-xs transition-colors duration-200"
          style={{
            color: location.pathname === "/favorites" ? "#34D399" : "#6B7280"
          }}
        >
          <Heart className="w-6 h-6 mb-1" />
          Favoris
        </Link>
        <Link
          to="/profile"
          className="flex flex-col items-center justify-center text-xs transition-colors duration-200"
          style={{
            color: location.pathname === "/profile" ? "#34D399" : "#6B7280"
          }}
        >
          <UserRound className="w-6 h-6 mb-1" />
          Profil
        </Link>
      </div>
    </nav>
  );
}
