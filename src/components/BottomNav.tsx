import { Home, Search, PlusCircle, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => navigate("/")}
          className={`flex flex-col items-center space-y-1 ${
            isActive("/") ? "text-cmr-green" : "text-gray-600"
          }`}
        >
          <Home size={24} />
          <span className="text-xs">Accueil</span>
        </button>
        <button
          onClick={() => navigate("/buy")}
          className={`flex flex-col items-center space-y-1 ${
            isActive("/buy") ? "text-cmr-green" : "text-gray-600"
          }`}
        >
          <Search size={24} />
          <span className="text-xs">Acheter</span>
        </button>
        <button
          onClick={() => navigate("/sell")}
          className={`flex flex-col items-center space-y-1 ${
            isActive("/sell") ? "text-cmr-green" : "text-gray-600"
          }`}
        >
          <PlusCircle size={24} />
          <span className="text-xs">Publier</span>
        </button>
        <button
          onClick={() => navigate("/profile")}
          className={`flex flex-col items-center space-y-1 ${
            isActive("/profile") ? "text-cmr-green" : "text-gray-600"
          }`}
        >
          <User size={24} />
          <span className="text-xs">Profil</span>
        </button>
      </div>
    </div>
  );
};