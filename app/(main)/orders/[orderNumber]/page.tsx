"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    Loader2,
    ArrowLeft,
    MapPin,
    CreditCard,
    Package,
    CheckCircle2,
    Clock,
    Truck,
    Star,
    ShieldCheck,
    Receipt,
    Phone,
} from "lucide-react";
import { useGetOrderDetails } from "@/hooks/orders/useGetOrderDetails";
import { OrderDetailsItem } from "@/types/order";
import { SERVER_ORIGIN, formatPrice, formatDate, StatusKey, STATUS_STEPS, STATUS_COLOR, STATUS_DOT, getCurrentStepIndex } from "@/utils/helpers";

function SectionCard({
    icon,
    title,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="border border-[#1A1A1A]/10 p-6 md:p-8 bg-white group hover:border-[#D4AF37]/40 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#1A1A1A]/10">
                <span className="text-[#D4AF37]">{icon}</span>
                <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#1A1A1A]">
                    {title}
                </h2>
            </div>
            {children}
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex items-start justify-between gap-4 py-3 border-b border-[#1A1A1A]/6 last:border-0">
            <span className="text-xs uppercase tracking-widest text-[#1A1A1A]/50 shrink-0 pt-0.5">
                {label}
            </span>
            <span className="text-sm font-medium text-[#1A1A1A] text-right">{value}</span>
        </div>
    );
}

function OrderItemCard({ item }: { item: OrderDetailsItem }) {
    const imgSrc = item.image
        ? `${SERVER_ORIGIN}/products/${item.image}`
        : "/images/Fluid Dress.png";

    return (
        <div className="flex gap-5 py-6 border-b border-[#1A1A1A]/8 last:border-0 group/item">
            {/* Product image */}
            <div className="relative w-20 h-26 shrink-0 overflow-hidden bg-[#F5F5F0]" style={{ minHeight: "104px" }}>
                <Image
                    src={`${SERVER_ORIGIN}/products/${item.image}`}
                    alt={item.title}
                    fill
                    sizes="80px"
                    className="object-cover object-top group-hover/item:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] leading-snug line-clamp-2">
                        {item.title}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2">
                        <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 border border-[#1A1A1A]/15 px-2 py-0.5">
                            Size: {item.size}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 border border-[#1A1A1A]/15 px-2 py-0.5">
                            Color: {item.color}
                        </span>
                    </div>
                </div>

                <div className="flex items-end justify-between mt-3">
                    <span className="text-xs text-[#1A1A1A]/50">Qty: {item.quantity}</span>
                    <div className="text-right">
                        <p className="text-sm font-bold text-[#1A1A1A]">
                            {formatPrice(item.price * item.quantity)}
                        </p>
                        <p className="text-[10px] text-[#1A1A1A]/40 mt-0.5">
                            {formatPrice(item.price)} each
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}


const OrderDetailsPage = () => {
    const { orderNumber } = useParams<{ orderNumber: string }>();
    const { data, isLoading, isError, error } = useGetOrderDetails(orderNumber);

    const order = data?.data;

    if (isLoading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-5 text-[#1A1A1A]/50">
                    <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
                    <p className="text-xs uppercase tracking-[0.3em]">Retrieving Order Details…</p>
                </div>
            </main>
        );
    }

    if (isError || !order) {
        return (
            <main className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <p className="text-[#D4AF37] text-sm uppercase tracking-widest mb-3">Order Not Found</p>
                    <h1 className="font-serif text-4xl text-[#1A1A1A] mb-4">Something went wrong</h1>
                    <p className="text-[#1A1A1A]/60 text-sm mb-8">
                        {(error as Error)?.message || "We couldn't retrieve this order. Please try again."}
                    </p>
                    <Link
                        href="/orders"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest bg-[#1A1A1A] text-white px-6 py-3.5 hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors duration-300"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back to Orders
                    </Link>
                </div>
            </main>
        );
    }

    const statusLower = order.status.toLowerCase() as StatusKey;
    const statusColorClass = STATUS_COLOR[statusLower] || STATUS_COLOR.pending;
    const statusDotClass = STATUS_DOT[statusLower] || STATUS_DOT.pending;
    const isCancelled = statusLower === "cancelled";
    const currentStep = getCurrentStepIndex(order.status);

    return (
        <main className="mx-auto max-w-[1400px] py-16 lg:py-20 px-4 md:px-6 lg:px-8">

            <Link
                href="/orders"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#1A1A1A]/50 hover:text-[#D4AF37] transition-colors duration-300 mb-12 group"
            >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
                All Orders
            </Link>

            <section className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#1A1A1A]/10 pb-10 mb-12">
                <div>
                    <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-semibold mb-3">
                        Order Receipt
                    </p>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl uppercase tracking-widest text-[#1A1A1A] leading-tight">
                        {order.orderNumber}
                    </h1>
                    <p className="text-xs text-[#1A1A1A]/40 tracking-widest uppercase mt-3">
                        Placed on{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>

                {/* Status badge */}
                <div
                    className={`inline-flex items-center gap-2.5 px-5 py-3 border text-xs font-bold uppercase tracking-widest ${statusColorClass}`}
                >
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDotClass}`} />
                    {order.status}
                </div>
            </section>

            {/* Order Status Timeline*/}
            {!isCancelled && (
                <section className="mb-12">
                    <div className="border border-[#1A1A1A]/10 p-6 md:p-8 bg-white">
                        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#1A1A1A]/10">
                            <span className="text-[#D4AF37]"><Truck className="w-4 h-4" /></span>
                            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#1A1A1A]">
                                Order Progress
                            </h2>
                        </div>
                        <div className="relative flex items-start justify-between gap-2">
                            {/* Progress line */}
                            <div className="absolute top-4 left-0 right-0 h-px bg-[#1A1A1A]/10 z-0" />
                            <div
                                className="absolute top-4 left-0 h-px bg-[#D4AF37] z-0 transition-all duration-700"
                                style={{
                                    width: `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%`,
                                }}
                            />

                            {STATUS_STEPS.map((step, idx) => {
                                const done = idx <= currentStep;
                                const active = idx === currentStep;
                                return (
                                    <div
                                        key={step.key}
                                        className="relative z-10 flex flex-col items-center gap-3 flex-1"
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                                                done
                                                    ? "bg-[#D4AF37] border-[#D4AF37]"
                                                    : "bg-white border-[#1A1A1A]/20"
                                            } ${active ? "ring-4 ring-[#D4AF37]/20" : ""}`}
                                        >
                                            {done ? (
                                                <CheckCircle2 className="w-4 h-4 text-white" />
                                            ) : (
                                                <span className="w-2 h-2 rounded-full bg-[#1A1A1A]/20" />
                                            )}
                                        </div>
                                        <span
                                            className={`text-[10px] uppercase tracking-widest text-center ${
                                                done ? "text-[#1A1A1A] font-semibold" : "text-[#1A1A1A]/40"
                                            }`}
                                        >
                                            {step.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            <div className="grid lg:grid-cols-[1fr_400px] gap-6">

                {/* LEFT column */}
                <div className="flex flex-col gap-6">

                    {/* Order Items */}
                    <SectionCard icon={<Package className="w-4 h-4" />} title="Order Items">
                        <div className="divide-y divide-[#1A1A1A]/6">
                            {order.orderItems.map((item) => (
                                <OrderItemCard key={item._id} item={item} />
                            ))}
                        </div>

                        {/* Item count summary */}
                        <p className="mt-4 text-[11px] uppercase tracking-widest text-[#1A1A1A]/40 text-right">
                            {order.orderItems.reduce((sum, i) => sum + i.quantity, 0)} item
                            {order.orderItems.reduce((sum, i) => sum + i.quantity, 0) !== 1 ? "s" : ""} in this order
                        </p>
                    </SectionCard>

                    {/* Shipping Address */}
                    <SectionCard icon={<MapPin className="w-4 h-4" />} title="Shipping Address">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mb-1.5">Recipient</p>
                                <p className="text-sm font-semibold text-[#1A1A1A]">
                                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mb-1.5">Street</p>
                                <p className="text-sm text-[#1A1A1A]">{order.shippingAddress.street}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mb-1.5">City</p>
                                <p className="text-sm text-[#1A1A1A]">{order.shippingAddress.city}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mb-1.5">Country</p>
                                <p className="text-sm text-[#1A1A1A]">{order.shippingAddress.country}</p>
                            </div>
                            <div className="sm:col-span-2 flex items-center gap-2 pt-2 border-t border-[#1A1A1A]/8">
                                <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                                <span className="text-sm text-[#1A1A1A]">{order.shippingAddress.phoneNumber}</span>
                            </div>
                        </div>
                    </SectionCard>
                </div>

                {/* RIGHT column */}
                <div className="flex flex-col gap-6">

                    {/* Price Breakdown */}
                    <SectionCard icon={<Receipt className="w-4 h-4" />} title="Price Breakdown">
                        <div className="space-y-0">
                            <InfoRow label="Subtotal" value={formatPrice(order.itemsPrice)} />
                            <InfoRow
                                label="Shipping"
                                value={
                                    order.shippingPrice === 0 ? (
                                        <span className="text-emerald-600 font-semibold">Free</span>
                                    ) : (
                                        formatPrice(order.shippingPrice)
                                    )
                                }
                            />
                            <InfoRow label="Tax (0.01%)" value={formatPrice(order.taxPrice)} />
                        </div>

                        {/* Total */}
                        <div className="mt-4 pt-5 border-t-2 border-[#1A1A1A] flex items-center justify-between">
                            <span className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A]">
                                Total
                            </span>
                            <span className="text-xl font-bold text-[#1A1A1A] font-serif">
                                {formatPrice(order.totalPrice)}
                            </span>
                        </div>

                        {/* Points earned */}
                        <div className="mt-4 flex flex-col gap-2.5 bg-[#D4AF37]/8 border border-[#D4AF37]/25 px-4 py-3">
                            <div className="flex items-center gap-2.5">
                                <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37] shrink-0" />
                                <p className="text-[11px] text-[#1A1A1A]/70">
                                    <span className="font-bold text-[#D4AF37]">{order.pointsEarned} pts</span> earned
                                    from this order
                                </p>
                            </div>
                            <p className="text-[10px] text-[#1A1A1A]">The points will be added to your account after order delievered</p>
                        </div>
                    </SectionCard>

                    {/* Payment Details */}
                    <SectionCard icon={<CreditCard className="w-4 h-4" />} title="Payment Details">
                        <div className="space-y-0">
                            <InfoRow label="Method" value={order.paymentMethod} />
                            <InfoRow
                                label="Status"
                                value={
                                    order.isPaid ? (
                                        <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            Paid
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 text-yellow-600 font-semibold">
                                            <Clock className="w-3.5 h-3.5" />
                                            Pending
                                        </span>
                                    )
                                }
                            />
                            {order.isPaid && order.paidAt && (
                                <InfoRow label="Paid At" value={formatDate(order.paidAt)} />
                            )}
                        </div>
                    </SectionCard>

                    {/* Delivery Status */}
                    <SectionCard icon={<ShieldCheck className="w-4 h-4" />} title="Delivery Status">
                        <div className="space-y-0">
                            <InfoRow
                                label="Delivered"
                                value={
                                    order.isDelieverd ? (
                                        <span className="text-emerald-600 font-semibold flex items-center gap-1.5 justify-end">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            Yes
                                        </span>
                                    ) : (
                                        <span className="text-[#1A1A1A]/50 flex items-center gap-1.5 justify-end">
                                            <Clock className="w-3.5 h-3.5" />
                                            Not yet
                                        </span>
                                    )
                                }
                            />
                            <InfoRow label="Order Date" value={formatDate(order.createdAt)} />
                            <InfoRow label="Last Updated" value={formatDate(order.updatedAt)} />
                        </div>
                    </SectionCard>

                </div>
            </div>
        </main>
    );
};

export default OrderDetailsPage;
