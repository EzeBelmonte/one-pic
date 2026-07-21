import { useState } from "react";
import { DiamondPlus } from "lucide-react";

import { cn } from "@/utils/cn";

import ModalPost from "./ModalPost";
import CreatePostForm from "./CreatePostForm";

type Props = {
  linkClassName?: string;
  mobile?: boolean;
}

const CreatePosts = ({ 
  linkClassName, 
  mobile,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Abrir el modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const baseStyle = "flex gap-2 font-semibold cursor-pointer";

  return (
    <>
      <li
        onClick={handleOpenModal}
        className={cn(
          baseStyle,
          linkClassName
        )}
      >
        <DiamondPlus size={18} />
        {!mobile &&
          "Publicar"
        }
      </li>

      {/* Modal que abre la creación de la publicación */}
      <ModalPost
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Crear publicación"
      >
        <CreatePostForm
          onClose={() => setIsModalOpen(false)}
        />
      </ModalPost>
    </>
  );
}

export default CreatePosts;