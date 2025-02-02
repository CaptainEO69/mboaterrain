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
        <Link to="/buy" className={`flex flex-col items-center p-2 ${isActive("/buy") ? "text-cmr-green" : "text-gray-600"}`}>
          <Search size={24} />
          <span className="text-xs mt-1">Acheter</span>
        </Link>
        <Link to="/sell" className={`flex flex-col items-center p-2 ${isActive("/sell") ? "text-cmr-green" : "text-gray-600"}`}>
          <PlusCircle size={24} />
          <span className="text-xs mt-1">Vendre</span>
        </Link>
        <Link to="/login" className={`flex flex-col items-center p-2 ${isActive("/login") ? "text-cmr-green" : "text-gray-600"}`}>
          <User size={24} />
          <span className="text-xs mt-1">Compte</span>
        </Link>
      </div>
    </nav>
  );
}