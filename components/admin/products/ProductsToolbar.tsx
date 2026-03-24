"use client";

import { Search, Filter, ChevronDown } from "lucide-react";
import { StatusFilterKey } from "./types";
import { PAGE_SIZE_OPTIONS } from "./constants";

interface ProductsToolbarProps {
    search: string;
    onSearch: (value: string) => void;
    categoryFilter: string;
    onCategoryFilter: (value: string) => void;
    categories: string[];
    statusFilter: StatusFilterKey;
    onStatusFilter: (value: StatusFilterKey) => void;
    pageSize: number;
    onPageSizeChange: (value: number) => void;
    totalCount: number;
    filteredCount: number;
    isLoading: boolean;
    statusCounts: { total: number; active: number; draft: number; archived: number };
}

const STATUS_PILLS: { key: StatusFilterKey; label: string; countKey: keyof { total: number; active: number; draft: number; archived: number }; accent: string }[] = [
    { key: "all",      label: "All Products", countKey: "total",    accent: "#1A1A1A" },
    { key: "active",   label: "Active",       countKey: "active",   accent: "#4A9B7F" },
    { key: "draft",    label: "Draft",        countKey: "draft",    accent: "#D4AF37" },
    { key: "archived", label: "Archived",     countKey: "archived", accent: "rgba(26,26,26,0.4)" },
];

export default function ProductsToolbar({
    search,
    onSearch,
    categoryFilter,
    onCategoryFilter,
    categories,
    statusFilter,
    onStatusFilter,
    pageSize,
    onPageSizeChange,
    filteredCount,
    totalCount,
    isLoading,
    statusCounts,
}: ProductsToolbarProps) {
    return (
        <div className="space-y-4">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                    <p
                        className="text-[10px] tracking-[0.3em] uppercase mb-1"
                        style={{
                            color: "rgba(26,26,26,0.35)",
                            fontFamily: "'Liberation Serif', Georgia, serif",
                        }}
                    >
                        Catalogue Management
                    </p>
                    <p className="text-sm" style={{ color: "rgba(26,26,26,0.5)" }}>
                        {isLoading ? "Loading…" : `${filteredCount} of ${totalCount} products`}
                    </p>
                </div>
            </div>

            {/* Status pills */}
            {!isLoading && (
                <div className="flex flex-wrap gap-3">
                    {STATUS_PILLS.map(({ key, label, countKey, accent }) => (
                        <button
                            key={key}
                            onClick={() => onStatusFilter(key)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-medium transition-all duration-150"
                            style={{
                                background: statusFilter === key ? "#fff" : "rgba(26,26,26,0.03)",
                                border: `1px solid ${statusFilter === key ? accent : "rgba(26,26,26,0.1)"}`,
                                color: statusFilter === key ? "#1A1A1A" : "rgba(26,26,26,0.55)",
                                letterSpacing: "0.04em",
                                boxShadow: statusFilter === key ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                            }}
                        >
                            <span
                                className="text-sm font-semibold"
                                style={{ color: statusFilter === key ? accent : "rgba(26,26,26,0.35)" }}
                            >
                                {statusCounts[countKey]}
                            </span>
                            {label}
                        </button>
                    ))}
                </div>
            )}

            {/* Search + filters row */}
            <div
                className="rounded-sm p-4 flex flex-col sm:flex-row gap-3"
                style={{ background: "#fff", border: "1px solid rgba(26,26,26,0.07)" }}
            >
                {/* Search */}
                <div className="relative flex-1 min-w-0">
                    <Search
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: "rgba(26,26,26,0.35)" }}
                    />
                    <input
                        type="text"
                        placeholder="Search products…"
                        value={search}
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-sm text-sm outline-none transition-all duration-150"
                        style={{
                            background: "rgba(26,26,26,0.03)",
                            border: "1px solid rgba(26,26,26,0.1)",
                            color: "#1A1A1A",
                            letterSpacing: "0.02em",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.5)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(26,26,26,0.1)")}
                    />
                </div>

                {/* Category filter */}
                <div className="relative">
                    <Filter
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: "rgba(26,26,26,0.35)" }}
                    />
                    <select
                        value={categoryFilter}
                        onChange={(e) => onCategoryFilter(e.target.value)}
                        className="appearance-none pl-8 pr-8 py-2.5 rounded-sm text-sm outline-none cursor-pointer"
                        style={{
                            background: "rgba(26,26,26,0.03)",
                            border: "1px solid rgba(26,26,26,0.1)",
                            color: "#1A1A1A",
                            letterSpacing: "0.02em",
                            minWidth: 160,
                        }}
                    >
                        {categories.map((c) => (
                            <option key={c} value={c}>
                                {c === "all" ? "All Categories" : c}
                            </option>
                        ))}
                    </select>
                    <ChevronDown
                        size={13}
                        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: "rgba(26,26,26,0.4)" }}
                    />
                </div>

                {/* Page size */}
                <div className="relative">
                    <select
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                        className="appearance-none pl-4 pr-8 py-2.5 rounded-sm text-sm outline-none cursor-pointer"
                        style={{
                            background: "rgba(26,26,26,0.03)",
                            border: "1px solid rgba(26,26,26,0.1)",
                            color: "#1A1A1A",
                            letterSpacing: "0.02em",
                            minWidth: 90,
                        }}
                    >
                        {PAGE_SIZE_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                                {s} / page
                            </option>
                        ))}
                    </select>
                    <ChevronDown
                        size={13}
                        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: "rgba(26,26,26,0.4)" }}
                    />
                </div>
            </div>
        </div>
    );
}
