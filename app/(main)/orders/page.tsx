"use client";

import { useGetOrders } from "@/hooks/orders/useGetOrders";
import Image from "next/image";
import Link from "next/link";
import { Loader2, PackageOpen, ArrowRight } from "lucide-react";
import { SERVER_ORIGIN } from "@/utils/helpers";

const OrdersPage = () => {
    const { data: response, isLoading, isError } = useGetOrders();
    const orders = response?.data || [];

    return (
        <main className="mx-auto max-w-[1600px] py-16 lg:py-20 px-4 md:px-6 lg:px-8">
            {/* Header Section */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#1A1A1A]/10 pb-8">
                <div>
                    <p className="text-[#D4AF37] text-sm uppercase tracking-widest font-bold">Client Archives</p>
                    <h1 className="uppercase text-5xl md:text-6xl lg:text-7xl font-serif mt-4 text-[#1A1A1A] tracking-widest leading-tight">
                        My <br /> Orders
                    </h1>
                </div>
                <p className="max-w-xs text-sm text-[#1A1A1A]/60 leading-relaxed font-serif italic">
                    "A cinematic history of your acquisitions and bespoke commissions from the Atelier collections."
                </p>
            </section>

            {/* Orders Table Section */}
            <section className="mt-16 w-full">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-[#1A1A1A]/50">
                        <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#D4AF37]" />
                        <p className="text-sm uppercase tracking-widest">Retrieving orders...</p>
                    </div>
                ) : isError ? (
                    <div className="flex flex-col items-center justify-center py-20 text-red-500">
                        <p className="text-sm uppercase tracking-widest">Failed to retrieve orders. Please try again.</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center bg-[#1A1A1A]/5 border border-[#1A1A1A]/10">
                        <PackageOpen className="w-12 h-12 mb-6 text-[#D4AF37]" />
                        <h2 className="text-2xl font-serif text-[#1A1A1A] mb-4">No Orders Found</h2>
                        <p className="text-[#1A1A1A]/60 mb-8 max-w-md">Your orders are currently empty. Begin your journey with completing your first exquisite creation.</p>
                        <Link href="/collections" className="bg-[#1A1A1A] text-white px-8 py-4 text-xs tracking-widest uppercase hover:bg-[#D4AF37] transition-colors duration-300">
                            Explore Collections
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="border-b border-[#1A1A1A]/20">
                                    <th className="py-6 px-4 text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/60 w-[15%]">Date</th>
                                    <th className="py-6 px-4 text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/60 w-[40%]">Item Details</th>
                                    <th className="py-6 px-4 text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/60 w-[20%]">Order ID</th>
                                    <th className="py-6 px-4 text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/60 w-[15%]">Status</th>
                                    <th className="py-6 px-4 text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/60 text-right w-[10%]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A1A1A]/10 border-b border-[#1A1A1A]/20">
                                {orders.map((order) => (
                                    <tr key={order.orderNumber} className="group hover:bg-[#1A1A1A]/5 transition-colors duration-300">
                                        {/* Date */}
                                        <td className="py-8 px-4 align-top">
                                            <div className="flex flex-col gap-1 text-sm font-medium text-[#1A1A1A]">
                                                <span>{new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                                                <span className="text-xs text-[#1A1A1A]/50 font-normal">{new Date(order.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
                                            </div>
                                        </td>
                                        {/* Item Details */}
                                        <td className="py-8 px-4 align-top">
                                            <div className="flex flex-col gap-6">
                                                {order.orderItems.map((item, idx) => (
                                                    <div key={idx} className="flex gap-4 items-start">
                                                        <div className="relative w-16 h-20 bg-[#1A1A1A]/5 shrink-0 overflow-hidden">
                                                            {item.imageCover ? (
                                                                <Image
                                                                    src={`${SERVER_ORIGIN}/${item.imageCover}`}
                                                                    alt={item.title}
                                                                    fill
                                                                    className="object-cover object-top"
                                                                    sizes="64px"
                                                                />
                                                            ) : (
                                                                <Image
                                                                    src="/images/Fluid Dress.png"
                                                                    alt={item.title}
                                                                    fill
                                                                    className="object-cover object-top opacity-50 grayscale"
                                                                    sizes="64px"
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="flex flex-col gap-1 mt-1">
                                                            <p className="text-sm font-semibold text-[#1A1A1A] line-clamp-2">{item.title}</p>
                                                            <p className="text-[11px] text-[#1A1A1A]/60 uppercase tracking-widest mt-1">
                                                                Size: {item.size} <span className="mx-1">•</span> Color: {item.color}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        {/* Order ID */}
                                        <td className="py-8 px-4 align-top">
                                            <span className="text-xs font-semibold text-[#1A1A1A] bg-[#1A1A1A]/5 px-3 py-1.5 uppercase tracking-widest border border-[#1A1A1A]/10">
                                                #{order.orderNumber}
                                            </span>
                                        </td>
                                        {/* Status */}
                                        <td className="py-8 px-4 align-top">
                                            <span className={`text-[11px] font-bold uppercase tracking-widest flex items-center gap-2
                                                ${order.status.toLowerCase() === 'processing' ? 'text-[#D4AF37]' : 
                                                order.status.toLowerCase() === 'delivered' ? 'text-green-600' : 
                                                order.status.toLowerCase() === 'pending' ? 'text-yellow-600' : 
                                                order.status.toLowerCase() === 'shipped' ? 'text-blue-600' : 
                                                order.status.toLowerCase() === 'cancelled' ? 'text-red-500' : 
                                                'text-[#1A1A1A]/60'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full 
                                                    ${order.status.toLowerCase() === 'processing' ? 'bg-[#D4AF37] animate-pulse' : 
                                                    order.status.toLowerCase() === 'delivered' ? 'bg-green-600' : 
                                                    order.status.toLowerCase() === 'pending' ? 'bg-yellow-600' : 
                                                    order.status.toLowerCase() === 'shipped' ? 'bg-blue-600' : 
                                                    order.status.toLowerCase() === 'cancelled' ? 'bg-red-500' : 
                                                    'bg-[#1A1A1A]/40'}`}></span>
                                                {order.status}
                                            </span>
                                        </td>
                                        {/* Actions */}
                                        <td className="py-8 px-4 align-top text-right">
                                            <Link 
                                                href={`/orders/${order.orderNumber}`}
                                                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#D4AF37] transition-colors duration-300 group/link"
                                            >
                                                Details
                                                <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
};

export default OrdersPage;