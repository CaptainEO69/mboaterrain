
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface ProfileLoadingProps {
  message?: string;
}

export function ProfileLoading({ message = "Chargement de votre profil..." }: ProfileLoadingProps) {
  const [extendedLoading, setExtendedLoading] = useState(false);
  
  useEffect(() => {
    // If loading takes more than 5 seconds, show extended loading message
    const timer = setTimeout(() => {
      setExtendedLoading(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 pb-24 max-w-2xl">
      <Card className="border-cmr-green">
        <CardHeader className="bg-cmr-green text-white">
          <CardTitle className="text-2xl font-playfair">Mon Profil</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cmr-green mb-4"></div>
            <p className="text-center">{message}</p>
            {extendedLoading && (
              <p className="text-center mt-4 text-amber-600">
                Le chargement prend plus de temps que prévu. Veuillez patienter...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
