// import { API } from "../constants/api";

// lib/auth.ts
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  access_token: string;
  access_token_expires_at: string;
  refresh_token: string;
  refresh_token_expires_at: string;
  token_type: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  photo: string | null;
  comfirmed_at: string | null;
  created_at: string;
  updated_at: string;
  role: string | null;
}

export interface UserResponse {
  User_detail: User;
  Staff_role: string | null;
}

const API_BASE_URL = "https://d8f12f513738.ngrok-free.app";

class AuthService {
  private static instance: AuthService;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.accessToken = localStorage.getItem("access_token");
      this.refreshToken = localStorage.getItem("refresh_token");
    }
  }

  private setTokens(tokens: AuthResponse) {
    this.accessToken = tokens.access_token;
    this.refreshToken = tokens.refresh_token;

    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", tokens.access_token);
      localStorage.setItem("refresh_token", tokens.refresh_token);
      localStorage.setItem(
        "access_token_expires_at",
        tokens.access_token_expires_at
      );
      localStorage.setItem(
        "refresh_token_expires_at",
        tokens.refresh_token_expires_at
      );
    }
  }

  private clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;

    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token_expires_at");
      localStorage.removeItem("refresh_token_expires_at");
    }
  }

  private isTokenExpired(expiresAt: string): boolean {
    return new Date() >= new Date(expiresAt);
  }

  private async makeRequest(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const headers = {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
      ...options.headers,
    };

    console.log("Final Request Headers:", headers);

    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers,
      ...options,
    });

    return response;
  }

  private async makeAuthenticatedRequest(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    let token = this.accessToken;

    if (typeof window !== "undefined") {
      const expiresAt = localStorage.getItem("access_token_expires_at");
      if (token && expiresAt && this.isTokenExpired(expiresAt)) {
        try {
          await this.refreshAccessToken();
          token = this.accessToken;
        } catch (error) {
          this.clearTokens();
          throw new Error("Session expired. Please login again.");
        }
      }
    }

    if (!token) {
      throw new Error("No access token available");
    }

    return this.makeRequest(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.makeRequest("/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      const authData: AuthResponse = await response.json();
      this.setTokens(authData);
      return authData;
    } catch (error) {
      throw error;
    }
  }

  async register(
    userData: RegisterData
  ): Promise<{ user: User; access_token: string; refresh_token: string }> {
    try {
      const response = await this.makeRequest("/api/v1/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }

      const data = await response.json();

      this.setTokens({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        access_token_expires_at: new Date(
          Date.now() + 24 * 60 * 60 * 1000
        ).toISOString(), // 1 day
        refresh_token_expires_at: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toISOString(), // 7 days
        token_type: "Bearer",
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      if (this.accessToken) {
        await this.makeAuthenticatedRequest("/api/auth/auth/logout", {
          method: "POST",
        });
      }
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      this.clearTokens();
    }
  }

  async refreshAccessToken(): Promise<AuthResponse> {
    if (!this.refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await this.makeRequest("/api/auth/auth/refresh", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.refreshToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const authData: AuthResponse = await response.json();
      this.setTokens(authData);
      return authData;
    } catch (error) {
      this.clearTokens();
      throw error;
    }
  }

  async getCurrentUser(): Promise<UserResponse> {
    try {
      const response = await this.makeAuthenticatedRequest("/api/v1/auth/user");
      const contentType = response.headers.get("content-type") || "";

      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        const text = await response.text();
        console.error(" Not JSON. Response text:\n", text);
        throw new Error("Unexpected response format (not JSON)");
      }

      //   return await response.json();
    } catch (error) {
      throw error;
    }
  }

  isAuthenticated(): boolean {
    if (!this.accessToken) return false;

    if (typeof window !== "undefined") {
      const expiresAt = localStorage.getItem("access_token_expires_at");
      if (expiresAt && this.isTokenExpired(expiresAt)) {
        return false;
      }
    }

    return true;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  getRefreshToken(): string | null {
    return this.refreshToken;
  }
}

export default AuthService;
