
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Nos coordonnées</h2>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <Mail className="w-5 h-5 text-cmr-green mt-1 mr-3" />
          <div>
            <p className="font-medium">Email</p>
            <a href="mailto:contactmboater@yahoo.com" className="text-cmr-green hover:underline">
              contactmboater@yahoo.com
            </a>
          </div>
        </div>
        
        <div className="flex items-start">
          <Phone className="w-5 h-5 text-cmr-green mt-1 mr-3" />
          <div>
            <p className="font-medium">Téléphone</p>
            <p>+237 6XX XXX XXX</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-cmr-green mt-1 mr-3" />
          <div>
            <p className="font-medium">Adresse</p>
            <p>Douala, Cameroun</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Clock className="w-5 h-5 text-cmr-green mt-1 mr-3" />
          <div>
            <p className="font-medium">Heures d'ouverture</p>
            <p>Lundi - Vendredi: 9h - 17h</p>
          </div>
        </div>
      </div>
    </div>
  );
}
