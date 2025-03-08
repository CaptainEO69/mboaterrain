
import { City } from "../types/locationTypes";

export const OUEST_CITIES: City[] = [
  {
    name: "Bafoussam",
    region: "Ouest",
    neighborhoods: [
      { name: "Centre commercial", isPopular: true, description: "Cœur économique de la ville." },
      { name: "Kamkop", isPopular: true, description: "Quartier résidentiel moderne." },
      { name: "Tamdja", isPopular: true, description: "Zone résidentielle en développement." },
      { name: "Banengo", isPopular: false, description: "Quartier mixte commercial et résidentiel." },
      { name: "Djeleng", isPopular: false, description: "Quartier populaire animé." },
      { name: "Tougang", isPopular: false, description: "Zone résidentielle." },
      { name: "Famla", isPopular: false, description: "Quartier résidentiel calme." },
      { name: "Tyo-ville", isPopular: false, description: "Ancienne zone coloniale." }
    ],
    priceRange: "50 000 - 200 000 FCFA/m²",
    description: "Capitale régionale de l'Ouest, c'est un important centre commercial et agricole des Grassfields, connue pour son dynamisme économique.",
    keyFeatures: ["Marché central", "Carrefour des Grassfields", "Agriculture prospère", "Climat agréable"]
  },
  {
    name: "Dschang",
    region: "Ouest",
    neighborhoods: [
      { name: "Centre-ville", isPopular: true, description: "Zone administrative et commerciale." },
      { name: "Campus", isPopular: true, description: "Quartier universitaire dynamique." },
      { name: "Mingmeto", isPopular: false, description: "Zone résidentielle." },
      { name: "Paid Ground", isPopular: false, description: "Quartier résidentiel." },
      { name: "Tsinkop", isPopular: false, description: "Zone en développement." },
      { name: "Foto", isPopular: false, description: "Quartier résidentiel calme." },
      { name: "Vallée", isPopular: false, description: "Zone à proximité de la vallée." }
    ],
    priceRange: "30 000 - 150 000 FCFA/m²",
    description: "Ville universitaire au climat frais située dans les montagnes, réputée pour son université, son lac et son jardin botanique.",
    keyFeatures: ["Université de Dschang", "Climat frais de montagne", "Jardin botanique", "Lac municipal"]
  }
];
