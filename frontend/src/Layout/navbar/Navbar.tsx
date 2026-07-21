import { 
  DesktopMenu,
  MobileMenu,
} from "../navbar/components";

const Navbar = () => {

  return (
    <div>
      <div className="sm:hidden">
        <MobileMenu />
      </div>

      <div className="hidden sm:block">
        <DesktopMenu />
      </div>
    </div>
  );
};

export default Navbar;