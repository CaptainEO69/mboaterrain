
import { City } from "../types/locationTypes";

export const NORDOUEST_CITIES: City[] = [
  {
    name: "Bamenda",
    region: "Nord-Ouest",
    neighborhoods: [
      { name: "Commercial Avenue", isPopular: true, description: "Artère commerciale principale." },
      { name: "Up Station", isPopular: true, description: "Zone administrative et résidentielle haut de gamme." },
      { name: "Nkwen", isPopular: true, description: "Quartier résidentiel en expansion." },
      { name: "Down Town", isPopular: false, description: "Centre-ville animé." },
      { name: "Old Town", isPopular: false, description: "Quartier historique." },
      { name: "Bambili", isPopular: false, description: "Zone universitaire." },
      { name: "Mankon", isPopular: false, description: "Quartier traditionnel important." },
      { name: "Ntarikon", isPopular: false, description: "Quartier résidentiel." }
    ],
    priceRange: "30 000 - 150 000 FCFA/m²",
    description: "Capitale régionale du Nord-Ouest, centre économique et culturel des Grassfields anglophones, avec une forte identité culturelle.",
    keyFeatures: ["Centre commercial", "Architecture coloniale", "Traditions culturelles", "Universités"]
  }
];
