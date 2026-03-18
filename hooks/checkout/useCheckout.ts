import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cashOrder, createCreditOrder } from "@/services/checkout";
import { ShippingDetailsSchema } from "@/lib/Schemas";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useCashOrder = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (shippingDetails: ShippingDetailsSchema) => cashOrder(shippingDetails),
        onSuccess: (data) => {
            queryClient.setQueryData(["cart"], { data: { cart: { cartItems: [], totalCartPrice: 0 } } });
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            toast.success("Order Created Successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create order");
        }
    });
};

export const useCreditOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (shippingDetails: ShippingDetailsSchema) => createCreditOrder(shippingDetails),
        onSuccess: (data) => {
            queryClient.setQueryData(["cart"], { data: { cart: { cartItems: [], totalCartPrice: 0 } } });
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (error) => {
            toast.error(error.message || "Failed to initialize payment");
        }
    });
};
