"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react";
import { motion } from "motion/react";

const SearchComponent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        const params = new URLSearchParams(searchParams.toString());
        if(value.length > 3){
            params.set("search", value);
        } else {
            params.delete("search");
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full lg:w-[400px] relative"
            onSubmit={(e) => e.preventDefault()}
        >
            <div className="relative flex items-center">
                <Search className="w-5 h-5 text-gray-400 absolute left-4" />
                <input
                    defaultValue={searchParams.get('search') || ''}
                    onChange={handleSearch}
                    type="text" 
                    placeholder="Search collections..." 
                    className="w-full bg-white border border-gray-200 focus:border-[#C9AF5B] focus:ring-1 focus:ring-[#C9AF5B] rounded-full pl-12 pr-4 py-2.5 text-sm transition-all shadow-sm outline-none placeholder:text-gray-400" 
                />
            </div>
        </motion.form>
    )
}

export default SearchComponent