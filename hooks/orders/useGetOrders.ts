import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "@/services/orders";

export const useGetOrders = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: getUserOrders,
    });
};
