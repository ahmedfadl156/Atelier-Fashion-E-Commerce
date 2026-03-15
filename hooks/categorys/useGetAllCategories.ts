import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/categories";

export const useGetAllCategories = () => {
    return useQuery({
        queryKey: ["all-categories"],
        queryFn: getAllCategories,
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    });
};
