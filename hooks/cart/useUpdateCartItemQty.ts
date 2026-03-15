import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartItemQty } from "@/services/cart";
import { GetCartResponse } from "@/types/cart";
import { toast } from "sonner";

export const useUpdateCartItemQty = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCartItemQty,
        onMutate: async ({ itemId, quantity }) => {
            await queryClient.cancelQueries({ queryKey: ["cart"] });
            const snapshot = queryClient.getQueryData<GetCartResponse>(["cart"]);
            queryClient.setQueryData<GetCartResponse>(["cart"], (old) => {
                if (!old) return old;
                return {
                    ...old,
                    data: {
                        cart: {
                            ...old.data.cart,
                            cartItems: old.data.cart.cartItems.map((i) =>
                                i._id === itemId ? { ...i, quantity } : i
                            ),
                        },
                    },
                };
            });
            return { snapshot };
        },
        onError: (error, _v, ctx) => {
            queryClient.setQueryData(["cart"], ctx?.snapshot);
            toast.error(error.message || "Couldn't update quantity. Please try again.");
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    });
};
