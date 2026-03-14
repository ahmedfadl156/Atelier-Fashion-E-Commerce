import Link from 'next/link'
import React from 'react'
import { ProductCard } from '@/types/products'
import Image from 'next/image'

interface ProductCardProps {
    product: ProductCard
    serverOrigin: string
}


const ProductCard = ({ product, serverOrigin }: ProductCardProps) => {
    return (
        <Link
            href={`/collections/${product.slug}`}
            className="group flex flex-col cursor-pointer"
        >
            {/* Image container */}
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#F5F2EE]">
                <Image
                    src={"/images/Fluid Dress.png"}
                    // src={`${serverOrigin}/images/Products/${product.coverImage}` || "/images/Fluid Dress.png"}
                    alt={product.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Price badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#333] text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-4px] group-hover:translate-y-0">
                    ${product.price.toLocaleString()}
                </div>

                {/* Quick shop */}
                <div className="absolute bottom-5 left-0 right-0 flex justify-center translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="bg-white/90 backdrop-blur-sm text-[#333] text-[11px] tracking-widest uppercase font-semibold px-6 py-3 rounded-full hover:bg-[#C9AF5B] hover:text-white transition-colors duration-300">
                        Quick Shop
                    </span>
                </div>
            </div>

            {/* Card info */}
            <div className="mt-3 px-1 space-y-0.5">
                <h3 className="font-serif text-[#333] text-base leading-snug line-clamp-1 group-hover:text-[#C9AF5B] transition-colors duration-300">
                    {product.title}
                </h3>
                <p className="text-sm text-[#C9AF5B] font-medium">
                    ${product.price.toLocaleString()}
                </p>
            </div>
        </Link>
    )
}

export default ProductCard