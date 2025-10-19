import { use } from "react";
import { Navigate } from "react-router";
import Loading from "../components/Loading";
import AuthContext from "../context/AuthContex";

const PrivateRouter = ({ children }) => {
  const { isLoading, user } = use(AuthContext);
  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate state={location.pathname} to={`/signin`}></Navigate>;
  }

  if (user) {
    return children;
  }
};

export default PrivateRouter;
