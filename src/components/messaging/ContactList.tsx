
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export interface Contact {
  id: string;
  full_name: string;
  avatar_url?: string;
  last_message: string;
  last_message_date: string;
  unread_count: number;
}

interface ContactListProps {
  contacts: Contact[];
  selectedContact: string | null;
  onSelectContact: (contactId: string) => void;
  loading: boolean;
}

export function ContactList({ 
  contacts, 
  selectedContact, 
  onSelectContact, 
  loading 
}: ContactListProps) {
  if (loading) {
    return (
      <Card className="p-4">
        <Skeleton className="h-8 w-full mb-4" />
        <Skeleton className="h-20 w-full mb-2" />
        <Skeleton className="h-20 w-full mb-2" />
        <Skeleton className="h-20 w-full" />
      </Card>
    );
  }

  if (contacts.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-lg mb-4">Vous n'avez pas encore de messages.</p>
        <p>Vous verrez ici vos conversations une fois que vous commencerez à échanger avec des propriétaires ou des acheteurs.</p>
      </Card>
    );
  }

  return (
    <Card className="p-2">
      <div className="font-medium px-2 py-3">Conversations</div>
      <div className="divide-y">
        {contacts.map((contact) => (
          <div 
            key={contact.id}
            onClick={() => onSelectContact(contact.id)}
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
  );
}
