
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface PersonalInfoSectionProps {
  formData: {
    birthPlace: string;
    idNumber: string;
    profession: string;
    residencePlace: string;
    propertyType?: string;
    agencyName?: string;
    commercialRegister?: string;
    operationZone?: string;
    estimatedBudget?: number;
    desiredLocation?: string;
    approvalNumber?: string;
    interventionZone?: string;
    notaryOffice?: string;
    experienceQualifications?: string;
    companyName?: string;
    legalStatus?: string;
    investmentType?: string;
    estimatedFundingCapacity?: string;
    serviceType?: string;
    transportCapacity?: string;
    insuranceIncluded?: boolean;
  };
  setters: {
    setBirthPlace: (value: string) => void;
    setIdNumber: (value: string) => void;
    setProfession: (value: string) => void;
    setResidencePlace: (value: string) => void;
    setPropertyType?: (value: string) => void;
    setAgencyName?: (value: string) => void;
    setCommercialRegister?: (value: string) => void;
    setOperationZone?: (value: string) => void;
    setEstimatedBudget?: (value: number) => void;
    setDesiredLocation?: (value: string) => void;
    setApprovalNumber?: (value: string) => void;
    setInterventionZone?: (value: string) => void;
    setNotaryOffice?: (value: string) => void;
    setExperienceQualifications?: (value: string) => void;
    setCompanyName?: (value: string) => void;
    setLegalStatus?: (value: string) => void;
    setInvestmentType?: (value: string) => void;
    setEstimatedFundingCapacity?: (value: string) => void;
    setServiceType?: (value: string) => void;
    setTransportCapacity?: (value: string) => void;
    setInsuranceIncluded?: (value: boolean) => void;
  };
}

export function PersonalInfoSection({ formData, setters }: PersonalInfoSectionProps) {
  const userType = new URLSearchParams(window.location.search).get("type") || "";

  // Champs communs pour tous les profils
  const commonFields = (
    <>
      <div className="space-y-2">
        <Label>Lieu de naissance</Label>
        <Input
          value={formData.birthPlace}
          onChange={(e) => setters.setBirthPlace(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label>
          {userType === "buyer" ? "Numéro CNI / Passeport" : "Numéro CNI / Passeport"}
        </Label>
        <Input
          value={formData.idNumber}
          onChange={(e) => setters.setIdNumber(e.target.value)}
          required
        />
      </div>
      
      {userType !== "buyer" && (
        <div className="space-y-2">
          <Label>Profession</Label>
          <Input
            value={formData.profession}
            onChange={(e) => setters.setProfession(e.target.value)}
            required
          />
        </div>
      )}
      
      <div className="space-y-2">
        <Label>
          {userType === "seller" ? "Adresse de l'agence ou du bureau" : "Adresse actuelle"}
        </Label>
        <Input
          value={formData.residencePlace}
          onChange={(e) => setters.setResidencePlace(e.target.value)}
          required
        />
      </div>
    </>
  );

  // Champs spécifiques à chaque type de profil
  const renderSpecificFields = () => {
    switch (userType) {
      case "owner":
        return (
          <div className="space-y-2">
            <Label>Type de bien à vendre/louer</Label>
            <Select
              value={formData.propertyType || ""}
              onValueChange={(value) => setters.setPropertyType?.(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">Maison</SelectItem>
                <SelectItem value="land">Terrain</SelectItem>
                <SelectItem value="apartment">Appartement</SelectItem>
                <SelectItem value="commercial">Local commercial</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      
      case "seller":
        return (
          <>
            <div className="space-y-2">
              <Label>Nom de l'agence</Label>
              <Input
                value={formData.agencyName || ""}
                onChange={(e) => setters.setAgencyName?.(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Registre de commerce (Si professionnel)</Label>
              <Input
                value={formData.commercialRegister || ""}
                onChange={(e) => setters.setCommercialRegister?.(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Zone d'opération</Label>
              <Input
                value={formData.operationZone || ""}
                onChange={(e) => setters.setOperationZone?.(e.target.value)}
              />
            </div>
          </>
        );
      
      case "buyer":
        return (
          <>
            <div className="space-y-2">
              <Label>Budget estimé</Label>
              <Input
                type="number"
                value={formData.estimatedBudget || ""}
                onChange={(e) => setters.setEstimatedBudget?.(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Type de bien recherché</Label>
              <Select
                value={formData.propertyType || ""}
                onValueChange={(value) => setters.setPropertyType?.(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">Maison</SelectItem>
                  <SelectItem value="land">Terrain</SelectItem>
                  <SelectItem value="apartment">Appartement</SelectItem>
                  <SelectItem value="commercial">Local commercial</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Localisation souhaitée</Label>
              <Input
                value={formData.desiredLocation || ""}
                onChange={(e) => setters.setDesiredLocation?.(e.target.value)}
              />
            </div>
          </>
        );
      
      case "surveyor":
        return (
          <>
            <div className="space-y-2">
              <Label>Numéro d'agrément / Attestation professionnelle</Label>
              <Input
                value={formData.approvalNumber || ""}
                onChange={(e) => setters.setApprovalNumber?.(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Zone d'intervention</Label>
              <Input
                value={formData.interventionZone || ""}
                onChange={(e) => setters.setInterventionZone?.(e.target.value)}
              />
            </div>
          </>
        );
      
      case "notary":
        return (
          <>
            <div className="space-y-2">
              <Label>Nom de l'étude notariale</Label>
              <Input
                value={formData.notaryOffice || ""}
                onChange={(e) => setters.setNotaryOffice?.(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Numéro d'agrément</Label>
              <Input
                value={formData.approvalNumber || ""}
                onChange={(e) => setters.setApprovalNumber?.(e.target.value)}
              />
            </div>
          </>
        );
      
      case "notary_clerk":
        return (
          <>
            <div className="space-y-2">
              <Label>Nom de l'étude notariale</Label>
              <Input
                value={formData.notaryOffice || ""}
                onChange={(e) => setters.setNotaryOffice?.(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Expérience et qualifications</Label>
              <Textarea
                value={formData.experienceQualifications || ""}
                onChange={(e) => setters.setExperienceQualifications?.(e.target.value)}
              />
            </div>
          </>
        );
      
      case "financier":
        return (
          <>
            <div className="space-y-2">
              <Label>Nom de l'entreprise</Label>
              <Input
                value={formData.companyName || ""}
                onChange={(e) => setters.setCompanyName?.(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Registre de commerce / Statut légal</Label>
              <Input
                value={formData.legalStatus || ""}
                onChange={(e) => setters.setLegalStatus?.(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Type d'investissement</Label>
              <Select
                value={formData.investmentType || ""}
                onValueChange={(value) => setters.setInvestmentType?.(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="land_purchase">Achat et viabilisation de terrains</SelectItem>
                  <SelectItem value="subdivision">Construction de lotissements</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Zone d'opération</Label>
              <Input
                value={formData.operationZone || ""}
                onChange={(e) => setters.setOperationZone?.(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Capacité de financement estimée</Label>
              <Input
                value={formData.estimatedFundingCapacity || ""}
                onChange={(e) => setters.setEstimatedFundingCapacity?.(e.target.value)}
              />
            </div>
          </>
        );
      
      case "mover":
        return (
          <>
            <div className="space-y-2">
              <Label>Nom de l'entreprise</Label>
              <Input
                value={formData.companyName || ""}
                onChange={(e) => setters.setCompanyName?.(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Type de service</Label>
              <Select
                value={formData.serviceType || ""}
                onValueChange={(value) => setters.setServiceType?.(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Déménagement local</SelectItem>
                  <SelectItem value="national">Déménagement national</SelectItem>
                  <SelectItem value="international">Déménagement international</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Capacité de transport</Label>
              <Select
                value={formData.transportCapacity || ""}
                onValueChange={(value) => setters.setTransportCapacity?.(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une capacité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small_truck">Petit camion</SelectItem>
                  <SelectItem value="large_truck">Grand camion</SelectItem>
                  <SelectItem value="special_logistics">Logistique spéciale</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Zone d'intervention</Label>
              <Input
                value={formData.interventionZone || ""}
                onChange={(e) => setters.setInterventionZone?.(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Switch
                checked={!!formData.insuranceIncluded}
                onCheckedChange={(checked) => setters.setInsuranceIncluded?.(checked)}
              />
              <Label>Assurance incluse</Label>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {commonFields}
      {renderSpecificFields()}
    </div>
  );
}
