
import { useState, useEffect } from "react";
import { RegistrationFormData, RegistrationFormSetters } from "@/types/registration";
import { PersonalInfoSection } from "@/components/registration/form-sections/PersonalInfoSection";
import { ProfessionalSection } from "@/components/registration/form-sections/ProfessionalSection";
import { VerificationForm } from "@/components/auth/VerificationForm";
import { getCurrentUserType } from "./UserTypeSelector";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import { CountryCode } from "libphonenumber-js";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface RegistrationFormContentProps {
  formData: RegistrationFormData;
  setters: RegistrationFormSetters;
  isAwaitingVerification: boolean;
  verificationProps: {
    phoneNumber: string;
    email: string;
    onVerificationSuccess: () => void;
    onResendCode: () => Promise<void>;
    verificationCode: string;
    setVerificationCode: (code: string) => void;
    verifyCode: (code: string) => boolean;
    isVerifying: boolean;
    isResending: boolean;
  };
}

export function RegistrationFormContent({
  formData,
  setters,
  isAwaitingVerification,
  verificationProps,
}: RegistrationFormContentProps) {
  const currentUserType = getCurrentUserType();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [verificationCompleted, setVerificationCompleted] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<CountryCode>("CM");

  const handleVerificationSuccess = () => {
    setVerificationCompleted(true);
    toast.success("Vérification réussie! Vous pouvez maintenant continuer.");
    
    // Appeler la fonction de succès fournie par les props
    if (verificationProps.onVerificationSuccess) {
      verificationProps.onVerificationSuccess();
    }
  };

  const handleCountryChange = (code: CountryCode) => {
    setCountryCode(code);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawPhoneNumber = e.target.value;
    if (rawPhoneNumber) {
      // Utiliser l'indicatif du pays sélectionné
      setters.setPhoneNumber(`+${countryCode}${rawPhoneNumber}`);
    } else {
      setters.setPhoneNumber("");
    }
  };

  if (isAwaitingVerification) {
    return <VerificationForm 
      {...verificationProps} 
      onVerificationSuccess={handleVerificationSuccess}
    />;
  }

  return (
    <div className="space-y-6">
      {/* Champs de base pour tous les types d'utilisateurs */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setters.setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setters.setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Adresse e-mail</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setters.setEmail(e.target.value)}
            required
          />
        </div>

        <PhoneInput
          label="Téléphone"
          countryCode={countryCode}
          onCountryChange={handleCountryChange}
          value={formData.phoneNumber.replace(/^\+\d+/, "")}
          onChange={(e) => {
            const rawPhoneNumber = e.target.value;
            if (rawPhoneNumber) {
              setters.setPhoneNumber(`+${countryCode}${rawPhoneNumber}`);
            } else {
              setters.setPhoneNumber("");
            }
          }}
        />

        <div className="space-y-2">
          <Label htmlFor="birthDate">Date de naissance</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.birthDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.birthDate ? (
                  format(formData.birthDate, "PPP", { locale: fr })
                ) : (
                  <span>Sélectionner une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-auto p-0 bg-popover shadow-md border border-border" 
              align="start"
            >
              <Calendar
                mode="single"
                selected={formData.birthDate || undefined}
                onSelect={(date) => setters.setBirthDate(date)}
                initialFocus
                captionLayout="dropdown-buttons"
                fromYear={1930}
                toYear={2006}
                locale={fr}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setters.setPassword(e.target.value)}
            required
          />
        </div>
      </div>

      {currentUserType && (
        <>
          {(currentUserType === "owner" || 
            currentUserType === "seller" || 
            currentUserType === "surveyor" || 
            currentUserType === "notary" || 
            currentUserType === "notary_clerk" ||
            currentUserType === "financier" ||
            currentUserType === "mover") && (
            <PersonalInfoSection formData={formData} setters={setters} />
          )}

          {(currentUserType === "surveyor" || 
            currentUserType === "notary" || 
            currentUserType === "notary_clerk") && (
            <ProfessionalSection
              type={currentUserType as "surveyor" | "notary" | "notary_clerk"}
              formData={formData}
              setters={setters}
            />
          )}
        </>
      )}
    </div>
  );
}
