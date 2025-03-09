
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Recherche lancée avec le terme:", searchQuery);
      // Rediriger vers la page d'achat avec le terme de recherche
      navigate(`/buy?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <Input
        type="text"
        placeholder="Rechercher un bien..."
        className="w-full pl-12 py-6 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button 
        type="submit"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-1.5 transition-colors"
        aria-label="Rechercher"
      >
        <Search className="w-5 h-5" />
      </button>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70">
        <Search className="w-5 h-5" />
      </div>
    </form>
  );
}
