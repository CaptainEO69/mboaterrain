
import { useRegistrationState } from "./registration/useRegistrationState";
import { useRegistrationSubmit } from "./registration/useRegistrationSubmit";
import { RegistrationResult } from "@/types/registration";

export function useRegistrationForm(type: string | null): RegistrationResult {
  const { formData, setters } = useRegistrationState();
  const { handleSubmit: submitHandler } = useRegistrationSubmit(type);

  const handleSubmit = async (e: React.FormEvent) => {
    return await submitHandler(e, formData);
  };

  return {
    formData,
    setters,
    handleSubmit,
  };
}
