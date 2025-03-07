
// Types pour les messages
export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  isPersonalized?: boolean;
}

export interface City {
  name: string;
  region: string;
  neighborhoods: string[];
  popularAreas: string[];
  priceRange: string;
  description: string;
}

// Base de données des villes et quartiers du Cameroun
export const CAMEROON_CITIES: Record<string, City[]> = {
  "Littoral": [
    {
      name: "Douala",
      region: "Littoral",
      neighborhoods: [
        "Akwa", "Bonanjo", "Bonapriso", "Bonamoussadi", "Makepe", "Deido", "Bepanda", 
        "New Bell", "Ndokotti", "Bonaberi", "PK8", "PK10", "PK12", "PK14", "Logpom", 
        "Kotto", "Nyalla", "Logbessou", "Yassa", "Cité des Palmiers", "Village", "Denver",
        "Mboppi", "Bessengue", "Bali", "Akwa-Nord", "Nylon", "Ndogbong", "Cité SIC", 
        "Madagascar", "Brazzaville", "Mabanda", "Japoma", "Bobongo", "Bassa", "Youpwe",
        "Bonejang", "Bonelang", "Ndoghem", "Soboum", "Boko", "Likoko", "Sodiko"
      ],
      popularAreas: ["Bonanjo", "Bonapriso", "Bonamoussadi", "Akwa", "Makepe", "Deido"],
      priceRange: "150 000 - 500 000 FCFA/m²",
      description: "Capitale économique du Cameroun, Douala est une ville portuaire dynamique avec des quartiers résidentiels et d'affaires en plein essor."
    },
    {
      name: "Nkongsamba",
      region: "Littoral",
      neighborhoods: ["Centre-ville", "Quartier Haoussa", "Quartier administratif", "Bonaberi", "Bakoko"],
      popularAreas: ["Centre-ville"],
      priceRange: "50 000 - 150 000 FCFA/m²",
      description: "Troisième ville la plus importante du Littoral, elle est située au pied du Mont Manengouba."
    },
    {
      name: "Edéa",
      region: "Littoral",
      neighborhoods: ["Centre-ville", "Ekité", "Mbanda", "Bilalang", "Pongo"],
      popularAreas: ["Centre-ville", "Ekité"],
      priceRange: "40 000 - 120 000 FCFA/m²",
      description: "Ville industrielle avec une importante centrale hydroélectrique sur la Sanaga."
    }
  ],
  "Centre": [
    {
      name: "Yaoundé",
      region: "Centre",
      neighborhoods: [
        "Bastos", "Nlongkak", "Tsinga", "Etoa-Meki", "Biyem-Assi", "Mvan", "Mendong", 
        "Mimboman", "Mvog-Mbi", "Omnisport", "Mfandena", "Nkol-Eton", "Centre administratif", 
        "Elig-Essono", "Elig-Edzoa", "Mokolo", "Madagascar", "Briqueterie", "Ngoa-Ekelle", 
        "Obili", "Messassi", "Efoulan", "Dakar", "Ekounou", "Nkolbisson", "Messa", "Oyom-Abang",
        "Nsimeyong", "Nkomo", "Kondengui", "Ahala", "Mbankolo", "Ngoulmakong", "Olezoa",
        "Nkolondom", "Minkoameyos", "Emana", "Simbock", "Santa Barbara", "Mvog-Betsi", "Odza"
      ],
      popularAreas: ["Bastos", "Omnisport", "Nsimeyong", "Biyem-Assi", "Centre administratif"],
      priceRange: "150 000 - 450 000 FCFA/m²",
      description: "Capitale politique du Cameroun, Yaoundé est une ville de collines avec des quartiers résidentiels haut de gamme et administratifs."
    },
    {
      name: "Mbalmayo",
      region: "Centre",
      neighborhoods: ["Centre-ville", "Quartier administratif", "Nkolyem", "Abang", "Nkolngok"],
      popularAreas: ["Centre-ville"],
      priceRange: "30 000 - 100 000 FCFA/m²",
      description: "Ville située au sud de Yaoundé, connue pour son école des eaux et forêts."
    },
    {
      name: "Eséka",
      region: "Centre",
      neighborhoods: ["Centre-ville", "Quartier administratif", "Quartier Haoussa"],
      popularAreas: ["Centre-ville"],
      priceRange: "20 000 - 80 000 FCFA/m²",
      description: "Ville ferroviaire entre Douala et Yaoundé."
    }
  ],
  "Ouest": [
    {
      name: "Bafoussam",
      region: "Ouest",
      neighborhoods: ["Centre commercial", "Kamkop", "Tamdja", "Banengo", "Djeleng", "Tougang", "Famla", "Tyo-ville"],
      popularAreas: ["Centre commercial", "Kamkop", "Tamdja"],
      priceRange: "50 000 - 200 000 FCFA/m²",
      description: "Capitale régionale de l'Ouest, centre commercial important et carrefour des Grassfields."
    },
    {
      name: "Dschang",
      region: "Ouest",
      neighborhoods: ["Centre-ville", "Mingmeto", "Paid Ground", "Campus", "Tsinkop", "Foto", "Vallée"],
      popularAreas: ["Centre-ville", "Campus"],
      priceRange: "30 000 - 150 000 FCFA/m²",
      description: "Ville universitaire au climat frais, située dans les montagnes."
    },
    {
      name: "Bafang",
      region: "Ouest",
      neighborhoods: ["Centre-ville", "Bafang rural", "Bandja", "Baboaté"],
      popularAreas: ["Centre-ville"],
      priceRange: "25 000 - 100 000 FCFA/m²",
      description: "Centre commercial important dans la région du Haut-Nkam."
    }
  ],
  "Sud-Ouest": [
    {
      name: "Buéa",
      region: "Sud-Ouest",
      neighborhoods: ["Molyko", "Great Soppo", "Small Soppo", "Bonduma", "Clerks Quarter", "Federal Quarter", "Mile 16", "Mile 17", "Mile 18"],
      popularAreas: ["Molyko", "Great Soppo", "Federal Quarter"],
      priceRange: "40 000 - 180 000 FCFA/m²",
      description: "Ancienne capitale du Cameroun allemand, située au pied du mont Cameroun avec un climat frais."
    },
    {
      name: "Limbé",
      region: "Sud-Ouest",
      neighborhoods: ["Down Beach", "Mile 4", "Bota", "GRA", "Middle Farms", "Unity Quarter", "Church Street", "New Town"],
      popularAreas: ["Down Beach", "GRA", "Bota"],
      priceRange: "35 000 - 150 000 FCFA/m²",
      description: "Ville côtière avec des plages de sable noir, site de la raffinerie nationale et du jardin botanique."
    },
    {
      name: "Kumba",
      region: "Sud-Ouest",
      neighborhoods: ["Fiango", "Bamileke Quarter", "Station", "Kosala", "Three Corners", "Mbonge Road"],
      popularAreas: ["Fiango", "Station"],
      priceRange: "25 000 - 90 000 FCFA/m²",
      description: "Centre commercial important, surnommé 'K-Town'."
    }
  ],
  "Nord-Ouest": [
    {
      name: "Bamenda",
      region: "Nord-Ouest",
      neighborhoods: ["Commercial Avenue", "Up Station", "Down Town", "Old Town", "Nkwen", "Bambili", "Mankon", "Mendakwe", "Mile 2", "Mile 4", "Mile 6", "Ntarikon"],
      popularAreas: ["Commercial Avenue", "Up Station", "Nkwen"],
      priceRange: "30 000 - 150 000 FCFA/m²",
      description: "Capitale régionale du Nord-Ouest, centre commercial et culturel des Grassfields anglophones."
    },
    {
      name: "Kumbo",
      region: "Nord-Ouest",
      neighborhoods: ["Squares", "Tobin", "Mbveh", "Romajay", "Takui"],
      popularAreas: ["Squares"],
      priceRange: "20 000 - 80 000 FCFA/m²",
      description: "Deuxième ville du Nord-Ouest, située en altitude avec un climat frais."
    }
  ],
  "Sud": [
    {
      name: "Ebolowa",
      region: "Sud",
      neighborhoods: ["Centre administratif", "Nko'ovos", "Mvog-Betsi", "Angalé"],
      popularAreas: ["Centre administratif"],
      priceRange: "25 000 - 100 000 FCFA/m²",
      description: "Capitale régionale du Sud, connue pour ses plantations de cacao."
    },
    {
      name: "Kribi",
      region: "Sud",
      neighborhoods: ["Centre-ville", "Dombé", "Mboa-Manga", "Afan-Mabé", "Talla", "Mpangou"],
      popularAreas: ["Centre-ville", "Afan-Mabé"],
      priceRange: "50 000 - 200 000 FCFA/m²",
      description: "Station balnéaire avec des plages de sable fin, port en eau profonde."
    },
    {
      name: "Sangmélima",
      region: "Sud",
      neighborhoods: ["Centre-ville", "Bingou", "Oyack", "Messok"],
      popularAreas: ["Centre-ville"],
      priceRange: "20 000 - 80 000 FCFA/m²",
      description: "Ville commerciale située dans une zone de production cacaoyère."
    }
  ],
  "Est": [
    {
      name: "Bertoua",
      region: "Est",
      neighborhoods: ["Centre administratif", "Nkolbikon", "Madagascar", "Mokolo", "Haoussa"],
      popularAreas: ["Centre administratif"],
      priceRange: "25 000 - 90 000 FCFA/m²",
      description: "Capitale régionale de l'Est, point de départ vers les parcs nationaux."
    },
    {
      name: "Abong-Mbang",
      region: "Est",
      neighborhoods: ["Centre-ville", "Quartier administratif"],
      popularAreas: ["Centre-ville"],
      priceRange: "15 000 - 60 000 FCFA/m²",
      description: "Ville commerciale dans la zone forestière de l'Est."
    }
  ],
  "Adamaoua": [
    {
      name: "Ngaoundéré",
      region: "Adamaoua",
      neighborhoods: ["Baladji", "Dang", "Bamyanga", "Mbideng", "Béka Matari", "Madagascar"],
      popularAreas: ["Baladji", "Dang"],
      priceRange: "20 000 - 90 000 FCFA/m²",
      description: "Capitale régionale de l'Adamaoua, située en altitude sur les hauts plateaux."
    },
    {
      name: "Meiganga",
      region: "Adamaoua",
      neighborhoods: ["Centre-ville", "Quartier Haoussa", "Goba"],
      popularAreas: ["Centre-ville"],
      priceRange: "15 000 - 50 000 FCFA/m²",
      description: "Ville de transit vers la République Centrafricaine."
    }
  ],
  "Nord": [
    {
      name: "Garoua",
      region: "Nord",
      neighborhoods: ["Bibémiré", "Marouaré", "Lopéré", "Foulbéré", "Poumpoumré", "Djamboutou"],
      popularAreas: ["Bibémiré", "Marouaré"],
      priceRange: "20 000 - 85 000 FCFA/m²",
      description: "Capitale régionale du Nord, ville portuaire sur la Bénoué."
    },
    {
      name: "Guider",
      region: "Nord",
      neighborhoods: ["Centre-ville", "Quartier Lam"],
      popularAreas: ["Centre-ville"],
      priceRange: "10 000 - 45 000 FCFA/m²",
      description: "Centre minier et agricole."
    }
  ],
  "Extrême-Nord": [
    {
      name: "Maroua",
      region: "Extrême-Nord",
      neighborhoods: ["Domayo", "Kakataré", "Djarengol", "Dougoï", "Palar", "Baouliwol"],
      popularAreas: ["Domayo", "Djarengol"],
      priceRange: "15 000 - 75 000 FCFA/m²",
      description: "Capitale régionale de l'Extrême-Nord, centre artisanal et touristique."
    },
    {
      name: "Kousseri",
      region: "Extrême-Nord",
      neighborhoods: ["Centre-ville", "Lac", "Douanes"],
      popularAreas: ["Centre-ville"],
      priceRange: "15 000 - 60 000 FCFA/m²",
      description: "Ville frontalière avec le Tchad, située sur le fleuve Logone."
    }
  ]
};

// Questions et réponses prédéfinies pour le chatbot immobilier
export const PREDEFINED_RESPONSES: Record<string, string[]> = {
  "default": [
    "Comment puis-je vous aider dans votre recherche immobilière aujourd'hui?",
    "N'hésitez pas à me poser des questions sur nos propriétés ou services!",
    "Je suis votre assistant virtuel immobilier. Que recherchez-vous exactement?",
    "Bonjour! Je peux vous aider pour tout ce qui concerne l'achat, la vente ou la location de biens immobiliers."
  ],
  "prix": [
    "Les prix varient selon l'emplacement, la superficie et les prestations. Pour un bien similaire à ce que vous recherchez, comptez entre 150 000 et 500 000 FCFA/m² selon le quartier.",
    "Notre plateforme propose des biens dans toutes les gammes de prix. Souhaitez-vous filtrer par budget spécifique?",
    "Les prix du marché immobilier camerounais sont actuellement stables. C'est un bon moment pour investir, surtout dans les quartiers en développement comme Bonapriso ou Bonamoussadi."
  ],
  "vente": [
    "Pour vendre votre propriété, créez simplement une annonce depuis votre profil en fournissant photos et détails précis. Nos conseillers peuvent vous aider à estimer le juste prix.",
    "Notre processus de mise en vente est simple: créez votre annonce, ajoutez des photos de qualité, détaillez les caractéristiques et fixez votre prix. Vous serez mis en relation avec des acheteurs potentiels rapidement.",
    "La vente d'un bien immobilier nécessite généralement quelques documents importants: titre foncier, certificat de propriété, et parfois un rapport d'expertise. Avez-vous ces documents?"
  ],
  "location": [
    "Notre section 'Louer' contient plus de 500 propriétés disponibles à la location, actualisées quotidiennement.",
    "Pour louer efficacement, utilisez nos filtres par quartier, nombre de pièces et budget. Vous pouvez également activer les alertes pour être notifié des nouvelles annonces correspondant à vos critères.",
    "Les locations à Douala et Yaoundé sont particulièrement demandées. Pour maximiser vos chances, nous recommandons de réagir rapidement aux annonces et de préparer votre dossier à l'avance."
  ],
  "contact": [
    "Vous pouvez contacter directement les propriétaires via notre messagerie sécurisée. Nous vérifions l'identité de tous nos utilisateurs pour garantir votre sécurité.",
    "Notre équipe de support est disponible de 8h à 20h tous les jours via le formulaire de contact ou par téléphone au +237 6XX XXX XXX.",
    "Pour une assistance personnalisée, n'hésitez pas à prendre rendez-vous avec l'un de nos agents immobiliers qui connaît parfaitement votre zone de recherche."
  ],
  "agent": [
    "Nos agents immobiliers certifiés sont disponibles pour vous accompagner à chaque étape, de la recherche à la signature. Ils connaissent parfaitement le marché local.",
    "Chaque agent immobilier sur notre plateforme est évalué par les utilisateurs. Consultez leurs avis et leur taux de réussite avant de les contacter.",
    "Un bon agent immobilier peut faire toute la différence. Les nôtres sont formés pour négocier les meilleures conditions et vous éviter les pièges courants du marché immobilier camerounais."
  ],
  "quartier": [
    "Les quartiers les plus recherchés à Douala sont actuellement Bonanjo, Bonapriso et Bonamoussadi pour leur proximité avec les centres d'affaires.",
    "À Yaoundé, les quartiers de Bastos, Omnisport et Nsimeyong sont très prisés pour leur sécurité et leurs infrastructures.",
    "Chaque quartier a ses particularités: Akwa est idéal pour la vie nocturne, Bonapriso pour les familles, et Makepe pour les jeunes professionnels."
  ],
  "document": [
    "Pour un achat sécurisé, vérifiez toujours le titre foncier, le certificat de propriété, et l'authenticité des documents auprès du cadastre.",
    "Notre plateforme offre un service de vérification de documents immobiliers. Nous pouvons vous aider à authentifier un titre foncier ou tout autre document officiel.",
    "La législation immobilière au Cameroun exige certains documents spécifiques. Je peux vous guider sur les documents nécessaires selon votre situation."
  ],
  "investissement": [
    "L'immobilier au Cameroun offre un rendement locatif moyen de 8-12%, bien supérieur à de nombreux pays. C'est un excellent placement à long terme.",
    "Les zones à fort potentiel d'investissement actuellement sont Japoma à Douala et Nkolafeme à Yaoundé, grâce aux nouveaux projets d'infrastructure.",
    "Pour un investissement sûr, privilégiez les biens avec titre foncier dans des quartiers en développement, proches des axes routiers majeurs."
  ],
  "crédit": [
    "Plusieurs banques partenaires proposent des prêts immobiliers avec des taux compétitifs, généralement entre 7% et 12% selon votre profil.",
    "Pour obtenir un crédit immobilier, vous devez généralement justifier d'un apport personnel d'au moins 20% et de revenus stables. Nous pouvons vous orienter vers nos partenaires financiers.",
    "Le processus d'obtention d'un crédit immobilier prend environ 1 à 2 mois. Commencez vos démarches dès que possible pour ne pas manquer une opportunité."
  ],
  "construction": [
    "Si vous envisagez de construire, nous pouvons vous mettre en relation avec des architectes et entrepreneurs certifiés partenaires de notre plateforme.",
    "La construction coûte généralement entre 180 000 et 350 000 FCFA/m² selon la qualité des finitions. N'oubliez pas d'inclure le coût du terrain, des raccordements et des taxes.",
    "Pour un projet de construction, vérifiez que votre terrain dispose d'un titre foncier et d'un permis de construire. Notre guide détaillé peut vous aider dans ces démarches."
  ],
  "annonce": [
    "Pour créer une annonce efficace, utilisez des photos de qualité, décrivez précisément les caractéristiques du bien et fixez un prix réaliste basé sur les biens similaires.",
    "Les annonces avec des visuels complets génèrent 3 fois plus de contacts. N'hésitez pas à utiliser notre service de photographie professionnelle.",
    "Votre annonce sera visible pendant 30 jours et peut être renouvelée gratuitement. Vous recevrez des statistiques de consultation et pourrez modifier les détails à tout moment."
  ],
  "sécurité": [
    "Toutes les transactions passant par notre plateforme sont sécurisées. Nous vérifions l'identité des vendeurs et l'authenticité des biens avant publication.",
    "Pour éviter les arnaques, utilisez notre système de messagerie interne et ne versez jamais d'acompte sans avoir visité le bien et vérifié les documents.",
    "Notre équipe de sécurité surveille les annonces et les comptes utilisateurs. Signalez tout comportement suspect via le bouton dédié sur chaque annonce."
  ],
  "visite": [
    "Vous pouvez programmer des visites directement via notre plateforme. Les propriétaires reçoivent une notification et peuvent confirmer leur disponibilité.",
    "Notre fonction de visite virtuelle est disponible sur certaines annonces premium. Recherchez l'icône 360° pour découvrir un bien à distance avant de vous déplacer.",
    "Pour optimiser vos visites, préparez une liste de questions et vérifiez l'environnement du quartier à différentes heures de la journée."
  ],
  "estimation": [
    "Notre outil d'estimation gratuit utilise les données du marché et l'historique des ventes pour vous donner une évaluation précise de votre bien en quelques clics.",
    "Pour une estimation professionnelle, nos experts immobiliers peuvent visiter votre propriété et vous fournir un rapport détaillé incluant les potentiels d'amélioration.",
    "Le prix d'un bien dépend de nombreux facteurs: emplacement, superficie, état, orientation, étage... Notre algorithme prend en compte plus de 20 critères différents."
  ],
  "notaire": [
    "Un notaire est indispensable pour sécuriser votre transaction immobilière. Ses honoraires sont généralement de 4-7% du prix de vente.",
    "Nous collaborons avec un réseau de notaires expérimentés dans toutes les grandes villes du Cameroun. Nous pouvons vous recommander des professionnels fiables.",
    "Le notaire vérifie l'authenticité des documents, rédige l'acte de vente et s'occupe des démarches administratives de transfert de propriété. C'est une sécurité essentielle."
  ],
  "regions": [
    "Le Cameroun est divisé en 10 régions administratives: Littoral, Centre, Ouest, Nord-Ouest, Sud-Ouest, Sud, Est, Adamaoua, Nord et Extrême-Nord. Chacune a ses particularités immobilières.",
    "Les régions du Littoral et du Centre (avec Douala et Yaoundé) concentrent les marchés immobiliers les plus actifs du pays.",
    "Les régions de l'Ouest et du Nord-Ouest connaissent un développement immobilier intéressant dans les villes comme Bafoussam, Bamenda et Dschang."
  ],
  "villes": [
    "Les principales villes du marché immobilier camerounais sont Douala (capitale économique), Yaoundé (capitale politique), Bafoussam, Bamenda, Garoua, Maroua, Buéa, Limbé et Kribi.",
    "Chaque ville camerounaise a ses spécificités en termes de prix et d'attractivité. Douala et Yaoundé sont les plus chères, suivies par Kribi, Limbé et Bafoussam.",
    "Les villes secondaires comme Edéa, Nkongsamba, Ebolowa ou Bertoua offrent des opportunités d'investissement à des prix plus abordables, mais avec un marché moins dynamique."
  ]
};

