import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => navigate("/buy")}
            className="h-24 bg-cmr-green hover:bg-cmr-green/90"
          >
            Acheter
          </Button>
          <Button
            onClick={() => navigate("/rent")}
            className="h-24 bg-cmr-green hover:bg-cmr-green/90"
          >
            Louer
          </Button>
          <Button
            onClick={() => navigate("/sell")}
            className="h-24 col-span-2 bg-cmr-green hover:bg-cmr-green/90"
          >
            Vendre
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};