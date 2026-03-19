export function FieldRow({
    label,
    value,
    icon,
    type = "text",
}: {
    label: string;
    value: string;
    icon?: React.ReactNode;
    type?: string;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/45 font-semibold">
                {label}
            </label>
            <div className="relative">
                {icon && (
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/30 pointer-events-none">
                        {icon}
                    </span>
                )}
                <input
                    type={type}
                    value={value}
                    readOnly
                    disabled
                    className={`w-full border border-[#1A1A1A]/12 bg-[#FAFAF9] text-sm text-[#1A1A1A] py-3.5 pr-4 rounded-none
                    placeholder:text-[#1A1A1A]/30 cursor-not-allowed disabled:opacity-70
                    focus:outline-none focus:border-[#D4AF37]/50
                    ${icon ? "pl-10" : "pl-4"}`}
                />
            </div>
        </div>
    );
}
