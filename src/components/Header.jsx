import { GiCoffeeCup } from "react-icons/gi";

const Header = () => {
  return (
    <div className="bg-[#261b16] text-center py-6">
      <div className="flex items-center justify-center gap-4">
        <GiCoffeeCup className="text-white font-extrabold text-[45px]" />
        <h3 className="font-bold text-[30px] text-white">Coffee House</h3>
      </div>
    </div>
  );
};

export default Header;
