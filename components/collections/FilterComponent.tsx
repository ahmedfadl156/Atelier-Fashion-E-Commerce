"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useGetAllCategories } from '@/hooks/categorys/useGetAllCategories';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type FilterType = 'category' | 'size' | 'price' | 'sortBy';

const FilterComponent = () => {
    const [activeDropdown, setActiveDropdown] = useState<FilterType | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const filterRef = useRef<HTMLDivElement>(null);


    const { data: categoriesResponse } = useGetAllCategories();
    const categoriesData = categoriesResponse?.data?.categories || [];

    const isCategoryPage = pathname.includes('/collections/category/');
    const activeCategorySlug = isCategoryPage ? pathname.split('/').pop() : null;

    let dynamicCategoryOptions: { label: string, value: string }[] = [{ label: 'All Categories', value: 'All' }];

    if (categoriesData.length > 0) {
        if (activeCategorySlug) {
            const activeCat = categoriesData.find((c: any) => c.slug === activeCategorySlug);
            if (activeCat && activeCat.subcategories && activeCat.subcategories.length > 0) {
                dynamicCategoryOptions = [{ label: 'All Subcategories', value: 'All' }];
                activeCat.subcategories.forEach((sub: any) => {
                    dynamicCategoryOptions.push({ label: sub.name, value: sub.slug });
                });
            }
        } else {
            categoriesData.forEach((main: any) => {
                dynamicCategoryOptions.push({ label: main.name, value: main.slug });
            });
        }
    }

    const filterOptions = {
        category: dynamicCategoryOptions,
        size: [
            { label: 'All Sizes', value: 'All' },
            { label: 'XS', value: 'XS' },
            { label: 'S', value: 'S' },
            { label: 'M', value: 'M' },
            { label: 'L', value: 'L' },
            { label: 'XL', value: 'XL' }
        ],
        price: [
            { label: 'All Prices', value: 'All' },
            { label: 'Under $300', value: 'Under $300' },
            { label: '$300 - $700', value: '$300 - $700' },
            { label: '$700 - $1000', value: '$700 - $1000' },
            { label: 'Over $1000', value: 'Over $1000' }
        ],
        sortBy: [
            { label: 'Recommended', value: 'Recommended' },
            { label: 'Newest Arrivals', value: 'Newest Arrivals' },
            { label: 'Price: Low to High', value: 'Price: Low to High' },
            { label: 'Price: High to Low', value: 'Price: High to Low' }
        ]
    };

    const getSelectedValue = (type: FilterType) => {
        return searchParams.get(type) || 'All';
    };

    const getSelectedLabel = (type: FilterType) => {
        let val = searchParams.get(type) || 'All';
        if (type === 'sortBy' && val === 'All') val = 'Recommended';
        const option = filterOptions[type].find(o => o.value === val);
        return option ? option.label : val;
    };

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
        setActiveDropdown(null);

        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== 'All' && value !== 'Recommended') {
            params.set(type, value);
        } else {
            params.delete(type);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const dropDownVariants: any = {
        hidden: { opacity: 0, y: -10, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
        exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }
    };

    const renderDropdown = (type: FilterType, label: string) => {
        const isActive = activeDropdown === type;
        const selectedValue = getSelectedValue(type);
        const selectedLabel = getSelectedLabel(type);
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
                        <span className={cn("font-medium max-w-[90px] sm:max-w-[120px] truncate", isActive ? "text-white" : "text-[#111827]")}>
                            {selectedLabel}
                        </span>
                    </span>
                    <ChevronDown size={14} className={cn("transition-transform duration-300 w-3.5 h-3.5 ml-1", isActive && "rotate-180")} />
                </button>

                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            variants={dropDownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={cn(
                                "absolute z-50 mt-2 min-w-[180px] p-1.5 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]",
                                type === 'sortBy' ? "left-0 sm:right-0 sm:left-auto" : "left-0"
                            )}
                        >
                            <div className="flex flex-col gap-0.5 max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                                {filterOptions[type].map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleSelect(type, option.value)}
                                        className={cn(
                                            "flex items-center justify-between w-full px-3 py-2 text-xs rounded-xl transition-all duration-200 text-left",
                                            selectedValue === option.value
                                                ? "bg-[#F9F6EE] text-[#111827] font-medium"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        )}
                                    >
                                        <span className="truncate pr-2">{option.label}</span>
                                        {selectedValue === option.value && (
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
            className="flex items-center gap-3 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
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
        </motion.div>
    );
};

export default FilterComponent;