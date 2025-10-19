import { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import AuthContext from "../context/AuthContex";

const SignIn = () => {
  const location = useLocation();
  const path = location.state || "/";
  const { userSignIn } = use(AuthContext);
  const navigate = useNavigate();
  const handleSignIn = (e) => {
    // start loading using sweetalert2
    Swal.fire({
      title: "User Sign In .....",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    userSignIn(email, password)
      .then((result) => {
        const lastSignInTime = result.user.metadata.lastSignInTime;
        const bdTime = new Date(lastSignInTime).toLocaleString("en-US", {
          timeZone: "Asia/Dhaka",
          hour12: true,
        });
        // update last sign in time to the database
        fetch("https://coffee-house-server-lzyu.onrender.com/users", {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email, lastSignInTime: bdTime }),
        })
          .then((res) => res.json())
          .then((rslt) => {
            if (rslt.matchedCount) {
              Swal.close();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully Login!",
                showConfirmButton: false,
                timer: 1500,
              });
              e.target.reset();
              navigate(path);
            }
          });
      })
      .catch((err) => {
        console.log(err.code);
      });
  };
  return (
    <div className=" flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSignIn}
        className="card bg-base-100 shadow-2xl w-[95%] lg:w-[28%] "
      >
        <div className="card-body">
          <fieldset className="fieldset  ">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
            <p className="text-center text-[16px] mt-2">
              New to Coffee House?{" "}
              <Link className="text-blue-600 font-bold" to={"/signup"}>
                Join Now
              </Link>
            </p>
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
