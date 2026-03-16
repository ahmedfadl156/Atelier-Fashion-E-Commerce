import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
    {
        title: "Women's Collection",
        slug: "women",
        description: "Discover elegance and modern grace. Curated pieces for the contemporary woman.",
        image: "/images/Womens_Collection.png",
        color: "bg-[#FDFBF7]"
    },
    {
        title: "Men's Essentials",
        slug: "men",
        description: "Timeless tailoring meets urban edge. Define your signature style.",
        image: "/images/Mens_Collection.png", 
        color: "bg-[#F7F8FA]"
    },
    {
        title: "Kids & Baby",
        slug: "kids",
        description: "Playful, comfortable, and stylish. Fashion for the little ones.",
        image: "/images/Kids_Collection.png", 
        color: "bg-[#F9F7F5]"
    }
];

const CategoryPage = () => {
    return (
        <main className="min-h-screen pb-20">
            {/* Hero Section */}
            <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center bg-[#111827] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 z-10" />
                <div className="absolute inset-0 opacity-40">
                    <Image 
                        src="/images/Fluid Dress.png" 
                        alt="Fashion Background"
                        fill
                        className="object-cover object-center blur-sm scale-105"
                        priority
                    />
                </div>
                
                <div className="relative z-20 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-serif italic text-white mb-6 tracking-wide">
                        Our Collections
                    </h1>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-light">
                        Explore our thoughtfully curated categories designed to elevate your everyday wardrobe.
                    </p>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="max-w-[1600px] mx-auto px-4 md:px-8 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {CATEGORIES.map((category, idx) => (
                        <Link 
                            href={`/collections/category/${category.slug}`} 
                            key={category.slug}
                            className={`group relative flex flex-col h-[600px] md:h-[700px] rounded-3xl overflow-hidden ${category.color} transition-all duration-700 hover:shadow-2xl hover:-translate-y-2`}
                        >
                            {/* Image Container */}
                            <div className="relative h-[65%] w-full overflow-hidden mix-blend-multiply">
                                <Image 
                                    src={category.image}
                                    alt={category.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col justify-between p-8 md:p-10 bg-white relative z-10">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-serif text-[#111827] mb-4 group-hover:text-[#C9AF5B] transition-colors duration-300">
                                        {category.title}
                                    </h2>
                                    <p className="text-gray-500 leading-relaxed font-light text-base">
                                        {category.description}
                                    </p>
                                </div>
                                
                                <div className="flex items-center gap-3 text-[#111827] font-semibold tracking-widest uppercase text-sm mt-8 group-hover:text-[#C9AF5B] transition-colors duration-300">
                                    <span className="relative overflow-hidden">
                                        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Explore Now</span>
                                        <span className="absolute left-0 top-full inline-block transition-transform duration-300 group-hover:-translate-y-full text-[#C9AF5B]">Explore Now</span>
                                    </span>
                                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="max-w-[1400px] mx-auto px-4 md:px-8 pb-12">
                <div className="bg-[#Fdfbf7] border border-[#E5E7EB] rounded-3xl p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9AF5B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C9AF5B]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                    
                    <h3 className="text-2xl md:text-4xl font-serif text-[#111827] italic mb-6 relative z-10">
                        Can't decide? 
                    </h3>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto relative z-10">
                        Browse our master collection featuring all full catalogs.
                    </p>
                    <Link 
                        href="/collections"
                        className="inline-flex items-center justify-center px-8 py-4 bg-[#111827] text-white rounded-full font-semibold uppercase tracking-widest text-sm hover:bg-[#C9AF5B] transition-colors duration-300 relative z-10"
                    >
                        View All Collections
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default CategoryPage;