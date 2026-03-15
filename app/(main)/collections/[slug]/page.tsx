"use client";
import { useGetProductDetails } from "@/hooks/products/useGetProductDetails";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import Image from "next/image";
import { use, useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import ReviewsSection from "@/components/ReviewsSection";
import { starRatings } from "@/lib/RatingStars";
import RecommendedProducts from "@/components/RecommendedProducts";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { CheckCircle, ShoppingCart, Loader2 } from "lucide-react";


interface FlyState {
    src: string
    startX: number
    startY: number
    endX: number
    endY: number
}

const Page = ({params}: {params: Promise<{slug: string}>}) => {
    const {slug} = use(params);
    const {data , isLoading , isError} = useGetProductDetails(slug);
    const product = data?.data?.product;
    const serverOrigin = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api.*$/, "") || "http://localhost:5500";
    
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedColor , setSelectedColor] = useState<string | null>(null);
    const [selectedSize , setSelectedSize] = useState<string | null>(null);
    const [flyState, setFlyState] = useState<FlyState | null>(null);
    const [justAdded, setJustAdded] = useState(false);
    const addToCartButtonRef = useRef<HTMLButtonElement>(null);

    const allImages = product ? [product.coverImage, ...(product.images || [])] : [];
    
    const { mutate: addToCart, isPending } = useAddToCart();

    useEffect(() => {
        if (product?.coverImage && !selectedImage) {
            setSelectedImage(product.coverImage);
        }
    }, [product, selectedImage]);

    const handleAddToCart = useCallback(() => {
        if (!product || !selectedSize || !selectedColor) return;

        const buttonRect = addToCartButtonRef.current?.getBoundingClientRect();
        const cartIconEl = document.getElementById("cart-nav-icon");
        const cartRect = cartIconEl?.getBoundingClientRect();

        if (buttonRect && cartRect) {
            setFlyState({
                src: `${serverOrigin}/images/Products/${selectedImage || product.coverImage}`,
                startX: buttonRect.left + buttonRect.width / 2 - 24,
                startY: buttonRect.top + buttonRect.height / 2 - 24,
                endX: cartRect.left + cartRect.width / 2 - 24,
                endY: cartRect.top + cartRect.height / 2 - 24,
            });
        }

        const itemPrice = product.discountPrice ?? product.price;

        addToCart(
            {
                productId: product._id,
                color: selectedColor,
                size: selectedSize,
                quantity: 1,
                productData: {
                    title: product.title,
                    coverImage: selectedImage || product.coverImage,
                    price: itemPrice,
                },
            },
            {
                onSuccess: () => {
                    setJustAdded(true);
                    toast.success("Added to your cart!", {
                        description: `${product.title} — ${selectedColor}, ${selectedSize}`,
                        duration: 3000,
                    });
                    setTimeout(() => setJustAdded(false), 2000);
                },
                onError: (error) => {
                    setFlyState(null);
                    toast.error("Couldn't add to cart", {
                        description: error instanceof Error ? error.message : "Please try again.",
                    });
                },
            }
        );
    }, [product, selectedSize, selectedColor, selectedImage, addToCart, serverOrigin]);

    if (isLoading) {
        return (
            <section className="mx-auto max-w-[1800px] px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 animate-pulse">
                    <div className="lg:col-span-6 flex flex-col gap-6">
                        <div className="w-full aspect-4/5 md:aspect-auto md:h-[600px] bg-gray-200 rounded-3xl" />
                        <div className="flex gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-20 h-24 bg-gray-200 rounded-xl" />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (isError || !product) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <p className="text-gray-500">Failed to load product details</p>
            </div>
        );
    }

    const canAddToCart = !!selectedSize && !!selectedColor;
    const itemPrice = product.discountPrice ?? product.price;

    return (
        <section className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-24">

            <AnimatePresence onExitComplete={() => setFlyState(null)}>
                {flyState && (
                    <motion.div
                        key="fly-img"
                        className="fixed z-9999 w-12 h-12 rounded-full overflow-hidden shadow-xl border-2 border-[#C9AF5B] pointer-events-none"
                        initial={{
                            x: flyState.startX,
                            y: flyState.startY,
                            scale: 1,
                            opacity: 1,
                        }}
                        animate={{
                            x: flyState.endX,
                            y: flyState.endY,
                            scale: 0.2,
                            opacity: 0,
                        }}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        onAnimationComplete={() => setFlyState(null)}
                    >
                        <img
                            src={flyState.src}
                            alt=""
                            className="w-full h-full object-cover object-top"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                {/* Left Side => Images Gallery */}
                <div className="lg:col-span-6 flex flex-col items-start gap-4 md:gap-6 lg:sticky lg:top-24 h-max">
                    {/* Main Image */}
                    <div className="w-full aspect-4/5 md:aspect-auto md:h-[650px] relative bg-[#f8f8f8] rounded-2xl md:rounded-3xl overflow-hidden group">
                        <Image 
                            src={`${serverOrigin}/images/Products/${selectedImage || product.coverImage}`}
                            alt={product.title || "Product Image"}
                            fill
                            priority
                            className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-[1.03]"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                    
                    {/* Thumbnails */}
                    {allImages.length > 1 && (
                        <div className="flex items-center gap-3 overflow-x-auto w-full pb-2 scrollbar-none snap-x">
                            {allImages.map((img: string, idx: number) => (
                                <button 
                                    key={`${img}-${idx}`} 
                                    onClick={() => setSelectedImage(img)}
                                    className={cn(
                                        "relative shrink-0 w-[70px] h-[90px] md:w-[80px] md:h-[100px] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 snap-start border-2",
                                        selectedImage === img 
                                            ? "border-[#C9AF5B] opacity-100 ring-2 ring-[#C9AF5B]/20 ring-offset-2" 
                                            : "border-transparent opacity-60 hover:opacity-100 hover:border-gray-200"
                                    )}
                                >
                                    <Image 
                                        src={`${serverOrigin}/images/Products/${img}`}
                                        alt={`Thumbnail ${idx + 1}`}
                                        fill
                                        className="object-cover object-top"
                                        sizes="(max-width: 768px) 80px, 100px"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Side => Product Info */}
                <div className="lg:col-span-6 flex flex-col">
                    <div className="flex flex-col gap-2 border-b border-gray-100 pb-8">
                        {/* Meta Info: Brand & Badges */}
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            {product.brand && (
                                <span className="text-xs font-bold tracking-widest text-[#111827] uppercase bg-gray-100 px-3 py-1 rounded-full">
                                    {product.brand}
                                </span>
                            )}
                            
                            {product.isFeatured && (
                                <span className="text-xs font-semibold tracking-wide text-[#C9AF5B] bg-[#C9AF5B]/10 px-3 py-1 rounded-full border border-[#C9AF5B]/20 flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    Featured Collection
                                </span>
                            )}

                            {/* Ratings */}
                            {(product.ratingsAverage > 0) && (
                                <div className="flex items-center gap-2 ml-auto">
                                    <div className="flex items-center gap-0.5">
                                        {starRatings(product.ratingsAverage)}
                                    </div>
                                    <span className="text-xs font-semibold text-[#111827]">{product.ratingsAverage}</span>
                                    <span className="text-xs text-gray-500">({product.ratingsQuantity || 0} reviews)</span>
                                </div>
                            )}
                        </div>

                        {/* Title & Price */}
                        <h1 className="text-4xl italic md:text-5xl lg:text-6xl font-serif text-[#111827] leading-tight">
                            {product.title}
                        </h1>
                        <div className="flex items-baseline gap-3 mt-2">
                            <span className="text-2xl font-light tracking-wide text-[#C9AF5B]">
                                ${itemPrice?.toLocaleString()}
                            </span>
                            {product.discountPrice && (
                                <span className="text-base text-gray-400 line-through">${product.price?.toLocaleString()}</span>
                            )}
                        </div>
                        
                        {/* Summary / Description */}
                        {product.description && (
                            <p className="text-gray-600 mt-6 leading-relaxed font-light">
                                {product.description}
                            </p>
                        )}
                    </div>

                    {/* Sizes */}
                    {product?.variants && product.variants.length > 0 && (
                        <div className="flex flex-col gap-3 mt-6">
                            <h3 className="text-sm font-semibold tracking-widest text-[#111827] uppercase">Size</h3>
                            <div className="flex items-center gap-3 flex-wrap">
                                {Array.from(new Set(product.variants.map((v: any) => v.size))).map((size: any) => (
                                    <button
                                        onClick={() => setSelectedSize(size)}
                                        key={`size-${size}`} 
                                        className={cn(
                                            "min-w-[50px] h-[50px] px-4 flex items-center justify-center rounded-xl border text-sm font-medium transition-all duration-300",
                                            selectedSize === size
                                                ? "border-[#111827] bg-[#111827] text-white shadow-md transform scale-[1.02]"
                                                : "border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                                        )}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Colors */}
                    {product?.variants && product.variants.length > 0 && (
                        <div className="flex flex-col gap-3 mt-8">
                            <h3 className="text-sm font-semibold tracking-widest text-[#111827] uppercase">Color</h3>
                            <div className="flex items-center gap-4 flex-wrap">
                                {Array.from(new Set(product.variants.map((v: any) => v.color))).map((color: any) => (
                                    <button 
                                        onClick={() => setSelectedColor(color)}
                                        key={`color-${color}`} 
                                        className={cn(
                                            "relative px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-300 flex items-center gap-2",
                                            selectedColor === color
                                                ? "border-[#C9AF5B] bg-[#FDFBF7] text-[#111827] ring-1 ring-[#C9AF5B] shadow-sm transform scale-[1.02]"
                                                : "border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                                        )}
                                    >
                                        <span 
                                            className="w-3.5 h-3.5 rounded-full border border-gray-200 shadow-inner"
                                            style={{ 
                                                backgroundColor: color.toLowerCase().includes('black') ? '#000000' 
                                                : color.toLowerCase().includes('white') ? '#FFFFFF'
                                                : color.toLowerCase().includes('red') ? '#EF4444'
                                                : color.toLowerCase().includes('blue') ? '#3B82F6'
                                                : color.toLowerCase().includes('green') ? '#10B981'
                                                : color.toLowerCase().includes('yellow') ? '#F59E0B'
                                                : color.toLowerCase().includes('navy') ? '#1E3A8A'
                                                : color.toLowerCase().includes('beige') || color.toLowerCase().includes('nude') ? '#F5F5DC'
                                                : color.toLowerCase().includes('gold')? '#D4AF37'
                                                : color.toLowerCase().includes('silver')? '#C0C0C0'
                                                : color.toLowerCase().includes('pink')? '#EC4899'
                                                : color.toLowerCase().includes('grey')|| color.toLowerCase().includes('gray')? '#6B7280'
                                                : color.toLowerCase().includes('brown')? '#8B4513'
                                                : '#e5e7eb' 
                                            }}
                                        />
                                        <span className="capitalize">{color}</span>
                                        
                                        {selectedColor === color && (
                                            <svg className="w-4 h-4 text-[#C9AF5B] ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Add to Cart Button */}
                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <motion.button
                            ref={addToCartButtonRef}
                            onClick={handleAddToCart}
                            disabled={!canAddToCart || isPending}
                            whileTap={canAddToCart ? { scale: 0.97 } : {}}
                            className={cn(
                                "w-full py-4 px-8 rounded-full cursor-pointer font-semibold text-white text-sm md:text-base tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3",
                                canAddToCart && !isPending
                                    ? justAdded
                                        ? "bg-emerald-500 hover:bg-emerald-600 shadow-xl"
                                        : "bg-[#DEAE2B] hover:bg-[#aa8624] hover:shadow-xl hover:-translate-y-1"
                                    : isPending
                                    ? "bg-[#DEAE2B]/70 cursor-not-allowed"
                                    : "bg-gray-300 cursor-not-allowed"
                            )}
                        >
                            <AnimatePresence mode="wait">
                                {isPending ? (
                                    <motion.span
                                        key="loading"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="flex items-center gap-2"
                                    >
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Adding…
                                    </motion.span>
                                ) : justAdded ? (
                                    <motion.span
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="flex items-center gap-2"
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                        Added!
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="default"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="flex items-center gap-3"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        <span>Add To Collections</span>
                                        <span className="w-1 h-1 rounded-full bg-white/50" />
                                        <span>${itemPrice?.toLocaleString()}</span>
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Validation hints */}
                        <AnimatePresence>
                            {(!selectedSize || !selectedColor) && (
                                <motion.p
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    className="text-center text-[#EF4444] text-sm mt-3 font-medium"
                                >
                                    {!selectedSize && !selectedColor
                                        ? "Please select a size and color"
                                        : !selectedSize
                                        ? "Please select a size"
                                        : "Please select a color"}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            {/* Reviews */}
            <ReviewsSection reviews={product.reviews}/>

            {/* Recommended Products */}
            <RecommendedProducts productId={product._id} />
        </section>
    );
};

export default Page;