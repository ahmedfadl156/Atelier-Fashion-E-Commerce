"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";

interface OrderSummaryProps {
    subtotal: number;
    itemCount: number;
}

const FREE_SHIPPING_THRESHOLD = 2000;

export default function OrderSummary({ subtotal, itemCount }: OrderSummaryProps) {
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 50;
    const total = subtotal + shipping;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="bg-[#1A1A1A] text-white p-8 flex flex-col gap-6 lg:sticky lg:top-24 h-max"
        >
            {/* Header */}
            <div className="border-b border-white/10 pb-6">
                <p className="text-[9px] uppercase tracking-[0.35em] text-white/40 mb-1">
                    Your Order
                </p>
                <h2 className="text-xl italic font-serif text-white">
                    Order Summary
                </h2>
                <p className="text-[11px] text-white/40 mt-1">
                    {itemCount} {itemCount === 1 ? "item" : "items"} selected
                </p>
            </div>

            {/* Line Items */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-widest text-white/60">Subtotal</span>
                    <span className="text-sm font-semibold tabular-nums">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-widest text-white/60">Shipping</span>
                    {shipping === 0 ? (
                        <span className="text-sm font-semibold text-[#D4AF37]">Free</span>
                    ) : (
                        <span className="text-sm font-semibold tabular-nums">${shipping.toFixed(2)}</span>
                    )}
                </div>

                {subtotal < FREE_SHIPPING_THRESHOLD && (
                    <div className="bg-white/5 px-4 py-3 flex items-center gap-3">
                        <Truck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <p className="text-[10px] text-white/60 leading-snug">
                            Add{" "}
                            <span className="text-white font-semibold">
                                ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)}
                            </span>{" "}
                            more for free shipping
                        </p>
                    </div>
                )}
            </div>

            {/* Total */}
            <div className="border-t border-white/10 pt-6 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.25em] text-white/60">Total</span>
                <span className="text-xl font-bold tabular-nums text-[#D4AF37]">
                    ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
            </div>

            {/* Checkout CTA */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#D4AF37] text-[#1A1A1A] py-4 text-[11px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-3 hover:bg-[#C9A832] transition-colors duration-200 cursor-pointer"
            >
                <Link href="/checkout">
                    Proceed to Checkout
                </Link>
                <ArrowRight className="w-4 h-4" />
            </motion.button>

            {/* Trust Badges */}
            <div className="flex items-center gap-2 mt-2 justify-center text-white/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <p className="text-[9px] uppercase tracking-widest">
                    Secure & Encrypted Checkout
                </p>
            </div>

            {/* Continue Shopping */}
            <Link
                href="/collections"
                className="text-center text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-white/60 transition-colors duration-200 mt-auto"
            >
                ← Continue Shopping
            </Link>
        </motion.div>
    );
}
