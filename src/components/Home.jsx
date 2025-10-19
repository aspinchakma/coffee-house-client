import { useLoaderData } from "react-router";
import Banner from "./Banner";
import Follow from "./Follow";
import Products from "./Products";

const Home = () => {
  const coffees = useLoaderData();
  return (
    <div>
      <Banner />
      <div className="w-[90%] lg:w-[60%] mx-auto">
        <Products coffees={coffees} />
        <Follow />
      </div>
    </div>
  );
};

export default Home;
