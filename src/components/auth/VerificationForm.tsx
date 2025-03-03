
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

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

  const handleVerify = async () => {
    if (verifyCode(verificationCode)) {
      onVerificationSuccess();
    }
  };

  const handleResend = async () => {
    await onResendCode();
    setTimer(60);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Vérification</h2>
        <p className="text-sm text-gray-500">
          Nous avons envoyé un code de vérification à votre email ({email}) et votre téléphone ({phoneNumber}).
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
