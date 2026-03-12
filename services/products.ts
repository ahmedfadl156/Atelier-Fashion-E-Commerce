import { FeaturedProductsResponse } from "@/types/products"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getFeaturedProducts = async (): Promise<FeaturedProductsResponse> => {
    const res = await fetch(`${API_URL}/products/featured-products`)

    if (!res.ok) {
        throw new Error("Failed to get featured products")
    }

    return res.json()
}