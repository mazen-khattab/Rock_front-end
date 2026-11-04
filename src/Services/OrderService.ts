import axiosInstance from "../API";
import type { ApiResponse } from "../Types/auth";
import type { CheckoutRequest, CheckoutResponse, OrderHistoryItem } from "../Types/order";

export const orderService = {
    async checkout(request: CheckoutRequest): Promise<CheckoutResponse> {
        try {
            const response = await axiosInstance.post(
                "Orders/Checkout",
                request,
            );

            console.log("[OrderService] checkout response:", response.data);

            return response.data;
        } catch (error: any) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to checkout";

            console.error("[OrderService] checkout error:", message);
            console.error(error);

            throw new Error(message);
        }
    },

    async getOrderHistory(): Promise<ApiResponse<OrderHistoryItem[]>> {
        try {
            const response = await axiosInstance.get<ApiResponse<OrderHistoryItem[]>>(`Orders/OrderHistory`);

            return response.data;
        } catch (error: any) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to fetch order history";
            console.error("[OrderService] getOrderHistory error:", message);
            console.error(error);
            throw new Error(message);
        }
    }
};