
import { PropertyForm } from "@/components/sell/PropertyForm";
import { Building2, MapPin, Calendar } from "lucide-react";
import { CFAIcon } from "@/components/icons/CFAIcon";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Rent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (formData: FormData) => {
    if (!user?.profile?.id) {
      toast.error("Vous devez être connecté pour publier une annonce");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Données du formulaire:", Object.fromEntries(formData));
      
      // Implémentation de la logique de soumission de location
      // Ce serait ici qu'on enverrait les données à Supabase
      
      toast.success("Annonce de location publiée avec succès");
      navigate('/');
    } catch (error: any) {
      console.error('Error:', error);
      toast.error("Erreur lors de la publication de l'annonce de location");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour gérer les clics sur les cartes de fonctionnalités
  const scrollToForm = () => {
    const formElement = document.querySelector('.property-form-container');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-gradient-to-r from-cmr-green to-cmr-green/80 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Mettre un bien en location au Cameroun</h1>
          <p className="text-lg opacity-90 mb-8">
            Publiez votre annonce de location et trouvez rapidement des locataires
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div 
              className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-white/20 transition-colors"
              onClick={scrollToForm}
            >
              <Building2 className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Types de Location</h3>
                <p className="text-sm opacity-75">Meublé ou non meublé</p>
              </div>
            </div>
            <div 
              className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-white/20 transition-colors"
              onClick={scrollToForm}
            >
              <MapPin className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Emplacement</h3>
                <p className="text-sm opacity-75">Précisez la localisation</p>
              </div>
            </div>
            <div 
              className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-white/20 transition-colors"
              onClick={scrollToForm}
            >
              <Calendar className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Type de Bail</h3>
                <p className="text-sm opacity-75">Mensuel ou journalier</p>
              </div>
            </div>
            <div 
              className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-white/20 transition-colors"
              onClick={scrollToForm}
            >
              <CFAIcon className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Prix Flexibles</h3>
                <p className="text-sm opacity-75">Définissez vos tarifs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6">
        <div className="bg-white rounded-lg shadow-lg p-6 property-form-container">
          <PropertyForm 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting}
            transactionType="rent"
          />
        </div>
      </div>
    </div>
  );
}
