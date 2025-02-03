import { Search } from "lucide-react";
import { Input } from "./ui/input";

export function SearchBar() {
  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Rechercher un bien..."
        className="w-full pl-12 py-6 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
      />
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
    </div>
  );
}