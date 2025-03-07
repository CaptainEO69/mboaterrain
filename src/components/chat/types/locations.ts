
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
