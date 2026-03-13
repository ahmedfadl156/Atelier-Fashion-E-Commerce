"use client"

import { motion } from "motion/react"
import { useRef } from "react"
import { useInView } from "motion/react"

const steps = [
    {
        number: "01",
        title: "Craftsmanship",
        description: "Discover the new season essentials featuring intricate craftsmanship of the modern muse.",
        icon: "✦",
    },
    {
        number: "02",
        title: "Timeless Design",
        description: "Explore the effortless drape and fluid lines of our new gowns and separates.",
        icon: "◈",
    },
    {
        number: "03",
        title: "Conscious Sourcing",
        description: "Explore the effortless drape and fluid lines of our conscious sourcing raw garments.",
        icon: "❋",
    },
]

const AtelierProcess = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    return (
        <section
            ref={sectionRef}
            className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-20"
        >
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-14 text-center"
            >
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9AF5B] mb-3">
                    The Atelier Way
                </p>
                <h2 className="text-[#333333] font-serif text-4xl">
                    Our{" "}
                    <span className="italic text-[#C9AF5B]">Process</span>
                </h2>
            </motion.div>

            <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                style={{ originX: 0 }}
                className="w-full h-px bg-gradient-to-r from-transparent via-[#C9AF5B]/40 to-transparent mb-14"
            />

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x md:divide-[#C9AF5B]/20">
                {steps.map((step, index) => (
                    <motion.div
                        key={step.number}
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.15 + index * 0.18,
                        }}
                        className="group relative flex flex-col items-center text-center px-8 py-10 md:py-4"
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{
                                duration: 0.6,
                                ease: "backOut",
                                delay: 0.3 + index * 0.18,
                            }}
                            className="text-[#C9AF5B]/30 text-5xl mb-4 group-hover:text-[#C9AF5B]/60 transition-colors duration-500 select-none"
                        >
                            {step.icon}
                        </motion.span>

                        <span className="absolute top-2 right-6 font-serif text-[80px] leading-none text-[#333]/5 select-none group-hover:text-[#C9AF5B]/8 transition-colors duration-500">
                            {step.number}
                        </span>

                        <span className="text-[10px] font-mono tracking-[0.25em] text-[#C9AF5B] mb-3">
                            {step.number}
                        </span>

                        {/* Title */}
                        <h3 className="font-serif text-2xl text-[#333] mb-3 group-hover:text-[#C9AF5B] transition-colors duration-400">
                            {step.title}
                        </h3>

                        <motion.div
                            className="h-px bg-[#C9AF5B] mb-4"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: 32 } : {}}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut",
                                delay: 0.5 + index * 0.18,
                            }}
                        />

                        {/* Description */}
                        <p className="text-sm text-gray-500 leading-relaxed max-w-[240px]">
                            {step.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Bottom divider */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                style={{ originX: 1 }}
                className="w-full h-px bg-gradient-to-r from-transparent via-[#C9AF5B]/40 to-transparent mt-14"
            />
        </section>
    )
}

export default AtelierProcess