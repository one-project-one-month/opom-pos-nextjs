"use client";

import { useState, useEffect, useCallback } from "react";

import AuthService, {
  LoginCredentials,
  RegisterData,
  User,
} from "../services/authService";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  const authService = AuthService.getInstance();

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log(authService.isAuthenticated());
        const accessToken = localStorage.getItem("access_token");
        const userDataStr = localStorage.getItem("user_data");
        console.log(accessToken, userDataStr)

        if (accessToken && userDataStr) {
          const userData = JSON.parse(userDataStr);

          const userWithRole = {
            ...userData,
            role: userData.role || "cashier",
          };

          setAuthState({
            user: userWithRole,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          });
        } else {
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
          });
        }
      } catch (error) {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error:
            error instanceof Error ? error.message : "Authentication failed",
        });
      }
    };

    initializeAuth();
  }, [authService]);

  console.log(authState);


  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const authRespone = await authService.login(credentials);
        console.log(authRespone);

        const userWithRole = authRespone.user
          ? {
            ...authRespone.user,
            role: authRespone.staff_role[0] || "cashier",
          }
          : null;

        console.log(userWithRole);
        if (authRespone.access_token) {
          localStorage.setItem("access_token", authRespone.access_token);
        }
        if (userWithRole) {
          localStorage.setItem("user_data", JSON.stringify(userWithRole));
        }

        setAuthState({
          user: userWithRole,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        });

        return true;
      } catch (error) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : "Login failed",
        }));
        return false;
      }
    },
    [authService]
  );

  //   const register = useCallback(
  //     async (userData: RegisterData) => {
  //       setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

  //       try {
  //         const response = await authService.register(userData);

  //         setAuthState({
  //           user: response.user,
  //           isLoading: false,
  //           isAuthenticated: true,
  //           error: null,
  //         });

  //         return true;
  //       } catch (error) {
  //         setAuthState((prev) => ({
  //           ...prev,
  //           isLoading: false,
  //           error: error instanceof Error ? error.message : "Registration failed",
  //         }));
  //         return false;
  //       }
  //     },
  //     [authService]
  //   );

  const logout = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    localStorage.removeItem("access_token");
localStorage.removeItem("user_data");

    try {
      await authService.logout();
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
    }
  }, [authService]);

  const clearError = useCallback(() => {
    setAuthState((prev) => ({ ...prev, error: null }));
  }, []);

  console.log({
    ...authState,
    login,
    logout,
    clearError,
  });


  return {
    ...authState,
    login,
    logout,
    clearError,
  };
};
