import { updateProfile } from "firebase/auth";
import { use, useState } from "react";
import { Link } from "react-router";
import { Bounce, toast } from "react-toastify";
import Swal from "sweetalert2";
import AuthContext from "../context/AuthContex";
import auth from "../firebase/firebase.init";

const SignUp = () => {
  const { creatingUser } = use(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    photo: "",
    email: "",
    password: "",
  });

  const changingValue = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();

    // add loader for understand
    Swal.fire({
      title: "Creating account...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // get image link
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

      if (data.success) {
        const imageURL = data.data.url;

        // creating new object including new image url
        const usersDetails = {
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
          photo: imageURL,
          email: formData.email,
          password: formData.password,
        };
        // create user in firebase
        creatingUser(usersDetails.email, usersDetails.password)
          .then((result) => {
            const lastSignInTime = result.user?.metadata?.lastSignInTime;
            const bdTime = new Date(lastSignInTime).toLocaleString("en-US", {
              timeZone: "Asia/Dhaka",
              hour12: true,
            });
            "en-US", { timeZone: "Asia/Dhaka" };

            const creationTime = result.user?.metadata?.creationTime;

            const bdTimeTwo = new Date(creationTime).toLocaleString("en-US", {
              timeZone: "Asia/Dhaka",
              hour12: true,
            });

            // updating profile
            updateProfile(auth.currentUser, {
              displayName: usersDetails.name,
              photoURL: imageURL,
            })
              .then(() => {
                // save user information in database
                fetch("https://coffee-house-server-lzyu.onrender.com/users", {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify({
                    ...usersDetails,
                    lastSignInTime: bdTime,
                    creationTime: bdTimeTwo,
                  }),
                })
                  .then((res) => res.json())
                  .then((rslt) => {
                    // show successfull message
                    Swal.close();

                    if (rslt.insertedId) {
                      toast.success("Successfull Created Account!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                      });
                    }

                    // reseting the form
                    e.target.reset();
                  });
              })
              .catch((err2) => {
                console.log(err2.code);
              });
          })
          .catch(() => {
            Swal.close();
            toast.error("Email Already In User!", {
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
          });
      } else {
        // showing the error using react toastify

        Swal.close();

        toast.error(data.error.message, {
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
    } catch (error) {
      console.log(error.code);
    }
  };
  return (
    <div className=" flex justify-center items-center min-h-screen my-7">
      <form
        onSubmit={handleSignUp}
        className="card bg-base-100 shadow-2xl w-[95%] lg:w-[28%] "
      >
        <div className="card-body">
          <fieldset className="fieldset  ">
            <label className="label">Full Name</label>
            <input
              type="text"
              className="input"
              name="name"
              placeholder="name"
              required
              onChange={changingValue}
            />
            <label className="label">Address</label>
            <input
              type="text"
              className="input"
              name="address"
              placeholder="Address"
              required
              onChange={changingValue}
            />
            <label className="label">Phone</label>
            <input
              type="text"
              className="input"
              name="phone"
              placeholder="Phone Number"
              required
              onChange={changingValue}
            />
            <label className="label">Photo</label>
            <input
              className="file-input file-input-primary"
              onChange={changingValue}
              placeholder=""
              type="file"
              name="photo"
              required
            />
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              name="email"
              placeholder="Email"
              required
              onChange={changingValue}
            />
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              required
              onChange={changingValue}
            />
            <button className="btn btn-neutral mt-4">Sign Up</button>
            <p className="text-center text-[16px] mt-2">
              Have an account?{" "}
              <Link className="text-blue-600 font-bold" to={"/signin"}>
                Login
              </Link>
            </p>
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
