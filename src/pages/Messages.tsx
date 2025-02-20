
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";

type Message = {
  id: string;
  content: string;
  created_at: string;
  read: boolean;
  property: {
    id: string;
    title: string;
  } | null;
  sender: {
    id: string;
    full_name: string | null;
  };
  receiver: {
    id: string;
    full_name: string | null;
  };
};

export default function Messages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('messages')
          .select(`
            *,
            property:properties(id, title),
            sender:profiles!messages_sender_id_fkey(id, full_name),
            receiver:profiles!messages_receiver_id_fkey(id, full_name)
          `)
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setMessages(data || []);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [user]);

  const markAsRead = async (messageId: string) => {
    if (!user) return;

    try {
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', messageId)
        .eq('receiver_id', user.id);
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cmr-green"></div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="w-6 h-6 text-cmr-green" />
          <h1 className="text-2xl font-bold">Mes messages</h1>
        </div>

        <div className="space-y-4">
          {messages.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-gray-500">
                  Vous n'avez pas encore de messages
                </p>
              </CardContent>
            </Card>
          ) : (
            messages.map((message) => {
              const isReceiver = user?.id === message.receiver.id;
              const otherPerson = isReceiver ? message.sender : message.receiver;

              return (
                <Link 
                  key={message.id} 
                  to={`/property/${message.property?.id}`}
                  onClick={() => isReceiver && !message.read && markAsRead(message.id)}
                >
                  <Card className={`transition-colors hover:bg-gray-50 ${!message.read && isReceiver ? 'bg-blue-50' : ''}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between text-base">
                        <span>{otherPerson.full_name || "Utilisateur"}</span>
                        <span className="text-sm text-gray-500">
                          {format(new Date(message.created_at), "d MMM yyyy 'à' HH:mm", { locale: fr })}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {message.property && (
                        <p className="text-sm text-gray-500 mb-1">
                          Re: {message.property.title}
                        </p>
                      )}
                      <p className="text-gray-600">{message.content}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
