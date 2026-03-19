export function SectionHeader({
    icon,
    title,
    action,
}: {
    icon: React.ReactNode;
    title: string;
    action?: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-[#1A1A1A]/10">
            <div className="flex items-center gap-3">
                <span className="text-[#D4AF37]">{icon}</span>
                <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#1A1A1A]">{title}</h2>
            </div>
            {action}
        </div>
    );
}
