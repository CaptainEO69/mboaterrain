
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { HomeIcon, ShoppingBagIcon, KeyIcon, UserIcon, HeartIcon, MessageSquareIcon, Mail, PencilIcon } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/useMobile";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

function NavItem({ to, icon, label, active }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center justify-center gap-1 rounded-lg p-2",
          isActive ? "text-cmr-green" : "text-gray-600 hover:bg-gray-100"
        )
      }
    >
      {icon}
      <span className="text-xs">{label}</span>
    </NavLink>
  );
}

export function BottomNav() {
  const location = useLocation();
  const { user } = useAuth();
  const isMobile = useMobile();

  if (!isMobile) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 z-10 md:hidden">
      <div className="grid grid-cols-5 gap-1">
        <NavItem 
          to="/" 
          icon={<HomeIcon className={cn("h-5 w-5", isActive("/") ? "text-cmr-green" : "text-gray-600")} />} 
          label="Accueil" 
          active={isActive("/")} 
        />
        <NavItem 
          to="/buy" 
          icon={<ShoppingBagIcon className={cn("h-5 w-5", isActive("/buy") ? "text-cmr-green" : "text-gray-600")} />} 
          label="Acheter" 
          active={isActive("/buy")} 
        />
        <NavItem 
          to="/sell" 
          icon={<PencilIcon className={cn("h-5 w-5", isActive("/sell") ? "text-cmr-green" : "text-gray-600")} />} 
          label="Vendre" 
          active={isActive("/sell")} 
        />
        <NavItem 
          to="/rent" 
          icon={<KeyIcon className={cn("h-5 w-5", isActive("/rent") ? "text-cmr-green" : "text-gray-600")} />} 
          label="Louer" 
          active={isActive("/rent")} 
        />
        <NavItem 
          to="/contact" 
          icon={<Mail className={cn("h-5 w-5", isActive("/contact") ? "text-cmr-green" : "text-gray-600")} />} 
          label="Contact" 
          active={isActive("/contact")} 
        />
      </div>
    </div>
  );
}
