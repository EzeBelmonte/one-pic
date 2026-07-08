import { useNavigate } from "react-router-dom";

import { Button } from "../..";

const LogoutNav = () => {

  const navigate = useNavigate();

  // Función para iniciar sesión
  const handleLogin = () => {
    navigate("/login");
  }

  // Función para registrarse
  const handleRegister = () => {
    navigate("/register");
  }

  return (
    <div className="bg-blue-500 px-1 py-2 flex gap-2">

      <Button
        className="
          border border-[#127a60] 
          bg-[#3baf92] 
          text-white font-semibold 
          px-2 rounded
        "
        onClick={handleLogin}
      >
        Iniciar sesión
      </Button>

      <Button
        className="
          border border-[#125c7a] 
          bg-[#3b8aaf] 
          text-white font-semibold 
          px-2 rounded  
        "
        onClick={handleRegister}
      >
        Registrarse
      </Button>

    </div>
  );
}

export default LogoutNav;