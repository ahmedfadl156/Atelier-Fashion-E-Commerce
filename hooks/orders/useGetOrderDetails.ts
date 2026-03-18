import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "@/services/orders";

export const useGetOrderDetails = (orderNumber: string) => {
    return useQuery({
        queryKey: ["orderDetails", orderNumber],
        queryFn: () => getOrderDetails(orderNumber),
        enabled: !!orderNumber,
    });
};
