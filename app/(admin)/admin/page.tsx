"use client";

import KPICard from "@/components/admin/KPICard";
import KPISkeleton from "@/components/admin/KPISkeleton";
import { useGetStats } from "@/hooks/dashboard/useGetStats";
import { DollarSign, ShoppingBag, PackageCheck, Loader } from "lucide-react";

type KpiKey = "totalRevenue" | "totalOrders" | "delieveredOrders" | "proccessingOrders";

const kpiConfig: { key: KpiKey; label: string; icon: React.ElementType; prefix: string; accentColor: string }[] = [
    { key: "totalRevenue",      label: "Total Revenue",     icon: DollarSign,   prefix: "$", accentColor: "#D4AF37" },
    { key: "totalOrders",       label: "Total Orders",      icon: ShoppingBag,  prefix: "",  accentColor: "#1A1A1A" },
    { key: "delieveredOrders",  label: "Delivered Orders",  icon: PackageCheck, prefix: "",  accentColor: "#4A9B7F" },
    { key: "proccessingOrders", label: "Processing Orders", icon: Loader,       prefix: "",  accentColor: "#8B6914" },
];


const page = () => {
    const { data, isLoading, error } = useGetStats();
    const kpis = data?.data?.kpis;

    if (isLoading) {
        return (
            <section>
                <div className="mb-6">
                    <div className="h-2.5 w-44 rounded-full animate-pulse" style={{ background: "rgba(26,26,26,0.08)" }} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[0, 1, 2, 3].map((i) => <KPISkeleton key={i} />)}
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <div
                className="flex flex-col items-center justify-center min-h-[40vh] rounded-sm p-12 text-center"
                style={{ background: "#fff", border: "1px solid rgba(26,26,26,0.07)" }}
            >
                <span
                    className="flex items-center justify-center w-12 h-12 rounded-sm mb-5"
                    style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                </span>
                <p
                    className="text-[10px] tracking-[0.25em] uppercase mb-2"
                    style={{ color: "rgba(26,26,26,0.4)", fontFamily: "'Liberation Serif', Georgia, serif" }}
                >
                    Unable to load data
                </p>
                <p className="text-sm" style={{ color: "rgba(26,26,26,0.55)" }}>
                    {error.message}
                </p>
            </div>
        );
    }

    // Dashboard
    return (
        <section>
            <p
                className="text-[10px] tracking-[0.3em] uppercase mb-6"
                style={{ color: "rgba(26,26,26,0.35)", fontFamily: "'Liberation Serif', Georgia, serif" }}
            >
                Key Performance Indicators
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {kpiConfig.map(({ key, label, icon, prefix, accentColor }) => (
                    <KPICard
                        key={key}
                        label={label}
                        value={kpis?.[key]}
                        icon={icon}
                        prefix={prefix}
                        accentColor={accentColor}
                    />
                ))}
            </div>
        </section>
    );
};

export default page;