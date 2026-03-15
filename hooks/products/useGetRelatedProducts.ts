import { useQuery } from "@tanstack/react-query"
import { getRelatedProducts } from "@/services/products"

export const useGetRelatedProducts = (productId: string) => {
    return useQuery({
        queryKey: ["related-products", productId],
        queryFn: () => getRelatedProducts(productId),
        enabled: !!productId,
    })
}
