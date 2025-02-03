import { PropertyForm } from "@/components/sell/PropertyForm";
import { Building2, MapPin, BadgeDollarSign, Calendar } from "lucide-react";

export default function Rent() {
  return (
    <div className="min-h-screen pb-20">
      <div className="bg-gradient-to-r from-cmr-green to-cmr-green/80 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Mettre un bien en location au Cameroun</h1>
          <p className="text-lg opacity-90 mb-8">
            Publiez votre annonce de location et trouvez rapidement des locataires
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3">
              <Building2 className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Types de Location</h3>
                <p className="text-sm opacity-75">Meublé ou non meublé</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3">
              <MapPin className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Emplacement</h3>
                <p className="text-sm opacity-75">Précisez la localisation</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3">
              <Calendar className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Type de Bail</h3>
                <p className="text-sm opacity-75">Mensuel ou journalier</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3">
              <BadgeDollarSign className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Prix Flexibles</h3>
                <p className="text-sm opacity-75">Définissez vos tarifs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <PropertyForm transactionType="rent" />
        </div>
      </div>
    </div>
  );
}