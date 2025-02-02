import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-center gap-2">
            <House className="h-8 w-8 text-cmr-green" />
            <div className="text-center">
              <h1 className="text-2xl font-bold text-cmr-green">MboaTer</h1>
              <p className="text-sm text-gray-600">La première plateforme immobilière 100% camerounaise</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-cmr-green hover:bg-cmr-green/90">
              Se connecter
            </Button>
          </form>

          <div className="text-center">
            <button
              onClick={() => navigate("/register")}
              className="text-cmr-green hover:underline text-sm"
            >
              Pas encore inscrit ? Créer un compte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}