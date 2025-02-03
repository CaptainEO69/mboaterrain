import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onChange: (files: FileList | null) => void;
}

export function ImageUpload({ onChange }: ImageUploadProps) {
  const [images, setImages] = useState<FileList | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages(files);
      onChange(files);
      
      // Create previews
      const newPreviews: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === files.length) {
            setPreviews(newPreviews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveAll = () => {
    setImages(null);
    setPreviews([]);
    onChange(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="images">Photos</Label>
        <Input
          id="images"
          name="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleChange}
          className="cursor-pointer"
        />
        <p className="text-sm text-gray-500 mt-1">
          Vous pouvez sélectionner plusieurs photos. La première sera l'image principale.
        </p>
      </div>

      {previews.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Aperçu des images ({previews.length})</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveAll}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4 mr-1" />
              Tout supprimer
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-cmr-green text-white px-2 py-1 rounded text-xs">
                    Image principale
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}