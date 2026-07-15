import { useState } from "react";

import { usePosts } from "@/app/hooks/usePosts";

import { ImagePreview, ImageUpload, Button, Textarea } from "@/components";
import type { CreatePost } from "@shared/index";


type CreatePostsProps = {
  onClose: () => void;
}

const CreatePosts = ({ onClose }: CreatePostsProps) => {
  const { createPost, error } = usePosts();

  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!image) {
      alert("Debes seleccionar una imagen.");
      return
    }

    const data: CreatePost = {
      description,
    };

    await createPost(image, data);
    setImage(null);
    setDescription("");
    onClose();
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="
      w-full sm:w-[550px]
      px-2 pt-4 pb-2 mt-5
      bg-[rgba(111,112,112,0.17)]
    ">
      <Textarea 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Escribe una descripción..."
        className="w-[80vw] sm:w-[390px] mx-auto mb-3"
      />

      <ImagePreview 
        file={image} 
        setImage={setImage}
        className="w-40"
        buttonClassName="top-2 right-2"
      />

      <div className="flex items-center gap-2 mt-5">
        <Button
          onClick={handleSubmit}
          className="
            bg-[rgba(26,144,212,0.6)] rounded
            px-2
            text-white
          ">
          Publicar
        </Button>

        <ImageUpload onSelect={setImage} />
      </div>
    </div>
  );
}

export default CreatePosts;