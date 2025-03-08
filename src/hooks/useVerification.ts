
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useVerification() {
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  // Generate a random 6-digit code
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Send verification code via SMS
  const sendSMSVerification = async (phoneNumber: string) => {
    try {
      setIsSendingCode(true);
      const code = generateVerificationCode();
      
      // Store the code in localStorage temporarily
      localStorage.setItem("verification_code", code);
      localStorage.setItem("verification_expires", (Date.now() + 600000).toString()); // 10 minutes
      
      console.log("Sending SMS verification with code:", code, "to phone:", phoneNumber);
      
      // Format the phone number correctly
      let formattedPhone = phoneNumber;
      if (!phoneNumber.startsWith("+")) {
        // Check if it starts with a country code without the plus
        if (phoneNumber.startsWith("237") || phoneNumber.startsWith("33") || phoneNumber.startsWith("1")) {
          formattedPhone = "+" + phoneNumber;
        } else {
          // Default to Cameroon country code if none provided
          formattedPhone = "+237" + phoneNumber.replace(/^0+/, "");
        }
      }
      
      console.log("Using formatted phone number for SMS:", formattedPhone);
      
      // Appel à la fonction Edge Function
      const { data, error } = await supabase.functions.invoke("send-verification-sms", {
        body: { phoneNumber: formattedPhone, code },
      });

      if (error) {
        console.error("Error response from function:", error);
        throw error;
      }
      
      console.log("SMS verification function response:", data);
      
      setIsCodeSent(true);
      toast.success("Un code de vérification a été envoyé par SMS");
      return true;
    } catch (error: any) {
      console.error("Error sending SMS verification:", error);
      toast.error(error.message || "Erreur lors de l'envoi du SMS");
      return false;
    } finally {
      setIsSendingCode(false);
    }
  };

  // Send verification code via Email
  const sendEmailVerification = async (email: string) => {
    try {
      setIsSendingCode(true);
      
      // Use the same code for both SMS and email
      const code = localStorage.getItem("verification_code") || generateVerificationCode();
      
      // Store the code in localStorage
      localStorage.setItem("verification_code", code);
      localStorage.setItem("verification_expires", (Date.now() + 600000).toString()); // 10 minutes
      
      console.log("Sending email verification with code:", code, "to email:", email);
      
      // Appel à la fonction Edge Function
      const { data, error } = await supabase.functions.invoke("send-verification-email", {
        body: { email, code },
      });

      if (error) {
        console.error("Error sending email:", error);
        throw error;
      }
      
      console.log("Email verification function response:", data);
      
      setIsCodeSent(true);
      toast.success("Un code de vérification a été envoyé par email");
      return true;
    } catch (error: any) {
      console.error("Error sending email verification:", error);
      toast.error(error.message || "Erreur lors de l'envoi de l'email");
      return false;
    } finally {
      setIsSendingCode(false);
    }
  };

  // Verify the provided code
  const verifyCode = (code: string) => {
    setIsVerifying(true);
    
    try {
      const storedCode = localStorage.getItem("verification_code");
      const expiresStr = localStorage.getItem("verification_expires");
      
      console.log("Verifying code:", code, "against stored code:", storedCode);
      
      if (!storedCode || !expiresStr) {
        toast.error("Aucun code de vérification trouvé");
        return false;
      }
      
      const expires = parseInt(expiresStr);
      if (Date.now() > expires) {
        toast.error("Le code de vérification a expiré");
        return false;
      }
      
      if (code !== storedCode) {
        toast.error("Code de vérification incorrect");
        return false;
      }
      
      // Clean up localStorage
      localStorage.removeItem("verification_code");
      localStorage.removeItem("verification_expires");
      
      toast.success("Vérification réussie");
      return true;
    } catch (error) {
      console.error("Error verifying code:", error);
      toast.error("Erreur lors de la vérification du code");
      return false;
    } finally {
      setIsVerifying(false);
    }
  };

  return {
    verificationCode,
    setVerificationCode,
    isCodeSent,
    isVerifying,
    isSendingCode,
    sendSMSVerification,
    sendEmailVerification,
    verifyCode,
  };
}
