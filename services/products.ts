import { FeaturedProductsResponse, TrendingProductsResponse } from "@/types/products"

const API_URL = process.env.NEXT_PUBLIC_API_URL


export const getAllProducts = async (query?: string) => {
    try {
        let res;
        if(query && query.trim() !== ''){
            res = await fetch(`${API_URL}/products?${query}`);
        }else{
            res = await fetch(`${API_URL}/products`);
        }
        if(!res.ok){
            throw new Error("Failed to get all products");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error while getting all the products", error)
    }
}

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

export const getProductDetails = async (slug: string) => {
    try {
        const res = await fetch(`${API_URL}/products/${slug}`);
        if(!res.ok){
            throw new Error("Failed To Get Product Details Please Try Again");
        }
        const product = await res.json();
        return product;
    } catch (error) {
        
    }
}

export const getRelatedProducts = async (productId: string) => {
    try {
        const res = await fetch(`${API_URL}/products/${productId}/related`);
        if(!res.ok){
            throw new Error("Failed To Get Related Products");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error while getting related products:", error);
    }
}