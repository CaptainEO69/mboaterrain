import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const { type } = useParams();
  const navigate = useNavigate();
  const form = useForm();

  const getFormFields = () => {
    const commonFields = [
      { name: "nom", label: "Nom" },
      { name: "prenom", label: "Prénom" },
      { name: "lieuNaissance", label: "Lieu de naissance" },
      { name: "anneeNaissance", label: "Année de naissance" },
      { name: "numeroCNI", label: "Numéro de CNI" },
      { name: "profession", label: "Profession" },
      { name: "lieuHabitation", label: "Lieu d'habitation" },
    ];

    switch (type) {
      case "proprietaire":
        return commonFields;
      case "vendeur":
        return [
          ...commonFields,
          { name: "motifVente", label: "Motif de vente" },
          { name: "preuveVente", label: "Preuve du droit de vente" },
        ];
      case "acheteur":
        return commonFields.slice(0, 6); // Exclure lieu d'habitation
      case "geometre":
        return [
          ...commonFields,
          { name: "assermente", label: "Assermenté" },
          { name: "prixBornage", label: "Prix du bornage" },
          { name: "prixImplantation", label: "Prix de l'implantation" },
          { name: "prixLeveeTopographique", label: "Prix de la levée topographique" },
          { name: "prixDossierTechnique", label: "Prix du dossier technique" },
        ];
      case "notaire":
      case "clerc":
        return [
          ...commonFields,
          { name: "prixOuvertureDossier", label: "Prix d'ouverture du dossier" },
          { name: "prixMorcellement", label: "Prix du morcellement" },
          { name: "prixActeNotarie", label: "Prix de l'acte notarié" },
          { name: "prixMutationDeces", label: "Prix de la mutation par décès" },
          { name: "prixRetraitIndivision", label: "Prix des retraits d'indivision" },
        ];
      default:
        return commonFields;
    }
  };

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
    // TODO: Implement form submission logic
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6">
            Inscription - {type?.charAt(0).toUpperCase() + type?.slice(1)}
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {getFormFields().map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        <Input {...formField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <Button type="submit" className="w-full bg-cmr-green hover:bg-cmr-green/90">
                S'inscrire
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}