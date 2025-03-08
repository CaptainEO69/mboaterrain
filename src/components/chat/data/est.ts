
import { City } from "../types/locationTypes";

export const EST_CITIES: City[] = [
  {
    name: "Bertoua",
    region: "Est",
    neighborhoods: [
      { name: "Centre administratif", isPopular: true, description: "Zone des administrations." },
      { name: "Nkolbikon", isPopular: false, description: "Quartier résidentiel." },
      { name: "Madagascar", isPopular: false, description: "Quartier populaire." },
      { name: "Mokolo", isPopular: false, description: "Zone commerciale." },
      { name: "Haoussa", isPopular: false, description: "Quartier commerçant." }
    ],
    priceRange: "25 000 - 90 000 FCFA/m²",
    description: "Capitale régionale de l'Est, point de départ vers les parcs nationaux et les zones forestières.",
    keyFeatures: ["Administration régionale", "Forêts", "Exploitation minière", "Agriculture"]
  }
];
