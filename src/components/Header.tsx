export const Header = () => {
  return (
    <div className="bg-white p-4 shadow-sm">
      <div className="flex items-center justify-center gap-2">
        <img
          src="/lovable-uploads/b0d64b27-cdd5-43a9-b0dd-fba53da4a96d.png"
          alt="MboaTer Logo"
          className="h-32 w-32"
        />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-cmr-green font-playfair tracking-[0.2em] mb-1">
            MboaTer
          </h1>
          <div className="text-sm text-gray-600 font-playfair font-bold flex flex-col">
            <span>L'immobilier qui valorise</span>
            <span>nos terres</span>
          </div>
        </div>
      </div>
    </div>
  );
};