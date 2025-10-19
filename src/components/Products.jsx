import { useState } from "react";
import { BiSolidCoffee } from "react-icons/bi";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Coffee from "./Coffee";

const Products = ({ coffees }) => {
  const [totalCoffees, setTotalCoffees] = useState(coffees);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://coffee-house-server-lzyu.onrender.com/coffees/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });

              // clearing data from ui

              const finalData = totalCoffees.filter(
                (singleCoffee) => singleCoffee._id !== id
              );
              setTotalCoffees(finalData);
            }
          });
      }
    });
  };
  return (
    <div>
      <h2 className="text-center">---Sip & Savor---</h2>
      <h3 className="text-[28px] font-bold text-center">
        Out Popular Products
      </h3>
      <div className="flex justify-center mt-4">
        <Link
          className="border-2 px-3 rounded-[4px] py-2 border-[#331a15] bg-[#e3b577] font-bold text-[#331a15] cursor-pointer flex gap-3 w-fit items-center"
          to={"/addcoffee"}
        >
          Add Coffee <BiSolidCoffee className="text-[#331a15] text-[22px]" />
        </Link>
      </div>

      {/* All coffee s */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-8">
        {totalCoffees.map((coffee) => (
          <Coffee
            key={coffee._id}
            handleDelete={handleDelete}
            coffee={coffee}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
