import { useQuery } from "@tanstack/react-query"
import { getCart } from "@/services/cart"

export const useGetCart = (enabled = true) => {
    return useQuery({
        queryKey: ["cart"],
        queryFn: getCart,
        enabled,
        retry: false,
    })
}
