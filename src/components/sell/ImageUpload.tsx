import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface ImageUploadProps {
  onChange: (files: FileList | null) => void;
}

export function ImageUpload({ onChange }: ImageUploadProps) {
  const [images, setImages] = useState<FileList | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setImages(files);
    onChange(files);
  };

  return (
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
  );
}