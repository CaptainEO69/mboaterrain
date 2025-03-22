
import { useRegistrationState } from "./registration/useRegistrationState";
import { useRegistrationSubmit } from "./registration/useRegistrationSubmit";
import { RegistrationResult } from "@/types/registration";

export function useRegistrationForm(type: string | null): RegistrationResult {
  const { formData, setters } = useRegistrationState();
  const { handleSubmit: submitHandler } = useRegistrationSubmit(type);

  const handleSubmit = async (e: React.FormEvent): Promise<{
    success: boolean;
    redirectToOTP?: boolean;
    message?: string;
  } | undefined> => {
    // Il est crucial de retourner explicitement le résultat de submitHandler
    // pour que le type corresponde à celui attendu dans RegistrationResult
    return await submitHandler(e, formData);
  };

  return {
    formData,
    setters,
    handleSubmit,
  };
}
