
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/lib/auth";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";
import { useContactForm } from "@/hooks/useContactForm";
import { Alert } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

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
    files,
    handleAddFile,
    handleRemoveFile,
    isLoading,
    debugInfo,
    showConfirmation,
    handleSubmit
  } = useContactForm(user?.email);

  return (
    <div className="min-h-screen pb-20">
      <h1 className="text-xl font-bold p-4">Contactez-nous</h1>
      
      <div className="p-4">
        {showConfirmation && (
          <Alert className="mb-4 bg-green-50 border-green-200 text-green-800">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">Message envoyé avec succès!</span>
            </div>
            <p className="ml-7 text-sm">Nous vous répondrons dans les plus brefs délais.</p>
          </Alert>
        )}
        
        <ContactInfo />
        
        <ContactForm
          name={name}
          email={email}
          subject={subject}
          message={message}
          files={files}
          isLoading={isLoading}
          debugInfo={debugInfo}
          onNameChange={setName}
          onEmailChange={setEmail}
          onSubjectChange={setSubject}
          onMessageChange={setMessage}
          onAddFile={handleAddFile}
          onRemoveFile={handleRemoveFile}
          onSubmit={handleSubmit}
        />
      </div>
      
      <BottomNav />
    </div>
  );
}
