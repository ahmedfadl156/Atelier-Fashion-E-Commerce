export interface CartItemProduct {
    _id: string
    title: string
    coverImage: string
    price: number
    discountPrice?: number
    brand?: string
}

export interface CartItem {
    _id: string
    product: CartItemProduct
    color: string
    size: string
    quantity: number
    price: number
}

export interface Cart {
    _id: string
    user: string
    cartItems: CartItem[]
    totalCartPrice: number
    createdAt?: string
    updatedAt?: string
}

export interface AddToCartPayload {
    productId: string
    color: string
    size: string
    quantity?: number
    productData?: {
        title: string
        coverImage: string
        price: number
    }
}

export interface AddToCartResponse {
    status: string
    message: string
    numOfCartItems: number
    data: {
        cart: Cart
    }
}

export interface GetCartResponse {
    status: string
    numOfCartItems: number
    data: {
        cart: Cart
    }
}
