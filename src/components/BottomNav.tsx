import { Home, Search, PlusCircle, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function BottomNav() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
      <div className="flex justify-around items-center">
        <Link to="/" className={`flex flex-col items-center p-2 ${isActive("/") ? "text-cmr-green" : "text-gray-600"}`}>
          <Home size={24} />
          <span className="text-xs mt-1">Accueil</span>
        </Link>
        <Link to="/search" className={`flex flex-col items-center p-2 ${isActive("/search") ? "text-cmr-green" : "text-gray-600"}`}>
          <Search size={24} />
          <span className="text-xs mt-1">Rechercher</span>
        </Link>
        <Link to="/post" className={`flex flex-col items-center p-2 ${isActive("/post") ? "text-cmr-green" : "text-gray-600"}`}>
          <PlusCircle size={24} />
          <span className="text-xs mt-1">Publier</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center p-2 ${isActive("/profile") ? "text-cmr-green" : "text-gray-600"}`}>
          <User size={24} />
          <span className="text-xs mt-1">Profil</span>
        </Link>
      </div>
    </nav>
  );
}