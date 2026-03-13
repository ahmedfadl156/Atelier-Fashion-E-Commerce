import { getTrendingProducts } from "@/services/products"
import { useQuery } from "@tanstack/react-query"

export const useTrendingProducts = () => {
    return useQuery({
        queryKey: ['trending-products'],
        queryFn: getTrendingProducts
    })
}