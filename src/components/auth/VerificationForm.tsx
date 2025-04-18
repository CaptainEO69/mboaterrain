
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";

interface VerificationFormProps {
  phoneNumber: string;
  email: string;
  onVerificationSuccess: () => void;
  onResendCode: () => Promise<void>;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  verifyCode: (code: string) => boolean;
  isVerifying: boolean;
  isResending: boolean;
}

export function VerificationForm({
  phoneNumber,
  email,
  onVerificationSuccess,
  onResendCode,
  verificationCode,
  setVerificationCode,
  verifyCode,
  isVerifying,
  isResending,
}: VerificationFormProps) {
  const [timer, setTimer] = useState(60);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);

  // Set up the timer when component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setTimerInterval(interval);
    
    // Clean up the interval when component unmounts
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const handleVerify = async () => {
    if (verificationCode.length !== 6) {
      toast.error("Veuillez entrer un code à 6 chiffres");
      return;
    }
    
    console.log("Tentative de vérification du code:", verificationCode);
    try {
      const result = verifyCode(verificationCode);
      setVerificationResult(result);
      
      if (result) {
        console.log("Vérification réussie");
        toast.success("Vérification réussie");
        onVerificationSuccess();
      } else {
        console.log("Échec de la vérification");
        toast.error("Code incorrect. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la vérification:", error);
      toast.error("Une erreur s'est produite lors de la vérification");
    }
  };

  const handleResend = async () => {
    try {
      await onResendCode();
      
      // Reset the timer
      setTimer(60);
      
      // Clear existing interval if any
      if (timerInterval) {
        clearInterval(timerInterval);
      }
      
      // Start a new timer
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      setTimerInterval(interval);
      toast.success("Un nouveau code a été envoyé");
    } catch (error) {
      console.error("Erreur lors de l'envoi du code:", error);
      toast.error("Erreur lors de l'envoi du code");
    }
  };

  // Auto-verify when all 6 digits are entered
  useEffect(() => {
    if (verificationCode.length === 6 && !isVerifying) {
      handleVerify();
    }
  }, [verificationCode]);

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return "";
    return phone.startsWith("+") ? phone : `+${phone}`;
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Vérification</h2>
        <p className="text-sm text-gray-500">
          Nous avons envoyé un code de vérification à votre téléphone ({formatPhoneNumber(phoneNumber)})
          {email && ` et votre email (${email})`}.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Code de vérification</Label>
        <InputOTP 
          maxLength={6} 
          value={verificationCode} 
          onChange={setVerificationCode}
          render={({ slots }) => (
            <InputOTPGroup>
              {slots.map((slot, index) => (
                <InputOTPSlot key={index} index={index} {...slot} />
              ))}
            </InputOTPGroup>
          )}
        />
      </div>

      <Button
        type="button"
        className="w-full"
        onClick={handleVerify}
        disabled={verificationCode.length !== 6 || isVerifying}
      >
        {isVerifying ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Vérification...
          </>
        ) : (
          "Vérifier"
        )}
      </Button>

      <div className="text-center">
        <Button
          variant="link"
          type="button"
          onClick={handleResend}
          disabled={timer > 0 || isResending}
          className="text-sm"
        >
          {timer > 0 ? (
            `Renvoyer le code (${timer}s)`
          ) : isResending ? (
            <>
              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            "Renvoyer le code"
          )}
        </Button>
      </div>
    </div>
  );
}
