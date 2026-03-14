import axiosInstance from "../API";
import type { CheckoutRequest, CheckoutResponse } from "../Types/order";

export const orderService = {
    async checkout(request: CheckoutRequest): Promise<CheckoutResponse> {
        try {
            const response = await axiosInstance.post(
                "Order/Checkout",
                request,
            );

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
};