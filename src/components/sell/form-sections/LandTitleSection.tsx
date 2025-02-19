
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { FileCheck } from "lucide-react";

interface LandTitleSectionProps {
  errors: Record<string, string>;
}

export function LandTitleSection({ errors }: LandTitleSectionProps) {
  return (
    <div className="space-y-4 border-t pt-4">
      <div className="flex items-center gap-2 mb-4">
        <FileCheck className="w-5 h-5 text-cmr-green" />
        <h3 className="font-medium">Documents du titre foncier</h3>
      </div>

      <Tabs defaultValue="land_title" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
          <TabsTrigger value="land_title">Titre foncier</TabsTrigger>
          <TabsTrigger value="property_cert">Certificat de propriété</TabsTrigger>
          <TabsTrigger value="plot_plan">Plan de lotissement</TabsTrigger>
          <TabsTrigger value="plot_number">Numéro de lot</TabsTrigger>
          <TabsTrigger value="plot_space">Espace</TabsTrigger>
          <TabsTrigger value="sale_right">Droit de vente</TabsTrigger>
        </TabsList>

        <TabsContent value="land_title" className="space-y-4">
          <div>
            <Label htmlFor="land_title_file">Document du titre foncier</Label>
            <Input 
              id="land_title_file"
              name="land_title_file"
              type="file"
              accept="image/*,.pdf"
              className="cursor-pointer"
            />
            <p className="text-sm text-gray-500 mt-1">
              Formats acceptés : Images ou PDF
            </p>
          </div>
        </TabsContent>

        <TabsContent value="property_cert" className="space-y-4">
          <div>
            <Label htmlFor="property_cert_file">Certificat de propriété</Label>
            <Input 
              id="property_cert_file"
              name="property_cert_file"
              type="file"
              accept="image/*,.pdf"
              className="cursor-pointer"
            />
            <p className="text-sm text-gray-500 mt-1">
              Formats acceptés : Images ou PDF
            </p>
          </div>
        </TabsContent>

        <TabsContent value="plot_plan" className="space-y-4">
          <div>
            <Label htmlFor="plot_plan_file">Plan de lotissement</Label>
            <Input 
              id="plot_plan_file"
              name="plot_plan_file"
              type="file"
              accept="image/*,.pdf"
              className="cursor-pointer"
            />
            <p className="text-sm text-gray-500 mt-1">
              Formats acceptés : Images ou PDF
            </p>
          </div>
        </TabsContent>

        <TabsContent value="plot_number" className="space-y-4">
          <div>
            <Label htmlFor="plot_number">Numéro de lot</Label>
            <Input 
              id="plot_number"
              name="plot_number"
              type="text"
              placeholder="Entrez le numéro de lot"
            />
          </div>
        </TabsContent>

        <TabsContent value="plot_space" className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Label htmlFor="is_built">Type d'espace</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Switch id="is_built" name="is_built" />
                <Label htmlFor="is_built" className="cursor-pointer">
                  Espace bâti
                </Label>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sale_right" className="space-y-4">
          <div>
            <Label htmlFor="sale_right_file">Preuve du droit de vente</Label>
            <Input 
              id="sale_right_file"
              name="sale_right_file"
              type="file"
              accept=".pdf,.doc,.docx"
              className="cursor-pointer"
            />
            <p className="text-sm text-gray-500 mt-1">
              Formats acceptés : PDF, Word
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
