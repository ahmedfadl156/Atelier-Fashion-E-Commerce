"use client";

import { useGetRelatedProducts } from "@/hooks/products/useGetRelatedProducts";
import ProductCard from "./ProductCard";

interface RecommendedProductsProps {
    productId: string;
}

const RecommendedProducts = ({ productId }: RecommendedProductsProps) => {
    const { data, isLoading, isError } = useGetRelatedProducts(productId);
    const relatedProducts = data?.data?.relatedProducts;
    const serverOrigin = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api.*$/, "") || "http://localhost:5500";

    if (isLoading) {
        return (
            <section className="mt-20">
                <h2 className="text-3xl italic font-serif text-[#111827] mb-8 text-center">Curated For You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-full aspect-3/4 bg-gray-200 rounded-2xl" />
                    ))}
                </div>
            </section>
        );
    }

    if (isError || !relatedProducts || relatedProducts.length === 0) {
        return null;
    }

    return (
        <section className="mt-24 mb-16">
            <h2 className="text-3xl italic md:text-4xl font-serif text-[#111827] mb-12 text-center relative max-w-max mx-auto">
                Curated For You
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[#C9AF5B]"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((product: any) => (
                    <ProductCard
                        key={product._id}
                        product={{
                            _id: product._id,
                            title: product.title,
                            slug: product.slug,
                            price: product.price,
                            coverImage: product.coverImage,
                        } as any}
                        serverOrigin={serverOrigin}
                    />
                ))}
            </div>
        </section>
    );
};

export default RecommendedProducts;
