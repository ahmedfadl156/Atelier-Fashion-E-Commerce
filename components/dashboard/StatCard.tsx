export function StatCard({
    icon,
    label,
    value,
    sub,
    highlight,
}: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
    sub?: string;
    highlight?: boolean;
}) {
    return (
        <div
            className={`relative border p-6 md:p-8 flex flex-col gap-4 overflow-hidden transition-colors duration-300 group
            ${highlight
                    ? "border-[#D4AF37]/30 bg-linear-to-br from-[#D4AF37]/5 to-transparent hover:border-[#D4AF37]/60"
                    : "border-[#1A1A1A]/10 bg-white hover:border-[#D4AF37]/40"
                }`}
        >
            {/* Corner accent */}
            <span className="absolute top-0 right-0 w-16 h-16 bg-linear-to-bl from-[#D4AF37]/6 to-transparent" />

            <div className="flex items-center gap-3">
                <span className={`${highlight ? "text-[#D4AF37]" : "text-[#1A1A1A]/40"}`}>{icon}</span>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#1A1A1A]/40 font-semibold">{label}</p>
            </div>

            <div>
                <div className={`text-2xl md:text-3xl font-serif font-bold ${highlight ? "text-[#D4AF37]" : "text-[#1A1A1A]"}`}>
                    {value}
                </div>
                {sub && (
                    <p className="text-[11px] text-[#1A1A1A]/40 mt-1.5 tracking-wide">{sub}</p>
                )}
            </div>
        </div>
    );
}
