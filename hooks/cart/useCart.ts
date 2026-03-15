import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@/context/authContext"
import { getCart } from "@/services/cart"

const GUEST_CART_KEY = "atelier_guest_cart"

export interface GuestCartItem {
    productId: string
    title: string
    coverImage: string
    color: string
    size: string
    quantity: number
    price: number
}

export const readGuestCart = (): GuestCartItem[] => {
    if (typeof window === "undefined") return []
    try {
        return JSON.parse(localStorage.getItem(GUEST_CART_KEY) || "[]")
    } catch {
        return []
    }
}

export const writeGuestCart = (items: GuestCartItem[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items))
}

export const useCart = () => {
    const { isAuthenticated } = useAuth()

    const serverQuery = useQuery({
        queryKey: ["cart"],
        queryFn: getCart,
        enabled: isAuthenticated,
        retry: false,
        staleTime: 1000 * 60 * 2,
    })

    const guestQuery = useQuery({
        queryKey: ["guest-cart"],
        queryFn: readGuestCart,
        enabled: !isAuthenticated,
        staleTime: Infinity,
    })

    if (isAuthenticated) {
        const cart = serverQuery.data?.data?.cart ?? null
        return {
            cart,
            cartCount: cart?.cartItems?.length ?? 0,
            isLoading: serverQuery.isLoading,
            guestItems: [] as GuestCartItem[],
            isAuthenticated: true as const,
        }
    }

    const guestItems = guestQuery.data ?? []
    return {
        cart: null,
        cartCount: guestItems.length,
        isLoading: guestQuery.isLoading,
        guestItems,
        isAuthenticated: false as const,
    }
}
