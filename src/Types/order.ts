export interface CheckoutRequest {
    firstName: string;
    lastName: string;
    phone: string;
    governorate: string;
    city: string;
    address: string;
    email: string;
    password: string;
    isAuthenticated: boolean;
    idempotencyKey: string | null;
    guestId: string | null;
}

export interface CheckoutResponse {
    orderId: number;
    orderNumber: string;
    createdAt: string;
    totalPrice: number;
}

export interface OrderHistoryItem {
    orderNumber: string;
    status: string;
    totalPrice: number;
    createdAt: string;
    orderDetails: {
        name: string;
        description: string;
        price: number;
        originalPrice: number;
        colorName: string;
        hexCode: string;
        sizeName: string;
        quantity: number;
        image: string;
    }[];
}


export interface OrderContextValue {
  checkout: (request: CheckoutRequest) => Promise<CheckoutResponse>;
  getOrderHistory: () => Promise<OrderHistoryItem[]>;
}