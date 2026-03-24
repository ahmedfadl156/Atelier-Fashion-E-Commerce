import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
    page: number;
    totalPages: number;
    totalFiltered: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

export default function TablePagination({
    page,
    totalPages,
    totalFiltered,
    pageSize,
    onPageChange,
}: TablePaginationProps) {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, totalFiltered);

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter((n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
        .reduce<(number | "…")[]>((acc, n, i, arr) => {
            if (i > 0 && (n as number) - (arr[i - 1] as number) > 1) acc.push("…");
            acc.push(n);
            return acc;
        }, []);

    return (
        <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4"
            style={{ borderTop: "1px solid rgba(26,26,26,0.06)" }}
        >
            {/* Info */}
            <p className="text-xs" style={{ color: "rgba(26,26,26,0.45)", letterSpacing: "0.03em" }}>
                Showing{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                    {start}–{end}
                </span>{" "}
                of{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                    {totalFiltered}
                </span>{" "}
                products
            </p>

            {/* Controls */}
            <div className="flex items-center gap-1.5">
                {/* Prev */}
                <button
                    onClick={() => onPageChange(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="flex items-center justify-center w-8 h-8 rounded-sm transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                        border: "1px solid rgba(26,26,26,0.12)",
                        background: "transparent",
                        color: "rgba(26,26,26,0.6)",
                    }}
                    aria-label="Previous page"
                >
                    <ChevronLeft size={15} />
                </button>

                {/* Page numbers */}
                {pageNumbers.map((n, i) =>
                    n === "…" ? (
                        <span
                            key={`ellipsis-${i}`}
                            className="w-8 text-center text-sm"
                            style={{ color: "rgba(26,26,26,0.3)" }}
                        >
                            …
                        </span>
                    ) : (
                        <button
                            key={n}
                            onClick={() => onPageChange(n as number)}
                            className="flex items-center justify-center w-8 h-8 rounded-sm text-xs font-medium transition-all duration-150"
                            style={{
                                background: page === n ? "#1A1A1A" : "transparent",
                                color: page === n ? "#F9F8F6" : "rgba(26,26,26,0.6)",
                                border: `1px solid ${page === n ? "#1A1A1A" : "rgba(26,26,26,0.12)"}`,
                            }}
                        >
                            {n}
                        </button>
                    )
                )}

                {/* Next */}
                <button
                    onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="flex items-center justify-center w-8 h-8 rounded-sm transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                        border: "1px solid rgba(26,26,26,0.12)",
                        background: "transparent",
                        color: "rgba(26,26,26,0.6)",
                    }}
                    aria-label="Next page"
                >
                    <ChevronRight size={15} />
                </button>
            </div>
        </div>
    );
}
