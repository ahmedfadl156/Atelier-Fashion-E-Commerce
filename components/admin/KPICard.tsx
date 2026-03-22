interface KpiCardProps {
    label: string;
    value: string | number | undefined;
    icon: React.ElementType;
    prefix?: string;
    accentColor?: string;
}

const KPICard = ({ label, value, icon: Icon, prefix = "", accentColor = "#D4AF37" }: KpiCardProps) => (
    <div
        className="relative rounded-sm p-6 flex flex-col gap-3 overflow-hidden transition-shadow duration-300 hover:shadow-md"
        style={{ background: "#fff", border: "1px solid rgba(26,26,26,0.07)" }}
    >
        <span className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: accentColor }} />

        <div className="flex items-center justify-between">
            <p
                className="text-[10px] tracking-[0.25em] uppercase"
                style={{ color: "rgba(26,26,26,0.45)", fontFamily: "'Liberation Serif', Georgia, serif" }}
            >
                {label}
            </p>
            <span
                className="flex items-center justify-center w-9 h-9 rounded-sm"
                style={{ background: `${accentColor}18` }}
            >
                <Icon size={16} style={{ color: accentColor }} />
            </span>
        </div>

        <p
            className="text-3xl font-semibold leading-none"
            style={{ color: "#1A1A1A", fontFamily: "'Liberation Serif', Georgia, serif", letterSpacing: "-0.02em" }}
        >
            {prefix}{value ?? "—"}
        </p>

        <span className="absolute bottom-0 left-6 right-6 h-px" style={{ background: "rgba(26,26,26,0.05)" }} />
    </div>
);

export default KPICard