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
