import axiosInstance from "../API";
import type { ApiResponse } from "../Types/auth";
import type {
    ChangePasswordRequest,
    UpdateUserProfileRequest,
    UserProfile,
} from "../Types/user";

export const userService = {
    async getProfile(): Promise<{ profile: UserProfile }> {
        try {
            const response = await axiosInstance.get<ApiResponse<UserProfile>>(
                "/User/profile",
            );

            return { profile: response.data.data };
        } catch (error: any) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to get user profile";

            console.error("[UserService] Get profile error:", message);
            throw new Error(message);
        }
    },

    async updateProfile(
        data: UpdateUserProfileRequest,
    ): Promise<{ profile: UserProfile }> {
        const request: UpdateUserProfileRequest = {
            firstName: data.firstName.trim(),
            lastName: data.lastName.trim(),
            email: data.email.toLowerCase().trim(),
            phone: data.phone.trim(),
            governorate: data.governorate.trim(),
            city: data.city.trim(),
            fullAddress: data.fullAddress.trim(),
        };

        if (!request.firstName || !request.lastName || !request.email) {
            throw new Error("First name, last name, and email are required");
        }

        if (!isValidEmail(request.email)) {
            throw new Error("Invalid email format");
        }

        try {
            const response = await axiosInstance.put<ApiResponse<UserProfile>>(
                "/User/profile/update",
                request,
            );

            return { profile: response.data.data };
        } catch (error: any) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to update user profile";

            console.error("[UserService] Update profile error:", message);
            throw new Error(message);
        }
    },

    async changePassword(data: ChangePasswordRequest): Promise<void> {
        const request: ChangePasswordRequest = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
            confirmedPassword: data.confirmedPassword,
        };

        if (
            !request.oldPassword ||
            !request.newPassword ||
            !request.confirmedPassword
        ) {
            throw new Error("All password fields are required");
        }

        if (request.oldPassword === request.newPassword) {
            throw new Error("New password must be different from current password");
        }

        if (request.newPassword !== request.confirmedPassword) {
            throw new Error("New password and confirmation password do not match");
        }

        try {
            await axiosInstance.post<ApiResponse<null>>(
                "/User/password/change",
                request,
            );
        } catch (error: any) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to change password";

            console.error("[UserService] Change password error:", message);
            throw new Error(message);
        }
    },
};

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
