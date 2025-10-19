import { createBrowserRouter } from "react-router";
import AddCoffe from "../components/AddCoffe";
import CoffeeDetails from "../components/CoffeeDetails";
import Home from "../components/Home";
import Loading from "../components/Loading";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import UpdateDetails from "../components/UpdateDetails";
import UserDetails from "../components/UserDetails";
import Users from "../components/Users";
import MainLayOut from "../layouts/MainLayOut";
import EditUser from "./../components/EditUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () =>
          fetch("https://coffee-house-server-lzyu.onrender.com/coffees"),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "/addcoffee",
        element: <AddCoffe />,
      },
      {
        path: "/coffees/:id",
        element: <CoffeeDetails />,
        loader: ({ params }) =>
          fetch(
            `https://coffee-house-server-lzyu.onrender.com/coffees/${params.id}`
          ),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "/updateDetails/:id",
        element: <UpdateDetails />,
        loader: ({ params }) =>
          fetch(
            `https://coffee-house-server-lzyu.onrender.com/coffees/${params.id}`
          ),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "/signin",
        Component: SignIn,
      },
      {
        path: "/signup",
        Component: SignUp,
      },
      {
        path: "/users",
        element: <Users />,
        loader: () =>
          fetch("https://coffee-house-server-lzyu.onrender.com/users"),
      },
      {
        path: "/users/:id",
        element: <UserDetails />,
        loader: ({ params }) =>
          fetch(
            `https://coffee-house-server-lzyu.onrender.com/users/${params.id}`
          ),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "/user/edit/:id",
        element: <EditUser />,
        loader: ({ params }) =>
          fetch(
            `https://coffee-house-server-lzyu.onrender.com/user/edit/${params.id}`
          ),
        hydrateFallbackElement: <Loading />,
      },
    ],
  },
]);

export default router;
