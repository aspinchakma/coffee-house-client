import { useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import SignleUser from "./SignleUser";

const Users = () => {
  const initialValue = useLoaderData();
  const [users, setUsers] = useState(initialValue);

  const handleUserDelete = (id) => {
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
        fetch(`https://coffee-house-server-lzyu.onrender.com/users/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.deletedCount) {
              Swal.fire({
                position: "top-center",
                text: "Your file has been deleted.",
                icon: "success",
                title: "Successfully Deleted !",
                showConfirmButton: false,
                timer: 1500,
              });

              // remove from ui
              const finalUsersCollection = users.filter(
                (usr) => usr._id !== id
              );
              setUsers(finalUsersCollection);
            }
          });
      }
    });
  };
  return (
    <div className="w-[95%] lg:w-[70%] mx-auto my-8">
      {users.length ? (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <SignleUser
                  key={user._id}
                  index={index}
                  user={user}
                  handleUserDelete={handleUserDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3 className="text-4xl text-center font-bold mt-5 text-red-700">
          No Data Available!
        </h3>
      )}
    </div>
  );
};

export default Users;
