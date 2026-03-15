import { useQuery } from "@tanstack/react-query"
import { getCategory } from "@/services/categories"

export const useGetCategory = (slug: string) => {
    return useQuery({
        queryKey: ["category", slug],
        queryFn: () => getCategory(slug),
        enabled: !!slug,
    })
}