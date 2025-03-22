
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Bienvenue sur MboaTer</h1>
      <div className="flex flex-col items-center gap-4">
        <Button asChild>
          <Link to="/properties">Découvrir les propriétés</Link>
        </Button>
      </div>
    </div>
  );
}
