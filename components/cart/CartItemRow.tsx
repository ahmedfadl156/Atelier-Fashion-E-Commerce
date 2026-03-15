"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/types/cart";

interface CartItemRowProps {
    item: CartItem;
    index: number;
    onRemove: (itemId: string) => void;
    onQuantityChange: (itemId: string, newQuantity: number) => void;
    isPendingRemove?: boolean;
    isPendingQty?: boolean;
}

const serverOrigin =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/api.*$/, "") ||
    "http://localhost:5500";

export default function CartItemRow({
    item,
    index,
    onRemove,
    onQuantityChange,
    isPendingRemove,
    isPendingQty,
}: CartItemRowProps) {
    const imageUrl = item.product.coverImage
        ? `${serverOrigin}/images/Products/${item.product.coverImage}`
        : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
            className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-5 sm:gap-6 p-5 sm:p-6 bg-white border border-[#1A1A1A]/6 group"
        >
            {/* Product Image */}
            <div className="relative w-20 h-24 sm:w-24 sm:h-28 bg-[#F9F8F6] overflow-hidden shrink-0">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={item.product.title}
                        fill
                        className="object-cover object-top"
                        sizes="100px"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#1A1A1A]/20">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Item Details */}
            <div className="flex flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        {item.product.brand && (
                            <p className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-1">
                                {item.product.brand}
                            </p>
                        )}
                        <h3 className="text-sm font-semibold text-[#1A1A1A] leading-snug truncate pr-2">
                            {item.product.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 bg-[#F1F0ED] px-2 py-0.5">
                                {item.size}
                            </span>
                            <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 bg-[#F1F0ED] px-2 py-0.5">
                                {item.color}
                            </span>
                        </div>
                    </div>

                    {/* Price */}
                    <p className="text-sm font-bold text-[#1A1A1A] shrink-0 tabular-nums">
                        ${(item.price).toLocaleString()}
                    </p>
                </div>

                {/* Quantity + Remove */}
                <div className="flex items-center justify-between mt-3">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-[#1A1A1A]/10 h-8">
                        <button
                            onClick={() => onQuantityChange(item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isPendingQty}
                            className="w-8 h-full flex items-center justify-center text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#F9F8F6] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 h-full flex items-center justify-center text-xs font-semibold text-[#1A1A1A] border-x border-[#1A1A1A]/10 tabular-nums">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => onQuantityChange(item._id, item.quantity + 1)}
                            disabled={isPendingQty}
                            className="w-8 h-full flex items-center justify-center text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#F9F8F6] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>

                    {/* Remove */}
                    <button
                        onClick={() => onRemove(item._id)}
                        disabled={isPendingRemove}
                        className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#1A1A1A]/30 hover:text-red-500 transition-colors duration-200 disabled:opacity-40"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Remove</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
