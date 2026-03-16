import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#1A1A1A] text-[#F9F8F6] pt-16 pb-8 px-8 md:px-12 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
            
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                
                {/* Brand Section */}
                <div className="flex flex-col gap-6">
                    <Link href="/" className="uppercase text-3xl tracking-widest font-semibold text-[#D4AF37]">
                        Atelier
                    </Link>
                    <p className="text-[#F9F8F6]/70 text-sm leading-relaxed max-w-sm">
                        Discover timeless elegance with our curated collection of minimalist fashion. Designed for the modern individual who appreciates quality over quantity.
                    </p>
                    <div className="flex gap-4 mt-2">
                        <a href="#" className="w-10 h-10 rounded-full border border-[#F9F8F6]/20 flex items-center justify-center text-[#F9F8F6]/70 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300">
                            <Instagram className="w-4 h-4" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-[#F9F8F6]/20 flex items-center justify-center text-[#F9F8F6]/70 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300">
                            <Facebook className="w-4 h-4" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-[#F9F8F6]/20 flex items-center justify-center text-[#F9F8F6]/70 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300">
                            <Twitter className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-bold mb-6">Explore</h3>
                    <ul className="flex flex-col gap-4">
                        {['New Arrivals', 'Best Sellers', 'Collections', 'Our Story', 'Journal'].map((item) => (
                            <li key={item}>
                                <Link href="#" className="text-[#F9F8F6]/70 hover:text-[#D4AF37] hover:pl-2 transition-all duration-300 text-sm inline-block">
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Customer Care */}
                <div>
                    <h3 className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-bold mb-6">Support</h3>
                    <ul className="flex flex-col gap-4">
                        {['Sizing Guide', 'Shipping & Returns', 'FAQ', 'Track Order', 'Contact Us'].map((item) => (
                            <li key={item}>
                                <Link href="#" className="text-[#F9F8F6]/70 hover:text-[#D4AF37] hover:pl-2 transition-all duration-300 text-sm inline-block">
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-bold mb-6">Get in Touch</h3>
                    <ul className="flex flex-col gap-4">
                        <li className="flex items-start gap-4 text-[#F9F8F6]/70 text-sm group">
                            <MapPin className="w-5 h-5 text-[#D4AF37]/50 mt-0.5 group-hover:text-[#D4AF37] transition-colors" />
                            <span className="leading-relaxed">Al-Hai-Elkhames<br />New Damietta , Egypt</span>
                        </li>
                        <li className="flex items-center gap-4 text-[#F9F8F6]/70 text-sm group">
                            <Phone className="w-5 h-5 text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors" />
                            <span>01050075993</span>
                        </li>
                        <li className="flex items-center gap-4 text-[#F9F8F6]/70 text-sm group">
                            <Mail className="w-5 h-5 text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors" />
                            <a href="mailto:hello@atelier.com" className="hover:text-[#D4AF37] transition-colors">hello@atelier.com</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Newsletter Minimal */}
            <div className="max-w-7xl mx-auto border-t border-[#F9F8F6]/10 pt-12 pb-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <h4 className="text-[#F9F8F6] text-lg font-serif mb-2">Join the Atelier Circle</h4>
                    <p className="text-[#F9F8F6]/50 text-xs tracking-wide">Receive updates on new collections and early access.</p>
                </div>
                <form className="flex w-full md:w-auto max-w-sm">
                    <input 
                        type="email" 
                        placeholder="Your Email Address" 
                        className="bg-transparent border border-[#F9F8F6]/20 px-4 py-3 text-sm text-[#F9F8F6] placeholder:text-[#F9F8F6]/30 focus:outline-none focus:border-[#D4AF37] transition-colors flex-1 w-full min-w-[200px]"
                    />
                    <button type="submit" className="bg-[#D4AF37] text-[#1A1A1A] px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors">
                        Subscribe
                    </button>
                </form>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto border-t border-[#F9F8F6]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[#F9F8F6]/40 text-xs">
                <p>&copy; {new Date().getFullYear()} Atelier Fashion. All rights reserved.</p>
                <div className="flex gap-4">
                    <Link href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
