import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { Button } from "../../components"

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};


const Modal = ({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps) => {

  // Bloquear scroll
  useEffect(() => {

    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };

  }, [isOpen]);

  // Escape
  useEffect(() => {

    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {

      if (event.key === "Escape") {
        onClose();
      }

    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };

  }, [isOpen, onClose]);

  return createPortal(

    <AnimatePresence>

      {isOpen && (

        <motion.div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/50 backdrop-blur-sm
            p-2
          "
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >

          <motion.div
            className="
              relative
              w-full max-w-7xl 
              rounded
              bg-[rgba(32,36,37,0.88)]
              px-2 pb-6 pt-4
              shadow-2xl overflow-y-auto
            "
            onClick={(e) => e.stopPropagation()}
            initial={{
              scale: 0.95,
              opacity: 0,
              y: 10,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.95,
              opacity: 0,
              y: 10,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >

            <div className="mb-10">
              
              <h3 className="text-[1.1rem] font-semibold text-white">{title}</h3>

              <Button
                onClick={onClose}
                className="
                  absolute right-2 top-2
                  text-2xl text-white/70
                  hover:text-[#c96464] cursor-pointer
                "
              >
                <X  size={18}/>
              </Button>

            </div>

            <div>
              {children}
            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>,

    document.body
  );
};

export default Modal;