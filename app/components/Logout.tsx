// components/LogoutButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { LoaderCircle, LogOut } from "lucide-react";
import { useAuthContext } from "../contexts/AuthContext";
import { useState } from "react";
import Modal from "./modal";
import ModalTitle from "./modal-title";
import CustomBtn from "./custom-btn";

interface LogoutButtonProps {
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  className = "",
  showIcon = true,
  children = "Logout",
}) => {
  const { logout, isLoading } = useAuthContext();
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        disabled={isLoading}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {showIcon && <LogOut className="h-4 w-4" />}
        {children}
      </button>
      {openModal && (
        <Modal
          onClose={() => setOpenModal(false)}
          className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm mx-auto"
        >
          <ModalTitle>Confirmation</ModalTitle>
          <span className="text-center">
            Are you sure to logout?
          </span>
          <div className="flex justify-center gap-2 mt-5 mx-10">
            <CustomBtn
              className="border border-alert-400 hover:bg-alert-500 hover:text-white text-black w-full"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </CustomBtn>
            <CustomBtn
              className="border border-success-400 hover:bg-success-500 hover:text-white text-black flex gap-2 justify-center items-center w-full"
              onClick={() => handleLogout()}
            >
              {
                isLoading ? <LoaderCircle /> : 'Confirm'
              }              
            </CustomBtn>
          </div>
        </Modal>
      )}
    </>
  );
};

export const LogoutMenuItem: React.FC<{ onClose?: () => void }> = ({
  onClose,
}) => {
  const { logout } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    onClose?.();
    await logout();
    router.push("/login");
  };

  return (
    <button onClick={handleLogout} className=" text-white">
      <LogOut className="h-10 w-10" />
      Logout
    </button>
  );
};
