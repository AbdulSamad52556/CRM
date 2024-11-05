import React from "react";
import image from "../assets/wp12993489-property-management-wallpapers.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[98.7vw] h-[100vh]">
      <div className="ml-1 w-full bg-[#10002b] rounded-xl">
        <div className=" mt-1 flex justify-end p-4">
          <div className=" mt-1 mr-4">
            <button
              className=" px-4 py-1 text-white rounded bg-[#754db9] hover:bg-[#744db9b7] duration-300"
              onClick={() => navigate("/login")}
            >
              signin
            </button>
          </div>
          <div className="px-2 hover:bg-[#754db9] rounded duration-300 cursor-pointer" onClick={()=>navigate("/signup")}>
            <p className="text-white p-2">create an account</p>
          </div>
        </div>

        <div className="flex justify-end items-center p-10 ">
          <p className="text-4xl text-white font-sans font-bold px-32">
            "Transform your sales process with smarter insights, seamless
            connections, and lasting customer loyalty. Discover the power of
            CRM."
          </p>
          <img className="w-1/2 rounded-xl" src={image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
