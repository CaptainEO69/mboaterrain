import { House } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 shadow-sm">
      <div className="flex items-center justify-center gap-2">
        <House className="h-8 w-8 text-cmr-green" />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-cmr-green">MboaTer</h1>
          <p className="text-sm text-gray-600">
            La première plateforme immobilière 100% camerounaise
          </p>
        </div>
      </div>
    </div>
  );
};