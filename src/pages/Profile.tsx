import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <div className="p-4 space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">Mon Profil</h2>
          <Button
            onClick={() => navigate("/login")}
            className="w-full bg-cmr-green hover:bg-cmr-green/90"
          >
            Se connecter
          </Button>
          <Button
            onClick={() => navigate("/register")}
            variant="outline"
            className="w-full border-cmr-green text-cmr-green hover:bg-cmr-green/10"
          >
            S'inscrire
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};