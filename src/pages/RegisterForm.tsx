import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function RegisterForm() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const navigate = useNavigate();
  const { signUp } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [profession, setProfession] = useState("");
  const [residencePlace, setResidencePlace] = useState("");
  const [saleReason, setSaleReason] = useState("");
  const [isCertified, setIsCertified] = useState(false);
  const [notaryOffice, setNotaryOffice] = useState("");
  const [servicePrices, setServicePrices] = useState<Record<string, number>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      toast.success("Inscription réussie ! Veuillez vérifier votre email.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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
        navigate("/register");
        return "";
    }
  };

  const renderServicePricesFields = () => {
    if (type === "surveyor") {
      return (
        <div className="space-y-4">
          <h3 className="font-medium">Prix des services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Bornage</Label>
              <Input
                type="number"
                value={servicePrices.bornage || ""}
                onChange={(e) => setServicePrices({ ...servicePrices, bornage: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label>Implantation</Label>
              <Input
                type="number"
                value={servicePrices.implantation || ""}
                onChange={(e) => setServicePrices({ ...servicePrices, implantation: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label>Levée topographique</Label>
              <Input
                type="number"
                value={servicePrices.topographic || ""}
                onChange={(e) => setServicePrices({ ...servicePrices, topographic: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label>Dossier technique</Label>
              <Input
                type="number"
                value={servicePrices.technical_file || ""}
                onChange={(e) => setServicePrices({ ...servicePrices, technical_file: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>
      );
    }

    if (type === "notary" || type === "notary_clerk") {
      return (
        <div className="space-y-4">
          <h3 className="font-medium">Prix des services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Ouverture de dossier</Label>
              <Input
                type="number"
                value={servicePrices.file_opening || ""}
                onChange={(e) => setServicePrices({ ...servicePrices, file_opening: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label>Morcellement</Label>
              <Input
                type="number"
                value={servicePrices.subdivision || ""}
                onChange={(e) => setServicePrices({ ...servicePrices, subdivision: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label>Acte notarié de vente</Label>
              <Input
                type="number"
                value={servicePrices.sale_deed || ""}
                onChange={(e) => setServicePrices({ ...servicePrices, sale_deed: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label>Mutation par décès</Label>
              <Input
                type="number"
                value={servicePrices.death_transfer || ""}
                onChange={(e) => setServicePrices({ ...servicePrices, death_transfer: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>
      );
    }

    return null;
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
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Téléphone</Label>
                <Input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Mot de passe</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                    value={birthPlace}
                    onChange={(e) => setBirthPlace(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Année de naissance</Label>
                  <Input
                    type="number"
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Numéro CNI</Label>
                  <Input
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Profession</Label>
                  <Input
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Lieu d'habitation</Label>
                  <Input
                    value={residencePlace}
                    onChange={(e) => setResidencePlace(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {type === "seller" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Motif de vente</Label>
                  <Textarea
                    value={saleReason}
                    onChange={(e) => setSaleReason(e.target.value)}
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
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isCertified}
                  onCheckedChange={setIsCertified}
                />
                <Label>Je suis assermenté</Label>
              </div>
            )}

            {(type === "notary" || type === "notary_clerk") && (
              <div className="space-y-2">
                <Label>Étude notariale</Label>
                <Input
                  value={notaryOffice}
                  onChange={(e) => setNotaryOffice(e.target.value)}
                  required
                />
              </div>
            )}

            {renderServicePricesFields()}
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