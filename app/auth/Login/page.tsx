"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className=" flex-1 p-30 m-auto">
        <h1 className="text-7xl font-bold  mb-4 ">
          <span className="text-primary-300">OPOM</span>POS
        </h1>
        <p>Online inventory management system</p>
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
          <div className="text-right mb-4 text-sm text-gray-500 hover:underline cursor-pointer">
            <Link href="/auth/ForgetPassword">Forgot Password ?</Link>
          </div>

          <button className="bg-primary-300 text-white px-4 py-2 rounded">
            Login
          </button>
          <p className="text-sm mt-4 text-gray-600">
            Don’t have an account?
            <Link
              href="/auth/Signup"
              className="text-primary-300 hover:underline cursor-pointer"
            >
              Go to Registration
            </Link>
          </p>
        </div>
      </div>
      <div className="flex-1/3 overflow-hidden">
        <img
          src="/image/POSLogin.png"
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
