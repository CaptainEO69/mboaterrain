
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
