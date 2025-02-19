
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";
import { BasicInfoSection } from "@/components/registration/form-sections/BasicInfoSection";
import { PersonalInfoSection } from "@/components/registration/form-sections/PersonalInfoSection";
import { SellerSection } from "@/components/registration/form-sections/SellerSection";
import { ProfessionalSection } from "@/components/registration/form-sections/ProfessionalSection";

export default function RegisterForm() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const { formData, setters, handleSubmit } = useRegistrationForm(type);

  const getUserTypeLabel = () => {
    switch (type) {
      case "owner":
        return "Propriétaire";
      case "seller":
        return "Vendeur";
      case "buyer":
        return "Acheteur";
      case "surveyor":
        return "Géomètre";
      case "notary":
        return "Notaire";
      case "notary_clerk":
        return "Clerc de notaire";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Inscription {getUserTypeLabel()}
          </CardTitle>
          <CardDescription className="text-center">
            Créez votre compte MboaTer
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <BasicInfoSection formData={formData} setters={setters} />

            {(type === "owner" || type === "seller" || type === "surveyor" || type === "notary" || type === "notary_clerk") && (
              <PersonalInfoSection formData={formData} setters={setters} />
            )}

            {type === "seller" && (
              <SellerSection formData={formData} setters={setters} />
            )}

            {(type === "surveyor" || type === "notary" || type === "notary_clerk") && (
              <ProfessionalSection
                type={type as "surveyor" | "notary" | "notary_clerk"}
                formData={formData}
                setters={setters}
              />
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              S'inscrire
            </Button>
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
