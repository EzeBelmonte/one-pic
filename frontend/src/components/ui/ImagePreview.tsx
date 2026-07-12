import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { Image, Button } from "@/components";

type ImagePreviewProps  = {
  file: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  className?: string;
}

export default function ImagePreview({ 
  file, 
  setImage,
  className }: ImagePreviewProps 
) {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const ObjectUrl = URL.createObjectURL(file);

    setPreview(ObjectUrl);

    return () => URL.revokeObjectURL(ObjectUrl);
  }, [file]);

  // Cancelar la selección
  const handleCancel = () => {
    setPreview("");
    setImage(null);
  }

  if (!preview) return;

  return (
    <div className="
      flex justify-center
      mb-5
    ">
      <div className="relative">
        <Button
          className="
            absolute
            top-1 right-1
            bg-[rgba(0,0,0,0.4)] rounded-full
            p-0.5
          "
          onClick={handleCancel}
        >
          <X className="w-4 h-4 text-white/70" />
        </Button>

        <Image
          src={preview}
          alt="Preview"
          className={`
            rounded object-cover
            ${className}  
          `}
        />
      </div>
    </div>
  )
}