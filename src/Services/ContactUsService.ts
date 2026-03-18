import axiosInstance from "../API";
import type { ApiResponse } from "../Types/auth";
import type { ContactInfo } from "../Types/contact";

export const contactUsService = {
  async contactUs(contactInfo: ContactInfo): Promise<ApiResponse<string>> {
    try {
      const response = await axiosInstance.post<ApiResponse<string>>(
        "ContactUs/ContactUs",
        contactInfo,
      );

      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to send contact message";
      console.error("[ContactUsService] contactUs error:", message);
      console.error(error);

      throw new Error(message);
    }
  },
};
