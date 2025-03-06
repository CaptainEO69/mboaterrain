
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProfileLoading() {
  return (
    <div className="container mx-auto px-4 py-8 pb-24 max-w-2xl">
      <Card className="border-cmr-green">
        <CardHeader className="bg-cmr-green text-white">
          <CardTitle className="text-2xl font-playfair">Mon Profil</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cmr-green mb-4"></div>
            <p>Chargement de votre profil...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
