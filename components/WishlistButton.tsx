"use client"

import { Heart } from 'lucide-react'
import { useWishlist, useAddToWishlist, useRemoveFromWishlist } from '@/hooks/wishlist/useWishlist'
import { useAuth } from '@/context/authContext'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import React from 'react'

interface WishlistButtonProps {
    productId: string;
    className?: string;
}

const WishlistButton = ({ productId, className = "absolute top-4 left-4" }: WishlistButtonProps) => {
    const { data: wishlistData } = useWishlist()
    const { mutate: addToWishlist, isPending: isAdding } = useAddToWishlist()
    const { mutate: removeFromWishlist, isPending: isRemoving } = useRemoveFromWishlist()
    const { isAuthenticated } = useAuth()
    const router = useRouter()
    const items = Array.isArray(wishlistData?.data) ? wishlistData.data : [];

    const isInWishlist = items.some((item: any) => item._id === productId);

    const handleWishlistAddRemove = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!isAuthenticated) {
            toast.error("Please login to manage wishlist")
            router.push("/sign-in")
            return
        }

        if (isInWishlist) {
            removeFromWishlist(productId)
        } else {
            addToWishlist(productId)
        }
    }

    return (
        <button 
            onClick={handleWishlistAddRemove}
            disabled={isAdding || isRemoving}
            className={`p-2 rounded-full backdrop-blur-md bg-white/70 hover:bg-white transition-all z-10 flex items-center justify-center shadow-sm disabled:opacity-0 ${className}`}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
            <Heart 
                className={`w-4 h-4 transition-colors ${isInWishlist ? 'fill-[#C9AF5B] text-[#C9AF5B]' : 'text-[#333]'}`} 
            />
        </button>
    )
}

export default WishlistButton