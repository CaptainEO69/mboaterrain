export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Conditions d'Utilisation</h1>
      <div className="prose prose-slate max-w-none">
        <p className="mb-4">
          Dernière mise à jour : {new Date().toLocaleDateString()}
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Acceptation des conditions</h2>
        <p>
          En accédant à notre plateforme, vous acceptez d'être lié par ces conditions d'utilisation.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Utilisation du service</h2>
        <p>
          Vous acceptez d'utiliser le service conformément à :
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Toutes les lois applicables</li>
          <li>Ces conditions d'utilisation</li>
          <li>Nos politiques de confidentialité</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Comptes utilisateurs</h2>
        <p>
          Vous êtes responsable de maintenir la confidentialité de votre compte et de votre mot de passe.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Modifications</h2>
        <p>
          Nous nous réservons le droit de modifier ces conditions à tout moment.
        </p>
      </div>
    </div>
  );
}