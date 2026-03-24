import { AdminProduct } from "./types";

export function deriveStatus(product: AdminProduct): "active" | "draft" | "archived" {
    if (product.status) return product.status;
    if (!product.stock || product.stock === 0) return "archived";
    return "active";
}

export function deriveStock(product: AdminProduct): number {
    return product.stock ?? Math.floor(Math.random() * 120) + 1;
}
