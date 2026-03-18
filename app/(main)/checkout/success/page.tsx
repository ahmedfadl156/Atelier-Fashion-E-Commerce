"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Download, MonitorPlay, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutSuccessPage() {
    const [orderData, setOrderData] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const savedData = sessionStorage.getItem("lastOrderData");
        if (savedData && savedData !== "undefined") {
            try {
                const parsed = JSON.parse(savedData);
                if (parsed?.data?.order) {
                    setOrderData(parsed.data.order);
                } else if (parsed?.order) {
                    setOrderData(parsed.order);
                } else {
                    setOrderData(parsed);
                }
            } catch (error) {
                console.error("Failed to parse order data", error);
                router.push("/checkout");
            }
        } else {
            router.push("/checkout");
        }
    }, [router]);

    if (!orderData) {
        return (
            <main className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-white text-center">
                <Loader />
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-[1000px] py-16 lg:py-24 px-4 md:px-6 lg:px-8 text-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center text-center space-y-6 mb-16"
            >
                <div className="w-20 h-20 rounded-full bg-[#1A1A1A] flex items-center justify-center border border-[#D4AF37]">
                    <CheckCircle className="w-10 h-10 text-[#D4AF37]" />
                </div>
                <div>
                    <h1 className="text-3xl text-black md:text-5xl italic font-serif mb-4">Order Confirmed</h1>
                    <p className="text-gray-400 max-w-lg mx-auto">
                        Thank you for your purchase. We've received your order and are getting it ready to ship.
                        An email confirmation has been sent to your inbox.
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-[#1A1A1A] border border-white/10 rounded-sm overflow-hidden"
            >
                {/* Invoice Header */}
                <div className="bg-[#111] p-6 lg:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-1">Receipt</p>
                        <h2 className="text-xl font-bold font-serif tracking-widest text-[#D4AF37]">ATELIER</h2>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-left md:text-right">
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Order #</p>
                            <p className="text-sm font-medium tabular-nums text-white/90">
                                {orderData.orderNumber}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Date</p>
                            <p className="text-sm font-medium tabular-nums text-white/90">
                                {new Date(orderData.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric', month: 'long', day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Customer & Shipping */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <h3 className="text-[11px] uppercase tracking-[0.2em] text-white/60 border-b border-white/10 pb-2 mb-4">
                                Billed To
                            </h3>
                            <div className="space-y-1 text-sm text-white/80">
                                <p className="font-semibold text-white">
                                    {orderData.shippingAddress?.firstName} {orderData.shippingAddress?.lastName}
                                </p>
                                <p>{orderData.shippingAddress?.street}</p>
                                <p>{orderData.shippingAddress?.city}, {orderData.shippingAddress?.country}</p>
                                <p className="text-white/60 mt-2 text-xs">
                                    Ph: {orderData.shippingAddress?.phoneNumber}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[11px] uppercase tracking-[0.2em] text-white/60 border-b border-white/10 pb-2 mb-4">
                                Payment Info
                            </h3>
                            <div className="space-y-2 text-sm text-white/80">
                                <div className="flex justify-between items-center">
                                    <span className="text-white/50">Method:</span>
                                    <span className="font-medium text-[#D4AF37]">{orderData.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/50">Status:</span>
                                    <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider ${orderData.isPaid ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                        {orderData.isPaid ? 'Paid' : 'Pending'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Items & Totals */}
                    <div className="flex flex-col">
                        <h3 className="text-[11px] uppercase tracking-[0.2em] text-white/60 border-b border-white/10 pb-2 mb-4">
                            Order Summary
                        </h3>
                        
                        <div className="flex flex-col gap-4 mb-8">
                            {orderData.orderItems?.map((item: any, idx: number) => {
                                const imageUrl = item.product?.coverImage 
                                    ? (item.product.coverImage.startsWith('http') || item.product.coverImage.startsWith('/')) 
                                        ? item.product.coverImage 
                                        : `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api.*$/, '') || "http://localhost:5500"}/${item.product.coverImage}`
                                    : null;

                                return (
                                <div key={idx} className="flex justify-between items-start gap-4 text-sm group">
                                    <div className="flex gap-4 flex-1">
                                        {imageUrl && (
                                            <div className="w-12 h-16 bg-white/5 shrink-0 relative overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img 
                                                    src={imageUrl} 
                                                    alt={item.title} 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-medium text-white/90 group-hover:text-white transition-colors">{item.title}</p>
                                            <p className="text-[11px] text-white/40 mt-0.5 tracking-wide">
                                                {item.color} | {item.size} <span className="mx-1">•</span> Qty {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="font-medium text-white/80 tabular-nums">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            )})}
                        </div>

                        {/* Calculations */}
                        <div className="mt-auto border-t border-white/10 pt-4 flex flex-col gap-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-white/50">Subtotal</span>
                                <span className="tabular-nums">${orderData.itemsPrice?.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-white/50">Shipping</span>
                                <span className="tabular-nums text-white/90">
                                    ${orderData.shippingPrice?.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-white/50">Tax</span>
                                <span className="tabular-nums">
                                    ${orderData.taxPrice?.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between items-end mt-4 pt-4 border-t border-white/10">
                                <span className="text-[11px] uppercase tracking-[0.2em] text-white/70">Total EGP</span>
                                <span className="text-2xl font-bold font-serif text-[#D4AF37] tabular-nums">
                                    ${orderData.totalPrice?.toFixed(2)}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>

            {/* Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
                <Link
                    href="/collections"
                    className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-[#1A1A1A] text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#C9A832] transition-colors flex items-center justify-center gap-2"
                >
                    Continue Shopping
                    <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                    onClick={() => window.print()}
                    className="w-full sm:w-auto px-8 py-4 bg-transparent border border-black/20 text-black text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-black/5 transition-colors flex items-center justify-center gap-2"
                >
                    <Download className="w-4 h-4" />
                    Download Receipt
                </button>
            </motion.div>
        </main>
    );
}

function Loader() {
    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <div className="w-16 h-16 border-4 border-white/10 border-t-[#D4AF37] rounded-full animate-spin"></div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/50 animate-pulse">Loading Invoice...</p>
        </div>
    );
}
