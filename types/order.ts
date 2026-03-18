export interface OrderItem {
    title: string;
    imageCover?: string;
    size: string;
    color: string;
}

export interface Order {
    createdAt: string;
    orderNumber: string;
    status: string;
    orderItems: OrderItem[];
}

export interface GetOrdersResponse {
    status: string;
    results: number;
    data: Order[];
}

// ── Order Details ─────────────────────────────────────────────────────────────

export interface ShippingAddress {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    country: string;
    phoneNumber: string;
}

export interface OrderDetailsItem {
    _id: string;
    product: string;
    title: string;
    color: string;
    size: string;
    image: string;
    price: number;
    quantity: number;
}

export interface OrderDetails {
    _id: string;
    user: string;
    orderNumber: string;
    shippingAddress: ShippingAddress;
    orderItems: OrderDetailsItem[];
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    paymentMethod: string;
    isPaid: boolean;
    paidAt?: string;
    paymentID?: string;
    status: string;
    isDelieverd: boolean;
    pointsEarned: number;
    createdAt: string;
    updatedAt: string;
}

export interface GetOrderDetailsResponse {
    status: string;
    data: OrderDetails;
}
