import { House, UserRound, DiamondPlus, Search, Settings } from "lucide-react";

// Opciones del menú
export const navItems = [
  {
    label: "Publicar",
    href: "post",
    icon: DiamondPlus,
  },
  { 
    label: "Inicio", 
    href: "/",
    icon: House,
  },
  { 
    label: "Perfil", 
    href: "/profile",
    icon: UserRound,
  },
  {
    label: "Buscar",
    href: "",
    icon: Search
  },
  { 
    label: "Configuración",
    href: "/config",
    icon: Settings
  },
];