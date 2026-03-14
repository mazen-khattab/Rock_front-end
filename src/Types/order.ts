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

export interface OrderContextValue {
  checkout: (request: CheckoutRequest) => Promise<CheckoutResponse>;
}