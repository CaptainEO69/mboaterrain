
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface PersonalInfoSectionProps {
  idNumber: string;
  profession: string;
  residencePlace: string;
  userType: string;
  isEditing: boolean;
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
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string | number | boolean } }) => void;
}

export function PersonalInfoSection({
  idNumber,
  profession,
  residencePlace,
  userType,
  isEditing,
  propertyType,
  agencyName,
  commercialRegister,
  operationZone,
  estimatedBudget,
  desiredLocation,
  approvalNumber,
  interventionZone,
  notaryOffice,
  experienceQualifications,
  companyName,
  legalStatus,
  investmentType,
  estimatedFundingCapacity,
  serviceType,
  transportCapacity,
  insuranceIncluded,
  onInputChange,
}: PersonalInfoSectionProps) {
  
  // Champs communs à plusieurs profils
  const renderCommonFields = () => (
    <>
      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Numéro CNI / Passeport</Label>
        <Input
          name="id_number"
          value={idNumber || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>

      {userType !== "buyer" && (
        <div className="space-y-2">
          <Label className="text-cmr-green font-medium">Profession</Label>
          <Input
            name="profession"
            value={profession || ""}
            onChange={onInputChange}
            disabled={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">
          {userType === "seller" ? "Adresse de l'agence ou du bureau" : "Adresse actuelle"}
        </Label>
        <Input
          name="residence_place"
          value={residencePlace || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>
    </>
  );

  // Champs spécifiques pour chaque type de profil
  const renderProfileSpecificFields = () => {
    switch(userType) {
      case "owner":
        return (
          <div className="space-y-2">
            <Label className="text-cmr-green font-medium">Type de bien à vendre/louer</Label>
            <Select
              value={propertyType || ""}
              onValueChange={(value) => 
                onInputChange({ target: { name: 'property_type', value } })
              }
              disabled={!isEditing}
            >
              <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
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
              <Label className="text-cmr-green font-medium">Nom de l'agence</Label>
              <Input
                name="agency_name"
                value={agencyName || ""}
                onChange={onInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-cmr-green font-medium">Registre de commerce (Si professionnel)</Label>
              <Input
                name="commercial_register"
                value={commercialRegister || ""}
                onChange={onInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-cmr-green font-medium">Zone d'opération</Label>
              <Input
                name="operation_zone"
                value={operationZone || ""}
                onChange={onInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
          </>
        );
      
      case "buyer":
        return (
          <>
            <div className="space-y-2">
              <Label className="text-cmr-green font-medium">Budget estimé</Label>
              <Input
                name="estimated_budget"
                type="number"
                value={estimatedBudget || ""}
                onChange={onInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-cmr-green font-medium">Type de bien recherché</Label>
              <Select
                value={propertyType || ""}
                onValueChange={(value) => 
                  onInputChange({ target: { name: 'property_type', value } })
                }
                disabled={!isEditing}
              >
                <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
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
              <Label className="text-cmr-green font-medium">Localisation souhaitée</Label>
              <Input
                name="desired_location"
                value={desiredLocation || ""}
                onChange={onInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
          </>
        );
      
      case "surveyor":
        return (
          <>
            <div className="space-y-2">
              <Label className="text-cmr-green font-medium">Numéro d'agrément / Attestation professionnelle</Label>
              <Input
                name="approval_number"
                value={approvalNumber || ""}
                onChange={onInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-cmr-green font-medium">Zone d'intervention</Label>
              <Input
                name="intervention_zone"
                value={interventionZone || ""}
                onChange={onInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
          </>
        );
      
      case "notary":
        return (
          <>
            <div className="space-y-2">
              <Label className="text-cmr-green font-medium">Nom de l'étude notariale</Label>
              <Input
                name="notary_office"
                value={notaryOffice || ""}
                onChange={onInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-cmr-green font-medium">Numéro d'agrément</Label>
              <Input
                name="approval_number"
                value={approvalNumber || ""}
                onChange={onInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
          </>
        );
      
      case "notary_clerk":
        return (
          <>
            <div className="space-y-2">
              <Label className="text-cmr-green font-medium">Nom de l'étude notariale</Label>
              <Input
                name="notary_office"
                value={notaryOffice || ""}
                onChange={onInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-cmr-green font-medium">Expérience et qualifications</Label>
              <Textarea
                name="experience_qualifications"
                value={experienceQualifications || ""}
                onChange={onInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
          </>
        );
      
      case "financier":
        return (
          <>
            <div className="space-y-2">
              <Label className="text-cmr-green font-medium">Nom de l'entreprise</Label>
              <Input
                name="company_name"
                value={companyName || ""}
                onChange={onInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-cmr-green font-medium">Registre de commerce / Statut légal</Label>
              <Input
                name="legal_status"
                value={legalStatus || ""}
                onChange={onInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-cmr-green font-medium">Type d'investissement</Label>
              <Select
                value={investmentType || ""}
                onValueChange={(value) => 
                  onInputChange({ target: { name: 'investment_type', value } })
                }
                disabled={!isEditing}
              >
                <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
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
              <Label className="text-cmr-green font-medium">Zone d'opération</Label>
              <Input
                name="operation_zone"
                value={operationZone || ""}
                onChange={onInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-cmr-green font-medium">Capacité de financement estimée</Label>
              <Input
                name="estimated_funding_capacity"
                value={estimatedFundingCapacity || ""}
                onChange={onInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
          </>
        );
      
      case "mover":
        return (
          <>
            <div className="space-y-2">
              <Label className="text-cmr-green font-medium">Nom de l'entreprise</Label>
              <Input
                name="company_name"
                value={companyName || ""}
                onChange={onInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-cmr-green font-medium">Type de service</Label>
              <Select
                value={serviceType || ""}
                onValueChange={(value) => 
                  onInputChange({ target: { name: 'service_type', value } })
                }
                disabled={!isEditing}
              >
                <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
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
              <Label className="text-cmr-green font-medium">Capacité de transport</Label>
              <Select
                value={transportCapacity || ""}
                onValueChange={(value) => 
                  onInputChange({ target: { name: 'transport_capacity', value } })
                }
                disabled={!isEditing}
              >
                <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
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
              <Label className="text-cmr-green font-medium">Zone d'intervention</Label>
              <Input
                name="intervention_zone"
                value={interventionZone || ""}
                onChange={onInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Switch
                checked={!!insuranceIncluded}
                onCheckedChange={(checked) => 
                  onInputChange({ target: { name: 'insurance_included', value: checked } })
                }
                disabled={!isEditing}
              />
              <Label className="text-cmr-green font-medium">Assurance incluse</Label>
            </div>
          </>
        );
      
      default:
        return (
          <div className="space-y-2">
            <Label className="text-cmr-green font-medium">Type de compte</Label>
            <Select
              value={userType || ""}
              onValueChange={(value) => 
                onInputChange({ target: { name: 'user_type', value } })
              }
              disabled={!isEditing}
            >
              <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
                <SelectValue placeholder="Choisir un type de compte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="owner">Propriétaire</SelectItem>
                <SelectItem value="seller">Agence/Mandataire</SelectItem>
                <SelectItem value="buyer">Acheteur/Locataire</SelectItem>
                <SelectItem value="surveyor">Géomètre</SelectItem>
                <SelectItem value="notary">Notaire</SelectItem>
                <SelectItem value="notary_clerk">Clerc de notaire</SelectItem>
                <SelectItem value="financier">Financier Lotisseur</SelectItem>
                <SelectItem value="mover">Déménageur</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
    }
  };

  return (
    <>
      {renderCommonFields()}
      {renderProfileSpecificFields()}
    </>
  );
}
