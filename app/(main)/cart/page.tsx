"use client";

import { useCart } from "@/hooks/cart/useCart";
import { useAuth } from "@/context/authContext";
import CartItemRow from "@/components/cart/CartItemRow";
import OrderSummary from "@/components/cart/OrderSummary";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useRemoveCartItem } from "@/hooks/cart/useRemoveCartItem";
import { useUpdateCartItemQty } from "@/hooks/cart/useUpdateCartItemQty";

// Loading Skeleton
function CartSkeleton() {
    return (
        <div className="animate-pulse flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="grid grid-cols-[100px_1fr] gap-6 p-6 bg-white border border-[#1A1A1A]/6"
                >
                    <div className="w-24 h-28 bg-gray-200" />
                    <div className="flex flex-col gap-3 pt-1">
                        <div className="h-3 bg-gray-200 rounded w-24" />
                        <div className="h-4 bg-gray-200 rounded w-48" />
                        <div className="flex gap-2 mt-1">
                            <div className="h-5 w-12 bg-gray-200 rounded" />
                            <div className="h-5 w-16 bg-gray-200 rounded" />
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                            <div className="h-8 w-24 bg-gray-200" />
                            <div className="h-4 w-16 bg-gray-200 rounded" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

//Empty Cart
function EmptyCart() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-full flex flex-col items-center justify-center py-24 gap-6 text-center"
        >
            <div className="w-20 h-20 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center">
                <ShoppingBag className="w-9 h-9 text-[#1A1A1A]/20" />
            </div>
            <div>
                <h2 className="italic text-3xl text-[#1A1A1A] font-serif mb-2">
                    Your cart is empty
                </h2>
                <p className="text-sm text-[#64748B] max-w-xs">
                    You haven&apos;t added anything yet. Explore our curated collection
                    and find something you love.
                </p>
            </div>
            <Link
                href="/collections"
                className="mt-2 inline-flex items-center gap-3 bg-[#1A1A1A] text-[#D4AF37] px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors duration-300"
            >
                Browse Collections
            </Link>
        </motion.div>
    );
}

// Main Cart Page
const CartPage = () => {
    const { isAuthenticated } = useAuth();
    const { cart, isLoading } = useCart();

    const items = cart?.cartItems ?? [];

    const { mutate: removeItem, variables: removingId, isPending: isRemoving } = useRemoveCartItem();
    const { mutate: updateQty, variables: updatingVars, isPending: isUpdatingQty } = useUpdateCartItemQty();

    if (!isAuthenticated) {
        return (
            <section className="bg-[#E2E8F0] min-h-screen">
                <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-16 lg:py-24">
                    <div className="flex flex-col items-start gap-2 mb-12">
                        <h1 className="italic tracking-widest leading-relaxed text-[#0F172A] text-4xl md:text-5xl">
                            Your Selection
                        </h1>
                        <p className="text-sm text-[#64748B]">Your Selected Items</p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-24 gap-6 text-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center">
                            <ShoppingBag className="w-9 h-9 text-[#1A1A1A]/20" />
                        </div>
                        <div>
                            <h2 className="italic text-3xl text-[#1A1A1A] font-serif mb-2">
                                Sign in to view your cart
                            </h2>
                            <p className="text-sm text-[#64748B] max-w-xs">
                                Sign in to save your selections and check out. You can browse
                                and add items as a guest, but sign in to complete your purchase.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 mt-2 flex-wrap justify-center">
                            <Link
                                href="/sign-in"
                                className="bg-[#1A1A1A] text-[#D4AF37] px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors duration-300"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/collections"
                                className="border border-[#1A1A1A]/20 text-[#1A1A1A] px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-bold hover:border-[#1A1A1A] transition-colors duration-300"
                            >
                                Browse Collections
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-[#FFFFFF] min-h-screen">
            <div className="z-10 mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-16 lg:py-24">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-start gap-2 mb-12"
                >
                    <h1 className="italic tracking-widest leading-relaxed text-[#0F172A] text-4xl md:text-5xl">
                        Your Selection
                    </h1>
                    <p className="text-sm text-[#64748B]">
                        {isLoading
                            ? "Loading your items…"
                            : items.length > 0
                            ? `${items.length} ${items.length === 1 ? "item" : "items"} in your cart`
                            : "Your cart is empty"}
                    </p>
                </motion.div>

                {isLoading ? (
                    <CartSkeleton />
                ) : items.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-8 gap-8 lg:gap-12 items-start">
                        {/* Cart Items List */}
                        <div className="lg:col-span-5 flex flex-col gap-3">
                            <AnimatePresence initial={false}>
                                {items.map((item, idx) => (
                                    <CartItemRow
                                        key={item._id}
                                        item={item}
                                        index={idx}
                                        isPendingRemove={isRemoving && removingId === item._id}
                                        isPendingQty={isUpdatingQty && updatingVars?.itemId === item._id}
                                        onRemove={(id) => removeItem(id)}
                                        onQuantityChange={(id, qty) =>
                                            updateQty({ itemId: id, quantity: qty })
                                        }
                                    />
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-3">
                            <OrderSummary subtotal={cart?.totalCartPrice} itemCount={items.length} />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CartPage;