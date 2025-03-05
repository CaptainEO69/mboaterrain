
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { ContactList, Contact } from "./ContactList";
import { MessageThread, Message } from "./MessageThread";
import { MessageInput } from "./MessageInput";

export function MessageList() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !selectedContact || !user) return;
    
    try {
      await supabase.from('messages').insert({
        sender_id: user.id,
        receiver_id: selectedContact,
        content: content,
        read: false,
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      throw error;
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
    <div className="container py-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Messagerie</h1>
      
      {contacts.length === 0 && !loading ? (
        <ContactList 
          contacts={[]}
          selectedContact={null}
          onSelectContact={() => {}}
          loading={loading}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <ContactList 
              contacts={contacts}
              selectedContact={selectedContact}
              onSelectContact={setSelectedContact}
              loading={loading}
            />
          </div>
          
          <div className="md:col-span-2">
            {selectedContact && (
              <>
                <MessageThread 
                  messages={messages}
                  selectedContact={selectedContact}
                  contacts={contacts}
                  currentUserId={user.id}
                  loading={loading}
                />
                <MessageInput 
                  selectedContact={selectedContact}
                  onSendMessage={handleSendMessage}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
