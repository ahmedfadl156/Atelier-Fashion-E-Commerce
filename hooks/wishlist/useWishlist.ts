import { addToWishlist, removeFromWishlist, getWishlist } from "@/services/wishlist";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useAddToWishlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addToWishlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
            toast.success("added to wishlist");
        },
        onError: () => {
            toast.error("Failed To add to wishlist");
        }
    })
}

export const useRemoveFromWishlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeFromWishlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
            toast.success("removed from wishlist");
        },
        onError: () => {
            toast.error("Failed To remove from wishlist");
        }
    })
}

export const useWishlist = () => {
    return useQuery({
        queryKey: ["wishlist"],
        queryFn: getWishlist,
    })
}