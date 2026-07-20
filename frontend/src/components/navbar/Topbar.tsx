import { useState, useEffect } from "react";
import { LogOut, Bell, BellRing } from "lucide-react";

import { useAuth } from "@/app/hooks/useAuth";
import { useProfile } from "@/app/hooks/useProfile";
import { useFollows } from "@/app/hooks/useFollows";
import { useScroll } from "@/hooks/shared/useScroll";

import { Button, ModalList, PendingCard } from "@/components";

const Topbar = () => {
  const { logout } = useAuth();
  const { clearProfile } = useProfile();
  const { pending, getPending, clearFollows } = useFollows();
  const { scrollingUp } = useScroll();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getPending();
  }, []);

  const handleLogout = () => {
    clearProfile();
    clearFollows();
    logout();
  }

  // Abrir el modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const buttonStyle = "bg-[rgba(0,0,0,0.2)] rounded-full p-2 cursor-pointer";

  return (
    <>
      <nav
        className={`
          w-full
          flex 
          fixed top-0 left-0
          bg-[rgb(50,51,53)] text-white
          px-2 py-2 gap-2
          z-50 shadow-xl

          transform transition-all duration-200 ease-in

          ${scrollingUp
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
          }
        `}
      >
        <Button
          onClick={handleOpenModal}
          className={`${buttonStyle} ms-auto`}
        >
          {pending === null || pending.length === 0 
            ? <Bell size={16}/>
            : <BellRing size={16} className="text-[#cfb833]" strokeWidth="3"/>
          }
        </Button>

        <Button
          onClick={handleLogout}
          className={buttonStyle}
        >
          <LogOut size={16}/>
        </Button>
      </nav>
      
      <ModalList
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Solicitudes pendientes"
      >
        {pending.map((item) => (
          /* Card de usuario */
          <PendingCard 
            key={item.id} 
            data={item}
          />
        ))}
      </ModalList>
    </>
  );
}

export default Topbar;