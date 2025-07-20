import Link from "next/link";
import React from "react";

function ForgetPassword() {
  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className=" flex-1 p-30 m-auto">
        <h1 className="text-7xl font-bold  mb-4 ">
          <span className="text-primary-300">OPOM</span>POS
        </h1>
        <p>Inventory management system</p>
        <div className="flex flex-col gap-4 mt-8">
          <h2 className=" text-2xl font-extrabold">Forgot your password?</h2>
          <div>
            <div className="flex items-center border-1 border-black rounded-md px-4 py-3">
              <input
                type="email"
                placeholder="enter your email"
                className="flex-1 outline-none"
              />
            </div>
          </div>

          <button className="bg-primary-300 text-white px-4 py-2 rounded">
            <Link href="/auth/forget-password/get-otp">Confirm</Link>
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

export default ForgetPassword;
