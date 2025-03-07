
// Types pour les messages
export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  isPersonalized?: boolean;
  isExpert?: boolean;
}

// Structure pour les quartiers
export interface Neighborhood {
  name: string;
  description?: string;
  isPopular: boolean;
  priceRange?: string;
}

// Structure pour les villes
export interface City {
  name: string;
  region: string;
  neighborhoods: Neighborhood[];
  priceRange: string;
  description: string;
  keyFeatures?: string[];
}

// Base de données des villes et quartiers du Cameroun par région
export const CAMEROON_CITIES: Record<string, City[]> = {
  "Littoral": [
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
  ],
  "Centre": [
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
  ],
  "Ouest": [
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
  ],
  "Nord-Ouest": [
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
  ],
  "Sud-Ouest": [
    {
      name: "Buéa",
      region: "Sud-Ouest",
      neighborhoods: [
        { name: "Molyko", isPopular: true, description: "Quartier universitaire dynamique." },
        { name: "Great Soppo", isPopular: true, description: "Zone résidentielle principale." },
        { name: "Federal Quarter", isPopular: true, description: "Ancien quartier administratif colonial." },
        { name: "Small Soppo", isPopular: false, description: "Quartier résidentiel." },
        { name: "Bonduma", isPopular: false, description: "Zone résidentielle en développement." },
        { name: "Clerks Quarter", isPopular: false, description: "Ancien quartier colonial." },
        { name: "Mile 16", isPopular: false, description: "Zone périphérique." },
        { name: "Mile 17", isPopular: false, description: "Zone commerciale importante." }
      ],
      priceRange: "40 000 - 180 000 FCFA/m²",
      description: "Ancienne capitale du Cameroun allemand, située au pied du mont Cameroun avec un climat frais et une belle vue.",
      keyFeatures: ["Mont Cameroun", "Université de Buéa", "Climat frais", "Architecture coloniale"]
    },
    {
      name: "Limbé",
      region: "Sud-Ouest",
      neighborhoods: [
        { name: "Down Beach", isPopular: true, description: "Zone balnéaire animée." },
        { name: "GRA", isPopular: true, description: "Zone résidentielle administrative." },
        { name: "Bota", isPopular: true, description: "Quartier résidentiel de qualité." },
        { name: "Mile 4", isPopular: false, description: "Zone résidentielle." },
        { name: "Middle Farms", isPopular: false, description: "Quartier résidentiel en développement." },
        { name: "Unity Quarter", isPopular: false, description: "Zone résidentielle mixte." },
        { name: "New Town", isPopular: false, description: "Quartier plus récent." }
      ],
      priceRange: "35 000 - 150 000 FCFA/m²",
      description: "Ville côtière avec des plages de sable noir, site de la raffinerie nationale et du jardin botanique, très touristique.",
      keyFeatures: ["Plages de sable noir", "Jardin botanique", "Raffinerie", "Tourisme"]
    }
  ],
  "Sud": [
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
  ],
  "Est": [
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
  ],
  "Adamaoua": [
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
  ],
  "Nord": [
    {
      name: "Garoua",
      region: "Nord",
      neighborhoods: [
        { name: "Bibémiré", isPopular: true, description: "Quartier central et administratif." },
        { name: "Marouaré", isPopular: true, description: "Zone résidentielle développée." },
        { name: "Lopéré", isPopular: false, description: "Quartier résidentiel." },
        { name: "Foulbéré", isPopular: false, description: "Zone traditionnelle." },
        { name: "Poumpoumré", isPopular: false, description: "Quartier périphérique." },
        { name: "Djamboutou", isPopular: false, description: "Zone en développement." }
      ],
      priceRange: "20 000 - 85 000 FCFA/m²",
      description: "Capitale régionale du Nord, ville portuaire sur la Bénoué, centre commercial et industriel important.",
      keyFeatures: ["Port fluvial", "Industrie cotonnière", "Aéroport", "Architecture traditionnelle"]
    }
  ],
  "Extrême-Nord": [
    {
      name: "Maroua",
      region: "Extrême-Nord",
      neighborhoods: [
        { name: "Domayo", isPopular: true, description: "Quartier central animé." },
        { name: "Djarengol", isPopular: true, description: "Zone résidentielle moderne." },
        { name: "Kakataré", isPopular: false, description: "Quartier traditionnel." },
        { name: "Dougoï", isPopular: false, description: "Zone résidentielle." },
        { name: "Palar", isPopular: false, description: "Quartier périphérique." },
        { name: "Baouliwol", isPopular: false, description: "Zone en développement." }
      ],
      priceRange: "15 000 - 75 000 FCFA/m²",
      description: "Capitale régionale de l'Extrême-Nord, centre artisanal et touristique, connue pour son artisanat et ses paysages.",
      keyFeatures: ["Artisanat", "Monts Mandara", "Université", "Architecture traditionnelle"]
    },
    {
      name: "Kousseri",
      region: "Extrême-Nord",
      neighborhoods: [
        { name: "Centre-ville", isPopular: true, description: "Zone commerciale centrale." },
        { name: "Lac", isPopular: false, description: "Quartier proche du Logone." },
        { name: "Douanes", isPopular: false, description: "Zone frontalière." }
      ],
      priceRange: "15 000 - 60 000 FCFA/m²",
      description: "Ville frontalière avec le Tchad, située sur le fleuve Logone, importante pour le commerce transfrontalier.",
      keyFeatures: ["Commerce frontalier", "Fleuve Logone", "Proximité avec N'Djamena"]
    }
  ]
};

// Questions et réponses prédéfinies pour le chatbot immobilier
export const PREDEFINED_RESPONSES: Record<string, string[]> = {
  "default": [
    "Comment puis-je vous aider dans votre recherche immobilière au Cameroun aujourd'hui?",
    "Je suis votre assistant immobilier virtuel pour le Cameroun. Que souhaitez-vous savoir sur le marché, les villes ou les démarches?",
    "Bonjour! Je peux vous informer sur l'achat, la vente, la location ou l'investissement immobilier au Cameroun. Quelle est votre question?",
    "Je suis là pour répondre à toutes vos questions sur l'immobilier camerounais. Quel sujet vous intéresse en particulier?"
  ],
  "prix": [
    "Les prix immobiliers au Cameroun varient considérablement selon la ville, le quartier et le type de bien. À Douala et Yaoundé, comptez entre 150 000 et 500 000 FCFA/m² dans les quartiers prisés, alors que dans les villes secondaires comme Bafoussam ou Limbé, les prix oscillent entre 30 000 et 200 000 FCFA/m².",
    "Le marché immobilier camerounais est très segmenté: les biens haut de gamme à Bastos (Yaoundé) ou Bonapriso (Douala) peuvent atteindre 450 000 à 500 000 FCFA/m², tandis que des quartiers en développement offrent des opportunités entre 100 000 et 200 000 FCFA/m².",
    "Pour un investissement locatif, les rendements sont généralement entre 8% et 12% dans les grandes villes, avec des prix d'achat variant de 150 000 à 400 000 FCFA/m² selon l'emplacement et la qualité de la construction."
  ],
  "vente": [
    "Pour vendre efficacement au Cameroun, assurez-vous d'avoir tous vos documents en règle: titre foncier ou contrat de bail, quittances d'impôt foncier, et éventuellement un certificat de non-litige. Une estimation professionnelle vous aidera à fixer un prix compétitif.",
    "La durée moyenne de vente d'un bien immobilier au Cameroun est de 3 à 6 mois. Pour accélérer le processus, privilégiez une bonne présentation (photos de qualité), un prix réaliste, et vérifiez que tous vos documents fonciers sont à jour.",
    "Vendeurs, attention: les transactions immobilières au Cameroun doivent impérativement passer par un notaire pour la sécurité juridique. Prévoyez que les frais de notaire (4-7% du prix) sont généralement à la charge de l'acheteur, mais négociables."
  ],
  "quartier": [
    "Le choix du quartier est crucial au Cameroun. À Douala, Bonanjo et Bonapriso sont prisés pour leur proximité avec les centres d'affaires et leur sécurité, tandis qu'à Yaoundé, Bastos et le Centre administratif restent les plus recherchés pour les expatriés et cadres supérieurs.",
    "Pour les familles, les quartiers comme Bonamoussadi à Douala ou Biyem-Assi à Yaoundé offrent un bon compromis entre qualité de vie, infrastructures scolaires et prix plus abordables que les quartiers centraux.",
    "Les zones en développement comme Yassa à Douala ou Odza à Yaoundé présentent d'excellentes opportunités d'investissement, avec des prix encore raisonnables mais une forte valorisation attendue grâce aux projets d'infrastructures en cours."
  ],
  "document": [
    "Au Cameroun, le titre foncier est le document le plus sécurisé pour garantir la propriété. Vérifiez toujours l'authenticité d'un titre auprès du service des domaines avant toute transaction. En son absence, méfiez-vous, même si d'autres documents comme le certificat de propriété existent.",
    "Pour l'achat sur plan, exigez: le permis de construire, le titre foncier du terrain, l'attestation d'assurance du promoteur, et un contrat de réservation détaillé. Sans ces documents, vous vous exposez à des risques juridiques importants.",
    "Lors d'une transaction, les documents essentiels sont: le titre foncier, le certificat de propriété, l'attestation de non-litige, les quittances d'impôt foncier des 3 dernières années, et éventuellement le permis de construire et les plans pour les constructions récentes."
  ],
  "investissement": [
    "Les meilleures opportunités d'investissement immobilier au Cameroun se trouvent actuellement dans les zones en développement des grandes villes: Yassa et Logbessou à Douala, Odza et Nkolafeme à Yaoundé, ou encore Kribi avec son nouveau port en eau profonde.",
    "Pour un rendement locatif optimal, ciblez les studios et 2-pièces près des universités et centres d'affaires. À Douala (Makepe, Bali) et Yaoundé (Ngoa-Ekelle, Mvan), ces biens offrent des rendements entre 8% et 14%, bien supérieurs aux moyennes européennes.",
    "L'immobilier commercial dans les zones à fort passage comme Akwa à Douala ou le centre-ville de Bafoussam offre d'excellents rendements (10-15%). Privilégiez les emplacements avec baux commerciaux sécurisés pour un investissement stable."
  ],
  "crédit": [
    "Les prêts immobiliers au Cameroun sont proposés par plusieurs banques avec des taux d'intérêt généralement entre 7% et 12% sur des durées de 5 à 15 ans. Un apport personnel d'au moins 20-30% est habituellement exigé.",
    "Pour maximiser vos chances d'obtenir un crédit immobilier favorable, présentez une situation professionnelle stable (CDI de préférence), des revenus réguliers bien documentés, et idéalement déjà un historique bancaire positif avec l'établissement.",
    "Le Crédit Foncier du Cameroun offre des conditions spécifiques pour les primo-accédants et fonctionnaires, avec des taux parfois plus avantageux que les banques commerciales. Renseignez-vous sur leurs programmes spéciaux avant de finaliser votre choix de financement."
  ],
  "construction": [
    "Construire au Cameroun coûte entre 150 000 et 400 000 FCFA/m² selon la qualité des finitions. Avant de démarrer, assurez-vous d'avoir un titre foncier (pas seulement un certificat de vente), un permis de construire, et des plans validés par un architecte agréé.",
    "Pour une construction réussie, privilégiez un contrat détaillé avec l'entrepreneur, prévoyant un échéancier précis des paiements liés à l'avancement réel des travaux. La supervision régulière par un professionnel indépendant est fortement recommandée.",
    "Les terrains à bâtir dans les zones périurbaines de Douala et Yaoundé offrent le meilleur potentiel, avec des prix entre 10 000 et 30 000 FCFA/m². Vérifiez l'accessibilité, la viabilisation (eau, électricité) et surtout la clarté du statut foncier avant tout achat."
  ],
  "notaire": [
    "Au Cameroun, le recours à un notaire est obligatoire pour toute transaction immobilière. Ses honoraires sont réglementés et oscillent entre 4% et 7% du prix de vente, généralement à la charge de l'acheteur mais parfois négociables.",
    "Le notaire joue un rôle crucial: il vérifie l'authenticité des documents, les hypothèques éventuelles, rédige l'acte de vente, et assure l'enregistrement au service des domaines. Ne négligez jamais cette étape qui sécurise juridiquement votre acquisition.",
    "Pour choisir un bon notaire, privilégiez la réputation et l'expérience dans les transactions immobilières. Demandez des recommandations, vérifiez son inscription à la Chambre des Notaires, et n'hésitez pas à comparer plusieurs devis si les frais sont négociables."
  ],
  "regions": [
    "Le Cameroun compte 10 régions aux caractéristiques immobilières très différentes. Le Littoral (Douala) et le Centre (Yaoundé) concentrent les marchés les plus dynamiques et les prix les plus élevés, tandis que l'Ouest (Bafoussam, Dschang) connaît un développement rapide grâce à son climat favorable et son dynamisme économique.",
    "Le Sud-Ouest avec Limbé et Buéa attire de plus en plus d'investissements pour son potentiel touristique et son cadre de vie agréable. Le Sud, notamment Kribi, connaît un boom immobilier grâce au développement portuaire et touristique.",
    "Les régions septentrionales (Nord, Extrême-Nord, Adamaoua) offrent des opportunités à des prix très accessibles, mais avec un marché moins dynamique et plus orienté vers la location. L'Est reste la région la moins développée sur le plan immobilier, mais avec un potentiel intéressant pour les investissements à long terme."
  ],
  "sécurité": [
    "Pour sécuriser votre investissement immobilier au Cameroun, exigez systématiquement une vérification des documents au Conservatoire Foncier et au service des domaines. Les fraudes documentaires existent, notamment sur les titres fonciers et les procurations.",
    "Ne versez jamais d'acompte important sans avoir vérifié l'identité du vendeur, l'authenticité des documents de propriété, et signé un compromis détaillé chez un notaire. La présence d'un avocat spécialisé peut être un atout supplémentaire dans les transactions complexes.",
    "En cas de doute sur une transaction, les services de la Conservation Foncière permettent de vérifier l'authenticité d'un titre et l'absence de litiges ou hypothèques. Cette démarche, bien que parfois longue, est essentielle pour éviter les mauvaises surprises."
  ],
  "visite": [
    "Lors d'une visite immobilière au Cameroun, soyez particulièrement attentif aux signes d'humidité, à la qualité de la construction (fissures), et aux installations électriques souvent problématiques. Visitez à différentes heures pour évaluer l'ensoleillement, le bruit et la sécurité du quartier.",
    "Pour les terrains, une visite avec un géomètre est recommandée pour confirmer les limites exactes et détecter d'éventuels problèmes (zones inondables, instabilité du sol). Vérifiez également l'accessibilité en saison des pluies et la disponibilité des réseaux (eau, électricité).",
    "N'hésitez pas à interroger les voisins lors de vos visites, ils peuvent vous fournir des informations précieuses sur le quartier, les problèmes récurrents (coupures d'eau/électricité, insécurité) que ni le vendeur ni l'agent ne mentionneront spontanément."
  ],
  "estimation": [
    "Pour estimer correctement un bien au Cameroun, comparez des propriétés similaires dans le même quartier vendues récemment. À Douala et Yaoundé, les écarts de prix peuvent atteindre 30% pour des biens équivalents mais situés dans des quartiers différents.",
    "Les facteurs qui influencent le plus la valeur d'un bien au Cameroun sont: l'emplacement, la sécurité du quartier, l'accessibilité, la qualité de la construction, la présence d'un titre foncier (vs certificat de vente), et pour les appartements, les commodités de l'immeuble.",
    "Une expertise professionnelle indépendante est vivement recommandée pour les biens de valeur. Elle coûte généralement entre 100 000 et 300 000 FCFA selon la taille et la complexité, mais peut vous éviter des erreurs d'appréciation bien plus coûteuses."
  ],
  "villes": [
    "Douala et Yaoundé dominent le marché immobilier camerounais avec les prix les plus élevés (150 000-500 000 FCFA/m²) et le plus grand volume de transactions. Douala, capitale économique, attire pour son dynamisme commercial, tandis que Yaoundé, capitale politique, séduit par sa stabilité et son cadre plus aéré.",
    "Les villes côtières comme Kribi et Limbé connaissent une forte croissance grâce à leur potentiel touristique et infrastructurel. Les prix y augmentent rapidement (50 000-200 000 FCFA/m²), offrant d'excellentes perspectives de plus-value à moyen terme.",
    "Dans l'Ouest, Bafoussam et Dschang séduisent par leur climat agréable et leur dynamisme économique, avec des prix encore accessibles (30 000-200 000 FCFA/m²) mais en progression constante. Ce sont d'excellentes alternatives pour allier qualité de vie et investissement rentable."
  ],
  "expertise": [
    "Pour les investisseurs étrangers, le marché immobilier camerounais offre des rendements attractifs (8-15%) mais nécessite une connaissance approfondie des spécificités légales. Un accompagnement juridique local est fortement recommandé pour naviguer les complexités administratives.",
    "Les zones à fort potentiel de développement incluent les périphéries en expansion des grandes villes, les régions touristiques côtières, et les villes universitaires. Ces marchés bénéficient d'une demande croissante et d'investissements infrastructurels majeurs.",
    "Pour les investisseurs institutionnels, les immeubles de bureaux à Douala et Yaoundé, ainsi que les centres commerciaux modernes dans les villes secondaires, représentent des opportunités avec des rendements entre 10% et 15%, supérieurs aux marchés européens ou américains."
  ],
  "professionnel": [
    "Les agents immobiliers professionnels au Cameroun peuvent justifier des commissions de 3-5% grâce à leur connaissance du marché, leur réseau, et leur capacité à sécuriser juridiquement les transactions. Privilégiez les agents affiliés aux associations professionnelles reconnues.",
    "Pour les architectes et constructeurs, le marché camerounais offre d'excellentes opportunités avec la croissance urbaine soutenue. La demande est particulièrement forte pour les constructions écologiques et adaptées au climat local, un créneau encore peu exploité.",
    "Les notaires et experts immobiliers jouent un rôle crucial dans la sécurisation des transactions. Leurs honoraires, bien que représentant un coût initial, constituent une assurance indispensable contre les risques juridiques fréquents dans l'immobilier camerounais."
  ]
};
