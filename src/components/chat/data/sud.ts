
import { City } from "../types/locationTypes";

export const SUD_CITIES: City[] = [
  {
    name: "Ebolowa",
    region: "Sud",
    neighborhoods: [
      { name: "Centre administratif", isPopular: true, description: "Zone des administrations." },
      { name: "Nko'ovos", isPopular: false, description: "Quartier résidentiel." },
      { name: "Mvog-Betsi", isPopular: false, description: "Zone résidentielle." },
      { name: "Angalé", isPopular: false, description: "Quartier périphérique." }
    ],
    priceRange: "25 000 - 100 000 FCFA/m²",
    description: "Capitale régionale du Sud, connue pour ses plantations de cacao et son agriculture.",
    keyFeatures: ["Plantations de cacao", "Agriculture", "Administration régionale"]
  },
  {
    name: "Kribi",
    region: "Sud",
    neighborhoods: [
      { name: "Centre-ville", isPopular: true, description: "Zone touristique et commerciale." },
      { name: "Afan-Mabé", isPopular: true, description: "Quartier résidentiel prisé." },
      { name: "Dombé", isPopular: false, description: "Zone en expansion." },
      { name: "Mboa-Manga", isPopular: false, description: "Quartier proche des plages." },
      { name: "Talla", isPopular: false, description: "Zone périphérique." },
      { name: "Mpangou", isPopular: false, description: "Quartier en développement." }
    ],
    priceRange: "50 000 - 200 000 FCFA/m²",
    description: "Station balnéaire avec des plages de sable fin, port en eau profonde, destination touristique populaire.",
    keyFeatures: ["Plages de sable fin", "Port en eau profonde", "Tourisme", "Chutes de la Lobé"]
  }
];
