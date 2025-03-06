
// Types pour les messages
export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Questions et réponses prédéfinies pour le chatbot simple
export const PREDEFINED_RESPONSES: Record<string, string[]> = {
  "default": [
    "Comment puis-je vous aider avec votre recherche immobilière ?",
    "N'hésitez pas à me poser des questions sur nos services !",
    "Je suis là pour vous aider à trouver votre propriété idéale."
  ],
  "prix": [
    "Les prix varient selon la localisation et le type de bien. Vous pouvez utiliser nos filtres de recherche pour trouver des propriétés dans votre budget.",
    "Nous avons des options pour tous les budgets. Souhaitez-vous rechercher dans une gamme de prix spécifique ?"
  ],
  "vente": [
    "Pour vendre votre propriété, vous pouvez utiliser notre service de mise en vente. Il vous suffit de créer une annonce en fournissant les détails et photos de votre bien.",
    "Vous pouvez mettre votre propriété en vente en vous rendant sur la page 'Vendre' après vous être connecté."
  ],
  "location": [
    "Notre section 'Louer' propose de nombreuses propriétés disponibles à la location.",
    "Vous pouvez filtrer les locations selon vos critères spécifiques comme le quartier, le nombre de pièces ou le budget."
  ],
  "contact": [
    "Vous pouvez nous contacter via le formulaire dans la section 'Contact' ou directement avec le propriétaire d'une annonce via notre messagerie sécurisée.",
    "Notre équipe est disponible pour répondre à vos questions via le formulaire de contact."
  ],
  "agent": [
    "Nos agents immobiliers sont disponibles pour vous accompagner dans votre recherche. Ils connaissent parfaitement le marché local.",
    "Vous pouvez contacter directement un agent immobilier depuis la page d'une propriété qui vous intéresse."
  ],
  "notaire": [
    "Nous collaborons avec des notaires qualifiés qui peuvent vous assister pour toutes les formalités légales liées à votre transaction immobilière.",
    "Les services d'un notaire sont essentiels pour sécuriser votre achat ou vente immobilière."
  ],
  "offre": [
    "Vous pouvez envoyer une offre directement au propriétaire depuis la page de la propriété qui vous intéresse.",
    "Pour faire une offre, il vous suffit de cliquer sur le bouton 'Contacter le propriétaire' et de préciser votre proposition."
  ]
};
