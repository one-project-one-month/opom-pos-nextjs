import { useEffect } from "react";
import {
  selectAuth,
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectError,
  selectUserRole,
  selectAccessToken,
  selectRefreshToken,
  initializeAuth,
  setError,
  loginSuccess,
  logout as LogoutAction,
  loginFailure,
  setLoading,
  clearError,
} from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useAuth } from "./useAuth";

export const useAuthRedux = () => {
  const dispatch = useAppDispatch();
  const originalAuth = useAuth();

  const auth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const userRole = useAppSelector(selectUserRole);
  const accessToken = useAppSelector(selectAccessToken);
  const refreshToken = useAppSelector(selectRefreshToken);

  useEffect(() => {
    dispatch(
      initializeAuth({
        user: originalAuth.user,
        accessToken: originalAuth.user ? "token_from_service" : null, // You might want to get actual token from service
        refreshToken: originalAuth.user ? "refresh_token_from_service" : null,
        isAuthenticated: originalAuth.isAuthenticated,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(setError(originalAuth.error));
  }, [originalAuth.error, dispatch]);

  useEffect(() => {
    if (originalAuth.isAuthenticated && originalAuth.user) {
      dispatch(
        loginSuccess({
          user: originalAuth.user,
          accessToken: "token_from_service",
          refreshToken: "refresh_token_from_service",
        })
      );
    } else if (!originalAuth.isAuthenticated) {
      dispatch(LogoutAction());
    }
  }, [originalAuth.isAuthenticated, originalAuth.user, dispatch]);

  const login = async (credentials: {
    email: string;
    password: string;
  }): Promise<boolean> => {
    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const success = await originalAuth.login(credentials);

      if (success && originalAuth.user) {
        dispatch(
          loginSuccess({
            user: originalAuth.user,
            accessToken: "token_from_service", // Get actual token from AuthService
            refreshToken: "refresh_token_from_service",
          })
        );
      } else {
        dispatch(loginFailure(originalAuth.error || "Login failed"));
      }

      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      dispatch(loginFailure(errorMessage));
      return false;
    }
  };
  const logout = async (): Promise<void> => {
    dispatch(setLoading(true));

    try {
      await originalAuth.logout();
      dispatch(LogoutAction());
    } catch (err) {
      // Even if logout fails, clear Redux state
      dispatch(LogoutAction());
    }
  };

  const handleClearError = () => {
    dispatch(clearError());
    originalAuth.clearError();
  };
  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    userRole,
    accessToken,
    refreshToken,

    login,
    logout,
    clearError: handleClearError,

    authState: auth,
  };
};
