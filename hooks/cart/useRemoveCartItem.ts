import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCartItem } from "@/services/cart";
import { GetCartResponse } from "@/types/cart";
import { toast } from "sonner";

export const useRemoveCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (itemId: string) => removeCartItem(itemId),
        onMutate: async (itemId) => {
            await queryClient.cancelQueries({ queryKey: ["cart"] });
            const snapshot = queryClient.getQueryData<GetCartResponse>(["cart"]);
            queryClient.setQueryData<GetCartResponse>(["cart"], (old) => {
                if (!old) return old;
                return {
                    ...old,
                    data: {
                        cart: {
                            ...old.data.cart,
                            cartItems: old.data.cart.cartItems.filter(
                                (i) => i._id !== itemId
                            ),
                        },
                    },
                };
            });
            return { snapshot };
        },
        onError: (error, _v, ctx) => {
            queryClient.setQueryData(["cart"], ctx?.snapshot);
            toast.error(error.message || "Couldn't remove the item. Please try again.");
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    });
};
