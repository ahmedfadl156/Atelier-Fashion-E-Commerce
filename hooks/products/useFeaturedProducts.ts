import { useQuery } from "@tanstack/react-query"
import { getFeaturedProducts } from "@/services/products"

export const useFeaturedProducts = () => {
    return useQuery({
        queryKey: ["featured-products"],
        queryFn: getFeaturedProducts,
    })
}
