import { createContext, useContext, useState } from "react";
import { orderService } from "../Services/OrderService";
import type { OrderContextValue, CheckoutRequest } from "../Types/order";

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const savedLang = localStorage.getItem("lang");
    const langId = savedLang === 'ar' ? 1 : 2;

    const [loading, setLoading] = useState(false);
    
    const checkout = async (request: CheckoutRequest) => {
        try {
            setLoading(true);
            
            const response = await orderService.checkout(request);

            return response;
        } catch (error: any) {
            console.error("Checkout failed: ", error.message);
            throw error.message;
        } finally {
            setLoading(false);
        }
    };

    const getOrderHistory = async () => {
        try {
            setLoading(true);
            
            const response = await orderService.getOrderHistory(langId);
            
            return response;
        } catch (error) {
            console.error("Get order history failed: ", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <OrderContext.Provider value={{ checkout, getOrderHistory, loading }}>
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
