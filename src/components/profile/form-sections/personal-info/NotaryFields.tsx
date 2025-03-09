
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";

interface Notary {
  name: string;
  approval_number: string;
}

interface NotaryFieldsProps {
  notaryOffice?: string;
  approvalNumber?: string;
  associatedNotaries?: Notary[];
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => void;
}

export function NotaryFields({ 
  notaryOffice, 
  approvalNumber,
  associatedNotaries = [],
  isEditing, 
  onInputChange
}: NotaryFieldsProps) {
  const [notaries, setNotaries] = useState<Notary[]>(associatedNotaries || []);
  const [newNotaryName, setNewNotaryName] = useState("");
  const [newNotaryApproval, setNewNotaryApproval] = useState("");
  
  const handleAddNotary = () => {
    if (newNotaryName.trim() && newNotaryApproval.trim()) {
      const updatedNotaries = [
        ...notaries,
        { name: newNotaryName, approval_number: newNotaryApproval }
      ];
      
      setNotaries(updatedNotaries);
      
      // Update parent component state
      onInputChange({ 
        target: { 
          name: "associated_notaries", 
          value: updatedNotaries 
        } 
      });
      
      // Clear input fields
      setNewNotaryName("");
      setNewNotaryApproval("");
    }
  };
  
  const handleRemoveNotary = (index: number) => {
    const updatedNotaries = notaries.filter((_, i) => i !== index);
    setNotaries(updatedNotaries);
    
    // Update parent component state
    onInputChange({ 
      target: { 
        name: "associated_notaries", 
        value: updatedNotaries 
      } 
    });
  };

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
      
      {isEditing && (
        <div className="mt-4 border border-gray-200 rounded-md p-4 bg-gray-50">
          <h4 className="font-medium text-cmr-green mb-2">Notaires associés</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Nom du notaire</Label>
              <Input
                value={newNotaryName}
                onChange={(e) => setNewNotaryName(e.target.value)}
                placeholder="Nom du notaire"
              />
            </div>
            <div className="space-y-2">
              <Label>Numéro d'agrément</Label>
              <Input
                value={newNotaryApproval}
                onChange={(e) => setNewNotaryApproval(e.target.value)}
                placeholder="Numéro d'agrément"
              />
            </div>
          </div>
          
          <Button 
            type="button"
            onClick={handleAddNotary}
            className="bg-cmr-green hover:bg-cmr-green/90 w-full md:w-auto"
            disabled={!newNotaryName || !newNotaryApproval}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un notaire associé
          </Button>
        </div>
      )}
      
      {notaries.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium text-cmr-green mb-2">Liste des notaires associés</h4>
          <div className="space-y-2">
            {notaries.map((notary, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium">{notary.name}</p>
                  <p className="text-sm text-gray-500">Agrément: {notary.approval_number}</p>
                </div>
                {isEditing && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveNotary(index)}
                    className="text-cmr-red hover:bg-cmr-red/10 border-cmr-red"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
