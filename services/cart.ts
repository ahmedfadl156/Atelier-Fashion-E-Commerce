import { AddToCartPayload, AddToCartResponse, GetCartResponse } from "@/types/cart"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const addProductToCart = async (payload: AddToCartPayload): Promise<AddToCartResponse> => {
    const { productData: _, ...serverPayload } = payload

    const res = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(serverPayload),
    })

    if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Failed to add product to cart")
    }

    return res.json()
}

export const getCart = async (): Promise<GetCartResponse> => {
    const res = await fetch(`${API_URL}/cart`, {
        credentials: "include",
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || "Failed to get cart")
    }

    return res.json()
}

export const removeCartItem = async (itemId: string) => {
    try {
        const res = await fetch(`${API_URL}/cart/${itemId}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.message || "Failed to remove item")
        }
        return res.json();
    } catch (error) {
        console.error("Error removing item from cart:", error);
        throw error;
    }
};

export const updateCartItemQty = async ({
    itemId,
    quantity,
}: {
    itemId: string;
    quantity: number;
}) => {
    try {
        const res = await fetch(`${API_URL}/cart/${itemId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ quantity }),
        });
        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.message || "Failed to update quantity")
        }
        return res.json();
    } catch (error) {
        console.error("Error updating item quantity in cart:", error);
        throw error;
    }
};
