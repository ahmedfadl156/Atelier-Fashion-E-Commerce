"use client";
import React from "react";
import { motion } from "motion/react"
import Link from "next/link";

const HeroSection = () => {

    const containerVariants: any = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.25,
                delayChildren: 0.3,
            }
        }
    }

    const heading1Variants: any = {
        hidden: { y: -60, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.9, ease: "circOut" as const }
        }
    }

    const heading2Variants: any = {
        hidden: { y: 60, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.9, ease: "circOut" as const }
        }
    }

    const lineVariants: any = {
        hidden: { scaleX: 0, opacity: 0 },
        show: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.7, ease: "easeInOut" as const }
        }
    }

    const paragraphVariants: any = {
        hidden: { y: 20, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" as const }
        }
    }

    const buttonVariants: any = {
        hidden: { scale: 0.8, opacity: 0 },
        show: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.6, ease: "circOut" as const }
        }
    }

    const marqueeVariants: any = {
        hidden: {
            y: 30,
            opacity: 0
        },
        show: {
            y: 0,
            opacity: 1,
            transition: {duration: 1 , ease: "easeOut" as const}
        }
    }

    return (
        <>
        {/* Hero Section Div */}
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center justify-center mt-20 md:mt-32 text-center"
        >
            <motion.h1
                variants={heading1Variants}
                className="text-4xl text-[#333333] md:text-6xl lg:text-8xl italic mb-2"
            >
                The <span className="text-[#C9AF5B]">Art</span> of
            </motion.h1>

            <motion.h1
                variants={heading2Variants}
                className="text-6xl text-[#333333] md:text-6xl lg:text-8xl italic mb-6"
            >
                Minimalism
            </motion.h1>

            <motion.div
                variants={lineVariants}
                className="w-24 h-px bg-[#C9AF5B] mb-6 origin-center"
            />

            <motion.p
                variants={paragraphVariants}
                className="text-lg text-[#666666] md:text-xl mb-10 max-w-2xl leading-relaxed"
            >
                Discover timeless elegance with our curated collection of minimalist fashion.
            </motion.p>

            <motion.button
                variants={buttonVariants}
                whileHover={{ scale: 1.05, backgroundColor: "#b89f4b" }}
                whileTap={{ scale: 0.97 }}
                className="px-10 cursor-pointer py-3.5 bg-[#C9AF5B] text-white rounded-full transition-colors tracking-widest text-sm uppercase"
            >
                <Link href="/collections">
                    Shop Now
                </Link>
            </motion.button>
        </motion.div>

        <motion.div 
            variants={marqueeVariants}
            initial="hidden"
            animate="show"
            className="bg-[#F9F9F9] border-y-[#E5E7EB] py-3 overflow-hidden mt-32"
        >
            <motion.div
                initial={{x: 0}}
                animate={{x: "-50%"}}
                transition={{
                    repeat: Infinity,
                    duration: 20,
                    ease: "linear"
                }}
                className="flex items-center gap-10 text-sm tracking-[0.2em] uppercase w-fit"
            >
                {Array.from({ length: 14 }).map((_, index) => (
                    <React.Fragment key={index}>
                        <span className="whitespace-nowrap">New Collection</span>
                        <span className="text-[#C9AF5B] w-2 h-2 rounded-full bg-[#C9AF5B] shrink-0"></span>
                    </React.Fragment>
                ))}
            </motion.div>
        </motion.div>
        </>
    )
}

export default HeroSection