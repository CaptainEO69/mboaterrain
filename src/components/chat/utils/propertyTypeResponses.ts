
import { City } from "../types/locations";
import { GeneratedResponse } from "../types/conversationContext";

/**
 * Génère une réponse spécifique à un type de bien et une ville
 */
export function generatePropertyTypeResponse(
  propertyType: string,
  cityInfo: City
): GeneratedResponse | null {
  if (propertyType === "terrain") {
    return {
      content: `À ${cityInfo.name}, les terrains les plus intéressants se trouvent ${
        cityInfo.name === "Yaoundé" ? "dans les quartiers d'Odza, Nsimeyong et Mfandena" : 
        cityInfo.name === "Douala" ? "dans les quartiers de Yassa, Logbessou et Bonamoussadi" :
        "généralement en périphérie de la ville, dans les zones en développement"
      }. Les prix varient entre ${
        cityInfo.name === "Yaoundé" ? "15 000 et 35 000 FCFA/m²" : 
        cityInfo.name === "Douala" ? "20 000 et 40 000 FCFA/m²" :
        "10 000 et 25 000 FCFA/m²"
      } selon l'emplacement et la viabilisation.`,
      isPersonalized: false,
      isExpert: true
    };
  } else if (propertyType === "maison") {
    return {
      content: `À ${cityInfo.name}, le marché des maisons et villas est particulièrement dynamique dans ${
        cityInfo.name === "Yaoundé" ? "les quartiers de Bastos, Omnisport et Santa Barbara" : 
        cityInfo.name === "Douala" ? "les quartiers de Bonanjo, Bonapriso et Bonamoussadi" :
        "les quartiers résidentiels calmes et sécurisés"
      }. Les prix pour une maison de qualité varient entre ${
        cityInfo.name === "Yaoundé" ? "50 et 200 millions FCFA" : 
        cityInfo.name === "Douala" ? "70 et 250 millions FCFA" :
        "30 et 150 millions FCFA"
      } selon l'emplacement, la taille et les finitions.`,
      isPersonalized: false,
      isExpert: true
    };
  } else if (propertyType === "appartement") {
    return {
      content: `À ${cityInfo.name}, les appartements les plus recherchés se situent dans ${
        cityInfo.name === "Yaoundé" ? "les quartiers du Centre-ville, Bastos et Nlongkak" : 
        cityInfo.name === "Douala" ? "les quartiers de Bonapriso, Bonanjo et Akwa" :
        "les quartiers centraux et bien desservis"
      }. Pour un appartement de 2-3 chambres, comptez entre ${
        cityInfo.name === "Yaoundé" ? "20 et 60 millions FCFA" : 
        cityInfo.name === "Douala" ? "25 et 80 millions FCFA" :
        "15 et 50 millions FCFA"
      } à l'achat, ou entre ${
        cityInfo.name === "Yaoundé" ? "150 000 et 400 000 FCFA" : 
        cityInfo.name === "Douala" ? "200 000 et 500 000 FCFA" :
        "100 000 et 300 000 FCFA"
      } par mois en location.`,
      isPersonalized: false,
      isExpert: true
    };
  } else if (propertyType === "commercial") {
    return {
      content: `À ${cityInfo.name}, les espaces commerciaux et bureaux les plus prisés se trouvent ${
        cityInfo.name === "Yaoundé" ? "au centre-ville, à Bastos et à Hippodrome" : 
        cityInfo.name === "Douala" ? "à Akwa, Bonanjo et Bali" :
        "généralement dans les zones à fort passage et les centres d'affaires"
      }. Les prix de location varient entre ${
        cityInfo.name === "Yaoundé" ? "10 000 et 25 000 FCFA/m²/mois" : 
        cityInfo.name === "Douala" ? "15 000 et 30 000 FCFA/m²/mois" :
        "7 000 et 20 000 FCFA/m²/mois"
      } selon l'emplacement et la qualité des finitions.`,
      isPersonalized: false,
      isExpert: true
    };
  }
  
  return null;
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
    propertySpecificAdvice = `Pour les terrains spécifiquement, les zones de ${
      cityInfo.name === "Yaoundé" ? "Odza, Nsimeyong et Mfandena" : 
      cityInfo.name === "Douala" ? "Yassa, Logbessou et Bonamoussadi" :
      "la périphérie en développement"
    } offrent le meilleur potentiel d'investissement.`;
  } else if (propertyType === "maison") {
    propertySpecificAdvice = `Pour les maisons familiales, les quartiers de ${
      cityInfo.name === "Yaoundé" ? "Bastos, Omnisport et Santa Barbara" : 
      cityInfo.name === "Douala" ? "Bonanjo, Bonapriso et Bonamoussadi" :
      "zones résidentielles calmes"
    } offrent le meilleur cadre de vie.`;
  } else if (propertyType === "appartement") {
    propertySpecificAdvice = `Pour les appartements, les immeubles dans ${
      cityInfo.name === "Yaoundé" ? "le Centre-ville, Bastos et Nlongkak" : 
      cityInfo.name === "Douala" ? "Bonapriso, Bonanjo et Akwa" :
      "le centre-ville"
    } sont les plus valorisés.`;
  } else if (propertyType === "commercial") {
    propertySpecificAdvice = `Pour les espaces commerciaux, les zones à fort passage comme ${
      cityInfo.name === "Yaoundé" ? "le centre-ville, Mvog-Mbi et Mokolo" : 
      cityInfo.name === "Douala" ? "Akwa, Mboppi et Ndokoti" :
      "les marchés et axes commerciaux"
    } sont à privilégier.`;
  }
    
  return {
    content: `Les meilleurs emplacements à ${cityInfo.name} sont ${bestAreas}. Ces quartiers offrent un excellent compromis entre accessibilité, sécurité et qualité de vie. ${propertySpecificAdvice}`,
    isPersonalized: false,
    isExpert: true
  };
}
