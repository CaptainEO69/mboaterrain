import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useAuth } from "@/lib/auth";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  full_name: string;
  phone_number: string;
};

export default function RegisterForm() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { signUp, createProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const form = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      form.setError("confirmPassword", {
        message: "Les mots de passe ne correspondent pas",
      });
      return;
    }

    setLoading(true);
    try {
      await signUp(data.email, data.password);
      await createProfile({
        full_name: data.full_name,
        phone_number: data.phone_number,
        user_type: type || "buyer",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6">
            Inscription - {type?.charAt(0).toUpperCase() + type?.slice(1)}
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <Input required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de téléphone</FormLabel>
                    <FormControl>
                      <Input required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-cmr-green hover:bg-cmr-green/90"
                disabled={loading}
              >
                {loading ? "Inscription en cours..." : "S'inscrire"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}