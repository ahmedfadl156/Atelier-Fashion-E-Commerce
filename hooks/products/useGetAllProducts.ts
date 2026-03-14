import { getAllProducts } from "@/services/products"
import { useQuery } from "@tanstack/react-query"

export const useGetAllProducts = (query: string) => {
    return useQuery({
        queryKey: ['All-products', query],
        queryFn: () => getAllProducts(query)
    })
}