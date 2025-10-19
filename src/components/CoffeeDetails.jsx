import { BiSolidCoffee } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLoaderData } from "react-router";

const CoffeeDetails = () => {
  const coffee = useLoaderData();
  const { name, photo, price, supplier, quantity, details } = coffee;
  return (
    <div className="w-[70%] mx-auto my-8 lg:my-10">
      <div>
        <Link
          className="flex items-center gap-3 font-bold text-[19px]"
          to={`/`}
        >
          {" "}
          <FaArrowLeft />
          Back To Home
        </Link>
      </div>
      <div className=" grid grid-cols-1 lg:grid-cols-2 items-center gap-5 lg:gap-0 mt-5">
        <img className="w-[90%] lg:w-[60%] mx-auto" src={photo} alt="" />
        <div className="space-y-2">
          <h3 className="font-bold text-3xl">{name}</h3>
          <p>
            {" "}
            <span className="font-bold">Supplier:</span> {supplier}
          </p>
          <p>
            <span className="font-bold">Total Available:</span> {quantity}
          </p>
          <p>
            {" "}
            <span className="font-bold">Price:</span> {price}
          </p>
          <p>
            {" "}
            <span className="font-bold">Details:</span> {details}
          </p>
          <button
            className="border-2 px-3 rounded-[4px] py-2 border-[#331a15] bg-[#e3b577] font-bold text-[#331a15] cursor-pointer flex gap-3 w-fit items-center mt-5"
            to={"/addcoffee"}
          >
            Buy Coffee <BiSolidCoffee className="text-[#331a15] text-[22px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetails;
