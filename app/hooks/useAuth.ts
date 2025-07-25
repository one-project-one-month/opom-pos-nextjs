// hooks/useAuth.ts
"use client";

import { useState, useEffect, useCallback } from "react";

import AuthService, {
  LoginCredentials,
  RegisterData,
  User,
  UserResponse,
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
        if (authService.isAuthenticated()) {
          const userData = await authService.getCurrentUser();
          setAuthState({
            user: userData.User_detail,
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
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        await authService.login(credentials);
        const userData = await authService.getCurrentUser();

        setAuthState({
          user: userData.User_detail,
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

  const register = useCallback(
    async (userData: RegisterData) => {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await authService.register(userData);

        setAuthState({
          user: response.user,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        });

        return true;
      } catch (error) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : "Registration failed",
        }));
        return false;
      }
    },
    [authService]
  );

  const logout = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      await authService.logout();
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
    } catch (error) {
      // Even if logout request fails, clear local state
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

  const refreshUser = useCallback(async () => {
    if (!authService.isAuthenticated()) return;

    try {
      const userData = await authService.getCurrentUser();
      setAuthState((prev) => ({
        ...prev,
        user: userData.User_detail,
      }));
    } catch (error) {
      console.error("Failed to refresh user data:", error);
    }
  }, [authService]);

  return {
    ...authState,
    login,
    register,
    logout,
    clearError,
    refreshUser,
  };
};
