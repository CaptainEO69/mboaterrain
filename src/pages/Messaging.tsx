
import { MessageList } from "@/components/messaging/MessageList";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Messaging() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen py-8">
        <MessageList />
      </div>
    </ProtectedRoute>
  );
}
