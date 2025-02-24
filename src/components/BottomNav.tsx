
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Search, Heart, PlusCircle, UserRound, Key } from "lucide-react";

export function BottomNav() {
  const location = useLocation();
  console.log("Current pathname:", location.pathname);
  console.log("Is root path?", location.pathname === "/");

  const isActive = (path: string) => {
    const currentPath = location.pathname;
    console.log(`Checking path: ${path} against current: ${currentPath}`);
    
    // Cas spécial pour la page d'accueil avec plus de logs
    if (path === "/") {
      const isRoot = currentPath === "/";
      console.log("Is homepage and matches?", isRoot);
      return isRoot;
    }
    
    // Pour toutes les autres routes
    const matches = currentPath === path;
    console.log(`Path ${path} matches current? ${matches}`);
    return matches;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="grid grid-cols-6 h-16">
        <Link
          to="/"
          className={cn(
            "flex flex-col items-center justify-center text-xs transition-colors duration-200",
            isActive("/") ? "text-cmr-green" : "text-gray-500"
          )}
        >
          <Home className="w-6 h-6 mb-1" />
          Accueil
        </Link>
        <Link
          to="/buy"
          className={cn(
            "flex flex-col items-center justify-center text-xs transition-colors duration-200",
            isActive("/buy") ? "text-cmr-green" : "text-gray-500"
          )}
        >
          <Search className="w-6 h-6 mb-1" />
          Acheter
        </Link>
        <Link
          to="/rent"
          className={cn(
            "flex flex-col items-center justify-center text-xs transition-colors duration-200",
            isActive("/rent") ? "text-cmr-green" : "text-gray-500"
          )}
        >
          <Key className="w-6 h-6 mb-1" />
          Louer
        </Link>
        <Link
          to="/sell"
          className={cn(
            "flex flex-col items-center justify-center text-xs transition-colors duration-200",
            isActive("/sell") ? "text-cmr-green" : "text-gray-500"
          )}
        >
          <PlusCircle className="w-6 h-6 mb-1" />
          Vendre
        </Link>
        <Link
          to="/favorites"
          className={cn(
            "flex flex-col items-center justify-center text-xs transition-colors duration-200",
            isActive("/favorites") ? "text-cmr-green" : "text-gray-500"
          )}
        >
          <Heart className="w-6 h-6 mb-1" />
          Favoris
        </Link>
        <Link
          to="/profile"
          className={cn(
            "flex flex-col items-center justify-center text-xs transition-colors duration-200",
            isActive("/profile") ? "text-cmr-green" : "text-gray-500"
          )}
        >
          <UserRound className="w-6 h-6 mb-1" />
          Profil
        </Link>
      </div>
    </nav>
  );
}
