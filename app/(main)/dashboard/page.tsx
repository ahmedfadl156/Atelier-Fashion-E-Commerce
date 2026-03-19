"use client";

import Link from "next/link";
import Image from "next/image";
import {
    Loader2,
    Star,
    Clock,
    Crown,
    ArrowRight,
    User,
    Mail,
    Shield,
    Package,
    Settings,
    CheckCircle2,
    CalendarDays,
    TrendingUp,
} from "lucide-react";
import { useGetUserProfile } from "@/hooks/user/useGetUserProfile";
import { useGetOrders } from "@/hooks/orders/useGetOrders";
import { SERVER_ORIGIN, formatDate, formatDateTime, STATUS_COLOR, STATUS_DOT, TIER_CONFIG } from "@/utils/helpers";
import { StatCard } from "@/components/dashboard/StatCard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { FieldRow } from "@/components/dashboard/FieldRow";

// Main component 
const DashboardPage = () => {
    const { data: profileData, isLoading: profileLoading } = useGetUserProfile();
    const { data: ordersData, isLoading: ordersLoading } = useGetOrders();

    const profile = profileData?.data;
    const recentOrders = (ordersData?.data || []).slice(0, 3);

    const tierConfig = TIER_CONFIG[profile?.tier ?? "Member"] ?? TIER_CONFIG.Member;

    const isLoading = profileLoading;

    if (isLoading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-5 text-[#1A1A1A]/40">
                    <Loader2 className="w-7 h-7 animate-spin text-[#D4AF37]" />
                    <p className="text-[11px] uppercase tracking-[0.3em]">Loading your account…</p>
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-24">

            {/* Page header */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1A1A1A]/10 pb-10 mb-14">
                <div>
                    <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-semibold mb-3">
                        Client Portal
                    </p>
                    <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl uppercase tracking-widest text-[#1A1A1A] leading-tight">
                        My Account
                    </h1>
                    {profile && (
                        <p className="text-sm text-[#1A1A1A]/50 mt-4 font-serif italic">
                            Welcome back,{" "}
                            <span className="text-[#1A1A1A] font-semibold not-italic">
                                {profile.firstName} {profile.lastName}
                            </span>
                            . Your Atelier profile awaits.
                        </p>
                    )}
                </div>

                {/* Verified badge */}
                {profile?.isVerified && (
                    <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-emerald-600 border border-emerald-200 bg-emerald-50 px-4 py-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified Account
                    </div>
                )}
            </section>

            {/* Stats: Tier / Points / Last Login */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
                {/* Tier */}
                <StatCard
                    icon={<Crown className="w-5 h-5" />}
                    label="Membership Tier"
                    highlight={profile?.tier === "Gold" || profile?.tier === "Platinum"}
                    value={
                        <span className={`flex items-center gap-2 ${tierConfig.color}`}>
                            <span>{tierConfig.icon}</span>
                            <span>{profile?.tier ?? "—"}</span>
                        </span>
                    }
                    sub="Your current loyalty standing"
                />

                {/* Points */}
                <StatCard
                    icon={<Star className="w-5 h-5" />}
                    label="Atelier Points"
                    highlight
                    value={
                        <span>
                            {(profile?.atelierPoints ?? 0).toLocaleString()}
                            <span className="text-sm font-sans font-normal text-[#D4AF37]/70 ml-1">pts</span>
                        </span>
                    }
                    sub="Redeemable on future orders"
                />

                {/* Last Login */}
                <StatCard
                    icon={<Clock className="w-5 h-5" />}
                    label="Last Login"
                    value={
                        profile?.lastLogin
                            ? <span className="text-xl md:text-2xl">{formatDateTime(profile.lastLogin)}</span>
                            : "—"
                    }
                    sub={profile?.createdAt ? `Member since ${formatDate(profile.createdAt)}` : undefined}
                />
            </section>

            {/* Recent Orders */}
            <section className="border border-[#1A1A1A]/10 p-6 md:p-8 mb-8 bg-white">
                <SectionHeader
                    icon={<Package className="w-4 h-4" />}
                    title="Recent Orders"
                    action={
                        <Link
                            href="/orders"
                            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#1A1A1A] hover:text-[#D4AF37] transition-colors duration-300 group/link font-semibold"
                        >
                            View All
                            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-300" />
                        </Link>
                    }
                />

                {ordersLoading ? (
                    <div className="flex items-center gap-3 py-8 text-[#1A1A1A]/40">
                        <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                        <p className="text-xs uppercase tracking-widest">Loading orders…</p>
                    </div>
                ) : recentOrders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Package className="w-10 h-10 text-[#D4AF37]/30 mb-4" />
                        <p className="text-sm text-[#1A1A1A]/50 mb-6">No orders placed yet.</p>
                        <Link
                            href="/collections"
                            className="text-[11px] uppercase tracking-widest bg-[#1A1A1A] text-white px-6 py-3 hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors duration-300"
                        >
                            Explore Collections
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-[#1A1A1A]/8">
                        {recentOrders.map((order) => {
                            const statusLower = order.status.toLowerCase();
                            const colorCls = STATUS_COLOR[statusLower] ?? STATUS_COLOR.pending;
                            const dotCls = STATUS_DOT[statusLower] ?? STATUS_DOT.pending;
                            const firstItem = order.orderItems[0];

                            return (
                                <div
                                    key={order.orderNumber}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 group/row"
                                >
                                    {/* Left: item preview + order info */}
                                    <div className="flex items-center gap-4">
                                        {/* Tiny image */}
                                        <div className="relative w-12 h-16 shrink-0 bg-[#F5F5F0] overflow-hidden">
                                            {firstItem?.imageCover ? (
                                                <Image
                                                    src={`${SERVER_ORIGIN}/${firstItem.imageCover}`}
                                                    alt={firstItem.title}
                                                    fill
                                                    sizes="48px"
                                                    className="object-cover object-top"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Package className="w-5 h-5 text-[#1A1A1A]/20" />
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">
                                                #{order.orderNumber}
                                            </p>
                                            <p className="text-[11px] text-[#1A1A1A]/50 mt-0.5">
                                                {formatDate(order.createdAt)}
                                            </p>
                                            <p className="text-[10px] text-[#1A1A1A]/40 mt-0.5 uppercase tracking-wider">
                                                {order.orderItems.length} item{order.orderItems.length !== 1 ? "s" : ""}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right: status + link */}
                                    <div className="flex items-center gap-5 sm:gap-6">
                                        <span
                                            className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold border px-3 py-1.5 ${colorCls}`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotCls}`} />
                                            {order.status}
                                        </span>

                                        <Link
                                            href={`/orders/${order.orderNumber}`}
                                            className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#1A1A1A]/50 hover:text-[#D4AF37] transition-colors duration-300 font-semibold group/link2"
                                        >
                                            Details
                                            <ArrowRight className="w-3 h-3 group-hover/link2:translate-x-0.5 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Account Settings */}
            <section className="border border-[#1A1A1A]/10 p-6 md:p-8 bg-white">
                <SectionHeader
                    icon={<Settings className="w-4 h-4" />}
                    title="Account Settings"
                    action={
                        <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/35 border border-[#1A1A1A]/12 px-3 py-1.5 font-medium">
                            Read-only for now
                        </span>
                    }
                />

                {profile ? (
                    <div className="space-y-10">
                        {/* Personal Information */}
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-5 flex items-center gap-2">
                                <User className="w-3 h-3" />
                                Personal Information
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <FieldRow
                                    label="First Name"
                                    value={profile.firstName}
                                    icon={<User className="w-3.5 h-3.5" />}
                                />
                                <FieldRow
                                    label="Last Name"
                                    value={profile.lastName}
                                    icon={<User className="w-3.5 h-3.5" />}
                                />
                            </div>
                        </div>

                        <div className="h-px bg-[#1A1A1A]/6" />

                        {/* Contact */}
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-5 flex items-center gap-2">
                                <Mail className="w-3 h-3" />
                                Contact & Security
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <FieldRow
                                    label="Email Address"
                                    value={profile.email}
                                    type="email"
                                    icon={<Mail className="w-3.5 h-3.5" />}
                                />
                                <FieldRow
                                    label="Account Role"
                                    value={profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                                    icon={<Shield className="w-3.5 h-3.5" />}
                                />
                            </div>
                        </div>

                        <div className="h-px bg-[#1A1A1A]/6" />

                        {/* Update notice */}
                        <div className="flex items-start gap-3 bg-[#D4AF37]/6 border border-[#D4AF37]/20 px-5 py-4 mt-2">
                            <Settings className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                            <p className="text-[11px] text-[#1A1A1A]/60 leading-relaxed">
                                Profile editing will be available soon. Your information is displayed here for review only.
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-[#1A1A1A]/40 py-6">Unable to load profile information.</p>
                )}
            </section>

        </main>
    );
};

export default DashboardPage;