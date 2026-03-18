"use client";
import { useAuth } from "@/context/authContext";
import { useCart } from "@/hooks/cart/useCart";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const NAV_LINKS = [
    { label: "Collections", href: "/collections" },
    { label: "Categories", href: "/collections/category" },
    { label: "Mens", href: "/collections/category/men" },
    { label: "Womens", href: "/collections/category/women" },
    { label: "Kids", href: "/collections/category/kids" },
];


const Divider = () => <div className="h-px bg-[#1A1A1A]/8 w-full" />;

function getInitials(firstName?: string, lastName?: string) {
    return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase() || "U";
}

const Navbar = () => {
    const { user, isAuthenticated, isLoading, signOut } = useAuth();
    const { cartCount } = useCart();
    const router = useRouter();
    const queryClient = useQueryClient();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const handleSignOut = async () => {
        setDropdownOpen(false);
        setMobileOpen(false);
        await signOut();
        queryClient.clear();
        router.push("/sign-in");
    };

    return (
        <>
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex items-center justify-between px-8 md:px-12 py-8 relative z-50"
            >
                {/* Logo */}
                <Link href="/" className="uppercase text-xl tracking-widest font-semibold">
                    Atelier
                </Link>

                {/* Desktop nav links */}
                <ul className="hidden md:flex items-center gap-8 text-[#6B7280] text-sm font-medium">
                    {NAV_LINKS.map((l) => (
                        <li key={l.label}>
                            <Link
                                href={l.href}
                                className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:text-[#1A1A1A] transition-colors duration-200"
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop right side */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="relative">
                        <AnimatePresence mode="popLayout">
                            {cartCount > 0 && (
                                <motion.span
                                    key={cartCount}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                                    className="absolute -top-5 -left-4 bg-primary text-white text-[10px] font-bold rounded-full w-6 h-6 flex items-center justify-center pointer-events-none"
                                >
                                    {cartCount > 99 ? "99+" : cartCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                        <Link id="cart-nav-icon" href="/cart" className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:text-[#1A1A1A] transition-colors duration-200">
                            <ShoppingCart className="size-5"/>
                        </Link>
                    </div>
                    {isLoading ? (
                        <div className="h-9 w-9 rounded-full bg-[#1A1A1A]/10 animate-pulse" />
                    ) : isAuthenticated ? (
                        /* ── Avatar + dropdown ── */
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen((p) => !p)}
                                className="flex items-center gap-3 group outline-none"
                                aria-label="User menu"
                            >
                                <div className="relative">
                                    {user?.profileImage ? (
                                        <img
                                            src={user?.profileImage}
                                            alt="avatar"
                                            className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/60 transition-all duration-300"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-[#D4AF37] flex items-center justify-center text-[11px] font-bold tracking-widest ring-2 ring-primary/20 group-hover:ring-primary/60 transition-all duration-300">
                                            {getInitials(user?.firstName, user?.lastName)}
                                        </div>
                                    )}
                                    {/* online dot */}
                                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
                                </div>
                                <div className="text-left hidden lg:block">
                                    <p className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-widest leading-none">
                                        {user?.firstName}
                                    </p>
                                    <p className="text-[9px] text-primary uppercase tracking-[0.2em] mt-0.5">
                                        {user?.tier ?? "Member"}
                                    </p>
                                </div>
                                {/* chevron */}
                                <svg
                                    className={`w-3.5 h-3.5 text-[#1A1A1A]/40 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown panel */}
                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                        transition={{ duration: 0.18, ease: "easeOut" }}
                                        className="absolute right-0 top-14 w-64 bg-white border border-[#1A1A1A]/8 shadow-2xl shadow-black/10 z-50"
                                    >
                                        {/* user info header */}
                                        <div className="px-5 py-4">
                                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]">
                                                {user?.firstName} {user?.lastName}
                                            </p>
                                            <p className="text-[10px] text-[#1A1A1A]/50 mt-0.5 truncate">
                                                {user?.email}
                                            </p>
                                            <span className="inline-block mt-2 text-[9px] uppercase tracking-[0.25em] bg-primary/10 text-primary px-2 py-0.5 font-bold">
                                                {user?.tier ?? "Member"}
                                            </span>
                                        </div>

                                        <Divider />

                                        <div className="py-2">
                                            {[
                                                { label: "Dashboard", href: "/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
                                                { label: "My Orders", href: "/orders", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
                                                { label: "Wishlist", href: "/wishlist", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
                                                { label: "Settings", href: "/settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
                                            ].map(({ label, href, icon }) => (
                                                <Link
                                                    key={label}
                                                    href={href}
                                                    onClick={() => setDropdownOpen(false)}
                                                    className="flex items-center gap-3 px-5 py-2.5 text-[11px] uppercase tracking-[0.15em] text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#F9F8F6] transition-colors duration-150 group"
                                                >
                                                    <svg className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                                                    </svg>
                                                    {label}
                                                </Link>
                                            ))}
                                        </div>

                                        <Divider />

                                        <div className="py-2">
                                            <button
                                                onClick={handleSignOut}
                                                className="flex items-center gap-3 px-5 py-2.5 text-[11px] uppercase tracking-[0.15em] text-red-500/80 hover:text-red-600 hover:bg-red-50 transition-colors duration-150 w-full group"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Sign Out
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <>
                            <Link
                                href="/sign-in"
                                className="text-[11px] uppercase tracking-[0.3em] font-bold border border-[#1A1A1A]/20 px-5 py-2.5 hover:border-primary hover:text-primary transition-colors duration-200"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/sign-up"
                                className="text-[11px] uppercase tracking-[0.3em] font-bold bg-[#1A1A1A] text-[#D4AF37] px-5 py-2.5 hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors duration-200"
                            >
                                Join
                            </Link>
                        </>
                    )}
                </div>

                <button
                    onClick={() => setMobileOpen((p) => !p)}
                    className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 group"
                    aria-label="Toggle menu"
                >
                    <span className={`block h-px w-6 bg-[#1A1A1A] transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[9px]" : ""}`} />
                    <span className={`block h-px bg-[#1A1A1A] transition-all duration-300 ${mobileOpen ? "w-0 opacity-0" : "w-5"}`} />
                    <span className={`block h-px w-6 bg-[#1A1A1A] transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[9px]" : ""}`} />
                </button>
            </motion.nav>

            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                            className="fixed top-0 right-0 bottom-0 w-[min(340px,90vw)] bg-[#F9F8F6] z-50 flex flex-col"
                        >
                            {/* header */}
                            <div className="flex items-center justify-between px-8 py-8 border-b border-[#1A1A1A]/8">
                                <span className="uppercase text-xl tracking-widest font-semibold">Atelier</span>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors"
                                    aria-label="Close menu"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-8">
                                {/* user card — if logged in */}
                                {isAuthenticated && user && (
                                    <div className="flex items-center gap-4 p-5 bg-white border border-[#1A1A1A]/8">
                                        {user.profileImage ? (
                                            <img src={user.profileImage} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-[#1A1A1A] text-[#D4AF37] flex items-center justify-center text-sm font-bold tracking-widest shrink-0">
                                                {getInitials(user.firstName, user.lastName)}
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-[12px] font-bold uppercase tracking-widest text-[#1A1A1A]">
                                                {user.firstName} {user.lastName}
                                            </p>
                                            <p className="text-[10px] text-primary uppercase tracking-[0.2em] mt-0.5">
                                                {user.tier ?? "Member"}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Nav links */}
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.35em] text-[#1A1A1A]/40 mb-4">Navigate</p>
                                    <ul className="flex flex-col">
                                        {NAV_LINKS.map((l, i) => (
                                            <motion.li
                                                key={l.label}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.05 * i + 0.1, duration: 0.3 }}
                                            >
                                                <Link
                                                    href={l.href}
                                                    onClick={() => setMobileOpen(false)}
                                                    className="flex items-center justify-between py-4 border-b border-[#1A1A1A]/6 text-[13px] uppercase tracking-[0.25em] font-medium text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:pl-2 transition-all duration-200"
                                                >
                                                    {l.label}
                                                    <svg className="w-4 h-4 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Account links if logged in */}
                                {isAuthenticated && (
                                    <div>
                                        <p className="text-[9px] uppercase tracking-[0.35em] text-[#1A1A1A]/40 mb-4">Account</p>
                                        <ul className="flex flex-col">
                                            {[
                                                { label: "Dashboard", href: "/dashboard" },
                                                { label: "My Orders", href: "/orders" },
                                                { label: "Wishlist", href: "/wishlist" },
                                                { label: "Settings", href: "/settings" },
                                            ].map((l, i) => (
                                                <motion.li
                                                    key={l.label}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.05 * i + 0.25, duration: 0.3 }}
                                                >
                                                    <Link
                                                        href={l.href}
                                                        onClick={() => setMobileOpen(false)}
                                                        className="flex items-center justify-between py-4 border-b border-[#1A1A1A]/6 text-[13px] uppercase tracking-[0.25em] font-medium text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:pl-2 transition-all duration-200"
                                                    >
                                                        {l.label}
                                                        <svg className="w-4 h-4 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </Link>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Footer CTA */}
                            <div className="px-8 py-8 border-t border-[#1A1A1A]/8 flex flex-col gap-3">
                                {isAuthenticated ? (
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full py-4 text-[11px] uppercase tracking-[0.35em] font-bold text-red-500 border border-red-200 hover:bg-red-50 transition-colors duration-200"
                                    >
                                        Sign Out
                                    </button>
                                ) : (
                                    <>
                                        <Link
                                            href="/sign-in"
                                            onClick={() => setMobileOpen(false)}
                                            className="w-full py-4 text-center text-[11px] uppercase tracking-[0.35em] font-bold border border-[#1A1A1A]/20 hover:border-primary hover:text-primary transition-colors duration-200"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href="/sign-up"
                                            onClick={() => setMobileOpen(false)}
                                            className="w-full py-4 text-center text-[11px] uppercase tracking-[0.35em] font-bold bg-[#1A1A1A] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors duration-200"
                                        >
                                            Join the Circle
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;