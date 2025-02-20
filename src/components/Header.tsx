
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Building,
  Key,
  Plus,
  Home,
  User,
  Settings,
  LogOut,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
}

export function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Déconnexion réussie!",
        description: "Vous avez été déconnecté avec succès.",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Erreur lors de la déconnexion",
        description: "Une erreur s'est produite lors de la déconnexion.",
        variant: "destructive",
      });
    }
  };

  const navigationItems = [
    {
      title: "Acheter",
      href: "/buy",
      icon: Building,
    },
    {
      title: "Louer",
      href: "/rent",
      icon: Key,
    },
    {
      title: "Vendre",
      href: "/sell",
      icon: Plus,
    },
    {
      title: "Messages",
      href: "/messages",
      icon: MessageSquare,
    },
  ];

  return (
    <header className="bg-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/9bc95231-71ad-4886-9f52-e0ba2d37f3c6.png" 
            alt="Mboater Logo" 
            className="h-12 w-12"
          />
          <span className="text-2xl font-bold text-cmr-green">Mboater</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="text-gray-700 hover:text-cmr-green transition-colors duration-200 flex items-center space-x-2"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          ))}
          {user ? (
            <div className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.user_metadata?.avatar_url || ""} />
                <AvatarFallback>{user?.user_metadata?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Déconnexion
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-cmr-green transition-colors duration-200">
                Se connecter
              </Link>
              <Link to="/register" className="bg-cmr-green text-white py-2 px-4 rounded-md hover:bg-cmr-green/90 transition-colors duration-200">
                S'inscrire
              </Link>
            </>
          )}
        </nav>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Home className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-64">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Explorez les différentes sections de notre plateforme.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="text-gray-700 hover:text-cmr-green transition-colors duration-200 flex items-center space-x-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-cmr-green transition-colors duration-200 flex items-center space-x-2 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>Profil</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="text-gray-700 hover:text-cmr-green transition-colors duration-200 flex items-center space-x-2 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="w-5 h-5" />
                    <span>Paramètres</span>
                  </Link>
                  <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-cmr-green transition-colors duration-200 flex items-center space-x-2 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Se connecter</span>
                  </Link>
                  <Link
                    to="/register"
                    className="bg-cmr-green text-white py-2 px-4 rounded-md hover:bg-cmr-green/90 transition-colors duration-200 block text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    S'inscrire
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
