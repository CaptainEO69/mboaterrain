
import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Contact } from "./ContactList";

interface Profile {
  full_name: string;
  avatar_url?: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
  sender_profile: Profile;
}

interface MessageThreadProps {
  messages: Message[];
  selectedContact: string | null;
  contacts: Contact[];
  currentUserId: string | undefined;
  loading: boolean;
}

export function MessageThread({ 
  messages, 
  selectedContact, 
  contacts, 
  currentUserId,
  loading 
}: MessageThreadProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedContact]);

  if (!selectedContact) return null;

  if (loading) {
    return (
      <Card className="p-4 h-full">
        <Skeleton className="h-8 w-full mb-4" />
        <Skeleton className="h-16 w-3/4 mb-2" />
        <Skeleton className="h-16 w-3/4 ml-auto mb-2" />
        <Skeleton className="h-16 w-3/4 mb-2" />
        <Skeleton className="h-12 w-full mt-auto" />
      </Card>
    );
  }

  const selectedContactName = contacts.find(c => c.id === selectedContact)?.full_name || 'Conversation';

  // Filter messages for the selected contact
  const contactMessages = messages
    .filter(msg => 
      (msg.sender_id === selectedContact && msg.receiver_id === currentUserId) || 
      (msg.sender_id === currentUserId && msg.receiver_id === selectedContact)
    )
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  return (
    <Card className="p-4 flex flex-col h-[70vh]">
      <div className="font-medium mb-4">
        {selectedContactName}
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {contactMessages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender_id === currentUserId ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`rounded-lg px-4 py-2 max-w-[80%] break-words ${
                message.sender_id === currentUserId 
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
        ))}
        <div ref={messagesEndRef} />
      </div>
    </Card>
  );
}
