export interface Product {
    _id: string
    title: string
    category: string
    price: number
    coverImage: string
    accent?: string
}

export interface FeaturedProductsResponse {
    status: string
    results: number
    totalCount: number
    data: {
        products: Product[]
    }
}
export interface TrendingProduct {
    _id: string
    title: string
    price: number
    coverImage: string
}

export interface TrendingProductsResponse {
    status: string
    message: string
    data: TrendingProduct[]
}
