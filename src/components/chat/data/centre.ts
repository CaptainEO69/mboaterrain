
import { City } from "../types/locationTypes";

export const CENTRE_CITIES: City[] = [
  {
    name: "Yaoundé",
    region: "Centre",
    neighborhoods: [
      { name: "Bastos", isPopular: true, description: "Quartier diplomatique et résidentiel de luxe." },
      { name: "Omnisport", isPopular: true, description: "Zone moderne avec le stade et infrastructure sportive." },
      { name: "Nlongkak", isPopular: false, description: "Quartier résidentiel proche du centre." },
      { name: "Biyem-Assi", isPopular: true, description: "Grand quartier résidentiel populaire." },
      { name: "Centre administratif", isPopular: true, description: "Cœur administratif de la capitale." },
      { name: "Mvan", isPopular: false, description: "Zone industrielle en développement." },
      { name: "Mendong", isPopular: false, description: "Quartier résidentiel en expansion." }, 
      { name: "Mimboman", isPopular: false, description: "Quartier populaire dynamique." },
      { name: "Mvog-Mbi", isPopular: false, description: "Quartier commercial et résidentiel animé." },
      { name: "Mfandena", isPopular: false, description: "Zone proche du stade omnisport." },
      { name: "Nkol-Eton", isPopular: false, description: "Quartier commercial dynamique." },
      { name: "Ngoa-Ekelle", isPopular: true, description: "Quartier universitaire." },
      { name: "Elig-Essono", isPopular: false, description: "Quartier résidentiel central." },
      { name: "Mokolo", isPopular: false, description: "Zone du grand marché populaire." },
      { name: "Nsimeyong", isPopular: true, description: "Quartier résidentiel en plein essor." },
      { name: "Odza", isPopular: false, description: "Zone de l'aéroport et résidentielle." }
    ],
    priceRange: "150 000 - 450 000 FCFA/m²",
    description: "Capitale politique du Cameroun, Yaoundé est construite sur sept collines. C'est le siège des institutions, ministères et ambassades.",
    keyFeatures: ["Siège du gouvernement", "Université de Yaoundé", "Relief vallonné", "Climat plus frais"]
  },
  {
    name: "Mbalmayo",
    region: "Centre",
    neighborhoods: [
      { name: "Centre-ville", isPopular: true, description: "Zone administrative et commerciale." },
      { name: "Quartier administratif", isPopular: true, description: "Zone des administrations." },
      { name: "Nkolyem", isPopular: false, description: "Quartier résidentiel." },
      { name: "Abang", isPopular: false, description: "Zone périphérique." },
      { name: "Nkolngok", isPopular: false, description: "Quartier en développement." }
    ],
    priceRange: "30 000 - 100 000 FCFA/m²",
    description: "Ville située au sud de Yaoundé, connue pour son école des eaux et forêts et ses activités forestières.",
    keyFeatures: ["École des eaux et forêts", "Proximité du fleuve Nyong", "Exploitation forestière"]
  }
];
