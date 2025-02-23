
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";
import { BasicInfoSection } from "@/components/registration/form-sections/BasicInfoSection";
import { PersonalInfoSection } from "@/components/registration/form-sections/PersonalInfoSection";
import { ProfessionalSection } from "@/components/registration/form-sections/ProfessionalSection";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const userTypes = [
  { value: "owner", label: "Propriétaire" },
  { value: "seller", label: "Vendeur" },
  { value: "buyer", label: "Acheteur" },
  { value: "surveyor", label: "Géomètre" },
  { value: "notary", label: "Notaire" },
  { value: "notary_clerk", label: "Clerc de notaire" },
];

const getCurrentUserType = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("type") || "";
};

export default function RegisterForm() {
  const navigate = useNavigate();
  const currentUserType = getCurrentUserType();
  const { formData, setters, handleSubmit } = useRegistrationForm(currentUserType);

  const handleUserTypeChange = (value: string) => {
    navigate(`/register/form?type=${value}`);
  };

  const getUserTypeLabel = (type: string) => {
    const userType = userTypes.find(ut => ut.value === type);
    return userType ? userType.label : "";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Inscription
          </CardTitle>
          <CardDescription className="text-center">
            Créez votre compte MboaTer
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Type de compte</Label>
              <Select
                value={getCurrentUserType()}
                onValueChange={handleUserTypeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un type de compte" />
                </SelectTrigger>
                <SelectContent>
                  {userTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {getCurrentUserType() && (
              <>
                <BasicInfoSection formData={formData} setters={setters} />

                {(getCurrentUserType() === "owner" || 
                  getCurrentUserType() === "seller" || 
                  getCurrentUserType() === "surveyor" || 
                  getCurrentUserType() === "notary" || 
                  getCurrentUserType() === "notary_clerk") && (
                  <PersonalInfoSection formData={formData} setters={setters} />
                )}

                {(getCurrentUserType() === "surveyor" || 
                  getCurrentUserType() === "notary" || 
                  getCurrentUserType() === "notary_clerk") && (
                  <ProfessionalSection
                    type={getCurrentUserType() as "surveyor" | "notary" | "notary_clerk"}
                    formData={formData}
                    setters={setters}
                  />
                )}
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            {getCurrentUserType() && (
              <Button type="submit" className="w-full">
                S'inscrire
              </Button>
            )}
            <p className="text-center text-sm">
              Déjà inscrit ?{" "}
              <Link to="/login" className="font-medium text-cmr-green hover:text-cmr-green/80">
                Se connecter
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
