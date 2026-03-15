import axiosInstance from "../API";
import type { CheckoutRequest, CheckoutResponse, OrderHistoryItem } from "../Types/order";

export const orderService = {
    async checkout(request: CheckoutRequest): Promise<CheckoutResponse> {
        try {
            const response = await axiosInstance.post(
                "Order/Checkout",
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

    async getOrderHistory(langId: number): Promise<OrderHistoryItem[]> {
        try {
            const response = await axiosInstance.get(`Order/OrderHistory/${langId}`);

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