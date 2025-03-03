import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Profile {
  full_name: string;
  avatar_url?: string;
}

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
  sender_profile: Profile;
}

interface Contact {
  id: string;
  full_name: string;
  avatar_url?: string;
  last_message: string;
  last_message_date: string;
  unread_count: number;
}

export function MessageList() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        
        // Récupération des messages
        const { data: messageData, error: messagesError } = await supabase
          .from('messages')
          .select(`
            id,
            sender_id,
            receiver_id,
            content,
            created_at,
            read
          `)
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .order('created_at', { ascending: false });

        if (messagesError) throw messagesError;

        // Construction de la liste des contacts uniques avec les profils
        const contactMap = new Map<string, Contact>();
        
        // On récupère d'abord tous les IDs des contacts
        const contactIds = messageData
          .map((msg: any) => msg.sender_id === user.id ? msg.receiver_id : msg.sender_id)
          .filter((id: string) => id !== user.id);
        
        // Récupération des profils des contacts
        const { data: contactProfiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', [...new Set(contactIds)]);
          
        if (profilesError) throw profilesError;
        
        // Création d'un Map pour accéder facilement aux profils
        const profileMap = new Map();
        contactProfiles?.forEach((profile: any) => {
          profileMap.set(profile.id, profile);
        });

        // Construction des contacts avec leurs messages
        messageData.forEach((message: any) => {
          // Déterminer si le message est entrant ou sortant
          const isIncoming = message.receiver_id === user.id;
          const contactId = isIncoming ? message.sender_id : message.receiver_id;
          
          // Ignorer si c'est un message à soi-même
          if (contactId === user.id) return;
          
          const contactProfile = profileMap.get(contactId);
          if (!contactProfile) return; // Ignorer si pas de profil
          
          const existingContact = contactMap.get(contactId);
          
          if (!existingContact) {
            contactMap.set(contactId, {
              id: contactId,
              full_name: contactProfile.full_name || 'Utilisateur',
              avatar_url: contactProfile.avatar_url,
              last_message: message.content,
              last_message_date: message.created_at,
              unread_count: isIncoming && !message.read ? 1 : 0
            });
          } else if (new Date(message.created_at) > new Date(existingContact.last_message_date)) {
            // Mettre à jour le dernier message s'il est plus récent
            existingContact.last_message = message.content;
            existingContact.last_message_date = message.created_at;
            if (isIncoming && !message.read) {
              existingContact.unread_count += 1;
            }
          } else if (isIncoming && !message.read) {
            // Incrémenter le compteur de messages non lus
            existingContact.unread_count += 1;
          }
        });

        // Conversion de la map en tableau trié par date du dernier message
        setContacts(
          Array.from(contactMap.values()).sort((a, b) => 
            new Date(b.last_message_date).getTime() - new Date(a.last_message_date).getTime()
          )
        );

        // Si on a des contacts, sélectionner le premier par défaut
        if (contactMap.size > 0 && !selectedContact) {
          setSelectedContact(Array.from(contactMap.keys())[0]);
        }

        // Ajouter les profils aux messages
        const messagesWithProfiles = messageData.map((msg: any) => {
          const senderId = msg.sender_id;
          const senderProfile = senderId === user.id 
            ? { full_name: user.user_metadata?.full_name || 'Vous' }
            : profileMap.get(senderId) || { full_name: 'Utilisateur' };
            
          return {
            ...msg,
            sender_profile: senderProfile
          };
        });
        
        setMessages(messagesWithProfiles);
        setLoading(false);
        
      } catch (error) {
        console.error("Erreur lors du chargement des messages:", error);
        setLoading(false);
      }
    };

    fetchMessages();

    // Abonnement aux nouveaux messages en temps réel
    const messagesSubscription = supabase
      .channel('messages-channel')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'messages',
        filter: `sender_id=eq.${user.id}:receiver_id=eq.${user.id}`
      }, fetchMessages)
      .subscribe();

    return () => {
      messagesSubscription.unsubscribe();
    };
  }, [user, selectedContact]);

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
    <div className="container py-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Messagerie</h1>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <Card className="p-4">
              <Skeleton className="h-8 w-full mb-4" />
              <Skeleton className="h-20 w-full mb-2" />
              <Skeleton className="h-20 w-full mb-2" />
              <Skeleton className="h-20 w-full" />
            </Card>
          </div>
          <div className="md:col-span-2">
            <Card className="p-4 h-full">
              <Skeleton className="h-8 w-full mb-4" />
              <Skeleton className="h-16 w-3/4 mb-2" />
              <Skeleton className="h-16 w-3/4 ml-auto mb-2" />
              <Skeleton className="h-16 w-3/4 mb-2" />
              <Skeleton className="h-12 w-full mt-auto" />
            </Card>
          </div>
        </div>
      ) : contacts.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-lg mb-4">Vous n'avez pas encore de messages.</p>
          <p>Vous verrez ici vos conversations une fois que vous commencerez à échanger avec des propriétaires ou des acheteurs.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <Card className="p-2">
              <div className="font-medium px-2 py-3">Conversations</div>
              <div className="divide-y">
                {contacts.map((contact) => (
                  <div 
                    key={contact.id}
                    onClick={() => setSelectedContact(contact.id)}
                    className={`p-2 hover:bg-gray-100 cursor-pointer rounded-md flex items-start gap-3 ${selectedContact === contact.id ? 'bg-gray-100' : ''}`}
                  >
                    <Avatar>
                      <div className="bg-cmr-green text-white flex items-center justify-center w-full h-full">
                        {contact.full_name.charAt(0)}
                      </div>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className="font-medium truncate">{contact.full_name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(contact.last_message_date).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{contact.last_message}</p>
                      {contact.unread_count > 0 && (
                        <span className="inline-block bg-cmr-red text-white text-xs rounded-full px-2 py-1 mt-1">
                          {contact.unread_count}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            {selectedContact && (
              <Card className="p-4 flex flex-col h-[70vh]">
                <div className="font-medium mb-4">
                  {contacts.find(c => c.id === selectedContact)?.full_name || 'Conversation'}
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages
                    .filter(msg => 
                      (msg.sender_id === selectedContact && msg.receiver_id === user.id) || 
                      (msg.sender_id === user.id && msg.receiver_id === selectedContact)
                    )
                    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                    .map(message => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`rounded-lg px-4 py-2 max-w-[80%] break-words ${
                            message.sender_id === user.id 
                              ? 'bg-cmr-green text-white' 
                              : 'bg-gray-100'
                          }`}
                        >
                          {message.content}
                          <div className="text-xs opacity-70 text-right mt-1">
                            {new Date(message.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Tapez votre message..."
                    className="flex-1 border rounded-md px-3 py-2"
                  />
                  <Button 
                    onClick={async () => {
                      if (!newMessage.trim() || !selectedContact) return;
                      
                      try {
                        await supabase.from('messages').insert({
                          sender_id: user.id,
                          receiver_id: selectedContact,
                          content: newMessage,
                          read: false,
                        });
                        
                        setNewMessage('');
                      } catch (error) {
                        console.error("Erreur lors de l'envoi du message:", error);
                      }
                    }}
                  >
                    Envoyer
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
