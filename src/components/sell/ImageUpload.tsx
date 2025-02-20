
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { X, Camera as CameraIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCamera } from "@/lib/native";

interface ImageUploadProps {
  onChange: (files: FileList | null) => void;
}

export function ImageUpload({ onChange }: ImageUploadProps) {
  const [images, setImages] = useState<FileList | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const { takePicture } = useCamera();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages(files);
      onChange(files);
      
      // Create previews for images only
      const newPreviews: string[] = [];
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            newPreviews.push(reader.result as string);
            if (newPreviews.length === Array.from(files).filter(f => f.type.startsWith('image/')).length) {
              setPreviews(newPreviews);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const handleTakePicture = async () => {
    const photoPath = await takePicture();
    if (photoPath) {
      setPreviews(prev => [...prev, photoPath]);
      // Convert the photo path to a File object and trigger onChange
      const response = await fetch(photoPath);
      const blob = await response.blob();
      const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      onChange(dataTransfer.files);
    }
  };

  const handleRemoveAll = () => {
    setImages(null);
    setPreviews([]);
    onChange(null);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="files">Sélectionner fichiers</Label>
        <div className="flex gap-2">
          <Input
            id="files"
            name="files"
            type="file"
            accept="image/*,.pdf"
            multiple
            onChange={handleChange}
            className="cursor-pointer"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleTakePicture}
            className="flex items-center gap-2"
          >
            <CameraIcon className="w-4 h-4" />
            Photo
          </Button>
        </div>
        <p className="text-sm text-gray-500">
          Vous pouvez sélectionner plusieurs photos ou documents PDF. La première photo sera l'image principale.
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
