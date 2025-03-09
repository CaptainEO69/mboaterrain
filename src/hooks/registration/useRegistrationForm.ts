
import { useRegistrationState } from "./useRegistrationState";
import { useRegistrationSubmit } from "./useRegistrationSubmit";
import { RegistrationResult } from "@/types/registration";

export function useRegistrationForm(type: string | null): RegistrationResult {
  const { formData, setters } = useRegistrationState();
  const { handleSubmit: submitHandler } = useRegistrationSubmit(type);

  const handleSubmit = async (e: React.FormEvent) => {
    await submitHandler(e, formData);
  };

  return {
    formData,
    setters,
    handleSubmit,
  };
}
