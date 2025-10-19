import { Outlet } from "react-router";
import { Bounce, ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import Header from "../components/Header";

const MainLayOut = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayOut;
