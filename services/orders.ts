import { GetOrderDetailsResponse, GetOrdersResponse } from "@/types/order";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserOrders = async (): Promise<GetOrdersResponse> => {
    const res = await fetch(`${API_URL}/order` , {
        credentials: "include"
    });

    if(!res.ok){
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to get your orders please try again");
    }

    return res.json();
};

export const getOrderDetails = async (orderNumber: string): Promise<GetOrderDetailsResponse> => {
    const res = await fetch(`${API_URL}/order/${orderNumber}`, {
        credentials: "include",
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to get order details, please try again");
    }

    return res.json();
};