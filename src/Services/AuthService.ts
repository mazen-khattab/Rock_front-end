// src/services/authService.ts

import axiosInstance from "../API";
import type {
  User,
  LoginRequest,
  RegisterRequest,
  ApiResponse,
  AssignRoleRequest,
} from "../Types/auth";

export const authService = {
  async login(email: string, password: string): Promise<{ user: User }> {
    const request: LoginRequest = {
      email: email.toLowerCase().trim(),
      password,
    };

    if (!request.email || !request.password) {
      throw new Error("Email and password are required");
    }

    if (!isValidEmail(request.email)) {
      throw new Error("Invalid email format");
    }

    try {
      console.log("[AuthService] Logging in:", { email: request.email });

      const response = await axiosInstance.post<ApiResponse<User>>(
        "/Auth/Login",
        request,
      );

      console.log("[AuthService] Login successful");
      return { user: response.data.data };
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      console.error("[AuthService] Login error:", message);
      console.error(error);

      throw new Error(message);
    }
  },

  async register(data: RegisterRequest): Promise<{ user: User }> {
    if (!data.email || !data.password || !data.fname || !data.lname || !data.phoneNumber) {
      throw new Error("Email, password, and name are required");
    }

    if (!isValidEmail(data.email)) {
      throw new Error("Invalid email format");
    }

    if (data.password !== data.confirmPassword) {
      throw new Error("Passwords don't match");
    }

    const request: RegisterRequest = {
      fname: data.fname.trim(),
      lname: data.lname.trim(),
      phoneNumber: data.phoneNumber.trim(),
      email: data.email.toLowerCase().trim(),
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      console.log("[AuthService] Registering user:", { email: request.email });
      const response = await axiosInstance.post<ApiResponse<User>>(
        "/Auth/Register",
        request,
      );
      console.log("[AuthService] Registration successful");
      return { user: response.data.data };
    } catch (error: any) {
      if (error.response?.status === 409) {
        throw new Error("Email already registered");
      }
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      console.error("[AuthService] Registration error:", message);
      throw new Error(message);
    }
  },

  async refresh(): Promise<{ user: User }> {
    try {
      // console.log("[AuthService] Refreshing token...");
      const response = await axiosInstance.post<ApiResponse<User>>(
        "/Auth/Refresh",
        {},
      );

      console.log(response);

      console.log("[AuthService] Token refresh successful");
      return { user: response.data.data };
    } catch (error: any) {
      console.log(
        "[AuthService] Token refresh failed:",
        error.response?.status,
      );
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      console.log("[AuthService] Logging out...");
      await axiosInstance.post("/Auth/logout", {});
      console.log("[AuthService] Logout successful");
    } catch (error: any) {
      console.error("[AuthService] Logout API failed:", error);
    }
  },

  async assignRole(userId: number, role: "admin" | "user" | "owner"): Promise<void> {
    const request: AssignRoleRequest = { userId, role };

    try {
      console.log("[AuthService] Assigning role:", { userId, role });

      await axiosInstance.post(
        `/Auth/assign-role`,
        request,
      );

      console.log("[AuthService] Role assignment successful");
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error("You do not have permission to assign roles");
      }

      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to assign role";

      console.error("[AuthService] Role assignment error:", message);
      throw new Error(message);
    }
  },
};

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
