"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useGetAllProducts } from "@/hooks/products/useGetAllProducts";
import { AdminProduct, StatusFilterKey } from "@/components/admin/products/types";
import { deriveStatus } from "@/components/admin/products/helpers";
import ProductsToolbar from "@/components/admin/products/ProductsToolbar";
import ProductsTable from "@/components/admin/products/ProductsTable";
import DeleteModal from "@/components/admin/products/DeleteModal";

export default function AdminProductsPage() {
    const { data, isLoading, error } = useGetAllProducts("");

    // Filter & pagination state
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilterKey>("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Delete modal state
    const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

    const rawProducts: AdminProduct[] = useMemo(() => {
        const list = data?.data?.products ?? data?.data ?? [];
        return Array.isArray(list) ? list : [];
    }, [data]);

    const categories = useMemo(() => {
        const cats = rawProducts.map((p) => p.category).filter(Boolean);
        return ["all", ...Array.from(new Set(cats))];
    }, [rawProducts]);

    // Filtered list
    const filtered = useMemo(() => {
        return rawProducts.filter((p) => {
            const matchSearch =
                !search ||
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.category?.toLowerCase().includes(search.toLowerCase());
            const matchStatus = statusFilter === "all" || deriveStatus(p) === statusFilter;
            const matchCategory = categoryFilter === "all" || p.category === categoryFilter;
            return matchSearch && matchStatus && matchCategory;
        });
    }, [rawProducts, search, statusFilter, categoryFilter]);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

    // Summary counts for status pills
    const statusCounts = useMemo(
        () => ({
            total: rawProducts.length,
            active: rawProducts.filter((p) => deriveStatus(p) === "active").length,
            draft: rawProducts.filter((p) => deriveStatus(p) === "draft").length,
            archived: rawProducts.filter((p) => deriveStatus(p) === "archived").length,
        }),
        [rawProducts]
    );

    const handleSearch = (v: string) => { setSearch(v); setPage(1); };
    const handleStatusFilter = (v: StatusFilterKey) => { setStatusFilter(v); setPage(1); };
    const handleCategoryFilter = (v: string) => { setCategoryFilter(v); setPage(1); };
    const handlePageSizeChange = (v: number) => { setPageSize(v); setPage(1); };

    const handleDeleteRequest = (id: string, title: string) => setDeleteTarget({ id, title });
    const handleDeleteConfirm = () => {
        console.log("Deleting product:", deleteTarget?.id);
        setDeleteTarget(null);
    };

    return (
        <section className="space-y-5">
            {/* Page header */}
            <div className="flex items-center justify-between">
                <div>
                    <p
                        className="text-[10px] tracking-[0.3em] uppercase"
                        style={{
                            color: "rgba(26,26,26,0.35)",
                            fontFamily: "'Liberation Serif', Georgia, serif",
                        }}
                    >
                        Admin / Products
                    </p>
                </div>

                <Link
                    href="/admin/products/new"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                    style={{
                        background: "linear-gradient(135deg,#1A1A1A 0%,#2A2A2A 100%)",
                        color: "#F9F8F6",
                        letterSpacing: "0.05em",
                        border: "1px solid rgba(212,175,55,0.2)",
                    }}
                >
                    <Plus size={15} />
                    Add Product
                </Link>
            </div>

            {/* Search, filters, status pills */}
            <ProductsToolbar
                search={search}
                onSearch={handleSearch}
                categoryFilter={categoryFilter}
                onCategoryFilter={handleCategoryFilter}
                categories={categories}
                statusFilter={statusFilter}
                onStatusFilter={handleStatusFilter}
                pageSize={pageSize}
                onPageSizeChange={handlePageSizeChange}
                totalCount={rawProducts.length}
                filteredCount={filtered.length}
                isLoading={isLoading}
                statusCounts={statusCounts}
            />

            {/* Data table + pagination */}
            <ProductsTable
                products={paginated}
                isLoading={isLoading}
                error={error as Error | null}
                page={page}
                pageSize={pageSize}
                totalPages={totalPages}
                totalFiltered={filtered.length}
                onPageChange={setPage}
                onDelete={handleDeleteRequest}
            />

            {/* Delete confirmation modal */}
            {deleteTarget && (
                <DeleteModal
                    productTitle={deleteTarget.title}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
        </section>
    );
}