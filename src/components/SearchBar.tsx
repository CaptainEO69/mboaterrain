import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Rechercher un bien..."
        className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:border-cmr-green"
      />
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
}