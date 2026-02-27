import axiosInstance from "../API";
import type { ApiResponse } from "../Types/auth";
import type { CartItem } from "../Types/product";

export const cartService = {
  // user methods
  async GetUserCart(langId: number): Promise<ApiResponse<CartItem[]>> {
    try {
      const response = await axiosInstance.get<ApiResponse<CartItem[]>>(
        `Cart/GetUserCart/${langId}`,
      );

      // console.log("[UserCartService] Cart retrieved successfully");
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to retrieving the cart";
      console.error("[UserCartService] Cart retrieving error:", message);
      console.error(error);

      throw new Error(message);
    }
  },
  async AddToUserCart(
    variantId: number,
    quantity: number,
  ): Promise<ApiResponse<string>> {
    const request = {
      variantId: variantId,
      quantity: quantity,
    };

    try {
      const response = await axiosInstance.post<ApiResponse<string>>(
        `Cart/AddToCartUser`,
        request,
      );
      // console.log("[UserCartService] Added to user cart successfully");
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed add the item to the cart";
      console.error("[UserCartService] adding the item error:", message);
      console.error(error);

      throw new Error(message);
    }
  },
  async IncreaseUserAmount(variantId: number): Promise<ApiResponse<string>> {
    const request = {
      variantId: variantId,
    };

    try {
      const response = await axiosInstance.put<ApiResponse<string>>(
        `Cart/IncreaseUserAmount`,
        request,
      );

      // console.log("[UserCartService] increased the cart item successfully");
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to increasing the amount";
      console.error("[UserCartService] increasing the amount error:", message);
      console.error(error);

      throw new Error(message);
    }
  },
  async DecreaseUserAmount(variantId: number): Promise<ApiResponse<string>> {
    const request = {
      variantId: variantId,
    };

    try {
      const response = await axiosInstance.put<ApiResponse<string>>(
        `Cart/DecreaseUserAmount`,
        request,
      );

      // console.log("[UserCartService] decreaes the cart item successfully");
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to decreasing the amount";
      console.error("[UserCartService] decreasing the amount error:", message);
      console.error(error);

      throw new Error(message);
    }
  },
  async RemoveUserItem(variantId: number): Promise<ApiResponse<string>> {
    try {
      const response = await axiosInstance.delete<ApiResponse<string>>(
        `Cart/RemoveUserItem/${variantId}`,
      );

      // console.log("[UserCartService] item deleted successfully");
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to deleting the item";
      console.error("[UserCartService] deleting the item error:", message);
      console.error(error);

      throw new Error(message);
    }
  },

  // guest methods
  async GetGuestCart(
    guestId: string,
    langId: number,
  ): Promise<ApiResponse<CartItem[]>> {
    try {
      // console.log("[GuestCartService] LandId:", { langId: langId });

      const response = await axiosInstance.get<ApiResponse<CartItem[]>>(
        `Cart/GetGuestCart/${langId}/${guestId}`,
      );

      // console.log("[GuestCartService] Cart retrieved successfully");
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to retrieving the cart";
      console.error("[GuestCartService] Cart retrieving error:", message);
      console.error(error);

      throw new Error(message);
    }
  },
  async AddToGuestCart(
    guestId: string,
    variantId: number,
    quantity: number,
  ): Promise<ApiResponse<string>> {
    const request = {
      guestId: guestId,
      variantId: variantId,
      quantity: quantity,
    };

    try {
      const response = await axiosInstance.post<ApiResponse<string>>(
        `Cart/AddToGuestCart`,
        request,
      );

      // console.log("[GuestCartService] Added to guest cart successfully");
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed add the item to the cart";
      console.error("[GuestCartService] adding the item error:", message);
      console.error(error);

      throw new Error(message);
    }
  },
  async IncreaseGuestAmount(
    guestId: string,
    variantId: number,
  ): Promise<ApiResponse<string>> {
    const request = {
      guestId: guestId,
      variantId: variantId,
    };

    try {
      const response = await axiosInstance.put<ApiResponse<string>>(
        `Cart/IncreaseGuestAmount`,
        request,
      );

      // console.log("[GuestCartService] increased the cart item successfully");
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to increasing the amount";
      console.error("[GuestCartService] increasing the amount error:", message);
      console.error(error);

      throw new Error(message);
    }
  },
  async DecreaseGuestAmount(
    guestId: string,
    variantId: number,
  ): Promise<ApiResponse<string>> {
    const request = {
      guestId: guestId,
      variantId: variantId,
    };

    try {
      const response = await axiosInstance.put<ApiResponse<string>>(
        `Cart/DecreaseGuestAmount`,
        request,
      );

      // console.log("[GuestCartService] increased the cart item successfully");
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data ||
        error.message ||
        "Failed to increasing the amount";
      console.error("[GuestCartService] increasing the amount error:", message);
      console.error(error);

      throw new Error(message);
    }
  },
  async RemoveGuestItem(
    guestId: string,
    variantId: number,
  ): Promise<ApiResponse<string>> {
    try {
      const response = await axiosInstance.delete<ApiResponse<string>>(
        `Cart/RemoveGuestItem/${guestId}/${variantId}`,
      );

      // console.log("[GuestCartService] item deleted successfully");
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to deleting the item";
      console.error("[GuestCartService] deleting the item error:", message);
      console.error(error);

      throw new Error(message);
    }
  },

  // merge
  async Merge(guestId: string): Promise<ApiResponse<CartItem[]>> {
    const request = {
      guestId: guestId,
    };

    try {
      const response = await axiosInstance.post<ApiResponse<CartItem[]>>(
        `Cart/Merge`,
        request,
      );

      // remove guest Id from local store after merge the guest cart to the use cart
      localStorage.removeItem("GuestId");

      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to merge the item(s)";
      console.error("[Merge] merge the item(s) error:", message);
      console.error(error);

      throw new Error(message);
    }
  },
};

