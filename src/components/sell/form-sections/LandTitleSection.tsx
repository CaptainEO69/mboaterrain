
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { FileCheck } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

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
        <TabsList className="flex flex-wrap gap-2 bg-transparent h-auto p-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
            <TabsTrigger 
              value="land_title"
              className="w-full data-[state=active]:bg-cmr-green data-[state=active]:text-white"
            >
              Titre foncier
            </TabsTrigger>
            <TabsTrigger 
              value="property_cert"
              className="w-full data-[state=active]:bg-cmr-green data-[state=active]:text-white"
            >
              Certificat de propriété
            </TabsTrigger>
            <TabsTrigger 
              value="plot_plan"
              className="w-full data-[state=active]:bg-cmr-green data-[state=active]:text-white"
            >
              Plan de lotissement
            </TabsTrigger>
            <TabsTrigger 
              value="plot_number"
              className="w-full data-[state=active]:bg-cmr-green data-[state=active]:text-white"
            >
              Numéro de lot
            </TabsTrigger>
            <TabsTrigger 
              value="plot_space"
              className="w-full data-[state=active]:bg-cmr-green data-[state=active]:text-white"
            >
              Espace
            </TabsTrigger>
            <TabsTrigger 
              value="sale_right"
              className="w-full data-[state=active]:bg-cmr-green data-[state=active]:text-white"
            >
              Droit de vente
            </TabsTrigger>
            <TabsTrigger 
              value="sale_reason"
              className="w-full col-span-full sm:col-auto data-[state=active]:bg-cmr-green data-[state=active]:text-white"
            >
              Motif de vente
            </TabsTrigger>
          </div>
        </TabsList>

        <div className="mt-6 border rounded-lg p-4 bg-white">
          <TabsContent value="land_title" className="space-y-4 m-0">
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
                Formats acceptés : Images (JPG, PNG) ou PDF
              </p>
            </div>
          </TabsContent>

          <TabsContent value="property_cert" className="space-y-4 m-0">
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
                Formats acceptés : Images (JPG, PNG) ou PDF
              </p>
            </div>
          </TabsContent>

          <TabsContent value="plot_plan" className="space-y-4 m-0">
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
                Formats acceptés : Images (JPG, PNG) ou PDF
              </p>
            </div>
          </TabsContent>

          <TabsContent value="plot_number" className="space-y-4 m-0">
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

          <TabsContent value="plot_space" className="space-y-4 m-0">
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

          <TabsContent value="sale_right" className="space-y-4 m-0">
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

          <TabsContent value="sale_reason" className="space-y-4 m-0">
            <div>
              <Label htmlFor="sale_reason">Motif de vente</Label>
              <Textarea
                id="sale_reason"
                name="sale_reason"
                placeholder="Expliquez le motif de la vente"
                className="min-h-[100px]"
              />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
