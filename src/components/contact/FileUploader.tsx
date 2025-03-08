
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useRef } from "react";

interface FileUploaderProps {
  files: File[];
  onAddFile: (file: File) => void;
  onRemoveFile: (index: number) => void;
  disabled?: boolean;
}

export function FileUploader({ files, onAddFile, onRemoveFile, disabled = false }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      onAddFile(fileList[0]);
      // Réinitialiser l'input pour permettre de sélectionner à nouveau le même fichier
      e.target.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const getFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} octets`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} Ko`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(1)} Mo`;
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleButtonClick}
          disabled={disabled}
          className="flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Joindre un fichier
        </Button>
        <span className="text-xs text-gray-500">5 Mo max</span>
      </div>

      {files.length > 0 && (
        <div className="space-y-2 mt-2">
          <h4 className="text-sm font-medium">Fichiers joints:</h4>
          <ul className="space-y-1">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md text-sm">
                <div className="flex-1 truncate">
                  <span className="font-medium">{file.name}</span>
                  <span className="text-gray-500 ml-2">({getFileSize(file.size)})</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-red-500"
                  onClick={() => onRemoveFile(index)}
                  disabled={disabled}
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
