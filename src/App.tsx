import Footer from "@/pages/Home/Footer/Footer";
import Navbar from "@/pages/Home/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-[#f1f1f1] min-h-screen mx-auto w-full">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default App;
