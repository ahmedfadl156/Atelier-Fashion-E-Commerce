"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useFeaturedProducts } from "@/hooks/products/useFeaturedProducts"
import Image from "next/image"
import { SERVER_ORIGIN } from "@/utils/helpers"

const ITEM_WIDTH = 340
const GAP = 20
const CARD_HEIGHT = 460

const FeaturedProducts = () => {
    const containerRef = useRef(null)
    const { data, isLoading, isError } = useFeaturedProducts()

    const products = data?.data?.products ?? []

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    const totalDistance = Math.max(0, products.length - 1) * (ITEM_WIDTH + GAP)
    const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance])

    return (
        <section
            ref={containerRef}
            style={{ height: `${(products.length + 1) * 100}vh` }}
            className="relative"
        >
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

                {/* Header */}
                <div className="max-w-7xl mx-auto w-full px-8 mb-10 flex items-end justify-between">
                    <h2 className="text-[#333333] font-serif text-4xl">
                        Featured{" "}
                        <span className="italic text-[#C9AF5B]">Selection</span>
                    </h2>
                    <Link
                        href="/collections"
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#C9AF5B] transition-colors duration-300 group"
                    >
                        View All
                        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>

                {/* Loading state */}
                {isLoading && (
                    <div className="flex gap-5 px-8">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                style={{ flexShrink: 0, width: ITEM_WIDTH, height: CARD_HEIGHT }}
                                className="rounded-2xl bg-gray-100 animate-pulse"
                            />
                        ))}
                    </div>
                )}

                {isError && (
                    <div className="px-8 text-sm text-gray-400 tracking-widest uppercase">
                        Unable to load products at this time.
                    </div>
                )}

                {!isLoading && !isError && (
                    <div className="w-full overflow-visible">
                        <motion.div
                            className="flex"
                            style={{ x, gap: GAP, paddingLeft: "calc((100vw - 340px) / 2)" }}
                        >
                            {products.map((product, index) => (
                                <div
                                    key={product._id}
                                    style={{ flexShrink: 0, width: ITEM_WIDTH }}
                                    className="group cursor-pointer"
                                >
                                    {/* Image */}
                                    <div
                                        className="relative rounded-2xl overflow-hidden bg-[#F5F2EE]"
                                        style={{ height: CARD_HEIGHT }}
                                    >
                                        <Image
                                            src={`${SERVER_ORIGIN}/images/Products/${product.coverImage}`}
                                            alt={product.title}
                                            fill
                                            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* Item number */}
                                        <span className="absolute top-5 left-5 text-xs font-mono tracking-widest text-[#C9AF5B]">
                                            0{index + 1}
                                        </span>

                                        {/* Quick shop button */}
                                        <div className="absolute bottom-5 left-0 right-0 flex justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            <button className="bg-white/90 backdrop-blur-sm text-[#333] text-xs tracking-widest uppercase font-semibold px-6 py-3 rounded-full hover:bg-[#C9AF5B] hover:text-white transition-colors duration-300">
                                                Quick Shop
                                            </button>
                                        </div>
                                    </div>

                                    {/* Card info */}
                                    <div className="mt-3 px-1">
                                        <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-1">
                                            {typeof product.category === "string" ? product.category : "Fashion"}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-serif text-lg text-[#333]">{product.title}</h3>
                                            <span className="text-sm text-[#C9AF5B] font-medium">${product.price.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default FeaturedProducts