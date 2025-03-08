
import { City } from "../types/locationTypes";

export const ADAMAOUA_CITIES: City[] = [
  {
    name: "Ngaoundéré",
    region: "Adamaoua",
    neighborhoods: [
      { name: "Baladji", isPopular: true, description: "Quartier central animé." },
      { name: "Dang", isPopular: true, description: "Zone universitaire." },
      { name: "Bamyanga", isPopular: false, description: "Quartier résidentiel." },
      { name: "Mbideng", isPopular: false, description: "Zone périphérique." },
      { name: "Béka Matari", isPopular: false, description: "Quartier en développement." },
      { name: "Madagascar", isPopular: false, description: "Quartier populaire." }
    ],
    priceRange: "20 000 - 90 000 FCFA/m²",
    description: "Capitale régionale de l'Adamaoua, située sur un plateau d'altitude, connue pour son climat tempéré et son élevage.",
    keyFeatures: ["Élevage", "Plateau d'altitude", "Université", "Terminus ferroviaire"]
  }
];
