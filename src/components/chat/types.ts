
// Types pour les messages
export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

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
  ]
};

