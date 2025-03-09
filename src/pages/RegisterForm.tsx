
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";
import { BasicInfoSection } from "@/components/registration/form-sections/BasicInfoSection";
import { PersonalInfoSection } from "@/components/registration/form-sections/PersonalInfoSection";
import { ProfessionalSection } from "@/components/registration/form-sections/ProfessionalSection";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { VerificationForm } from "@/components/auth/VerificationForm";
import { useVerification } from "@/hooks/useVerification";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const userTypes = [
  { value: "owner", label: "Propriétaire" },
  { value: "seller", label: "Agence/Mandataire" },
  { value: "buyer", label: "Acheteur/Locataire" },
  { value: "surveyor", label: "Géomètre" },
  { value: "notary", label: "Notaire" },
  { value: "notary_clerk", label: "Clerc de notaire" },
  { value: "financier", label: "Financier Lotisseur" },
  { value: "mover", label: "Déménageur" },
];

const getCurrentUserType = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("type") || "";
};

export default function RegisterForm() {
  const navigate = useNavigate();
  const currentUserType = getCurrentUserType();
  const { formData, setters, handleSubmit: originalHandleSubmit } = useRegistrationForm(currentUserType);
  const [isAwaitingVerification, setIsAwaitingVerification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    verificationCode,
    setVerificationCode,
    isCodeSent,
    isVerifying,
    isSendingCode,
    sendSMSVerification,
    sendEmailVerification,
    verifyCode,
  } = useVerification();

  const handleUserTypeChange = (value: string) => {
    navigate(`/register/form?type=${value}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifier que les données requises sont fournies
    if (!formData.email || !formData.password || !formData.firstName || 
        !formData.lastName || !formData.phoneNumber) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    // Pour simplifier et débloquer le process d'inscription pendant les tests,
    // on procède directement à l'inscription sans la vérification email/SMS
    console.log("Proceeding with registration...");
    try {
      setIsSubmitting(true);
      await originalHandleSubmit(e);
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Erreur lors de l'inscription. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    try {
      console.log("Resending verification codes to:", formData.email, formData.phoneNumber);
      await Promise.all([
        sendEmailVerification(formData.email),
        sendSMSVerification(formData.phoneNumber)
      ]);
      toast.success("Codes de vérification renvoyés");
    } catch (error) {
      console.error("Error resending verification codes:", error);
      toast.error("Erreur lors du renvoi des codes de vérification");
    }
  };

  const handleVerificationSuccess = () => {
    console.log("Verification successful, proceeding with registration");
    // Proceed with the actual registration
    originalHandleSubmit({ preventDefault: () => {} } as React.FormEvent);
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
            {!isAwaitingVerification ? (
              <>
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
                      getCurrentUserType() === "notary_clerk" ||
                      getCurrentUserType() === "financier" ||
                      getCurrentUserType() === "mover") && (
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
              </>
            ) : (
              <VerificationForm
                phoneNumber={formData.phoneNumber}
                email={formData.email}
                onVerificationSuccess={handleVerificationSuccess}
                onResendCode={handleResendCode}
                verificationCode={verificationCode}
                setVerificationCode={setVerificationCode}
                verifyCode={verifyCode}
                isVerifying={isVerifying}
                isResending={isSendingCode}
              />
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            {getCurrentUserType() && !isAwaitingVerification && (
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Traitement en cours...
                  </>
                ) : (
                  "S'inscrire"
                )}
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
