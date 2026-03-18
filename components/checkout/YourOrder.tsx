"use client";

import { useCart } from "@/hooks/cart/useCart";
import Image from "next/image";
import { motion } from "framer-motion";

const FREE_SHIPPING_THRESHOLD = 2000;

export default function YourOrder() {
    const { cart, isLoading, isAuthenticated, guestItems } = useCart();

    const items = isAuthenticated ? (cart?.cartItems || []) : guestItems;
    const subtotal = isAuthenticated 
        ? (cart?.totalCartPrice || 0) 
        : guestItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : 50;
    const total = subtotal + shipping;

    if (isLoading) {
        return (
            <div className="bg-[#1A1A1A] p-8 animate-pulse text-white h-[400px]">
                <div className="h-6 w-32 bg-white/10 mb-8"></div>
                <div className="space-y-4">
                    <div className="h-16 w-full bg-white/10"></div>
                    <div className="h-16 w-full bg-white/10"></div>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="bg-[#1A1A1A] p-8 text-white h-max lg:sticky lg:top-24">
                <h2 className="text-xl italic font-serif mb-4">Your Order</h2>
                <p className="text-white/60 text-sm">Your cart is empty.</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="bg-[#1A1A1A] text-white p-6 lg:p-8 flex flex-col gap-6 lg:sticky lg:top-24 h-max"
        >
            <div className="border-b border-white/10 pb-6">
                <p className="text-[9px] uppercase tracking-[0.35em] text-white/40 mb-1">
                    Checkout Review
                </p>
                <h2 className="text-xl italic font-serif text-white">
                    Your Order
                </h2>
                <p className="text-[11px] text-white/40 mt-1">
                    {items.length} {items.length === 1 ? "item" : "items"}
                </p>
            </div>

            <div className="flex flex-col gap-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item: any, idx: number) => {
                    const productId = isAuthenticated ? item.product?._id : item.productId;
                    const rawCoverImage = isAuthenticated ? item.product?.coverImage : item.coverImage;
                    const title = isAuthenticated ? item.product?.title : item.title;
                    
                    const coverImage = rawCoverImage 
                        ? (rawCoverImage.startsWith('http') || rawCoverImage.startsWith('/')) 
                            ? rawCoverImage 
                            : `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api.*$/, '') || "http://localhost:5500"}/${rawCoverImage}`
                        : null;

                    return (
                        <div key={`${productId}-${item.color}-${item.size}-${idx}`} className="flex gap-4 group">
                            <div className="relative w-16 h-20 bg-white/5 overflow-hidden shrink-0">
                                {coverImage ? (
                                    <Image
                                        src={coverImage}
                                        alt={title || "Product Image"}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : null}
                            </div>
                            <div className="flex flex-col justify-center flex-1">
                                <h4 className="text-xs font-medium text-white line-clamp-1">{title}</h4>
                                <p className="text-[10px] text-white/50 mt-1">
                                    {item.color} / {item.size}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-[10px] text-white/60">Qty: {item.quantity}</span>
                                    <span className="text-xs font-medium tabular-nums">${item.price.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="border-t border-white/10 pt-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-widest text-white/60">Subtotal</span>
                    <span className="text-sm font-medium tabular-nums">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-widest text-white/60">Shipping</span>
                    {shipping === 0 ? (
                        <span className="text-sm font-medium text-[#D4AF37]">Free</span>
                    ) : (
                        <span className="text-sm font-medium tabular-nums">${shipping.toFixed(2)}</span>
                    )}
                </div>
            </div>

            <div className="border-t border-white/10 pt-5 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.25em] text-white/80">Total</span>
                <span className="text-xl font-bold tabular-nums text-[#D4AF37]">
                    ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
            </div>
        </motion.div>
    );
}
