
// Types pour les messages
export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  isPersonalized?: boolean;
  isExpert?: boolean;
  // Champ pour suivre la question à laquelle ce message répond (pour le débogage)
  relatedToQuestion?: string;
}
