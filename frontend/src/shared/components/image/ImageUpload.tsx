import { useRef } from "react";
import { Upload } from "lucide-react";

import { Button } from "@/components";

type ImageUploadProps = {
  onSelect: (file: File) => void;
}

export default function ImageUpload({
  onSelect,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenExplorer = () => {
    inputRef.current?.click();
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Debes seleccionar una imagen.");
      return;
    }

    onSelect(file);
  }

  return (
    <>
      <input 
        ref={inputRef}
        type="file"
        accept="image/"
        hidden
        onChange={handleFileChange}
      />

      <Button
        type="button"
        onClick={handleOpenExplorer}
        className="flex items-center gap-2 rounded-lg border px-4 py-2"
      >
        <Upload size={18} />
        Seleccionar imagen
      </Button>
    </>
  );
}