import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addProductToCart } from "@/services/cart"
import { AddToCartPayload, GetCartResponse } from "@/types/cart"
import { useAuth } from "@/context/authContext"
import {
    GuestCartItem,
    readGuestCart,
    writeGuestCart,
} from "@/hooks/cart/useCart"

export const useAddToCart = () => {
    const queryClient = useQueryClient()
    const { isAuthenticated } = useAuth()

    return useMutation({
        mutationFn: async (payload: AddToCartPayload) => {
            if (!isAuthenticated) {
                // Guest mode: write to localStorage, no network call
                const items = readGuestCart()
                const idx = items.findIndex(
                    (i) =>
                        i.productId === payload.productId &&
                        i.color === payload.color &&
                        i.size === payload.size
                )
                if (idx > -1) {
                    items[idx].quantity += payload.quantity ?? 1
                } else {
                    items.push({
                        productId: payload.productId,
                        title: payload.productData?.title ?? "",
                        coverImage: payload.productData?.coverImage ?? "",
                        color: payload.color,
                        size: payload.size,
                        quantity: payload.quantity ?? 1,
                        price: payload.productData?.price ?? 0,
                    })
                }
                writeGuestCart(items)
                return null 
            }

            return addProductToCart(payload)
        },

        // Optimistic Update
        onMutate: async (payload) => {
            if (!isAuthenticated) {
                // Guest: optimistically update the guest-cart query in cache
                await queryClient.cancelQueries({ queryKey: ["guest-cart"] })
                const previousGuest = queryClient.getQueryData<GuestCartItem[]>(["guest-cart"])

                queryClient.setQueryData<GuestCartItem[]>(["guest-cart"], (old = []) => {
                    const idx = old.findIndex(
                        (i) =>
                            i.productId === payload.productId &&
                            i.color === payload.color &&
                            i.size === payload.size
                    )
                    if (idx > -1) {
                        const updated = [...old]
                        updated[idx] = {
                            ...updated[idx],
                            quantity: updated[idx].quantity + (payload.quantity ?? 1),
                        }
                        return updated
                    }
                    return [
                        ...old,
                        {
                            productId: payload.productId,
                            title: payload.productData?.title ?? "",
                            coverImage: payload.productData?.coverImage ?? "",
                            color: payload.color,
                            size: payload.size,
                            quantity: payload.quantity ?? 1,
                            price: payload.productData?.price ?? 0,
                        },
                    ]
                })

                return { previousGuest, isGuest: true }
            }

            // Authenticated: optimistically update the server cart query
            await queryClient.cancelQueries({ queryKey: ["cart"] })
            const previousCart = queryClient.getQueryData<GetCartResponse>(["cart"])

            queryClient.setQueryData<GetCartResponse>(["cart"], (old) => {
                // First item ever — create a minimal skeleton in cache
                if (!old) {
                    return {
                        status: "success",
                        numOfCartItems: 1,
                        data: {
                            cart: {
                                _id: "optimistic",
                                user: "",
                                cartItems: [
                                    {
                                        _id: `temp-${Date.now()}`,
                                        product: {
                                            _id: payload.productId,
                                            title: payload.productData?.title ?? "...",
                                            coverImage: payload.productData?.coverImage ?? "",
                                            price: payload.productData?.price ?? 0,
                                        },
                                        color: payload.color,
                                        size: payload.size,
                                        quantity: payload.quantity ?? 1,
                                        price: payload.productData?.price ?? 0,
                                    },
                                ],
                            },
                        },
                    }
                }

                const idx = old.data.cart.cartItems.findIndex(
                    (item) =>
                        item.product._id === payload.productId &&
                        item.color === payload.color &&
                        item.size === payload.size
                )

                if (idx > -1) {
                    // Existing item — bump quantity, cartCount stays the same
                    const updatedItems = old.data.cart.cartItems.map((item, i) =>
                        i === idx
                            ? { ...item, quantity: item.quantity + (payload.quantity ?? 1) }
                            : item
                    )
                    return {
                        ...old,
                        data: { cart: { ...old.data.cart, cartItems: updatedItems } },
                    }
                }

                // New item — append to list
                return {
                    ...old,
                    numOfCartItems: old.numOfCartItems + 1,
                    data: {
                        cart: {
                            ...old.data.cart,
                            cartItems: [
                                ...old.data.cart.cartItems,
                                {
                                    _id: `temp-${Date.now()}`,
                                    product: {
                                        _id: payload.productId,
                                        title: payload.productData?.title ?? "...",
                                        coverImage: payload.productData?.coverImage ?? "",
                                        price: payload.productData?.price ?? 0,
                                    },
                                    color: payload.color,
                                    size: payload.size,
                                    quantity: payload.quantity ?? 1,
                                    price: payload.productData?.price ?? 0,
                                },
                            ],
                        },
                    },
                }
            })

            return { previousCart, isGuest: false }
        },

        // Rollback on erro
        onError: (_err, _vars, context) => {
            if (context?.isGuest) {
                queryClient.setQueryData(["guest-cart"], context.previousGuest)
            } else if (context?.previousCart) {
                queryClient.setQueryData(["cart"], context.previousCart)
            }
        },

        // Sync with server after settle
        onSettled: (_data, _err, _vars, context) => {
            if (context?.isGuest) {
                queryClient.invalidateQueries({ queryKey: ["guest-cart"] })
            } else {
                queryClient.invalidateQueries({ queryKey: ["cart"] })
            }
        },
    })
}
