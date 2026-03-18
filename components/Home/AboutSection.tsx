"use client"
import { motion } from "motion/react"

const AboutSection = () => {
    const textVariants: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.8, ease: "easeOut" } 
    }
    };
    const imageVariants: any = {
        hidden: { opacity: 0, scale: 1.1 },
        visible: { 
        opacity: 1, 
        scale: 1, 
        transition: { duration: 1.5, ease: "easeOut" } 
        }
    };

    const buttonVariants: any = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 0.6, 
            ease: "easeOut", 
            delay: 0.6 
        } 
        }
    };

    return (
        <section className="flex pt-16 flex-col items-center gap-6 px-6">
            <motion.div
                className="max-w-4xl w-full"
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <h4 className="text-xs font-bold tracking-widest uppercase text-[#C9AF5B] mb-4 text-center">Editorial</h4>
                <h2 className="font-serif text-4xl mb-8 text-center">The Return to Craft</h2>
                <p className="text-gray-600 leading-relaxed text-sm text-left first-letter:text-5xl first-letter:font-serif first-letter:text-[#C1A661] first-letter:mr-3 first-letter:float-left first-letter:mt-1">
                    In an era defined by constant acceleration, true luxury emerges from the deliberate slowing down of the creative process. Our latest collection is an homage to the artisans who dedicate their lives to perfecting singular techniques.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm text-left mt-5">
                    Every seam, every drape, and every textural choice speaks to a philosophy where garments are not merely worn, but inhabited. The transition from rigid forms to fluid, responsive fabrics marks a new chapter in our sartorial lexicon.
                </p>
            </motion.div>

            <div className="relative w-full max-w-7xl mt-20 mx-auto h-[600px] overflow-hidden">
                <motion.img
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                src="/images/Model Banner.png" 
                alt="Woman in black blazer"
                className="w-full rounded-xl h-full object-cover object-top"
                />

                <motion.button
                variants={buttonVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg 
                            bg-[#D4AF37] text-white px-8 py-3 text-xs tracking-[0.2em] 
                            uppercase font-bold hover:bg-black transition-colors duration-300"
                >
                Shop The Look
                </motion.button>
            </div>
        </section>
    )
}

export default AboutSection