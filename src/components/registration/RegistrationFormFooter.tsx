
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getCurrentUserType } from "./UserTypeSelector";

interface RegistrationFormFooterProps {
  isSubmitting: boolean;
  isAwaitingVerification: boolean;
}

export function RegistrationFormFooter({ 
  isSubmitting, 
  isAwaitingVerification 
}: RegistrationFormFooterProps) {
  const currentUserType = getCurrentUserType();

  return (
    <div className="flex flex-col space-y-4">
      {currentUserType && !isAwaitingVerification && (
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
    </div>
  );
}
