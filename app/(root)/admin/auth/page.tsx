"use client";
import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className=" flex-1 p-30 m-auto">
        <h1 className="text-7xl font-bold  mb-4 ">
          <span className="text-primary-300">OPOM</span>POS
        </h1>
        <p>Inventory management system</p>
        <div className="flex flex-col gap-4 mt-8">
          <h2 className=" text-2xl font-extrabold">Login</h2>
          <div>
            <div className="flex items-center border-1 border-black rounded-md px-4 py-3">
              <FaUser className="text-primary-300 mr-2" />
              <input
                type="text"
                placeholder="staff id number"
                className="flex-1 outline-none"
              />
            </div>
          </div>
          <div className="flex items-center border rounded px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-primary-300">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="flex-1 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-gray-400 focus:outline-none"
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>

          <button className="bg-primary-300 text-white px-4 py-2 rounded">
            Login
          </button>
        </div>
      </div>
      <div className="flex-1/3 overflow-hidden">
        <img
          src="/assets/POSLogin.png"
          alt="Logo"
          width={600}
          height={600}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}

export default Login;
