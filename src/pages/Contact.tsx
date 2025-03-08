
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/lib/auth";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";
import { useContactForm } from "@/hooks/useContactForm";

export default function Contact() {
  const { user } = useAuth();
  const {
    name,
    setName,
    email,
    setEmail,
    subject,
    setSubject,
    message,
    setMessage,
    isLoading,
    debugInfo,
    handleSubmit
  } = useContactForm(user?.email);

  return (
    <div className="min-h-screen pb-20">
      <h1 className="text-xl font-bold p-4">Contactez-nous</h1>
      
      <div className="p-4">
        <ContactInfo />
        
        <ContactForm
          name={name}
          email={email}
          subject={subject}
          message={message}
          isLoading={isLoading}
          debugInfo={debugInfo}
          onNameChange={setName}
          onEmailChange={setEmail}
          onSubjectChange={setSubject}
          onMessageChange={setMessage}
          onSubmit={handleSubmit}
        />
      </div>
      
      <BottomNav />
    </div>
  );
}
