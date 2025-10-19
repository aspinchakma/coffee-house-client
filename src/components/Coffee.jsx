import { FaEye, FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";

const Coffee = ({ coffee, handleDelete }) => {
  const { name, photo, supplier, price, _id } = coffee;
  return (
    <div className="flex  items-center gap-2 bg-[#f5f4f1] justify-between p-6 rounded-[4px]">
      <img className="w-[150px]" src={photo} alt="" />
      <div>
        <h2 className="font-semibold text-xl">Name: {name}</h2>
        <p>Supplier: {supplier}</p>
        <p>Price: {price}TK</p>
      </div>
      <div className="flex flex-col gap-3">
        <Link
          to={`/coffees/${_id}`}
          className="bg-[#d2b48c] p-3 rounded-[4px] text-[20px] text-white"
        >
          <FaEye />
        </Link>
        <Link
          to={`/updateDetails/${_id}`}
          className="bg-[#3c393b] p-3 rounded-[4px] text-[20px] text-white"
        >
          <FaPen />
        </Link>
        <button
          onClick={() => handleDelete(_id)}
          className="bg-[#ea4744] p-3 rounded-[4px] text-[20px] text-white cursor-pointer   "
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default Coffee;
