
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { FileCheck } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface HouseTitleSectionProps {
  errors: Record<string, string>;
}

export function HouseTitleSection({ errors }: HouseTitleSectionProps) {
  return (
    <div className="space-y-4 border-t pt-4">
      <div className="flex items-center gap-2 mb-4">
        <FileCheck className="w-5 h-5 text-cmr-green" />
        <h3 className="font-medium">Documents de la maison</h3>
      </div>

      <Tabs defaultValue="land_title" className="space-y-4">
        <TabsList className="flex flex-wrap gap-2 bg-transparent h-auto p-0">
          <TabsTrigger 
            value="land_title"
            className="data-[state=active]:bg-cmr-green data-[state=active]:text-white"
          >
            Titre foncier
          </TabsTrigger>
          <TabsTrigger 
            value="property_cert"
            className="data-[state=active]:bg-cmr-green data-[state=active]:text-white"
          >
            Certificat de propriété
          </TabsTrigger>
          <TabsTrigger 
            value="plot_plan"
            className="data-[state=active]:bg-cmr-green data-[state=active]:text-white"
          >
            Plan de lotissement
          </TabsTrigger>
          <TabsTrigger 
            value="plot_number"
            className="data-[state=active]:bg-cmr-green data-[state=active]:text-white"
          >
            Numéro de lot
          </TabsTrigger>
          <TabsTrigger 
            value="plot_space"
            className="data-[state=active]:bg-cmr-green data-[state=active]:text-white"
          >
            Espace
          </TabsTrigger>
          <TabsTrigger 
            value="sale_right"
            className="data-[state=active]:bg-cmr-green data-[state=active]:text-white"
          >
            Droit de vente
          </TabsTrigger>
          <TabsTrigger 
            value="sale_reason"
            className="data-[state=active]:bg-cmr-green data-[state=active]:text-white"
          >
            Motif de vente
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 bg-white p-4 rounded-lg border">
          <TabsContent value="land_title" className="space-y-4 m-0">
            <div>
              <Label htmlFor="house_title_file">Document du titre foncier</Label>
              <Input 
                id="house_title_file"
                name="house_title_file"
                type="file"
                accept="image/*,.pdf"
                className="cursor-pointer"
              />
              <p className="text-sm text-gray-500 mt-1">
                Formats acceptés : Images ou PDF
              </p>
            </div>
          </TabsContent>

          <TabsContent value="property_cert" className="space-y-4 m-0">
            <div>
              <Label htmlFor="house_cert_file">Certificat de propriété</Label>
              <Input 
                id="house_cert_file"
                name="house_cert_file"
                type="file"
                accept="image/*,.pdf"
                className="cursor-pointer"
              />
              <p className="text-sm text-gray-500 mt-1">
                Formats acceptés : Images ou PDF
              </p>
            </div>
          </TabsContent>

          <TabsContent value="plot_plan" className="space-y-4 m-0">
            <div>
              <Label htmlFor="house_plan_file">Plan de lotissement</Label>
              <Input 
                id="house_plan_file"
                name="house_plan_file"
                type="file"
                accept="image/*,.pdf"
                className="cursor-pointer"
              />
              <p className="text-sm text-gray-500 mt-1">
                Formats acceptés : Images ou PDF
              </p>
            </div>
          </TabsContent>

          <TabsContent value="plot_number" className="space-y-4 m-0">
            <div>
              <Label htmlFor="house_number">Numéro de lot</Label>
              <Input 
                id="house_number"
                name="house_number"
                type="text"
                placeholder="Entrez le numéro de lot"
              />
            </div>
          </TabsContent>

          <TabsContent value="plot_space" className="space-y-4 m-0">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Label htmlFor="house_is_built">Type d'espace</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch id="house_is_built" name="house_is_built" />
                  <Label htmlFor="house_is_built" className="cursor-pointer">
                    Espace bâti
                  </Label>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sale_right" className="space-y-4 m-0">
            <div>
              <Label htmlFor="house_sale_right_file">Preuve du droit de vente</Label>
              <Input 
                id="house_sale_right_file"
                name="house_sale_right_file"
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
              <Label htmlFor="house_sale_reason">Motif de vente</Label>
              <Textarea
                id="house_sale_reason"
                name="house_sale_reason"
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
