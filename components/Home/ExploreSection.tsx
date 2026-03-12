"use client"
import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

const ExploreSection = () => {
    const textVariants = {
        hidden: {opacity: 0 , y: 50},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.8 , ease: "easeOut"}
        }
    }

    const imageVariants = {
        hidden: {opacity: 0 , scale: 1.15},
        visible: {
            opacity: 1,
            scale: 1,
            transition: {duration: 1.2 , ease: "easeOut"}
        }
    }
    return (
        <section className="mx-auto max-w-7xl my-20 md:my-24 px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
            {/* Left Content */}
            <motion.div
                variants={textVariants}
                initial= "hidden"
                whileInView="visible"
                viewport={{once: true , amount: 0.3}}
                className="order-2 md:order-1 md:pr-12 md:mt-32"
            >
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif mb-4 text-[#333333]">Structured <br />
                    <span className="text-[#C9AF5B] italic">Elegance</span>
                </h1>
                <p className="text-[#4B5563] mb-8 text-sm lg:text-base leading-relaxed max-w-lg">Discover the new season essentials featuring intricate craftsmanship
                    and timeless silhouettes designed for the modern muse.
                </p>
                <Link className="uppercase flex items-center gap-2 text-[#333333] text-base font-bold underline" href="/collections">
                    Explore Collection
                    <ArrowRight className="size-4"/>
                </Link>
            </motion.div>

            {/* Right Content */}
            <div className="order-1 md:order-2 overflow-hidden">
                <motion.img 
                    variants={imageVariants}
                    initial= "hidden"
                    whileInView="visible"
                    viewport={{once: true , amount: 0.3}}
                    src="/images/Structured Suit.png"
                    alt="Fluid Dress"
                    className="w-full object-cover"
                />
            </div>
            </div>
            {/* Second Block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="overflow-hidden md:mt-32">
                <motion.img
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    src="/images/Fluid Dress.png" 
                    alt="Fluid Dress"
                    className="w-full object-cover"
                />
            </div>

            <motion.div
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="md:pl-12"
                >
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif mb-4 text-[#333333]">
                    Fluid Silhouettes <br />
                    <span className="italic text-[#C9AF5B]">Graceful Motion</span>
                </h2>
                <p className="text-[#4B5563] mb-8 text-sm lg:text-base leading-relaxed max-w-lg">
                    Explore the effortless drape and fluid lines of our new gowns and separates.
                </p>
                <Link className="uppercase flex items-center gap-2 text-[#333333] text-base font-bold underline" href="/collections">
                    Explore Collection
                    <ArrowRight className="size-4"/>
                </Link>
            </motion.div>

            </div>
        </section>
    )
}

export default ExploreSection