import { base } from "../constants/api";

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
  user: User;
  staff_role: string[]
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

// export interface UserResponse {
//   User_detail: User;
//   Staff_role: string | null;
// }

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
  private user: User | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.accessToken = localStorage.getItem("access_token");
      this.refreshToken = localStorage.getItem("refresh_token");
      const userData = localStorage.getItem("user_data");
      console.log(userData);

      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);

          this.user = {
            ...parsedUser,
            role: parsedUser.role || "cashier", 
          };
        } catch (error) {
          console.error("Failed to parse user data:", error);
        }
      } else {
        this.user = null;
      }
    }
  }

  private setTokens(tokens: AuthResponse) {
    console.log(tokens);

    this.accessToken = tokens.access_token;
    this.refreshToken = tokens.refresh_token;
    this.user = {
      ...tokens.user,
      role: tokens.staff_role[0] || "cashier",
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", tokens.access_token);
      localStorage.setItem("refresh_token", tokens.refresh_token);
      localStorage.setItem("user_data", JSON.stringify(this.user));
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
    this.user = null;

    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_data");
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

    const response = await fetch(`${base}${url}`, {
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
      const response = await this.makeRequest("auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      const authData: AuthResponse = await response.json();
      console.log(authData);

      this.setTokens(authData);
      return authData;
    } catch (error) {
      throw error;
    }
  }

  // async register(
  //   userData: RegisterData
  // ): Promise<{ user: User; access_token: string; refresh_token: string }> {
  //   try {
  //     const response = await this.makeRequest("auth/register", {
  //       method: "POST",
  //       body: JSON.stringify(userData),
  //     });

  //     if (!response.ok) {
  //       const error = await response.json();
  //       throw new Error(error.message || "Registration failed");
  //     }

  //     const data = await response.json();

  //     this.setTokens({
  //       access_token: data.access_token,
  //       refresh_token: data.refresh_token,
  //       access_token_expires_at: new Date(
  //         Date.now() + 24 * 60 * 60 * 1000
  //       ).toISOString(), // 1 day
  //       refresh_token_expires_at: new Date(
  //         Date.now() + 7 * 24 * 60 * 60 * 1000
  //       ).toISOString(), // 7 days
  //       token_type: "Bearer",
  //     });

  //     return data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async logout(): Promise<void> {
    try {
      if (this.accessToken) {
        await this.makeAuthenticatedRequest("auth/logout", {
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
      const response = await this.makeRequest("auth/refresh", {
        method: "GET",
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

  isAuthenticated(): boolean {
    console.log(this.accessToken, typeof window !== "undefined");
    
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
  getUser(): User | null {
    return this.user;
  }
}

export default AuthService;
