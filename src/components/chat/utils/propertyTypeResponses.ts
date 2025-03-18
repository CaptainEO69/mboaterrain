
import { City } from "../types/locationTypes";
import { GeneratedResponse } from "../types/conversationContext";
import { getPriceDetailsByCity } from "./locationUtils";

/**
 * Génère une réponse spécifique à un type de bien et une ville
 */
export function generatePropertyTypeResponse(
  propertyType: string,
  cityInfo: City
): GeneratedResponse | null {
  // Obtenir des informations de prix plus précises
  const priceDetails = getPriceDetailsByCity(cityInfo);
  
  if (propertyType === "terrain") {
    // Déterminer les meilleurs quartiers pour les terrains selon la ville
    const bestNeighborhoods = getBestNeighborhoodsForProperty(cityInfo, "terrain", 3);
    
    return {
      content: `À ${cityInfo.name}, les terrains les plus intéressants se trouvent ${
        bestNeighborhoods.length > 0 ? `dans les quartiers de ${bestNeighborhoods.join(", ")}` : 
        "généralement en périphérie de la ville, dans les zones en développement"
      }. Les prix varient entre ${priceDetails.land.min} et ${priceDetails.land.max} FCFA/m² selon l'emplacement et la viabilisation. ${
        getTerrainSpecificAdvice(cityInfo.name)
      }`,
      isPersonalized: false,
      isExpert: true
    };
  } else if (propertyType === "maison") {
    // Déterminer les meilleurs quartiers pour les maisons selon la ville
    const bestNeighborhoods = getBestNeighborhoodsForProperty(cityInfo, "maison", 3);
    
    return {
      content: `À ${cityInfo.name}, le marché des maisons et villas est particulièrement dynamique dans ${
        bestNeighborhoods.length > 0 ? `les quartiers de ${bestNeighborhoods.join(", ")}` : 
        "les quartiers résidentiels calmes et sécurisés"
      }. Les prix pour une maison de qualité varient entre ${
        getMaisonPriceRange(cityInfo.name)
      } selon l'emplacement, la taille et les finitions. ${
        getMaisonSpecificAdvice(cityInfo.name)
      }`,
      isPersonalized: false,
      isExpert: true
    };
  } else if (propertyType === "appartement") {
    // Déterminer les meilleurs quartiers pour les appartements selon la ville
    const bestNeighborhoods = getBestNeighborhoodsForProperty(cityInfo, "appartement", 3);
    
    const { rentPriceMin, rentPriceMax } = getAppartementRentPrices(cityInfo.name);
    
    return {
      content: `À ${cityInfo.name}, les appartements les plus recherchés se situent dans ${
        bestNeighborhoods.length > 0 ? `les quartiers de ${bestNeighborhoods.join(", ")}` : 
        "les quartiers centraux et bien desservis"
      }. Pour un appartement de 2-3 chambres, comptez entre ${
        getAppartementPriceRange(cityInfo.name)
      } à l'achat, ou entre ${rentPriceMin} et ${rentPriceMax} FCFA par mois en location. ${
        getAppartementSpecificAdvice(cityInfo.name)
      }`,
      isPersonalized: false,
      isExpert: true
    };
  } else if (propertyType === "commercial") {
    // Déterminer les meilleurs quartiers pour les espaces commerciaux selon la ville
    const bestNeighborhoods = getBestNeighborhoodsForProperty(cityInfo, "commercial", 3);
    
    return {
      content: `À ${cityInfo.name}, les espaces commerciaux et bureaux les plus prisés se trouvent ${
        bestNeighborhoods.length > 0 ? `dans les quartiers de ${bestNeighborhoods.join(", ")}` : 
        "généralement dans les zones à fort passage et les centres d'affaires"
      }. Les prix de location varient entre ${
        getCommercialRentPrices(cityInfo.name)
      } selon l'emplacement et la qualité des finitions. ${
        getCommercialSpecificAdvice(cityInfo.name)
      }`,
      isPersonalized: false,
      isExpert: true
    };
  }
  
  return null;
}

/**
 * Trouvre les meilleurs quartiers pour un type de propriété
 */
function getBestNeighborhoodsForProperty(city: City, propertyType: string, limit: number): string[] {
  const popularNeighborhoods = city.neighborhoods.filter(n => n.isPopular);
  
  // Si nous n'avons pas d'information spécifique, retourner simplement les quartiers populaires
  if (popularNeighborhoods.length === 0) {
    return [];
  }
  
  // Pour l'instant, retourner simplement les quartiers populaires limités
  // À l'avenir, cette fonction pourrait être améliorée avec des données plus spécifiques
  return popularNeighborhoods.slice(0, limit).map(n => n.name);
}

/**
 * Conseils spécifiques pour les terrains par ville
 */
function getTerrainSpecificAdvice(cityName: string): string {
  const normalizedCity = cityName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  if (normalizedCity.includes("yaounde")) {
    return "Attention aux zones non constructibles et assurez-vous de la présence d'un titre foncier validé par le ministère des Domaines.";
  } else if (normalizedCity.includes("douala")) {
    return "Vérifiez bien l'absence de zones inondables, particulièrement dans les quartiers comme Bonabéri et Bonamoussadi en saison des pluies.";
  } else if (normalizedCity.includes("kribi")) {
    return "Les terrains proche du port en eau profonde connaissent une forte valorisation, c'est le moment d'investir dans cette zone.";
  } else if (normalizedCity.includes("bafoussam")) {
    return "Les terrains sur les hauteurs offrent une vue exceptionnelle et sont particulièrement prisés pour les résidences secondaires.";
  }
  
  return "Assurez-vous toujours de la validité des documents fonciers avant tout achat.";
}

/**
 * Obtient la fourchette de prix pour les maisons par ville
 */
function getMaisonPriceRange(cityName: string): string {
  const normalizedCity = cityName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  if (normalizedCity.includes("yaounde")) {
    return "50 et 200 millions FCFA";
  } else if (normalizedCity.includes("douala")) {
    return "70 et 250 millions FCFA";
  } else if (normalizedCity.includes("kribi") || normalizedCity.includes("limbe")) {
    return "40 et 180 millions FCFA";
  } else if (normalizedCity.includes("bafoussam") || normalizedCity.includes("bamenda")) {
    return "35 et 150 millions FCFA";
  } else if (normalizedCity.includes("garoua") || normalizedCity.includes("maroua")) {
    return "30 et 120 millions FCFA";
  }
  
  return "30 et 150 millions FCFA";
}

/**
 * Conseils spécifiques pour les maisons par ville
 */
function getMaisonSpecificAdvice(cityName: string): string {
  const normalizedCity = cityName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  if (normalizedCity.includes("yaounde")) {
    return "Les maisons avec vue sur les collines de la ville sont particulièrement valorisées.";
  } else if (normalizedCity.includes("douala")) {
    return "Privilégiez les maisons sur pilotis ou avec bonne évacuation d'eau dans certains quartiers pour éviter les problèmes d'inondation.";
  } else if (normalizedCity.includes("kribi")) {
    return "Les villas avec accès à la plage sont rares et constituent d'excellents investissements locatifs touristiques.";
  } else if (normalizedCity.includes("limbe") || normalizedCity.includes("buea")) {
    return "Les maisons avec vue sur le mont Cameroun ou l'océan se vendent à prix premium.";
  }
  
  return "Recherchez des propriétés avec titre foncier et raccordement aux réseaux d'eau et d'électricité.";
}

/**
 * Obtient la fourchette de prix pour les appartements par ville
 */
function getAppartementPriceRange(cityName: string): string {
  const normalizedCity = cityName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  if (normalizedCity.includes("yaounde")) {
    return "20 et 60 millions FCFA";
  } else if (normalizedCity.includes("douala")) {
    return "25 et 80 millions FCFA";
  } else if (normalizedCity.includes("kribi") || normalizedCity.includes("limbe")) {
    return "18 et 55 millions FCFA";
  } else if (normalizedCity.includes("bafoussam") || normalizedCity.includes("bamenda")) {
    return "15 et 45 millions FCFA";
  }
  
  return "15 et 50 millions FCFA";
}

/**
 * Obtient les prix de location pour appartements par ville
 */
function getAppartementRentPrices(cityName: string): { rentPriceMin: string, rentPriceMax: string } {
  const normalizedCity = cityName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  if (normalizedCity.includes("yaounde")) {
    return { rentPriceMin: "150 000", rentPriceMax: "400 000" };
  } else if (normalizedCity.includes("douala")) {
    return { rentPriceMin: "200 000", rentPriceMax: "500 000" };
  } else if (normalizedCity.includes("kribi") || normalizedCity.includes("limbe")) {
    return { rentPriceMin: "120 000", rentPriceMax: "350 000" };
  } else if (normalizedCity.includes("bafoussam") || normalizedCity.includes("bamenda")) {
    return { rentPriceMin: "80 000", rentPriceMax: "250 000" };
  }
  
  return { rentPriceMin: "100 000", rentPriceMax: "300 000" };
}

/**
 * Conseils spécifiques pour les appartements par ville
 */
function getAppartementSpecificAdvice(cityName: string): string {
  const normalizedCity = cityName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  if (normalizedCity.includes("yaounde")) {
    return "Les appartements dans les nouvelles résidences à Omnisport et Bastos offrent le meilleur rendement locatif.";
  } else if (normalizedCity.includes("douala")) {
    return "Les appartements avec générateur et citerne d'eau dans les quartiers de Bonapriso et Bonanjo se louent très rapidement.";
  } else if (normalizedCity.includes("kribi")) {
    return "Préférez les résidences avec vue sur la mer pour maximiser le potentiel locatif touristique.";
  } else if (normalizedCity.includes("bafoussam")) {
    return "Les immeubles récents près du marché central attirent une clientèle commerciale stable.";
  }
  
  return "Les appartements avec parkings sécurisés et gardiennage sont les plus demandés.";
}

/**
 * Obtient les prix de location pour espaces commerciaux par ville
 */
function getCommercialRentPrices(cityName: string): string {
  const normalizedCity = cityName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  if (normalizedCity.includes("yaounde")) {
    return "10 000 et 25 000 FCFA/m²/mois";
  } else if (normalizedCity.includes("douala")) {
    return "15 000 et 30 000 FCFA/m²/mois";
  } else if (normalizedCity.includes("kribi") || normalizedCity.includes("limbe")) {
    return "8 000 et 20 000 FCFA/m²/mois";
  } else if (normalizedCity.includes("bafoussam") || normalizedCity.includes("bamenda")) {
    return "6 000 et 18 000 FCFA/m²/mois";
  }
  
  return "7 000 et 20 000 FCFA/m²/mois";
}

/**
 * Conseils spécifiques pour les espaces commerciaux par ville
 */
function getCommercialSpecificAdvice(cityName: string): string {
  const normalizedCity = cityName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  if (normalizedCity.includes("yaounde")) {
    return "Les espaces commerciaux au centre-ville et au quartier du Marché Central offrent une visibilité maximale.";
  } else if (normalizedCity.includes("douala")) {
    return "Akwa et Bonanjo concentrent l'activité des entreprises internationales et offrent le meilleur potentiel pour les bureaux haut de gamme.";
  } else if (normalizedCity.includes("kribi")) {
    return "Les boutiques sur le front de mer bénéficient du flux touristique toute l'année, idéal pour les commerces de détail.";
  } else if (normalizedCity.includes("bafoussam")) {
    return "Les locaux commerciaux près du carrefour Bafoussam sont particulièrement bien situés pour les enseignes nationales.";
  }
  
  return "Les espaces avec bonne accessibilité et visibilité depuis la route principale sont à privilégier.";
}

/**
 * Génère une réponse sur un type de propriété spécifique (prix, investissement, etc.)
 */
export function generatePropertyCategoryResponse(
  propertyType: string,
  category: string
): GeneratedResponse | null {
  if (category === "prix") {
    const propertyTypeMsg = propertyType === "terrain" ? "terrains" : 
                          propertyType === "maison" ? "maisons" :
                          propertyType === "appartement" ? "appartements" :
                          propertyType === "commercial" ? "espaces commerciaux" : "biens immobiliers";
    
    return {
      content: `Les ${propertyTypeMsg} au Cameroun ont des prix qui varient considérablement selon la ville et le quartier. ${
        propertyType === "terrain" ? "Dans les grandes villes comme Douala et Yaoundé, les terrains coûtent entre 15 000 et 40 000 FCFA/m² dans les zones prisées, tandis que dans les villes secondaires ou en périphérie, on trouve des opportunités entre 5 000 et 15 000 FCFA/m²." :
        propertyType === "maison" ? "Pour une maison de qualité, comptez entre 50 et 250 millions FCFA à Douala et Yaoundé (quartiers résidentiels), et entre 30 et 150 millions FCFA dans les villes secondaires." :
        propertyType === "appartement" ? "Pour un appartement standard de 2-3 chambres, les prix varient entre 20 et 80 millions FCFA à l'achat dans les grandes villes, ou entre 150 000 et 500 000 FCFA par mois en location." :
        propertyType === "commercial" ? "Les espaces commerciaux bien situés se louent entre 10 000 et 30 000 FCFA/m²/mois dans les zones d'affaires de Douala et Yaoundé, avec des prix d'achat pouvant atteindre 1 million FCFA/m² pour les emplacements premium." :
        "Les prix varient selon le type de bien, l'emplacement et la qualité des finitions. N'hésitez pas à me préciser quel type de bien vous intéresse pour des informations plus détaillées."
      }`,
      isPersonalized: false,
      isExpert: true
    };
  } else if (category === "investissement") {
    const propertyTypeMsg = propertyType === "terrain" ? "terrains" : 
                          propertyType === "maison" ? "maisons" :
                          propertyType === "appartement" ? "appartements" :
                          propertyType === "commercial" ? "espaces commerciaux" : "biens immobiliers";
    
    return {
      content: `Pour investir dans les ${propertyTypeMsg} au Cameroun, ${
        propertyType === "terrain" ? "concentrez-vous sur les zones en développement des grandes villes comme Yassa à Douala ou Odza à Yaoundé, ou sur les villes en croissance comme Kribi. Les rendements potentiels sur 5-10 ans peuvent atteindre 100-200% si vous choisissez bien l'emplacement." :
        propertyType === "maison" ? "les propriétés résidentielles dans les quartiers sécurisés comme Bonamoussadi (Douala) ou Bastos (Yaoundé) offrent un rendement locatif de 6-8% et une bonne valorisation. Les maisons divisées en plusieurs appartements peuvent générer jusqu'à 10-12% de rendement." :
        propertyType === "appartement" ? "les petites unités (studios, 2 pièces) près des universités et zones d'affaires offrent les meilleurs rendements locatifs (8-14%). Privilégiez les immeubles récents avec ascenseur et sécurité pour attirer une clientèle d'expatriés et cadres." :
        propertyType === "commercial" ? "les emplacements stratégiques dans les zones commerciales à fort passage comme Akwa (Douala) peuvent générer des rendements de 10-15%. Assurez-vous d'obtenir des baux commerciaux sécurisés pour garantir la stabilité de vos revenus." :
        "choisissez des emplacements stratégiques en fonction du type de bien visé. Les zones en développement offrent le meilleur potentiel de plus-value, tandis que les quartiers établis garantissent des revenus locatifs plus stables."
      }`,
      isPersonalized: false,
      isExpert: true
    };
  }
  
  return null;
}

/**
 * Génère une réponse sur les meilleurs emplacements pour un type de bien
 */
export function generateBestLocationResponse(
  cityInfo: City,
  propertyType: string | null
): GeneratedResponse {
  const bestAreas = cityInfo.neighborhoods
    .filter(n => n.isPopular)
    .map(n => n.name)
    .slice(0, 3)
    .join(", ");
    
  // Adapter la réponse en fonction du type de bien détecté
  let propertySpecificAdvice = "";
  if (propertyType === "terrain") {
    const bestNeighborhoods = getBestNeighborhoodsForProperty(cityInfo, "terrain", 3);
    propertySpecificAdvice = `Pour les terrains spécifiquement, les zones de ${
      bestNeighborhoods.length > 0 ? bestNeighborhoods.join(", ") :
      cityInfo.name === "Yaoundé" ? "Odza, Nsimeyong et Mfandena" : 
      cityInfo.name === "Douala" ? "Yassa, Logbessou et Bonamoussadi" :
      "la périphérie en développement"
    } offrent le meilleur potentiel d'investissement.`;
  } else if (propertyType === "maison") {
    const bestNeighborhoods = getBestNeighborhoodsForProperty(cityInfo, "maison", 3);
    propertySpecificAdvice = `Pour les maisons familiales, les quartiers de ${
      bestNeighborhoods.length > 0 ? bestNeighborhoods.join(", ") :
      cityInfo.name === "Yaoundé" ? "Bastos, Omnisport et Santa Barbara" : 
      cityInfo.name === "Douala" ? "Bonanjo, Bonapriso et Bonamoussadi" :
      "zones résidentielles calmes"
    } offrent le meilleur cadre de vie. ${getMaisonSpecificAdvice(cityInfo.name)}`;
  } else if (propertyType === "appartement") {
    const bestNeighborhoods = getBestNeighborhoodsForProperty(cityInfo, "appartement", 3);
    propertySpecificAdvice = `Pour les appartements, les immeubles dans ${
      bestNeighborhoods.length > 0 ? bestNeighborhoods.join(", ") :
      cityInfo.name === "Yaoundé" ? "le Centre-ville, Bastos et Nlongkak" : 
      cityInfo.name === "Douala" ? "Bonapriso, Bonanjo et Akwa" :
      "le centre-ville"
    } sont les plus valorisés. ${getAppartementSpecificAdvice(cityInfo.name)}`;
  } else if (propertyType === "commercial") {
    const bestNeighborhoods = getBestNeighborhoodsForProperty(cityInfo, "commercial", 3);
    propertySpecificAdvice = `Pour les espaces commerciaux, les zones à fort passage comme ${
      bestNeighborhoods.length > 0 ? bestNeighborhoods.join(", ") :
      cityInfo.name === "Yaoundé" ? "le centre-ville, Mvog-Mbi et Mokolo" : 
      cityInfo.name === "Douala" ? "Akwa, Mboppi et Ndokoti" :
      "les marchés et axes commerciaux"
    } sont à privilégier. ${getCommercialSpecificAdvice(cityInfo.name)}`;
  }
    
  return {
    content: `Les meilleurs emplacements à ${cityInfo.name} sont ${bestAreas}. Ces quartiers offrent un excellent compromis entre accessibilité, sécurité et qualité de vie. ${propertySpecificAdvice}`,
    isPersonalized: false,
    isExpert: true
  };
}
