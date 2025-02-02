export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Politique de Confidentialité</h1>
      <div className="prose prose-slate max-w-none">
        <p className="mb-4">
          Dernière mise à jour : {new Date().toLocaleDateString()}
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Collecte des informations</h2>
        <p>
          Nous collectons les informations que vous nous fournissez directement lorsque vous créez un compte, 
          notamment votre nom, adresse e-mail, et numéro de téléphone.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Utilisation des informations</h2>
        <p>
          Nous utilisons les informations collectées pour :
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Gérer votre compte</li>
          <li>Vous permettre d'utiliser les fonctionnalités de notre plateforme</li>
          <li>Vous contacter concernant votre compte ou nos services</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Protection des informations</h2>
        <p>
          Nous prenons la sécurité de vos données personnelles très au sérieux et mettons en place 
          des mesures de sécurité appropriées pour protéger vos informations.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Contact</h2>
        <p>
          Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter.
        </p>
      </div>
    </div>
  );
}