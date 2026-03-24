export interface AdminProduct {
    _id: string;
    title: string;
    price: number;
    coverImage: string;
    category: string;
    slug: string;
    status?: "active" | "draft" | "archived";
    stock?: number;
    accent?: string;
}

export type StatusFilterKey = "all" | "active" | "draft" | "archived";
