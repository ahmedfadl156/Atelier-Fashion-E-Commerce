import { getDashboardStats } from "@/services/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useGetStats = () => {
    return useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: () => getDashboardStats(),
        staleTime: 5 * 60 * 1000,
    });
}