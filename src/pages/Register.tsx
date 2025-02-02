import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Inscription</CardTitle>
          <CardDescription className="text-center">
            Choisissez votre type de compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link to="/register/owner">
            <Button variant="outline" className="w-full justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-semibold">Propriétaire</div>
                <div className="text-sm text-gray-500">Publiez vos biens immobiliers</div>
              </div>
            </Button>
          </Link>
          <Link to="/register/agent">
            <Button variant="outline" className="w-full justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-semibold">Agent immobilier</div>
                <div className="text-sm text-gray-500">Gérez des biens pour vos clients</div>
              </div>
            </Button>
          </Link>
          <Link to="/register/buyer">
            <Button variant="outline" className="w-full justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-semibold">Acheteur</div>
                <div className="text-sm text-gray-500">Trouvez le bien de vos rêves</div>
              </div>
            </Button>
          </Link>
          <Link to="/register/renter">
            <Button variant="outline" className="w-full justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-semibold">Locataire</div>
                <div className="text-sm text-gray-500">Trouvez votre location idéale</div>
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