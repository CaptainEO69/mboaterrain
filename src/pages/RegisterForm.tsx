
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ServicePricesForm } from "@/components/registration/ServicePricesForm";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";
import { LandTitleSection } from "@/components/sell/form-sections/LandTitleSection";

export default function RegisterForm() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const {
    formData,
    setters,
    handleSubmit,
  } = useRegistrationForm(type);

  const getUserTypeLabel = () => {
    switch (type) {
      case "owner":
        return "Propriétaire";
      case "seller":
        return "Vendeur";
      case "buyer":
        return "Acheteur";
      case "surveyor":
        return "Géomètre";
      case "notary":
        return "Notaire";
      case "notary_clerk":
        return "Clerc de notaire";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Inscription {getUserTypeLabel()}
          </CardTitle>
          <CardDescription className="text-center">
            Créez votre compte MboaTer
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nom complet</Label>
                <Input
                  value={formData.fullName}
                  onChange={(e) => setters.setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setters.setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Téléphone</Label>
                <Input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setters.setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Mot de passe</Label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setters.setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
            </div>

            {(type === "owner" || type === "seller" || type === "surveyor" || type === "notary" || type === "notary_clerk") && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Lieu de naissance</Label>
                  <Input
                    value={formData.birthPlace}
                    onChange={(e) => setters.setBirthPlace(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Année de naissance</Label>
                  <Input
                    type="number"
                    value={formData.birthYear}
                    onChange={(e) => setters.setBirthYear(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Numéro CNI</Label>
                  <Input
                    value={formData.idNumber}
                    onChange={(e) => setters.setIdNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Profession</Label>
                  <Input
                    value={formData.profession}
                    onChange={(e) => setters.setProfession(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Lieu d'habitation</Label>
                  <Input
                    value={formData.residencePlace}
                    onChange={(e) => setters.setResidencePlace(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {type === "seller" && (
              <div className="space-y-4">
                <LandTitleSection errors={{}} />
                <div className="space-y-2">
                  <Label>Motif de vente</Label>
                  <Textarea
                    value={formData.saleReason}
                    onChange={(e) => setters.setSaleReason(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Preuve du droit de vente</Label>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      // Handle file upload
                    }}
                    required
                  />
                </div>
              </div>
            )}

            {type === "surveyor" && (
              <>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.isCertified}
                    onCheckedChange={setters.setIsCertified}
                  />
                  <Label>Je suis assermenté</Label>
                </div>
                <ServicePricesForm
                  type="surveyor"
                  servicePrices={formData.servicePrices}
                  onChange={setters.setServicePrices}
                />
              </>
            )}

            {(type === "notary" || type === "notary_clerk") && (
              <>
                <div className="space-y-2">
                  <Label>Étude notariale</Label>
                  <Input
                    value={formData.notaryOffice}
                    onChange={(e) => setters.setNotaryOffice(e.target.value)}
                    required
                  />
                </div>
                <ServicePricesForm
                  type="notary"
                  servicePrices={formData.servicePrices}
                  onChange={setters.setServicePrices}
                />
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              S'inscrire
            </Button>
            <p className="text-center text-sm">
              Déjà inscrit ?{" "}
              <Link to="/login" className="font-medium text-cmr-green hover:text-cmr-green/80">
                Se connecter
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
