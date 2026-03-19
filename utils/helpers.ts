export const SERVER_ORIGIN =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/api.*$/, "") ||
    "http://localhost:5500";

export const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-EG", {
        style: "currency",
        currency: "EGP",
        minimumFractionDigits: 0,
    }).format(amount);

export const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

export const formatDateTime = (iso: string) =>
    new Date(iso).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

export type StatusKey = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export const STATUS_STEPS: { key: StatusKey; label: string }[] = [
    { key: "pending", label: "Pending" },
    { key: "processing", label: "Processing" },
    { key: "shipped", label: "Shipped" },
    { key: "delivered", label: "Delivered" },
];

export const STATUS_COLOR: Record<StatusKey | string, string> = {
    pending: "text-yellow-600 bg-yellow-50 border-yellow-200",
    processing: "text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/30",
    shipped: "text-blue-600 bg-blue-50 border-blue-200",
    delivered: "text-emerald-600 bg-emerald-50 border-emerald-200",
    cancelled: "text-red-500 bg-red-50 border-red-200",
};

export const STATUS_DOT: Record<StatusKey | string, string> = {
    pending: "bg-yellow-500",
    processing: "bg-[#D4AF37] animate-pulse",
    shipped: "bg-blue-500",
    delivered: "bg-emerald-500",
    cancelled: "bg-red-500",
};

export const getCurrentStepIndex = (status: string) => {
    const idx = STATUS_STEPS.findIndex((s) => s.key === status.toLowerCase());
    return idx === -1 ? 0 : idx;
};

export const TIER_CONFIG: Record<string, { icon: string; color: string; bg: string }> = {
    Member:   { icon: "✦", color: "text-[#1A1A1A]/60", bg: "bg-[#1A1A1A]/5 border-[#1A1A1A]/15" },
    Silver:   { icon: "◈", color: "text-slate-500",    bg: "bg-slate-50 border-slate-200" },
    Gold:     { icon: "◆", color: "text-[#D4AF37]",    bg: "bg-[#D4AF37]/10 border-[#D4AF37]/30" },
    Platinum: { icon: "◉", color: "text-violet-500",   bg: "bg-violet-50 border-violet-200" },
};
