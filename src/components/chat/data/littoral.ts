
import { City } from "../types/locationTypes";

export const LITTORAL_CITIES: City[] = [
  {
    name: "Douala",
    region: "Littoral",
    neighborhoods: [
      { name: "Akwa", isPopular: true, description: "Centre commercial et des affaires de Douala." },
      { name: "Bonanjo", isPopular: true, description: "Quartier administratif et diplomatique." },
      { name: "Bonapriso", isPopular: true, description: "Quartier résidentiel haut de gamme." },
      { name: "Bonamoussadi", isPopular: true, description: "Zone résidentielle moderne et dynamique." },
      { name: "Makepe", isPopular: true, description: "Quartier en plein développement avec de nombreuses résidences." },
      { name: "Deido", isPopular: true, description: "Quartier traditionnel avec une forte identité culturelle." },
      { name: "Bepanda", isPopular: false, description: "Quartier populaire et animé." },
      { name: "New Bell", isPopular: false, description: "Quartier historique et populaire." },
      { name: "Ndokotti", isPopular: false, description: "Carrefour commercial important." },
      { name: "Bonaberi", isPopular: false, description: "Zone industrielle et résidentielle." },
      { name: "Logpom", isPopular: false, description: "Nouveau quartier résidentiel en développement." },
      { name: "Kotto", isPopular: false, description: "Zone résidentielle calme." },
      { name: "Nyalla", isPopular: false, description: "Quartier périphérique en expansion." },
      { name: "Logbessou", isPopular: false, description: "Zone en développement avec de nouveaux lotissements." },
      { name: "Yassa", isPopular: false, description: "Zone universitaire et des grands équipements." },
      { name: "Cité des Palmiers", isPopular: false, description: "Quartier résidentiel bien aménagé." },
      { name: "Village", isPopular: false, description: "Zone résidentielle côtière." },
      { name: "Bali", isPopular: false, description: "Ancien quartier avec une forte identité culturelle." }
    ],
    priceRange: "150 000 - 500 000 FCFA/m²",
    description: "Capitale économique du Cameroun et plus grande ville du pays, Douala est un centre commercial et industriel majeur, abritant le plus grand port d'Afrique centrale.",
    keyFeatures: ["Port international", "Zone industrielle", "Aéroport international", "Université"]
  },
  {
    name: "Edéa",
    region: "Littoral",
    neighborhoods: [
      { name: "Centre-ville", isPopular: true, description: "Centre administratif et commercial." },
      { name: "Ekité", isPopular: true, description: "Quartier résidentiel bien aménagé." },
      { name: "Mbanda", isPopular: false, description: "Zone périphérique en développement." },
      { name: "Bilalang", isPopular: false, description: "Quartier populaire et animé." },
      { name: "Pongo", isPopular: false, description: "Zone à proximité de la Sanaga." }
    ],
    priceRange: "40 000 - 120 000 FCFA/m²",
    description: "Ville industrielle stratégique abritant une importante centrale hydroélectrique sur la Sanaga et des usines d'ALUCAM.",
    keyFeatures: ["Centrale hydroélectrique", "Industrie d'aluminium", "Pont sur la Sanaga"]
  },
  {
    name: "Nkongsamba",
    region: "Littoral",
    neighborhoods: [
      { name: "Centre-ville", isPopular: true, description: "Zone administrative et commerciale." },
      { name: "Quartier Haoussa", isPopular: false, description: "Quartier commercial animé." },
      { name: "Quartier administratif", isPopular: true, description: "Zone des administrations." },
      { name: "Bonaberi", isPopular: false, description: "Quartier résidentiel." },
      { name: "Bakoko", isPopular: false, description: "Zone périphérique." }
    ],
    priceRange: "30 000 - 100 000 FCFA/m²",
    description: "Troisième ville du Littoral, située au pied du Mont Manengouba, elle était autrefois un important centre commercial et terminus ferroviaire.",
    keyFeatures: ["Proximité du Mont Manengouba", "Climat agréable", "Agriculture"]
  }
];
