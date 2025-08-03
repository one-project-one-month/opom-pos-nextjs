"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaLock, FaUser } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "@/app/hooks/useAuth";
import { getRoleBasedRoute } from "@/app/constants/routes";
import { ErrorModal } from "./ErrorModal";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { login, isLoading, error, isAuthenticated, user, clearError } =
    useAuth();
  const router = useRouter();  

  const redirectBasedonRole = (userRole: string | null) => {
    const route = getRoleBasedRoute(userRole || "cashier");
    router.push(route);
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      redirectBasedonRole(user.role);
    }
  }, [isAuthenticated, router, user]);

  useEffect(() => {
    if (error) {
      setShowErrorModal(true);
    }
  }, [error]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      return;
    }

    const success = await login({
      email: formData.email,
      password: formData.password,
    });

    if (success && user) {
      redirectBasedonRole(user.role);
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    clearError();
  };

  return (
    <>
      <div className="flex justify-center h-screen bg-gray-100">
        <div className="flex-1 p-30 m-auto">
          <h1 className="text-7xl font-bold mb-4">
            <span className="text-primary-300">OPOM</span>POS
          </h1>
          <p>Inventory management system</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
            <h2 className="text-2xl font-extrabold">Login</h2>

            <div>
              <div className="flex items-center border-1 border-black rounded-md px-4 py-3">
                <FaUser className="text-primary-300 mr-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="flex-1 outline-none"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="flex-1 outline-none"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-400 focus:outline-none"
                disabled={isLoading}
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>

            <button
              type="submit"
              className="bg-primary-300 text-white px-4 py-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !formData.email || !formData.password}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
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

      <ErrorModal
        isOpen={showErrorModal}
        onClose={handleCloseErrorModal}
        title="Login Failed"
        message={error || "An unexpected error occurred"}
      />
    </>
  );
}

export default Login;
