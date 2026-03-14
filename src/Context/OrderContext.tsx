import { createContext, useContext } from "react";
import { orderService } from "../Services/OrderService";
import type { OrderContextValue, CheckoutRequest } from "../Types/order";

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const checkout = async (request: CheckoutRequest) => {
        try {
            const response = await orderService.checkout(request);
            console.log("Checkout response:", response);
            return response;
        } catch (error) {
            console.error("Checkout failed:", error);
            throw error;
        }
    };

    return (
        <OrderContext.Provider value={{ checkout }}>
            {children}
        </OrderContext.Provider>
    );
}

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrder must be used inside OrderProvider");
    }
    return context;
};
