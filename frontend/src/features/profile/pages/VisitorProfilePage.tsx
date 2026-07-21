
import { useParams } from "react-router-dom";

import VisitorProfileHeader from "../components/visitor/VisitorProfileHeader";
import VisitorProfileSection from "../components/visitor/VisitorProfileSection";

const VisitorProfilePage = () => {

  const { username } = useParams();

  if (!username) {
    return <p>No existe el usuario</p>;
  }

  return (
    <div className="flex flex-col">
      <VisitorProfileHeader />

      <VisitorProfileSection username={username} />
    </div>
  );
}

export default VisitorProfilePage;