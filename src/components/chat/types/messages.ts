
// Types pour les messages
export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  isPersonalized?: boolean;
  isExpert?: boolean;
}
