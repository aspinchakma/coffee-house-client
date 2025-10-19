import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLoaderData } from "react-router";
import Swal from "sweetalert2";

const UpdateDetails = () => {
  const coffeeDetails = useLoaderData();
  const [updateCoffee, setUpdateCoffee] = useState(coffeeDetails);

  const changingValue = (e) => {
    const { name, value, files } = e.target;
    setUpdateCoffee((pre) => ({
      ...pre,
      [name]: name === "photo" ? files[0] : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const updatedCoffeeDetails = {
      name: updateCoffee.name,
      supplier: updateCoffee.supplier,
      price: Number(updateCoffee.price),
      quantity: Number.parseInt(updateCoffee.quantity),
      taste: updateCoffee.taste,
      details: updateCoffee.details,
    };
    const imgData = new FormData();
    imgData.append("image", updateCoffee.photo);

    const apiKey = import.meta.env.VITE_PHOTO_SERVER_API;
    const uploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    try {
      const resImg = await fetch(uploadUrl, {
        method: "POST",
        body: imgData,
      });

      const data = await resImg.json();
      if (data.success) {
        updatedCoffeeDetails.photo = data.data.url;
        const sendToServer = await fetch(
          `https://coffee-house-server-lzyu.onrender.com/coffees/${updateCoffee._id}`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(updatedCoffeeDetails),
          }
        );
        const responseFromServer = await sendToServer.json();
        if (responseFromServer.matchedCount) {
          Swal.fire({
            title: "Successfully Updated !",
            icon: "success",
            draggable: true,
          });
        }
      }
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <div className="my-8 lg:my-10 w-[90%] lg:w-[60%] mx-auto">
      <Link
        className="flex items-center gap-3 font-bold text-[19px] mb-5"
        to={`/`}
      >
        {" "}
        <FaArrowLeft />
        Back To Home
      </Link>
      <h3 className="font-bold text-4xl">Update Existing Coffee Details</h3>
      <p>
        It is a long established fact that a reader will be distraceted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using Content here.
      </p>

      {/* update details form */}
      <form onSubmit={handleFormSubmit} className="mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <label className="label font-semibold text-[18px] text-black mb-2">
              Name
            </label>
            <input
              placeholder="Enter Coffee Name"
              type="text"
              name="name"
              id=""
              className="py-2 px-3"
              onChange={changingValue}
              defaultValue={updateCoffee.name}
            />
          </div>
          <div>
            <label className="label font-semibold text-[18px] text-black mb-2">
              Supplier
            </label>
            <input
              placeholder="Enter Coffee Supplier"
              type="text"
              name="supplier"
              id=""
              className="py-2 px-3"
              onChange={changingValue}
              defaultValue={updateCoffee.supplier}
            />
          </div>
          <div>
            <label className="label font-semibold text-[18px] text-black mb-2">
              Price
            </label>
            <input
              placeholder="Enter Coffee Price"
              type="text"
              name="price"
              id=""
              className="py-2 px-3"
              onChange={changingValue}
              defaultValue={updateCoffee.price}
            />
          </div>
          <div>
            <label className="label font-semibold text-[18px] text-black mb-2">
              Photo
            </label>
            <input
              className="file-input file-input-primary"
              type="file"
              onChange={changingValue}
              placeholder=""
              name="photo"
              id=""
            />
          </div>
          <div>
            <label className="label font-semibold text-[18px] text-black mb-2">
              Quantity
            </label>
            <input
              placeholder="Enter Coffee Quantity"
              type="text"
              name="quantity"
              id=""
              className="py-2 px-3"
              onChange={changingValue}
              defaultValue={updateCoffee.quantity}
            />
          </div>
          <div>
            <label className="label font-semibold text-[18px] text-black mb-2">
              Taste
            </label>
            <input
              placeholder="Enter Coffee Taste"
              type="text"
              name="taste"
              id=""
              className="py-2 px-3"
              onChange={changingValue}
              defaultValue={updateCoffee.taste}
            />
          </div>
        </div>
        <div>
          <label className="label font-semibold text-[18px] text-black mb-2">
            Details
          </label>
          <input
            placeholder="Enter Coffee Details"
            type="text"
            name="details"
            id=""
            className="py-2 px-3"
            onChange={changingValue}
            defaultValue={updateCoffee.details}
          />
        </div>
        <input
          className="bg-[#d7a27e] add-coffee-button border-[#481713] rounded-[4px]  text-[#481713] font-bold mt-5 py-2"
          type="submit"
          value="Update Coffee Details"
        />
      </form>
    </div>
  );
};

export default UpdateDetails;
