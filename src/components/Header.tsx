export const Header = () => {
  return (
    <div className="bg-white p-4 shadow-sm">
      <div className="flex items-center justify-start gap-4 max-w-4xl mx-auto">
        <img
          src="/lovable-uploads/b0d64b27-cdd5-43a9-b0dd-fba53da4a96d.png"
          alt="MboaTer Logo"
          className="h-24 w-24 md:h-40 md:w-40" // Increased size significantly and adjusted for both mobile and desktop
        />
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-cmr-green font-playfair tracking-[0.2em] mb-1">
            MboaTer
          </h1>
          <div className="text-xs md:text-sm text-gray-600 font-playfair font-bold flex flex-col">
            <span>L'immobilier qui valorise</span>
            <span>nos terres</span>
          </div>
        </div>
      </div>
    </div>
  );
}