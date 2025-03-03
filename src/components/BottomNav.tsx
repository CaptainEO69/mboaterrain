import { HomeIcon, SearchIcon, HeartIcon, UserIcon, MessageSquareIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavButtonProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

function NavButton({ to, icon, label, isActive }: NavButtonProps) {
  return (
    <Link to={to} className="flex flex-col items-center justify-center py-2">
      {icon}
      <span className={`text-xs ${isActive ? 'text-cmr-green' : 'text-gray-500'}`}>{label}</span>
    </Link>
  );
}

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-xl mx-auto px-4">
        <div className="flex justify-between">
          <NavButton 
            to="/"
            icon={<HomeIcon size={20} />} 
            label="Accueil"
            isActive={pathname === '/'} 
          />
          <NavButton 
            to="/buy"
            icon={<SearchIcon size={20} />} 
            label="Acheter"
            isActive={pathname === '/buy'} 
          />
          <NavButton 
            to="/favorites"
            icon={<HeartIcon size={20} />} 
            label="Favoris"
            isActive={pathname === '/favorites'} 
          />
          <NavButton 
            to="/contact"
            icon={<MessageSquareIcon size={20} />} 
            label="Contact"
            isActive={pathname === '/contact'} 
          />
          <NavButton 
            to="/profile"
            icon={<UserIcon size={20} />} 
            label="Compte"
            isActive={pathname === '/profile'} 
          />
        </div>
      </div>
    </div>
  );
}
