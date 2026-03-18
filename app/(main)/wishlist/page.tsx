"use client";
import { useWishlist, useRemoveFromWishlist } from "@/hooks/wishlist/useWishlist";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const WishlistPage = () => {
    const { data, isLoading, isError } = useWishlist();
    const { mutate: removeFromWishlist, isPending: isRemoving } = useRemoveFromWishlist();

    const wishlist = Array.isArray(data?.data) ? data.data : [];

    const router = useRouter();

    const handleAddToCart = (product: any) => {
        router.push(`/collections/${product.slug}`);
    };

    return (
        <main className="py-16 lg:py-24 mx-auto max-w-[1600px] px-4 md:px-6 lg:px-8">
            {/* Header Section */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#1A1A1A]/10 pb-8">
                <div>
                    <p className="text-[#D4AF37] text-sm uppercase tracking-widest font-bold">Your Private Selection</p>
                    <h1 className="uppercase text-5xl md:text-6xl lg:text-7xl font-serif mt-4 text-[#1A1A1A] tracking-widest leading-tight">
                        The <br /> Wishlist
                    </h1>
                </div>
                <p className="max-w-xs text-sm text-[#1A1A1A]/60 leading-relaxed font-serif italic">
                    "A curated collection of your desired pieces, reserved for your consideration."
                </p>
            </section>

            {/* Content Section */}
            <section className="mt-16 min-h-[40vh]">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full space-y-4 text-[#1A1A1A]/40">
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <p className="uppercase tracking-widest text-xs font-semibold">Loading your selection...</p>
                    </div>
                ) : isError ? (
                    <div className="text-center py-20 text-red-500/80 uppercase tracking-widest text-sm font-semibold">
                        Unable to load wishlist. Please try again later.
                    </div>
                ) : wishlist.length === 0 ? (
                    <div className="text-center py-20 flex flex-col items-center justify-center space-y-6">
                        <div className="w-20 h-20 bg-[#F9F8F6] rounded-full flex items-center justify-center text-[#1A1A1A]/20">
                            <ShoppingBag className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-xl font-serif text-[#1A1A1A] mb-2">Your wishlist is empty</p>
                            <p className="text-sm text-[#1A1A1A]/50 max-w-sm mx-auto">
                                Explore our collections and save the pieces that speak to your style.
                            </p>
                        </div>
                        <Link 
                            href="/collections" 
                            className="bg-[#1A1A1A] text-[#F9F8F6] px-8 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors duration-300 mt-4"
                        >
                            Discover More
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {wishlist.map((item: any) => (
                            <div key={item._id} className="group flex flex-col relative">
                                {/* Image Container */}
                                <div className="relative w-full aspect-3/4 bg-[#F9F8F6] overflow-hidden rounded-xl">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_SERVER_ORIGIN || "http://localhost:5500"}/images/Products/${item.coverImage}`}
                                        alt={item.title}
                                        fill
                                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                    
                                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-100 translate-x-0 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 transition-all duration-300 lg:group-hover:translate-x-0">
                                        <button 
                                            onClick={() => removeFromWishlist(item._id)}
                                            disabled={isRemoving}
                                            className="w-10 h-10 bg-white/90 backdrop-blur text-red-500/80 hover:text-red-500 flex items-center justify-center rounded-full shadow-sm hover:scale-110 transition-all disabled:opacity-50"
                                            title="Remove from wishlist"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Quick Add To Cart */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-0 lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-500 ease-out bg-linear-to-t from-black/60 to-transparent">
                                        <button 
                                            onClick={() => handleAddToCart(item)}
                                            className="w-full bg-white/95 backdrop-blur-sm text-[#1A1A1A] py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
                                        >
                                            <ShoppingBag className="w-3.5 h-3.5" />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>

                                {/* Information */}
                                <div className="mt-5 space-y-1.5 px-1 text-center">
                                    <h3 className="font-serif text-[#1A1A1A] text-lg leading-snug line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm font-medium tracking-wide text-[#1A1A1A]/60">
                                        ${item.price.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default WishlistPage;