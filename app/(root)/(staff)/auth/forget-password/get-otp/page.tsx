import Link from "next/link";
import React from "react";

function GetOTP() {
  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className=" flex-1 p-30 m-auto">
        <h1 className="text-7xl font-bold  mb-4 ">
          <span className="text-primary-300">OPOM</span>POS
        </h1>
        <p>Inventory management system</p>
        <div className="flex flex-col gap-4 mt-8">
          <h2 className=" text-2xl font-extrabold">OTP Number</h2>
          <p className="text-xs">
            We have already send an OPT number to your email
          </p>
          <div className="flex  gap-4">
            <input
              type="number"
              className="w-15 h-15 border-1 border-black rounded-md"
            />
            <input
              type="number"
              className="w-15 h-15 border-1 border-black rounded-md"
            />
            <input
              type="number"
              className="w-15 h-15 border-1 border-black rounded-md"
            />
            <input
              type="number"
              className="w-15 h-15 border-1 border-black rounded-md"
            />
            <input
              type="number"
              className="w-15 h-15 border-1 border-black rounded-md"
            />
          </div>

          <Link
            href="/auth/forget-password/reset-password"
            className="bg-primary-300 text-white px-4 py-2 rounded text-center"
          >
            Confirm
          </Link>
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

export default GetOTP;
