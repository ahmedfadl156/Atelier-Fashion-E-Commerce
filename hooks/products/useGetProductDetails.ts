import { useQuery } from "@tanstack/react-query"
import { getProductDetails } from "@/services/products"

export const useGetProductDetails = (slug: string) => {
    return useQuery({
        queryKey: ["product", slug],
        queryFn: () => getProductDetails(slug),
        enabled: !!slug,
    })
}