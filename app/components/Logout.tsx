// components/LogoutButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuthContext } from "../contexts/AuthContext";

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
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {showIcon && <LogOut className="h-4 w-4" />}
      {children}
    </button>
  );
};

// Alternative dropdown menu item version
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
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </button>
  );
};
