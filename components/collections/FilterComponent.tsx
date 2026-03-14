"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check, SlidersHorizontal, ArrowUpDown, RoseIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const filterOptions = {
    category: ['All', 'Dresses', 'Knitwear', 'Outerwear', 'Accessories', 'Shoes'],
    size: ['All', 'XS', 'S', 'M', 'L', 'XL'],
    price: ['All', 'Under $300', '$300 - $600', '$700 - $1000', 'Over $1000'],
    sortBy: ['Recommended', 'Newest Arrivals', 'Price: Low to High', 'Price: High to Low']
};

type FilterType = keyof typeof filterOptions;

const FilterComponent = () => {
    const [activeDropdown, setActiveDropdown] = useState<FilterType | null>(null);
    const [selectedFilters, setSelectedFilters] = useState<Record<FilterType, string>>({
        category: 'All',
        size: 'All',
        price: 'All',
        sortBy: 'Recommended'
    });
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const filterRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = (dropdownName: FilterType) => {
        if (activeDropdown === dropdownName) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(dropdownName);
        }
    };

    const handleSelect = (type: FilterType, value: string) => {
        setSelectedFilters(prev => ({ ...prev, [type]: value }));
        setActiveDropdown(null);

        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== 'All' && value !== 'Recommended') {
            params.set(type, value);
        } else {
            params.delete(type);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const dropDownVariants = {
        hidden: { opacity: 0, y: -10, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
        exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }
    };

    const renderDropdown = (type: FilterType, label: string) => {
        const isActive = activeDropdown === type;
        const selectedValue = selectedFilters[type];
        const isModified = selectedValue !== 'All' && selectedValue !== 'Recommended';

        return (
            <div className="relative">
                <button
                    onClick={() => toggleDropdown(type)}
                    className={cn(
                        "flex items-center justify-between gap-1.5 px-4 py-2 sm:px-4 sm:py-2 rounded-full text-xs font-medium transition-all duration-300 border backdrop-blur-md",
                        isActive 
                            ? "bg-[#111827] text-white border-[#111827] shadow-md" 
                            : isModified
                                ? "bg-white text-[#111827] border-[#C9AF5B] shadow-sm"
                                : "bg-white/80 text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-white"
                    )}
                >
                    <span className="flex items-center gap-1.5">
                        {type === 'sortBy' ? <ArrowUpDown size={12} className="w-3 h-3" /> : null}
                        <span className="hidden sm:inline text-gray-400 font-normal">{label}:</span>
                        <span className={cn("font-medium max-w-[70px] sm:max-w-none truncate", isActive ? "text-white" : "text-[#111827]")}>
                            {selectedValue}
                        </span>
                    </span>
                    <ChevronDown size={14} className={cn("transition-transform duration-300 w-3.5 h-3.5", isActive && "rotate-180")} />
                </button>

                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            variants={dropDownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={cn(
                                "absolute z-100 mt-2 w-44 sm:w-48 p-1.5 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]",
                                type === 'sortBy' ? "left-0 sm:right-0 sm:left-auto" : "left-0"
                            )}
                        >
                            <div className="flex flex-col gap-0.5 max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                                {filterOptions[type].map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleSelect(type, option)}
                                        className={cn(
                                            "flex items-center justify-between w-full px-3 py-2 text-xs rounded-xl transition-all duration-200 text-left",
                                            selectedFilters[type] === option
                                                ? "bg-[#F9F6EE] text-[#111827] font-medium"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        )}
                                    >
                                        {option}
                                        {selectedFilters[type] === option && (
                                            <Check size={14} className="text-[#C9AF5B] w-3.5 h-3.5 shrink-0" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <motion.div 
            ref={filterRef} 
            className="w-full mt-8 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="hidden md:flex items-center gap-1.5 text-gray-800 font-semibold text-sm mr-2">
                        <SlidersHorizontal size={16} className="text-[#C9AF5B]" />
                        <h2>Filters</h2>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2">
                        {renderDropdown('category', 'Category')}
                        {renderDropdown('size', 'Size')}
                        {renderDropdown('price', 'Price')}
                        <div className="hidden sm:block w-px h-6 bg-gray-200 mx-1"></div>
                        {renderDropdown('sortBy', 'Sort')}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FilterComponent;