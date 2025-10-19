import { useLoaderData } from "react-router";

const UserDetails = () => {
  const user = useLoaderData();
  return (
    <div className="w-[95%] lg:w-[70%] mx-auto my-8">
      <div className="grid grid-cols-2 lg:grid-cols-7 gap-8">
        <div className="lg:col-span-3">
          <img className="w-full rounded-lg" src={user?.photo} alt="" />
        </div>
        <div className="lg:col-span-4">
          <h3 className="font-bold text-2xl">{user?.name}</h3>
          <p className="font-bold my-3">{user?.email}</p>
          <p>{user?.address}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
