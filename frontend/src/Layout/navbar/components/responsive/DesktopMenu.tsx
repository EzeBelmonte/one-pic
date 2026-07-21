import NavMenu from "../NavMenu";


const DesktopMenu = () => {

  return (
    <div className="
      h-screen max-w-[220px]
      mt-10"
    >
      <nav className="
        flex flex-col
        h-screen
        px-3 py-5
      ">
        

        <NavMenu 
          className="
            flex flex-col
            fixed
            gap-2 mt-10
            text-white
          "
          linkClassName="
            mt-auto 
            text-[1.05rem] 
            items-center
            border
            border-transparent
            hover:border-white
            px-4
            py-2
            rounded-2xl
            hover:bg-white/10
            transition-all
          "
        />
      </nav>
    </div>
  );
}

export default DesktopMenu;