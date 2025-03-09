
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
      <div className="bg-cmr-green text-white py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-2xl md:text-3xl font-bold">Contactez-nous</h1>
          <p className="mt-2 opacity-90">Nous sommes là pour répondre à toutes vos questions</p>
        </div>
      </div>
      
      <div className="container mx-auto max-w-4xl p-4">
        {showConfirmation && (
          <Alert className="mb-6 bg-green-50 border-green-200 text-green-800">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">Message envoyé avec succès!</span>
            </div>
            <p className="ml-7 text-sm">Nous vous répondrons dans les plus brefs délais.</p>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <ContactInfo />
          </div>
          
          <div className="md:col-span-2">
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
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
