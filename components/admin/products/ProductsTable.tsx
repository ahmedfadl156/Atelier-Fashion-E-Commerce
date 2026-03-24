import Image from "next/image";
import { Package, AlertCircle } from "lucide-react";
import { AdminProduct } from "./types";
import { TABLE_COLUMNS, SERVER_ORIGIN } from "./constants";
import { deriveStatus, deriveStock } from "./helpers";
import StatusBadge from "./StatusBadge";
import SkeletonRow from "./SkeletonRow";
import ActionMenu from "./ActionMenu";
import TablePagination from "./TablePagination";

interface ProductsTableProps {
    products: AdminProduct[];
    isLoading: boolean;
    error: Error | null;
    page: number;
    pageSize: number;
    totalPages: number;
    totalFiltered: number;
    onPageChange: (page: number) => void;
    onDelete: (id: string, title: string) => void;
}

export default function ProductsTable({
    products,
    isLoading,
    error,
    page,
    pageSize,
    totalPages,
    totalFiltered,
    onPageChange,
    onDelete,
}: ProductsTableProps) {
    return (
        <div
            className="rounded-sm overflow-hidden"
            style={{ background: "#fff", border: "1px solid rgba(26,26,26,0.07)" }}
        >
            {/* Gold accent top bar */}
            <div
                className="h-[2px]"
                style={{
                    background: "linear-gradient(90deg,#D4AF37 0%,rgba(212,175,55,0.3) 100%)",
                }}
            />

            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    {/* ── thead ── */}
                    <thead>
                        <tr style={{ borderBottom: "1px solid rgba(26,26,26,0.07)" }}>
                            {TABLE_COLUMNS.map(({ label }) => (
                                <th
                                    key={label}
                                    className="px-4 py-3.5 text-left whitespace-nowrap"
                                    style={{
                                        color: "rgba(26,26,26,0.4)",
                                        fontSize: 10,
                                        letterSpacing: "0.15em",
                                        textTransform: "uppercase",
                                        fontFamily: "'Liberation Serif', Georgia, serif",
                                        fontWeight: 600,
                                        background: "rgba(26,26,26,0.02)",
                                    }}
                                >
                                    {label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* ── tbody ── */}
                    <tbody>
                        {/* Loading */}
                        {isLoading &&
                            Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)}

                        {/* Error */}
                        {!isLoading && error && (
                            <tr>
                                <td colSpan={7} className="px-4 py-16 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <span
                                            className="flex items-center justify-center w-10 h-10 rounded-sm"
                                            style={{ background: "rgba(212,175,55,0.08)" }}
                                        >
                                            <AlertCircle size={20} style={{ color: "#D4AF37" }} />
                                        </span>
                                        <p
                                            className="text-[10px] tracking-[0.25em] uppercase"
                                            style={{
                                                color: "rgba(26,26,26,0.4)",
                                                fontFamily: "'Liberation Serif', Georgia, serif",
                                            }}
                                        >
                                            Failed to load products
                                        </p>
                                        <p className="text-xs" style={{ color: "rgba(26,26,26,0.5)" }}>
                                            {error.message}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}

                        {/* Empty */}
                        {!isLoading && !error && products.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-4 py-16 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <span
                                            className="flex items-center justify-center w-10 h-10 rounded-sm"
                                            style={{ background: "rgba(26,26,26,0.05)" }}
                                        >
                                            <Package size={20} style={{ color: "rgba(26,26,26,0.3)" }} />
                                        </span>
                                        <p
                                            className="text-[10px] tracking-[0.25em] uppercase"
                                            style={{
                                                color: "rgba(26,26,26,0.4)",
                                                fontFamily: "'Liberation Serif', Georgia, serif",
                                            }}
                                        >
                                            No products found
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}

                        {/* Data rows */}
                        {!isLoading &&
                            !error &&
                            products.map((product, idx) => {
                                const status = deriveStatus(product);
                                const stock = deriveStock(product);
                                const globalIdx = (page - 1) * pageSize + idx + 1;

                                return (
                                    <tr
                                        key={product._id}
                                        className="group transition-colors duration-100 hover:bg-[rgba(212,175,55,0.03)]"
                                        style={{ borderBottom: "1px solid rgba(26,26,26,0.05)" }}
                                    >
                                        {/* # */}
                                        <td
                                            className="px-4 py-3.5 tabular-nums"
                                            style={{
                                                color: "rgba(26,26,26,0.3)",
                                                fontSize: 12,
                                                letterSpacing: "0.05em",
                                            }}
                                        >
                                            {globalIdx}
                                        </td>

                                        {/* Product */}
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-3 min-w-0">
                                                {/* Thumbnail */}
                                                <div
                                                    className="relative shrink-0 w-11 h-11 rounded-sm overflow-hidden"
                                                    style={{
                                                        background: product.accent
                                                            ? `${product.accent}18`
                                                            : "rgba(26,26,26,0.06)",
                                                    }}
                                                >
                                                    {product.coverImage ? (
                                                        <Image
                                                            src={`${SERVER_ORIGIN}/images/Products/${product.coverImage}`}
                                                            alt={product.title}
                                                            fill
                                                            className="object-cover"
                                                            sizes="44px"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <Package
                                                                size={16}
                                                                style={{ color: "rgba(26,26,26,0.2)" }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Text */}
                                                <div className="min-w-0">
                                                    <p
                                                        className="font-medium truncate max-w-[220px]"
                                                        style={{ color: "#1A1A1A", letterSpacing: "0.01em" }}
                                                        title={product.title}
                                                    >
                                                        {product.title}
                                                    </p>
                                                    <p
                                                        className="text-xs mt-0.5 truncate max-w-[220px]"
                                                        style={{
                                                            color: "rgba(26,26,26,0.38)",
                                                            letterSpacing: "0.02em",
                                                        }}
                                                    >
                                                        ID: {product._id.slice(-8)}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td className="px-4 py-3.5">
                                            <span
                                                className="inline-flex items-center px-2.5 py-1 rounded-sm text-xs capitalize"
                                                style={{
                                                    background: "rgba(26,26,26,0.04)",
                                                    color: "rgba(26,26,26,0.6)",
                                                    letterSpacing: "0.04em",
                                                }}
                                            >
                                                {product.category ?? "—"}
                                            </span>
                                        </td>

                                        {/* Price */}
                                        <td
                                            className="px-4 py-3.5 font-medium tabular-nums"
                                            style={{ color: "#1A1A1A", letterSpacing: "0.01em" }}
                                        >
                                            ${product.price?.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                        </td>

                                        {/* Stock */}
                                        <td className="px-4 py-3.5">
                                            <span
                                                className="tabular-nums font-medium"
                                                style={{
                                                    color:
                                                        stock === 0
                                                            ? "#C0392B"
                                                            : stock < 10
                                                            ? "#D4AF37"
                                                            : "rgba(26,26,26,0.75)",
                                                }}
                                            >
                                                {stock === 0 ? "Out" : stock}
                                            </span>
                                            {stock > 0 && stock < 10 && (
                                                <span className="ml-1 text-[10px]" style={{ color: "#D4AF37" }}>
                                                    low
                                                </span>
                                            )}
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 py-3.5">
                                            <StatusBadge status={status} />
                                        </td>

                                        {/* Actions */}
                                        <td className="px-4 py-3.5">
                                            <ActionMenu product={product} onDelete={onDelete} />
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>

            {/* Pagination footer */}
            {!isLoading && !error && totalFiltered > 0 && (
                <TablePagination
                    page={page}
                    totalPages={totalPages}
                    totalFiltered={totalFiltered}
                    pageSize={pageSize}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
}
