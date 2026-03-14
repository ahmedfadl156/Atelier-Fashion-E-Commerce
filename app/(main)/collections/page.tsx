"use client";
import {motion} from "motion/react";
import FilterComponent from "@/components/collections/FilterComponent";
import { useGetAllProducts } from "@/hooks/products/useGetAllProducts";
import ProductCard from "@/components/ProductCard";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const page = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    
    const paramsObj: Record<string, string> = {};
    
    const category = searchParams.get('category');
    if (category) paramsObj.category = category;

    const size = searchParams.get('size');
    if (size) {
        paramsObj['variants.size'] = size;
    } 

    // Price Mapping
    const price = searchParams.get('price');
    if (price) {
        if (price === 'Under $300') {
            paramsObj['price[lte]'] = '300';
        } else if (price === '$300 - $600') {
            paramsObj['price[gte]'] = '300';
            paramsObj['price[lte]'] = '600';
        } else if (price === '$700 - $1000') {
            paramsObj['price[gte]'] = '700';
            paramsObj['price[lte]'] = '1000';
        } else if (price === 'Over $1000') {
            paramsObj['price[gt]'] = '1000';
        }
    }

    // Sort Mapping
    const sortBy = searchParams.get('sortBy');
    if (sortBy) {
        if (sortBy === 'Newest Arrivals') {
            paramsObj.sort = '-createdAt';
        } else if (sortBy === 'Price: Low to High') {
            paramsObj.sort = 'price';
        } else if (sortBy === 'Price: High to Low') {
            paramsObj.sort = '-price';
        }
    }
    
    const query = new URLSearchParams(paramsObj).toString();

    const handleDeleteFilters = () => {
        router.push(pathname, { scroll: false });
    };

    const { data, isLoading, isError } = useGetAllProducts(query);
    const products = data?.data?.products || [];
    const serverOrigin = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5500";

    const textVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeInOut"
            }
        }
    }
    return (
        <section className="max-w-[1800px] mx-auto py-20 px-4 md:px-6 lg:px-8">
            {/* Header */}
            <motion.div
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center text-center"
            >
                <span className="text-[#D4AF37] text-lg tracking-widest leading-relaxed">Winter / Autumn 2026</span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#111827] mt-6 tracking-wider">The <br /> Collections</h1>
                <div className="w-24 h-px bg-[#C9AF5B] mt-6 origin-center"></div>
            </motion.div>

            {/* Filters and search component */}
            <div className="mt-10 flex items-center justify-between">
            <FilterComponent />
            </div>

            {/* Products & States */}
            <div className="mt-12">
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="flex flex-col gap-3">
                                <div className="w-full aspect-3/4 rounded-2xl bg-gray-100 animate-pulse" />
                                <div className="px-1 space-y-2">
                                    <div className="h-4 bg-gray-100 rounded-full w-3/4 animate-pulse" />
                                    <div className="h-4 bg-gray-100 rounded-full w-1/4 animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : isError ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to load collections</h3>
                        <p className="text-gray-500 max-w-md">We're having trouble connecting to our servers. Please try refreshing the page or check your connection.</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="mt-6 px-6 py-2.5 bg-[#111827] text-white rounded-full text-sm font-medium hover:bg-black transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-serif text-[#111827] mb-3">No products found</h3>
                        <p className="text-gray-500">We couldn't find any products matching your current filters.</p>
                        <button 
                            onClick={handleDeleteFilters}
                            className="mt-6 px-8 py-3 bg-[#C9AF5B] text-white rounded-full text-sm font-medium hover:bg-[#b59d51] transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
                    >
                        {products.map((product: any) => (
                            <motion.div 
                                key={product._id}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { 
                                        opacity: 1, 
                                        y: 0,
                                        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
                                    }
                                }}
                            >
                                <ProductCard 
                                    key={product._id} 
                                    product={product} 
                                    serverOrigin={serverOrigin} 
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    )
}

export default page