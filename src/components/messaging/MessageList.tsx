import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Inbox, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
  sender_profile?: {
    full_name: string;
    avatar_url?: string;
  };
}

interface Contact {
  id: string;
  full_name: string;
  avatar_url?: string;
  last_message?: string;
  last_message_date?: string;
  unread_count: number;
}

export function MessageList() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [messageInput, setMessageInput] = useState("");

  // Chargement des contacts avec qui l'utilisateur a échangé des messages
  useEffect(() => {
    if (!user) return;

    const loadContacts = async () => {
      setLoading(true);
      try {
        // Requête pour récupérer les conversations
        const { data: messageData, error: messagesError } = await supabase
          .from('messages')
          .select(`
            id,
            sender_id,
            receiver_id,
            content,
            created_at,
            read,
            sender_profile:profiles!sender_id(full_name, avatar_url)
          `)
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .order('created_at', { ascending: false });

        if (messagesError) throw messagesError;

        // Construction de la liste des contacts uniques
        const contactMap = new Map<string, Contact>();

        messageData.forEach((message: any) => {
          // Déterminer si le message est entrant ou sortant
          const isIncoming = message.receiver_id === user.id;
          const contactId = isIncoming ? message.sender_id : message.receiver_id;
          
          // Ignorer si c'est un message à soi-même
          if (contactId === user.id) return;
          
          const existingContact = contactMap.get(contactId);
          const contactName = isIncoming ? message.sender_profile?.full_name || 'Utilisateur' : 'Contact';
          
          if (!existingContact) {
            contactMap.set(contactId, {
              id: contactId,
              full_name: contactName,
              avatar_url: isIncoming ? message.sender_profile?.avatar_url : undefined,
              last_message: message.content,
              last_message_date: message.created_at,
              unread_count: isIncoming && !message.read ? 1 : 0
            });
          } else if (new Date(message.created_at) > new Date(existingContact.last_message_date || 0)) {
            // Mettre à jour seulement si ce message est plus récent
            existingContact.last_message = message.content;
            existingContact.last_message_date = message.created_at;
            
            if (isIncoming && !message.read) {
              existingContact.unread_count += 1;
            }
          } else if (isIncoming && !message.read) {
            existingContact.unread_count += 1;
          }
        });
        
        // Convertir la Map en tableau et trier par date du dernier message
        const contactList = Array.from(contactMap.values()).sort((a, b) => {
          return new Date(b.last_message_date || 0).getTime() - new Date(a.last_message_date || 0).getTime();
        });
        
        setContacts(contactList);
      } catch (error) {
        console.error("Erreur lors du chargement des contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, [user]);

  // Chargement des messages avec un contact spécifique
  useEffect(() => {
    if (!user || !selectedContact) return;

    const loadMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select(`
            id,
            sender_id,
            receiver_id,
            content,
            created_at,
            read,
            sender_profile:profiles!sender_id(full_name, avatar_url)
          `)
          .or(`and(sender_id.eq.${user.id},receiver_id.eq.${selectedContact.id}),and(sender_id.eq.${selectedContact.id},receiver_id.eq.${user.id})`)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setMessages(data || []);

        // Marquer les messages comme lus
        const unreadMessages = data?.filter(msg => 
          msg.receiver_id === user.id && !msg.read
        ) || [];

        if (unreadMessages.length > 0) {
          const unreadIds = unreadMessages.map(msg => msg.id);
          await supabase
            .from('messages')
            .update({ read: true })
            .in('id', unreadIds);
          
          // Mettre à jour le compteur de messages non lus
          setContacts(prev => 
            prev.map(contact => 
              contact.id === selectedContact.id 
                ? { ...contact, unread_count: 0 } 
                : contact
            )
          );
        }
      } catch (error) {
        console.error("Erreur lors du chargement des messages:", error);
      }
    };

    loadMessages();

    // S'abonner aux nouveaux messages
    const subscription = supabase
      .channel('messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `or(and(sender_id.eq.${user.id},receiver_id.eq.${selectedContact.id}),and(sender_id.eq.${selectedContact.id},receiver_id.eq.${user.id}))`,
      }, (payload) => {
        const newMessage = payload.new as Message;
        setMessages(prev => [...prev, newMessage]);
        
        // Marquer automatiquement comme lu si c'est un message entrant
        if (newMessage.receiver_id === user.id) {
          supabase
            .from('messages')
            .update({ read: true })
            .eq('id', newMessage.id);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user, selectedContact]);

  const sendMessage = async () => {
    if (!user || !selectedContact || !messageInput.trim()) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: selectedContact.id,
          content: messageInput,
          read: false
        })
        .select();

      if (error) throw error;
      setMessageInput("");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <p className="text-center text-gray-500">
          Connectez-vous pour accéder à votre messagerie
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Messagerie</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-cmr-green" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Liste des contacts */}
          <div className="md:col-span-1 space-y-2">
            <Card className="h-[75vh] flex flex-col">
              <CardHeader className="py-3">
                <CardTitle>Conversations</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                {contacts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-4 text-gray-500">
                    <Inbox className="h-12 w-12 mb-2 opacity-50" />
                    <p>Aucune conversation</p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {contacts.map((contact) => (
                      <li 
                        key={contact.id}
                        onClick={() => setSelectedContact(contact)}
                        className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 hover:bg-gray-100 transition-colors ${
                          selectedContact?.id === contact.id ? 'bg-gray-100' : ''
                        }`}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={contact.avatar_url || undefined} alt={contact.full_name} />
                          <AvatarFallback>{contact.full_name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium truncate">{contact.full_name}</h3>
                            {contact.last_message_date && (
                              <span className="text-xs text-gray-500">
                                {formatDistanceToNow(new Date(contact.last_message_date), {
                                  addSuffix: true,
                                  locale: fr
                                })}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 truncate">{contact.last_message}</p>
                        </div>
                        {contact.unread_count > 0 && (
                          <span className="bg-cmr-green text-white text-xs font-bold rounded-full h-5 min-w-5 flex items-center justify-center px-1.5">
                            {contact.unread_count}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Conversation */}
          <div className="md:col-span-2">
            <Card className="h-[75vh] flex flex-col">
              {selectedContact ? (
                <>
                  <CardHeader className="py-3 border-b">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={selectedContact.avatar_url || undefined} alt={selectedContact.full_name} />
                        <AvatarFallback>{selectedContact.full_name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <CardTitle>{selectedContact.full_name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-4">
                      {messages.map((message) => {
                        const isOutgoing = message.sender_id === user.id;
                        const messageDate = new Date(message.created_at);
                        
                        return (
                          <div 
                            key={message.id} 
                            className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-[75%] p-3 rounded-lg ${
                                isOutgoing 
                                  ? 'bg-cmr-green text-white rounded-tr-none' 
                                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
                              }`}
                            >
                              <p className="break-words whitespace-pre-wrap">{message.content}</p>
                              <div className={`text-xs mt-1 ${isOutgoing ? 'text-white/70' : 'text-gray-500'}`}>
                                {format(messageDate, 'HH:mm')}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                  <div className="p-3 border-t">
                    <form 
                      className="flex gap-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage();
                      }}
                    >
                      <Input
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Écrivez votre message..."
                        className="flex-1"
                      />
                      <Button type="submit" disabled={!messageInput.trim()}>
                        Envoyer
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-4 text-gray-500">
                  <Inbox className="h-16 w-16 mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Aucune conversation sélectionnée</h3>
                  <p>Sélectionnez une conversation dans la liste pour commencer à discuter</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
