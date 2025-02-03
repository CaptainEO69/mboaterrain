import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { House, User, UserSquare2, Users, Scale, FileText } from "lucide-react";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-cmr-green">Choisissez votre profil</CardTitle>
          <CardDescription className="text-center">
            Sélectionnez le type de compte qui correspond à votre activité
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/register/form?type=owner">
            <Button variant="outline" className="w-full justify-start h-auto p-4 hover:border-cmr-green hover:bg-cmr-green/5">
              <House className="h-8 w-8 mr-4 text-cmr-green" />
              <div className="text-left">
                <div className="font-semibold text-cmr-green">Propriétaire</div>
                <div className="text-sm text-gray-500">Gérez vos biens immobiliers</div>
              </div>
            </Button>
          </Link>
          
          <Link to="/register/form?type=seller">
            <Button variant="outline" className="w-full justify-start h-auto p-4 hover:border-cmr-red hover:bg-cmr-red/5">
              <UserSquare2 className="h-8 w-8 mr-4 text-cmr-red" />
              <div className="text-left">
                <div className="font-semibold text-cmr-red">Vendeur</div>
                <div className="text-sm text-gray-500">Vendez des biens immobiliers</div>
              </div>
            </Button>
          </Link>

          <Link to="/register/form?type=buyer">
            <Button variant="outline" className="w-full justify-start h-auto p-4 hover:border-cmr-yellow hover:bg-cmr-yellow/5">
              <User className="h-8 w-8 mr-4 text-cmr-yellow" />
              <div className="text-left">
                <div className="font-semibold text-cmr-yellow">Acheteur</div>
                <div className="text-sm text-gray-500">Trouvez votre bien idéal</div>
              </div>
            </Button>
          </Link>

          <Link to="/register/form?type=surveyor">
            <Button variant="outline" className="w-full justify-start h-auto p-4 hover:border-cmr-green hover:bg-cmr-green/5">
              <Users className="h-8 w-8 mr-4 text-cmr-green" />
              <div className="text-left">
                <div className="font-semibold text-cmr-green">Géomètre</div>
                <div className="text-sm text-gray-500">Proposez vos services</div>
              </div>
            </Button>
          </Link>

          <Link to="/register/form?type=notary">
            <Button variant="outline" className="w-full justify-start h-auto p-4 hover:border-cmr-red hover:bg-cmr-red/5">
              <Scale className="h-8 w-8 mr-4 text-cmr-red" />
              <div className="text-left">
                <div className="font-semibold text-cmr-red">Notaire</div>
                <div className="text-sm text-gray-500">Gérez les transactions</div>
              </div>
            </Button>
          </Link>

          <Link to="/register/form?type=notary_clerk">
            <Button variant="outline" className="w-full justify-start h-auto p-4 hover:border-cmr-yellow hover:bg-cmr-yellow/5">
              <FileText className="h-8 w-8 mr-4 text-cmr-yellow" />
              <div className="text-left">
                <div className="font-semibold text-cmr-yellow">Clerc de notaire</div>
                <div className="text-sm text-gray-500">Assistez les transactions</div>
              </div>
            </Button>
          </Link>
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