const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const addToWishlist = async (productId: string) => {
    try {
        const res = await fetch(`${API_URL}/wishlist` , {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ productId }),
        });

        if(!res.ok){
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed To add to wishlist")
        };

        return res.json();
    } catch (error) {
        console.error("Error while adding to wishlist" + error)
    }
}

export const removeFromWishlist = async (productId: string) => {
    try {
        const res = await fetch(`${API_URL}/wishlist/${productId}` , {
            method: "DELETE",
            credentials: "include",
        });

        if(!res.ok){
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed To remove from wishlist")
        };

        return res.json();
    } catch (error) {
        console.error("Error while removing from wishlist" + error)
        throw error;
    }
}

export const getWishlist = async () => {
    try {
        const res = await fetch(`${API_URL}/wishlist`, {
            credentials: "include",
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to get wishlist");
        }

        return res.json();
    } catch (error) {
        console.error("Error while fetching wishlist", error);
        throw error;
    }
}