// components/ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requiredRole?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = "/login",
  requiredRole
}) => {
  const { isAuthenticated, isLoading, user } = useAuthContext();
  const router = useRouter();

  console.log("ProtectedRoute isAuthenticated:",isAuthenticated, user);

  useEffect(() => {
    // if (!isLoading) {
    //   if (!isAuthenticated) {
    //     router.push(redirectTo);
    //   } else if (requiredRole && user?.role !== requiredRole) {
    //     router.replace("/unauthorized");
    //   }
    // }
  }, [isAuthenticated, isLoading, router, redirectTo, requiredRole, user]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-300"></div>
      </div>
    );
  }

  // If not authenticated, don't render children (redirect will happen)
  if (!isAuthenticated) return null;

  if (requiredRole && user?.role !== requiredRole) return null;

  // If authenticated, render the protected content
  return <>{children}</>;
};
