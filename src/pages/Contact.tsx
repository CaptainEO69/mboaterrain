
import { BottomNav } from "@/components/BottomNav";
import { ContactInfo } from "@/components/contact/ContactInfo";

export default function Contact() {
  return (
    <div className="min-h-screen pb-20">
      <div className="bg-cmr-green text-white py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-2xl md:text-3xl font-bold">Contactez-nous</h1>
          <p className="mt-2 opacity-90">Nous sommes là pour répondre à toutes vos questions</p>
        </div>
      </div>
      
      <div className="container mx-auto max-w-4xl p-4">
        <ContactInfo />
      </div>
      
      <BottomNav />
    </div>
  );
}
