"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTrendingProducts } from "@/hooks/products/useTrendingProdutcs"
import TrendingProductCard from "./TrendingProductCard"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SERVER_ORIGIN } from "@/utils/helpers"

const TrendingProducts = () => {
    const { data, isLoading, isError } = useTrendingProducts()
    const products = data?.data ?? []

    const trackRef = useRef<HTMLDivElement>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [visibleCount, setVisibleCount] = useState(4)
    const [canGoPrev, setCanGoPrev] = useState(false)
    const [canGoNext, setCanGoNext] = useState(false)

    useEffect(() => {
        const updateVisible = () => {
            const w = window.innerWidth
            if (w < 640) setVisibleCount(1)
            else if (w < 768) setVisibleCount(2)
            else if (w < 1024) setVisibleCount(3)
            else setVisibleCount(4)
        }
        updateVisible()
        window.addEventListener("resize", updateVisible)
        return () => window.removeEventListener("resize", updateVisible)
    }, [])

    const maxIndex = Math.max(0, products.length - visibleCount)

    useEffect(() => {
        setCurrentIndex((prev) => Math.min(prev, maxIndex))
    }, [maxIndex])

    useEffect(() => {
        setCanGoPrev(currentIndex > 0)
        setCanGoNext(currentIndex < maxIndex)
    }, [currentIndex, maxIndex])

    const scrollTo = useCallback((index: number) => {
        if (!trackRef.current) return
        const card = trackRef.current.children[index] as HTMLElement | undefined
        if (card) {
            trackRef.current.scrollTo({ left: card.offsetLeft, behavior: "smooth" })
        }
        setCurrentIndex(index)
    }, [])

    const handlePrev = () => scrollTo(Math.max(0, currentIndex - 1))
    const handleNext = () => scrollTo(Math.min(maxIndex, currentIndex + 1))

    const SkeletonCard = () => (
        <div className="flex-shrink-0 w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)] space-y-3">
            <div className="w-full aspect-[3/4] rounded-2xl bg-gray-100 animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-100 animate-pulse rounded" />
            <div className="h-3 w-1/4 bg-gray-100 animate-pulse rounded" />
        </div>
    )

    return (
        <section className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-[#333333] font-serif text-4xl">
                    Trending{" "}
                    <span className="italic text-[#C9AF5B]">Products</span>
                </h2>

                <div className="flex items-center gap-4">
                    {/* Carousel Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrev}
                            disabled={!canGoPrev}
                            aria-label="Previous products"
                            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer
                                ${canGoPrev
                                    ? "bg-[#C9AF5B] text-white hover:bg-[#b89a45] shadow-md hover:shadow-lg"
                                    : "bg-gray-100 text-gray-300 cursor-not-allowed"
                                }`}
                        >
                            <ChevronLeft className="size-4" />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!canGoNext}
                            aria-label="Next products"
                            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer
                                ${canGoNext
                                    ? "bg-[#C9AF5B] text-white hover:bg-[#b89a45] shadow-md hover:shadow-lg"
                                    : "bg-gray-100 text-gray-300 cursor-not-allowed"
                                }`}
                        >
                            <ChevronRight className="size-4" />
                        </button>
                    </div>
                </div>
            </div>

            {isError && (
                <p className="text-sm text-gray-400 tracking-widest uppercase py-10 text-center">
                    Unable to load trending products at this time.
                </p>
            )}

            {!isError && (
                <div
                    ref={trackRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
                    style={{ scrollbarWidth: "none" }}
                >
                    {isLoading
                        ? [1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)
                        : products.map((product, index) => (
                            <div
                                key={product._id}
                                className="flex-shrink-0 w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]"
                            >
                                <TrendingProductCard
                                    product={product}
                                    serverOrigin={SERVER_ORIGIN}
                                    index={index}
                                />
                            </div>
                        ))
                    }
                </div>
            )}

            {!isLoading && !isError && maxIndex > 0 && (
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer
                                ${i === currentIndex
                                    ? "bg-[#C9AF5B] w-6"
                                    : "bg-gray-200 w-2 hover:bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            )}

            <Link
                href="/collections"
                className="flex items-center justify-center mt-12 bg-[#C9AF5B] text-white w-fit mx-auto px-6 py-3 rounded-full gap-2 text-sm hover:bg-[#b89a45] transition-colors duration-300 group"
            >
                View All
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
        </section>
    )
}

export default TrendingProducts