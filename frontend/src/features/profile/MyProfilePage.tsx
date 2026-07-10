import { useAuth } from "@/app/hooks/useAuth";

const MyProfile = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div>
      <header>
        <p className="text-amber-200">Hola</p>
        <h2 className="text-white">{user?.username}</h2>
      </header>
    </div>
  );
}

export default MyProfile;