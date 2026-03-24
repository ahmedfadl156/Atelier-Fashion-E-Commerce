// Derive server origin (e.g. http://localhost:5500/api/v1 → http://localhost:5500)
export const SERVER_ORIGIN = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/api\/v\d+$/, "");

export const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

export const STATUS_CONFIG: Record<
    string,
    { label: string; bg: string; color: string; dot: string }
> = {
    active: {
        label: "Active",
        bg: "rgba(74,155,127,0.1)",
        color: "#2D7A5F",
        dot: "#4A9B7F",
    },
    draft: {
        label: "Draft",
        bg: "rgba(212,175,55,0.12)",
        color: "#8B6914",
        dot: "#D4AF37",
    },
    archived: {
        label: "Archived",
        bg: "rgba(26,26,26,0.07)",
        color: "rgba(26,26,26,0.45)",
        dot: "rgba(26,26,26,0.3)",
    },
};

export const TABLE_COLUMNS = [
    { label: "#" },
    { label: "Product" },
    { label: "Category" },
    { label: "Price" },
    { label: "Stock" },
    { label: "Status" },
    { label: "Actions" },
] as const;
