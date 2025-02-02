import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const userTypes = [
  { id: "proprietaire", label: "Propriétaire" },
  { id: "vendeur", label: "Vendeur" },
  { id: "acheteur", label: "Acheteur" },
  { id: "geometre", label: "Géomètre" },
  { id: "notaire", label: "Notaire" },
  { id: "clerc", label: "Clerc de notaire" },
];

export default function Register() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");

  const handleContinue = () => {
    if (userType) {
      navigate(`/register/${userType}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-xl shadow-lg">
          <div>
            <h2 className="text-xl font-semibold text-center mb-6">
              Choisissez votre profil
            </h2>
            
            <RadioGroup
              value={userType}
              onValueChange={setUserType}
              className="grid gap-4"
            >
              {userTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={type.id} id={type.id} />
                  <Label htmlFor={type.id} className="text-base">
                    {type.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <Button
              onClick={handleContinue}
              className="w-full mt-6 bg-cmr-green hover:bg-cmr-green/90"
              disabled={!userType}
            >
              Continuer
            </Button>

            <div className="text-center mt-4">
              <button
                onClick={() => navigate("/login")}
                className="text-cmr-green hover:underline text-sm"
              >
                Déjà inscrit ? Se connecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}