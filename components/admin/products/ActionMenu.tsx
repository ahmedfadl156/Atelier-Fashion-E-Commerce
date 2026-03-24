"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { AdminProduct } from "./types";

interface ActionMenuProps {
    product: AdminProduct;
    onDelete: (id: string, title: string) => void;
}

export default function ActionMenu({ product, onDelete }: ActionMenuProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative" onBlur={() => setTimeout(() => setOpen(false), 120)}>
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center justify-center w-8 h-8 rounded-sm transition-all duration-150"
                style={{
                    background: open ? "rgba(212,175,55,0.08)" : "transparent",
                    border: "1px solid",
                    borderColor: open ? "rgba(212,175,55,0.3)" : "rgba(26,26,26,0.1)",
                    color: open ? "#D4AF37" : "rgba(26,26,26,0.5)",
                }}
                aria-label="Actions"
            >
                <MoreHorizontal size={15} />
            </button>

            {open && (
                <div
                    className="absolute right-0 top-9 z-50 min-w-[148px] rounded-sm shadow-xl overflow-hidden"
                    style={{
                        background: "#fff",
                        border: "1px solid rgba(26,26,26,0.1)",
                    }}
                >
                    <Link
                        href={`/products/${product.slug}`}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-[rgba(26,26,26,0.03)]"
                        style={{ color: "#1A1A1A", letterSpacing: "0.02em" }}
                        onClick={() => setOpen(false)}
                    >
                        <Eye size={14} style={{ color: "rgba(26,26,26,0.45)" }} />
                        View details
                    </Link>

                    <Link
                        href={`/admin/products/${product._id}/edit`}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-[rgba(26,26,26,0.03)]"
                        style={{ color: "#1A1A1A", letterSpacing: "0.02em" }}
                        onClick={() => setOpen(false)}
                    >
                        <Pencil size={14} style={{ color: "rgba(26,26,26,0.45)" }} />
                        Edit product
                    </Link>

                    <div style={{ borderTop: "1px solid rgba(26,26,26,0.06)" }} />

                    <button
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-red-50"
                        style={{ color: "#C0392B", letterSpacing: "0.02em" }}
                        onClick={() => {
                            setOpen(false);
                            onDelete(product._id, product.title);
                        }}
                    >
                        <Trash2 size={14} />
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}
