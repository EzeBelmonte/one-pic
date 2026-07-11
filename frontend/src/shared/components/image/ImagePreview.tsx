import { useEffect, useState } from "react";

type ImagePreviewProps  = {
  file: File | null;
}

export default function ImagePreview({ 
  file }: ImagePreviewProps 
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

  if (!preview) {
    return (
      <div className="flex h-40 w-40 items-center justify-center rounded-xl border-2 border-dashed">
        Sin imagen
      </div>
    );
  }

  return (
    <img
      src={preview}
      alt="Preview"
      className="w-40 h-40 rounded object-cover"
    />
  )
}