
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/LoginForm";
import { SocialLogin } from "@/components/auth/SocialLogin";

export default function Login() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-6 bg-white">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Connexion</h2>
          <p className="text-sm text-gray-600">
            Connectez-vous à votre compte MboaTer
          </p>
        </div>

        <LoginForm />
        <SocialLogin />

        <p className="text-center text-sm mt-4">
          Pas encore de compte ?{" "}
          <Link 
            to="/register" 
            className="font-medium text-cmr-green hover:text-cmr-green/80"
          >
            S'inscrire
          </Link>
        </p>
      </Card>
    </div>
  );
}
