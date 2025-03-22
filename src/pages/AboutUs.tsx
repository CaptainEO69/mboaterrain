
const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8 font-playfair text-cmr-green">À propos de nous</h1>
      
      <div className="prose prose-lg max-w-none">
        <p>
          MboaTer est une plateforme immobilière innovante dédiée au marché camerounais.
          Notre mission est de simplifier l'accès à la propriété et à la location immobilière
          pour tous les Camerounais, que vous soyez à la recherche d'un nouveau chez-vous
          ou que vous souhaitiez investir dans l'immobilier.
        </p>
        
        <h2>Notre Vision</h2>
        <p>
          Nous croyons que chaque Camerounais mérite un accès facile et transparent
          aux opportunités immobilières. Notre plateforme vise à démocratiser le marché
          immobilier en offrant des outils modernes et accessibles pour connecter
          acheteurs, vendeurs, locataires et propriétaires.
        </p>
        
        <h2>Nos Services</h2>
        <ul>
          <li>Annonces immobilières vérifiées et détaillées</li>
          <li>Mise en relation directe entre acheteurs et vendeurs</li>
          <li>Conseils et ressources pour les transactions immobilières</li>
          <li>Outils d'évaluation et de comparaison de propriétés</li>
          <li>Assistance pour les démarches administratives</li>
        </ul>
        
        <h2>Notre Équipe</h2>
        <p>
          Notre équipe est composée de professionnels passionnés par l'immobilier et la technologie,
          tous dédiés à vous offrir la meilleure expérience possible dans votre parcours immobilier.
        </p>
        
        <h2>Contactez-nous</h2>
        <p>
          Nous sommes toujours heureux d'échanger avec vous. N'hésitez pas à nous contacter
          pour toute question ou suggestion concernant nos services.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
