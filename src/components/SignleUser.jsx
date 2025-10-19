import { Link } from "react-router";

const SignleUser = ({ user, index, handleUserDelete }) => {
  const { name, photo, email, address, _id } = user;
  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div className="flex items-center gap-3">
          <div>
            <div>
              <img
                className=" h-[70px] w-[70px] object-cover rounded-full"
                src={photo}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold text-[18px] ">{name}</div>
          </div>
        </div>
      </td>
      <td>{email}</td>
      <td>{address}</td>
      <th className="flex gap-3 items-center">
        <Link className="btn bg-info" to={`/users/${_id}`}>
          details
        </Link>
        <Link className="btn bg-info" to={`/user/edit/${_id}`}>
          Edit
        </Link>
        <button
          onClick={() => handleUserDelete(user._id)}
          className="btn bg-error"
        >
          Delete
        </button>
      </th>
    </tr>
  );
};

export default SignleUser;
