import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";
import { Bounce, toast } from "react-toastify";
import "./AddCoffee.css";

const AddCoffe = () => {
  const [formData, setFormData] = useState({
    name: "",
    supplier: "",
    price: "",
    photo: null,
    quantity: "",
    taste: "",
    details: "",
  });

  const changingValue = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const imgData = new FormData();
    imgData.append("image", formData.photo);

    const apiKey = import.meta.env.VITE_PHOTO_SERVER_API;
    const uploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    try {
      const resImg = await fetch(uploadUrl, {
        method: "POST",
        body: imgData,
      });

      const data = await resImg.json();
      console.log(data);
      if (data.success) {
        const imageURL = data.data.url;
        const coffeDetails = {
          name: formData.name,
          supplier: formData.supplier,
          price: Number(formData.price),
          photo: imageURL,
          quantity: Number.parseInt(formData.quantity),
          taste: formData.taste,
          details: formData.details,
        };

        const resServer = await fetch(
          "https://coffee-house-server-lzyu.onrender.com/coffee",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(coffeDetails),
          }
        );
        const dataServer = await resServer.json();
        if (dataServer.insertedId) {
          toast.success("Successfully Added!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });

          // clearing form
          e.target.reset();
        }
      }
    } catch (error) {
      toast.error(error.code, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  return (
    <div className="max-w-[1000px] mx-auto py-8 lg:py-10">
      <Link className="flex items-center gap-3 font-bold text-[19px]" to={`/`}>
        {" "}
        <FaArrowLeft />
        Back To Home
      </Link>
      <h2 className="text-center font-bold text-[30px] mb-5">Add New Coffee</h2>
      <p className="text-center mb-7">
        It is a long established fact that a reader will be distraceted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using Content here.
      </p>
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
              required
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
              required
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
              required
            />
          </div>
          <div>
            <label className="label font-semibold text-[18px] text-black mb-2">
              Photo
            </label>
            <input
              className="file-input file-input-primary"
              onChange={changingValue}
              required
              placeholder=""
              type="file"
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
              required
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
              required
            />
          </div>
        </div>
        <div className="mt-5 ">
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
            required
          />
        </div>
        <input
          className="bg-[#d7a27e] add-coffee-button border-[#481713] rounded-[4px]  text-[#481713] font-bold mt-5 py-2"
          type="submit"
          value="Add Coffee"
        />
      </form>
    </div>
  );
};

export default AddCoffe;
