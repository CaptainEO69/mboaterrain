
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface VerificationCode {
  id: string;
  user_id: string;
  email_code: string;
  sms_code: string;
  expires_at: string;
  created_at: string;
}

export default function VerificationForm() {
  const navigate = useNavigate();
  const [emailCode, setEmailCode] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Session utilisateur non trouvée");
        return;
      }

      // Vérifier les codes
      const { data, error } = await supabase
        .from("verification_codes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single<VerificationCode>();

      if (error) {
        throw error;
      }

      if (!data) {
        toast.error("Aucun code de vérification trouvé");
        return;
      }

      if (data.expires_at < new Date().toISOString()) {
        toast.error("Les codes de vérification ont expiré");
        return;
      }

      if (data.email_code !== emailCode || data.sms_code !== smsCode) {
        toast.error("Codes de vérification incorrects");
        return;
      }

      // Mettre à jour le statut de vérification
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          is_email_verified: true,
          is_phone_verified: true,
        })
        .eq("id", user.id);

      if (updateError) {
        throw updateError;
      }

      toast.success("Vérification réussie !");
      navigate("/");
    } catch (error: any) {
      toast.error("Erreur lors de la vérification : " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Vérification</CardTitle>
          <CardDescription>
            Entrez les codes reçus par email et SMS pour vérifier votre compte
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emailCode">Code reçu par email</Label>
              <Input
                id="emailCode"
                value={emailCode}
                onChange={(e) => setEmailCode(e.target.value)}
                placeholder="123456"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smsCode">Code reçu par SMS</Label>
              <Input
                id="smsCode"
                value={smsCode}
                onChange={(e) => setSmsCode(e.target.value)}
                placeholder="123456"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Vérification..." : "Vérifier"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
