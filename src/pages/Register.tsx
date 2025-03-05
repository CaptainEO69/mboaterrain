
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { House, User, UserSquare2, Users, Scale, FileText } from "lucide-react";
import { UserTypeCard } from "@/components/registration/UserTypeCard";

const userTypes = [
  {
    type: "owner",
    title: "Propriétaire",
    description: "Gérez vos biens immobiliers",
    icon: House,
    color: "green" as const,
  },
  {
    type: "seller",
    title: "Agence/Mandataire",
    description: "Vendez des biens immobiliers",
    icon: UserSquare2,
    color: "red" as const,
  },
  {
    type: "buyer",
    title: "Acheteur/Locataire",
    description: "Trouvez votre bien idéal",
    icon: User,
    color: "yellow" as const,
  },
  {
    type: "surveyor",
    title: "Géomètre",
    description: "Proposez vos services",
    icon: Users,
    color: "green" as const,
  },
  {
    type: "notary",
    title: "Notaire",
    description: "Gérez les transactions",
    icon: Scale,
    color: "red" as const,
  },
  {
    type: "notary_clerk",
    title: "Clerc de notaire",
    description: "Assistez les transactions",
    icon: FileText,
    color: "yellow" as const,
  },
];

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-cmr-green">
            Choisissez votre profil
          </CardTitle>
          <CardDescription className="text-center">
            Sélectionnez le type de compte qui correspond à votre activité
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userTypes.map((userType) => (
            <UserTypeCard key={userType.type} {...userType} />
          ))}
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm w-full">
            Déjà inscrit ?{" "}
            <Link to="/login" className="font-medium text-cmr-green hover:text-cmr-green/80">
              Se connecter
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
