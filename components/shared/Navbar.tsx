"use client";
import { motion } from "motion/react"
import Link from "next/link";

const Navbar = () => {
    return (
        <motion.nav
            initial= {{y: -50 , opacity: 0}}
            animate = {{y: 0 , opacity: 1}}
            transition={{duration: 0.8 , ease: "easeOut"}}
            className="flex items-center justify-between px-12 py-8"
        >
            <Link href={"/"} className="uppercase text-xl tracking-widest">
                Atelier
            </Link>
            <ul className="hidden md:flex items-center gap-8 text-[#6B7280] font-medium">
                <li>
                    <Link href={"/"}>Collections</Link>
                </li>
                <li>
                    <Link href={"/"}>Mens</Link>
                </li>
                <li>
                    <Link href={"/"}>Womens</Link>
                </li>
                <li>
                    <Link href={"/"}>Kids</Link>
                </li>
            </ul>
            <div className="flex gap-4 text-lg">
                <button>🔍</button>
                <button>🛍️</button>
            </div>
        </motion.nav>
    )
}

export default Navbar