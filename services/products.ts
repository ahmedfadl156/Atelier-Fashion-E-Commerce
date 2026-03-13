import { FeaturedProductsResponse, TrendingProductsResponse } from "@/types/products"

const API_URL = process.env.NEXT_PUBLIC_API_URL

// بجيب هنا المنتجات ال featured
export const getFeaturedProducts = async (): Promise<FeaturedProductsResponse> => {
    try {
        const res = await fetch(`${API_URL}/products/featured-products`)

        if (!res.ok) {
            throw new Error("Failed to get featured products")
        }

        return res.json()
    } catch (error) {
        console.error("Error while getting the Featured products" + error)
    }
}

export const getTrendingProducts = async (): Promise<TrendingProductsResponse> => {
    try {
        const res = await fetch(`${API_URL}/products/trending-products`)

        if (!res.ok) {
            throw new Error("Failed to get trending products")
        }

        return res.json()
    } catch (error) {
        console.error("Error while getting the trending products" + error)
    }
}